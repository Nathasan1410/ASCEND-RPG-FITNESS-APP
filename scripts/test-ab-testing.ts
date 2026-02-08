/**
 * Quick Test Script for A/B Testing System
 * Run this to verify the implementation is working
 */

async function testABTesting() {
  console.log("🧪 Testing A/B Testing System...\n");

  // Test 1: Create an experiment
  console.log("1️⃣ Testing experiment creation...");
  try {
    const testConfig = {
      name: "Test Experiment - Prompt v1 vs v2",
      type: "prompt_ab_test",
      description: "Testing two prompt versions for quest generation",
      variants: [
        {
          id: "var_a",
          name: "Prompt v1",
          config: { prompt_version: "v1", style: "standard" }
        },
        {
          id: "var_b",
          name: "Prompt v2",
          config: { prompt_version: "v2", style: "experimental" }
        }
      ],
      min_sample_size: 10,
      target_metric: "avg_score"
    };

    console.log("   Creating experiment:", testConfig.name);
    const createRes = await fetch("http://localhost:3000/api/ab-testing/experiments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testConfig),
    });

    if (createRes.ok) {
      const data = await createRes.json();
      console.log("   ✅ Experiment created successfully!");
      console.log("   📊 Experiment ID:", data.experiment.id);
      console.log("   🔢 Variants:", data.experiment.config.variants.length);
    } else {
      console.log("   ❌ Failed to create experiment");
      console.log("   Status:", createRes.status);
    }
  } catch (err) {
    console.log("   ❌ Error:", err);
  }

  console.log("\n2️⃣ Testing experiment retrieval...");
  try {
    const getRes = await fetch("http://localhost:3000/api/ab-testing/experiments");
    if (getRes.ok) {
      const data = await getRes.json();
      console.log("   ✅ Retrieved", data.experiments.length, "experiments");
      if (data.experiments.length > 0) {
        const latest = data.experiments[data.experiments.length -1];
        console.log("   📊 Latest experiment:", latest.name);
        console.log("   🔢 Status:", latest.status);
        console.log("   🎯 Total runs:", latest.metrics.total_runs);
      }
    } else {
      console.log("   ❌ Failed to retrieve experiments");
    }
  } catch (err) {
    console.log("   ❌ Error:", err);
  }

  console.log("\n3️⃣ Testing statistical calculation...");
  try {
    const testVariants = [
      { id: "var_a", sample_size: 100, success_rate: 0.85, avg_score: 0.78, avg_time_ms: 1850 },
      { id: "var_b", sample_size: 100, success_rate: 0.89, avg_score: 0.82, avg_time_ms: 1920 },
    ];

    const n1 = testVariants[0].sample_size;
    const n2 = testVariants[1].sample_size;
    const p1 = testVariants[0].success_rate;
    const p2 = testVariants[1].success_rate;

    const pooledP = (p1 * n1 + p2 * n2) / (n1 + n2);
    const se = Math.sqrt(pooledP * (1 - pooledP) * (1/n1 + 1/n2));
    const z = se > 0 ? (p1 - p2) / se : 0;

    const pValue = 2 * (1 - normalCDF(Math.abs(z)));
    const isSignificant = pValue < 0.05;
    const confidenceInterval = se > 0 ? `±${(1.96 * se).toFixed(3)}` : "±0.00";

    console.log("   ✅ Statistical calculation complete!");
    console.log("   📊 Z-score:", z.toFixed(4));
    console.log("   📊 P-value:", pValue.toFixed(4));
    console.log("   📊 Significance:", isSignificant ? "YES (p < 0.05)" : "NO");
      console.log("   📊 Confidence interval:", confidenceInterval);
      console.log("   📊 Improvement:", Math.abs(p1 - p2).toFixed(3));
      console.log("   🏆 Winner:", isSignificant ? (p1 > p2 ? "Variant A" : "Variant B") : "None yet");
  } catch (err) {
    console.log("   ❌ Error:", err);
  }

  console.log("\n4️⃣ Testing variant assignment (hash-based)...");
  try {
    const testUsers = ["user_1", "user_2", "user_3", "user_4", "user_5"];
    const experimentId = "test_exp_123";

    console.log("   Assigning users to variants...");
    testUsers.forEach((userId) => {
      const hash = hashCode(`${userId}-${experimentId}`);
      const variantIndex = hash % 2;
      const variantId = variantIndex === 0 ? "var_a" : "var_b";
      console.log(`   👤 ${userId} → Variant ${variantId} (hash: ${hash})`);
    });

    const variantACount = testUsers.filter(u => {
      const hash = hashCode(`${u}-${experimentId}`);
      return (hash % 2) === 0;
    }).length;

    console.log("   ✅ Distribution: Variant A:", variantACount, "/ Variant B:", testUsers.length - variantACount);
  } catch (err) {
    console.log("   ❌ Error:", err);
  }

  console.log("\n✅ All tests completed!");
  console.log("\n📋 Next Steps:");
  console.log("   1. Start dev server: npm run dev");
  console.log("   2. Navigate to: http://localhost:3000/dashboard/analytics/ab-testing");
  console.log("   3. Create a new experiment");
  console.log("   4. Generate quests to see variant assignment");
  console.log("   5. Submit quest logs to track metrics");
  console.log("   6. Watch results update in real-time");
  console.log("   7. Check Opik dashboard for traces");
}

function normalCDF(x: number): number {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;
  
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);
  
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return 0.5 * (1.0 + sign * y);
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

testABTesting().catch(console.error);