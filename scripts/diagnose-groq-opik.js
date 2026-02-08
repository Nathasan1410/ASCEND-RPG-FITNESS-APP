#!/usr/bin/env node

/**
 * OPIK & Groq Diagnostic Tool
 * 
 * Purpose: Diagnose why Groq API is failing and traces aren't being sent
 * Usage: node scripts/diagnose-groq-opik.js
 */

import dotenv from 'dotenv';
import { readFileSync } from 'fs';

// Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

function logSection(title) {
  console.log('\n' + colors.bright + colors.cyan + '='.repeat(70));
  console.log(`  ${title}`);
  console.log('='.repeat(70) + colors.reset + '\n');
}

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('\n');
log('╔══════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
log('║        OPIK & GROQ API DIAGNOSTIC TOOL                        ║');
log('╚══════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
console.log('\n');

// Test results
const testResults = {
  environment: { checked: false, passed: 0, failed: 0 },
  groqSDK: { checked: false, passed: 0, failed: 0 },
  groqClient: { checked: false, passed: 0, failed: 0 },
  opikClient: { checked: false, passed: 0, failed: 0 },
  testCall: { checked: false, passed: 0, failed: 0 },
};

function recordTest(category, passed, details = '') {
  testResults[category].checked = true;
  if (passed) {
    testResults[category].passed++;
  } else {
    testResults[category].failed++;
  }
  log(details);
}

async function diagnoseGroqAPI() {
  logSection('TEST 1: GROQ API CONFIGURATION');

  const groqApiKey = process.env.GROQ_API_KEY;
  const groqApiKeyPresent = !!groqApiKey;
  
  logInfo(`GROQ_API_KEY present: ${groqApiKeyPresent}`);
  if (groqApiKeyPresent) {
    logInfo(`First 8 chars: ${groqApiKey.substring(0, 8)}...`);
    logInfo(`Last 8 chars: ...${groqApiKey.substring(Math.max(0, groqApiKey.length - 8))}`);
  }

  if (groqApiKeyPresent) {
    recordTest('groqSDK', true, 'GROQ_API_KEY is set');
  } else {
    recordTest('groqSDK', false, 'GROQ_API_KEY is MISSING');
  }

  if (groqApiKeyPresent) {
    logSection('TEST 2: GROQ SDK IMPORT & CLIENT');

    try {
      const groqModule = await import('groq-sdk');
      const { Groq } = groqModule;

      recordTest('groqSDK', true, 'Groq SDK imported');

      if (!Groq) {
        recordTest('groqClient', false, 'Groq class not found');
        return;
      }

      logSection('TEST 3: GROQ CLIENT INITIALIZATION');

      const groqClient = new Groq({
        apiKey: groqApiKey,
      });

      recordTest('groqClient', true, 'Groq client created');

      logSection('TEST 4: GROQ API TEST CALL');

      logInfo('Making test request to Groq...');
      logInfo('Model: llama-3.3-70b-versatile');
      logInfo('Max tokens: 10');

      const testCompletion = await groqClient.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Test connection" }],
        max_tokens: 10,
      });

      logInfo(`Response status: ${testCompletion.choices?.[0]?.finish_reason || 'success'}`);
      logInfo(`Response message: ${testCompletion.choices?.[0]?.message || 'No message'}`);

      if (testCompletion.choices?.[0]?.finish_reason === 'stop') {
        recordTest('testCall', true, 'Groq API call successful', 'Response: ' + testCompletion.choices[0]?.message);
        logSuccess('✓ Groq API is working correctly!');
        logSuccess('✓ Test API call succeeded');
      } else {
        recordTest('testCall', false, 'Groq API call failed', 'Finish reason: ' + testCompletion.choices?.[0]?.finish_reason);
        logError('✗ Groq API call failed');
        if (testCompletion.error) {
          logError(`  Error: ${testCompletion.error.message}`);
          logError(`  Error type: ${testCompletion.error.type}`);
          logError(`  Error code: ${testCompletion.error.code}`);
        }
      }

    } catch (importError) {
      logError('✗ Failed to import Groq SDK');
      logInfo(`  Error: ${importError.message}`);
      console.error(importError);
    }
  }
}

async function diagnoseOpikIntegration() {
  logSection('TEST 5: OPIK API CONFIGURATION');

  const opikApiKey = process.env.OPIK_API_KEY;
  const opikApiKeyPresent = !!opikApiKey;

  logInfo(`OPIK_API_KEY present: ${opikApiKeyPresent}`);
  if (opikApiKeyPresent) {
    logInfo(`First 8 chars: ${opikApiKey.substring(0, 8)}...`);
  }

  if (opikApiKeyPresent) {
    recordTest('opikClient', true, 'OPIK_API_KEY is set');
  } else {
    recordTest('opikClient', false, 'OPIK_API_KEY is MISSING');
  }

  if (opikApiKeyPresent) {
    logSection('TEST 6: OPIK SDK IMPORT & CLIENT');

    try {
      const opikModule = await import('opik');
      const { Opik } = opikModule;

      recordTest('opikSDK', true, 'Opik SDK imported');

      if (!Opik) {
        recordTest('opikClient', false, 'Opik class not found');
        return;
      }

      logSection('TEST 7: OPIK CLIENT INITIALIZATION');

      const opikClient = new Opik({
        apiKey: opikApiKey,
        projectName: 'Level Up Workout',
      });

      recordTest('opikClient', true, 'Opik client created');

      logSection('TEST 8: OPIK TRACE TEST');

      logInfo('Creating test trace...');

      const testTrace = await opikClient.trace({
        name: 'diagnostic_test_trace',
        startTime: new Date(),
        metadata: {
          project: 'Level Up Workout',
          environment: process.env.NODE_ENV || 'development',
          diagnostic_test: true,
        },
        input: {
          test_type: 'connectivity_verification',
          timestamp: new Date().toISOString(),
        },
        output: {
          status: 'test_trace_created',
          message: 'This is a diagnostic trace to verify Opik integration',
        },
        tags: ['test', 'diagnostic', 'connectivity'],
      });

      logInfo('Waiting for trace to complete...');

      await testTrace.end();

      logSuccess('✓ Test trace created and ended');
      logSuccess('✓ Trace ID: ' + testTrace.data?.id || 'N/A');

      recordTest('testCall', true, 'Opik trace test successful', 'Trace ID: ' + testTrace.data?.id || 'N/A');

    } catch (opikImportError) {
      logError('✗ Failed to import Opik SDK');
      logInfo(`  Error: ${opikImportError.message}`);
      console.error(opikImportError);
    }
  }
}

