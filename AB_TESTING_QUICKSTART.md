# 🚀 A/B Testing Implementation - Quick Start

## ✅ What Was Implemented

### Files Created/Modified:

1. **`server/actions/seed-ab-test-experiments.ts`** - Seed action for 3 demo experiments
2. **`app/api/ab-testing/seed/route.ts`** - API endpoint for seeding/clearing
3. **`app/dashboard/analytics/ab-testing/page.tsx`** - Updated UI with seed/clear buttons
4. **`AB_TESTING_IMPLEMENTATION.md`** - Complete documentation
5. **`scripts/test-ab-test-implementation.js`** - Test script

## 🎯 3 Demo Experiments

### 1. Granular Effort Scoring v1 vs v2
- **Tests:** RPE difference thresholds (quantified vs vague)
- **Scenarios:** 6 realistic cases (normal, lazy, overestimation, etc.)
- **Expected:** +5% avg score, p=0.03

### 2. Context-Aware Safety Evaluation v1 vs v2
- **Tests:** Multi-dimensional safety (rank, class, soreness, streak)
- **Scenarios:** 6 realistic cases (E-Rank too intense, S-Rank safe, etc.)
- **Expected:** +5% avg score, p=0.02

### 3. Weighted Scoring by Quest Type v1 vs v2
- **Tests:** Type-specific weights (Daily: 40% effort, RankUp: 50% integrity)
- **Scenarios:** 6 realistic cases (daily high effort, rankup integrity issue, etc.)
- **Expected:** +3% avg score, p=0.04

## 📋 How to Use

### Step 1: Start the App
```bash
npm run dev
```

### Step 2: Access A/B Testing Dashboard
Navigate to: `http://localhost:3000/dashboard/analytics/ab-testing`

### Step 3: Seed Demo Experiments
Click the **"Seed Demo"** button (purple) to add 3 experiments.

### Step 4: View Experiments
You'll see 3 experiment cards with:
- Status (running, completed, etc.)
- Metrics (total runs, significance, p-value, improvement)
- Variants (sample size, success rate, avg score, avg time)

### Step 5: Generate Quests
When users generate quests, they're automatically assigned to variants (50/50 split).

### Step 6: Submit Logs
As users complete quests and submit logs, metrics update in real-time.

### Step 7: View Results
Click on any experiment to see detailed:
- Variant comparison
- Statistical analysis (z-score, p-value, confidence interval)
- Winner selection (when p < 0.05)

### Step 8: Export Results
Click "Export" to download experiment data as JSON.

### Step 9: Clear Experiments
Click "Clear All" (red) to remove all experiments.

## 🧪 Testing the Implementation

### Manual Test
1. Login to the app
2. Navigate to `/dashboard/analytics/ab-testing`
3. Click "Seed Demo"
4. View 3 new experiments
5. Generate a quest (check console for variant assignment)
6. Submit a quest log (check console for metric tracking)
7. Refresh dashboard to see updated metrics

### Automated Test
```bash
node scripts/test-ab-test-implementation.js
```

## 📊 Example Data Flow

### User Generates Quest
```
Console logs:
[QuestAction] Running A/B test experiment: <experiment_id>
[A/B Test] Assigned user <user_id> to variant: var_b
[QuestAction] Generated quest with variant: var_b (1234ms)
```

### User Submits Log
```
Console logs:
[QuestLog] Quest evaluation input: { variant_id: "var_b", experiment_id: "<experiment_id>" }
[A/B Test] Evaluated quest with variant: var_b, Success: true, Score: 0.85
```

### Dashboard Updates
```
Variant B Metrics:
- Sample Size: 1
- Success Rate: 100%
- Avg Score: 0.85
- Avg Time: 1234ms
```

## 🔍 What to Look For

### Successful Implementation Indicators:
✅ "Seed Demo" button adds 3 experiments
✅ Experiments show "running" status
✅ Console logs show variant assignment during quest generation
✅ Console logs show metric tracking during log submission
✅ Dashboard shows updated metrics after quest submission
✅ Export downloads JSON file with experiment data

### Troubleshooting:
❌ "Not authenticated" → Login first
❌ "Failed to seed" → Check browser console for errors
❌ Metrics not updating → Verify ExperimentRunner integration
❌ No experiments showing → Check `profiles.ab_testing_data` field

## 📈 Statistical Analysis

### Z-Test Results:
- **Z-score**: Measure of difference between variants
- **P-value**: Probability results are due to chance
- **Significance**: p < 0.05 (95% confidence)
- **Confidence Interval**: Range of likely values (±1.96 × SE)

### When to End Experiment:
- **Auto-end**: p < 0.05 (statistically significant)
- **Manual end**: Click "End Experiment" button
- **Winner selection**: Variant with higher target metric

## 🎨 UI Features

### Experiment Card:
- Status badge (draft, running, completed, failed)
- Experiment name and description
- Winner indicator (if completed)
- Total runs and creation date
- Click to view details

### Experiment Detail:
- Stats cards (Total Runs, Significance, P-Value, Improvement)
- Variant comparison table
- Winner highlight (green border and badge)
- End Experiment button (for running experiments)
- Export button

### Create Experiment Form:
- Experiment name
- Type selection (prompt_ab_test, weight_optimization, model_comparison)
- Description
- Variant A/B names and configs (JSON format)
- Min sample size (default: 50)
- Target metric (success_rate, avg_score)

## 🔄 Integration Points

### Quest Generation (`server/actions/quest-actions.ts`):
```typescript
const result = await ExperimentRunner.runQuestGeneration(
  user.id,
  { user_class, user_rank, time_window_min, equipment, muscle_soreness },
  runningExperimentId
);
plan._variantId = result.variantId;
plan._experimentId = runningExperimentId;
```

### Quest Evaluation (`server/actions/log-actions.ts`):
```typescript
evaluation = await ExperimentRunner.runQuestEvaluation(
  user.id,
  { quest, log, user_class, user_rank },
  experimentId,
  variantId,
  planGenerationTime
);
```

### Opik Traces:
- `experiment_created` - When experiment is created
- `quest_generation_success` - When quest is generated
- `quest_evaluation_complete` - When quest is evaluated
- `experiment_completed` - When experiment ends

## 📝 Next Steps

1. **Seed experiments** using the "Seed Demo" button
2. **Test quest generation** to verify variant assignment
3. **Test quest evaluation** to verify metric tracking
4. **Collect data** (200+ submissions per variant)
5. **Analyze results** when statistical significance reached
6. **Deploy winner** based on experiment results

## 🎓 Resources

- **Full Documentation**: `AB_TESTING_IMPLEMENTATION.md`
- **Test Script**: `scripts/test-ab-test-implementation.js`
- **UI Dashboard**: `/dashboard/analytics/ab-testing`
- **Opik Dashboard**: View traces with `ab_test` tag

---

**Implementation Status:** ✅ Complete and Ready for Testing

**Estimated Time to Test:** 10-15 minutes

**Deliverables:** ✅ All hackathon requirements met
