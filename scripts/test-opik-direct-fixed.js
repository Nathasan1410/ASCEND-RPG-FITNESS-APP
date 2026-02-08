#!/usr/bin/env node

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const OPIK_API_KEY = process.env.OPIK_API_KEY;

const opikModule = await import('opik');
const { Opik } = opikModule;

const opikClient = new Opik({
  apiKey: OPIK_API_KEY,
  projectName: 'Level Up Workout',
});

console.log('Sending direct trace to Opik...');

const testTrace = await opikClient.trace({
  name: 'direct_opik_test_fixed',
  startTime: new Date(),
  metadata: {
    project: 'Level Up Workout',
    environment: process.env.NODE_ENV || 'development',
    test_type: 'connectivity_check_fixed',
  },
  input: {
    timestamp: new Date().toISOString(),
    test_purpose: 'Verify Opik works directly',
  },
  output: {
    status: 'trace_created',
    message: 'Direct Opik test successful',
  },
  tags: ['test', 'direct_opik', 'connectivity'],
});

console.log('Trace ID:', testTrace.data?.id || 'N/A');

await testTrace.end();

console.log('✓ Direct test trace sent successfully!');
console.log('Check Opik dashboard: https://www.comet.com/opik');