function printSummary() {
  console.log('\n');
  log('╔══════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║                    DIAGNOSTIC SUMMARY                            ║');
  log('╚══════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
  console.log('\n');

  log('ENVIRONMENT VARIABLES:', colors.bright);
  const envVars = {
    GROQ_API_KEY: process.env.GROQ_API_KEY ? 'PRESENT' : 'MISSING',
    OPIK_API_KEY: process.env.OPIK_API_KEY ? 'PRESENT' : 'MISSING',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT' : 'MISSING',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'PRESENT' : 'MISSING',
    SERVICE_ROLE_KEY: process.env.SERVICE_ROLE_KEY ? 'PRESENT (truncated)' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
  
  for (const [key, value] of Object.entries(envVars)) {
    const icon = value === 'PRESENT' ? '✅' : '❌';
    log(`  ${icon} ${key}: ${value}`);
  }
  console.log('');

  log('TEST RESULTS:', colors.bright);
  const totalTests = testResults.groqSDK.checked + testResults.groqSDK.passed + testResults.groqSDK.failed +
                     testResults.groqClient.checked + testResults.groqClient.passed + testResults.groqClient.failed +
                     testResults.opikSDK.checked + testResults.opikSDK.passed + testResults.opikSDK.failed +
                     testResults.testCall.checked + testResults.testCall.passed + testResults.testCall.failed;

  const passedTests = testResults.groqSDK.passed + testResults.groqClient.passed + testResults.opikSDK.passed + testResults.opikSDK.passed + testResults.testCall.passed;
  const failedTests = testResults.groqSDK.failed + testResults.groqClient.failed + testResults.opikSDK.failed + testResults.testCall.failed;

  log(`  Total Tests: ${totalTests}`, colors.bright);
  log(`  ✓ Passed: ${passedTests}`, colors.green);
  log(`  ✗ Failed: ${failedTests}`, colors.red);
  log(`  Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, colors.bright);
  console.log('');

  if (testResults.groqClient.passed && testResults.opikClient.passed && testResults.testCall.passed) {
    logSuccess('✓✓✓✓ ALL SYSTEMS OPERATIONAL! ✓✓✓✓');
    logSuccess('✓ Groq API: Working');
    logSuccess('✓ Opik API: Working');
    logSuccess('✓ Quest generation should work');

    logSection('NEXT STEPS');

    logInfo('1. Check your Opik dashboard: https://www.comet.com/opik');
    logInfo('2. Select project: "Level Up Workout"');
    logInfo('3. Look for traces named:');
    logInfo('   • quest_generation_success');
    logInfo('   • architect_quest_generation_failure (if any)');
    logInfo('   • diagnostic_test_trace (should be recent)');
    logInfo('');
    logInfo('If you see the diagnostic_test_trace, Opik is working correctly.');
    logInfo('');
    logInfo('If quest generation still fails, check the server logs for:');
    logInfo('   • "[Groq] Generation failed" - Groq API error');
    logInfo('   • "[Groq] Emergency protocol" - Groq API unavailable');
    logInfo('');
    logInfo('The diagnostic trace ID will appear above - copy it for reference.');
    logInfo('');
    logInfo('Most common issue: Environment variables not set in deployment environment.');
  } else if (testResults.groqClient.passed && !testResults.groqClient.passed) {
    logWarning('⚠ Opik is working but Groq may have issues');
    logWarning('⚠ Check Groq test results above');
  } else {
    logSection('DIAGNOSIC ISSUES');

    logError('✗ One or more systems are not operational');
    logError('✗ Please review the test results above');
    logError('✗ Common causes:');
    logInfo('  1. Environment variables not set in deployment');
    logInfo('  2. Invalid or expired API keys');
    logInfo('  3. Network connectivity issues');
    logInfo('  4. SDK version compatibility');
    logError('');
    logError('Action Required:');
    logInfo('  1. Verify deployment environment variables are set');
    logInfo('  2. Check if API keys are valid (not truncated)');
    logInfo('  3. Ensure .env.local is uploaded to deployment');
    logInfo('  4. Restart dev server if changes made');
  }

  console.log('');
  log('════════════════════════════════════════════════════════════', colors.bright + colors.cyan);
  console.log('\n');
}

// Main diagnostic function
async function runDiagnostics() {
  await diagnoseGroqAPI();
  await diagnoseOpikIntegration();
  printSummary();
}

// Run diagnostics
runDiagnostics().catch(error => {
  logError('Fatal error during diagnostics:');
  logInfo(error.message);
  console.error(error);
  process.exit(1);
});
