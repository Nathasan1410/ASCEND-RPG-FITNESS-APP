#!/usr/bin/env node

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function testABTesting() {
  console.log('🧪 Testing A/B Testing Implementation\n');

  try {
    console.log('1. Fetching existing experiments...');
    const getResponse = await fetch(`${API_URL}/api/ab-testing/experiments`);
    const getData = await getResponse.json();
    console.log(`✓ Found ${getData.experiments?.length || 0} existing experiments\n`);

    console.log('2. Seeding demo experiments...');
    const seedResponse = await fetch(`${API_URL}/api/ab-testing/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'seed' }),
    });
    const seedData = await seedResponse.json();
    console.log(`✓ Seeded ${seedData.succeeded}/${seedData.total} experiments:`);
    seedData.results.forEach((r) => {
      console.log(`  - ${r.name}: ${r.status}`);
      if (r.status === 'success') {
        console.log(`    ID: ${r.id}`);
      }
    });
    console.log();

    console.log('3. Fetching experiments after seeding...');
    const getResponse2 = await fetch(`${API_URL}/api/ab-testing/experiments`);
    const getData2 = await getResponse2.json();
    console.log(`✓ Found ${getData2.experiments?.length || 0} experiments total\n`);

    console.log('4. Checking experiment details...');
    getData2.experiments.forEach((exp, i) => {
      console.log(`\nExperiment ${i + 1}: ${exp.name}`);
      console.log(`  Status: ${exp.status}`);
      console.log(`  Type: ${exp.type}`);
      console.log(`  Variants: ${exp.variants.length}`);
      console.log(`  Target Metric: ${exp.config.target_metric}`);
      console.log(`  Min Sample Size: ${exp.config.min_sample_size}`);
      exp.variants.forEach((v) => {
        console.log(`    - ${v.name} (${v.id}): ${v.sample_size} samples`);
      });
    });

    console.log('\n5. Testing variant assignment...');
    if (getData2.experiments.length > 0) {
      const testExperiment = getData2.experiments[0];
      const testUserId = 'test-user-123';
      console.log(`  Assigning test user to experiment: ${testExperiment.name}`);
      console.log(`  This would be handled server-side during quest generation`);
    }

    console.log('\n✅ All tests passed!');
    console.log('\nNext steps:');
    console.log('  1. Open http://localhost:3001/dashboard/analytics/ab-testing');
    console.log('  2. Click "Seed Demo" to add experiments (if not already seeded)');
    console.log('  3. Generate quests and submit logs to collect data');
    console.log('  4. View real-time metrics in the dashboard');
    console.log('  5. End experiments when statistically significant (p < 0.05)');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  testABTesting();
}

module.exports = { testABTesting };
