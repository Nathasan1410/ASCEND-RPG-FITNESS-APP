#!/usr/bin/env node

/**
 * Test Server Environment Variables
 * 
 * Purpose: Verify that environment variables are available in server actions
 * Usage: node scripts/test-server-env.js
 */

import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

console.log('\n=== SERVER ENVIRONMENT VARIABLE TEST ===\n');

console.log('Checking environment variables...\n');

// Check each variable
const envVars = {
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  OPIK_API_KEY: process.env.OPIK_API_KEY,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SERVICE_ROLE_KEY: process.env.SERVICE_ROLE_KEY?.substring(0, 20) + '...',
  NODE_ENV: process.env.NODE_ENV,
};

console.log('Environment Variables Status:\n');

let allPresent = true;

for (const [key, value] of Object.entries(envVars)) {
  const present = !!value;
  const displayValue = value ? 
    (key === 'SERVICE_ROLE_KEY' ? value + '...' : value.substring(0, Math.min(20, value.length))) : 
    'MISSING';
  
  const icon = present ? '✅' : '❌';
  console.log(`${icon} ${key}: ${displayValue}`);
  
  if (!present) allPresent = false;
}

console.log('\n' + (allPresent ? '✅ All variables present' : '❌ Some variables missing') + '\n');

// Test Groq import
console.log('Testing Groq SDK import...\n');

try {
  const groqModule = await import('groq-sdk');
  const { Groq } = groqModule;
  
  if (Groq) {
    console.log('✅ Groq SDK imported successfully\n');
    
    const apiKey = process.env.GROQ_API_KEY;
    
    if (apiKey) {
      console.log(`✅ GROQ_API_KEY is available`);
      console.log(`   First 8 chars: ${apiKey.substring(0, 8)}`);
      
      try {
        const groq = new Groq({ apiKey });
        console.log('✅ Groq client created successfully\n');
        
        console.log('\nMaking test request to Groq...\n');
        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: 'Test connection' }],
          max_tokens: 10,
        });
        
        console.log(`✅ Groq API request successful`);
        console.log(`   Response: ${completion.choices[0]?.message?.content || 'No response'}`);
        console.log(`   Model: ${completion.model}`);
        console.log(`   Usage: ${JSON.stringify(completion.usage, null, 2)}`);
        
      } catch (groqError) {
        console.error('❌ Groq client error:', groqError.message);
        console.error('   Details:', groqError);
      }
      
    } else {
      console.error('❌ GROQ_API_KEY is null or undefined');
    }
  } else {
    console.error('❌ Groq class not found in groq-sdk module');
  }
  
} catch (importError) {
  console.error('❌ Failed to import Groq SDK:', importError.message);
}

console.log('\n=== TEST COMPLETE ===\n');
