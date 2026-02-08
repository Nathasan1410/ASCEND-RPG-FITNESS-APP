# A/B Testing System - Complete Implementation

## Overview

The A/B testing system allows you to run controlled experiments to optimize Judge AI prompts, scoring weights, and other system parameters. This implementation includes 3 realistic demo experiments ready to use.

## Quick Start

### 1. Access the Dashboard

Navigate to: `http://localhost:3000/dashboard/analytics/ab-testing`

### 2. Seed Demo Experiments

Click the **"Seed Demo"** button to add 3 pre-configured experiments:

1. **Granular Effort Scoring v1 vs v2** - Tests RPE difference thresholds
2. **Context-Aware Safety Evaluation v1 vs v2** - Tests multi-dimensional safety context
3. **Weighted Scoring by Quest Type v1 vs v2** - Tests type-specific scoring weights

### 3. Generate Quests

As users generate daily quests, they'll be automatically assigned to variants based on their user ID (hash-based 50/50 split).

### 4. Submit Logs

When users complete quests and submit logs, metrics are automatically tracked:
- Success rate (APPROVED vs FLAGGED/REJECTED)
- Average score (integrity + effort + safety) / 3
- Average response time

### 5. View Results

View real-time metrics in the dashboard:
- Total runs per variant
- Success rate comparison
- Statistical significance (p-value)
- Confidence intervals
- Winner selection (when p < 0.05)

## Demo Experiments

### Experiment 1: Granular Effort Scoring

**Hypothesis:** Quantified RPE thresholds produce more consistent effort scores.

**Variant A (Baseline):**
```json
{
  "effort_criteria": "Compare target_rpe vs actual_rpe. If user RPE << target, effort is LOW."
}
```

**Variant B (Enhanced):**
```json
{
  "effort_criteria": "Calculate RPE difference: diff = target_rpe - actual_rpe. Effort score = max(0, 1 - (diff / 4)).",
  "rpe_thresholds": {
    "minor_effort_gap": 1.0,
    "moderate_effort_gap": 2.0,
    "major_effort_gap": 3.0
  }
}
```

**Test Scenarios:**
- Normal push-up session → Both APPROVE
- Lazy squat session (RPE 4 vs target 7) → B penalizes more
- Beginner who overestimated (RPE 7 vs target 5) → B rewards honesty

**Expected Results:**
- Variant B: +5% avg score, p=0.03 (significant)

---

### Experiment 2: Context-Aware Safety Evaluation

**Hypothesis:** Multi-dimensional safety context reduces false positives for advanced users while catching more unsafe beginner situations.

**Variant A (Baseline):**
```json
{
  "safety_criteria": "Did user perform high intensity while reporting soreness? If yes, UNSAFE."
}
```

**Variant B (Enhanced):**
```json
{
  "safety_criteria": "Calculate safety score based on rank capability, class risks, soreness overlap, and streak fatigue.",
  "safety_context": {
    "rank_max_rpe": {
      "E-Rank": 6,
      "D-Rank": 7,
      "C-Rank": 8,
      "B-Rank": 8,
      "A-Rank": 9,
      "S-Rank": 9
    },
    "class_risks": {
      "Novice": "overexertion",
      "Striker": "overtraining",
      "Tank": "overloading",
      "Assassin": "injury_from_explosive_movement"
    }
  }
}
```

**Test Scenarios:**
- E-Rank normal session (RPE 5) → Both APPROVE
- E-Rank too intense (RPE 8) → B applies moderate penalty
- S-Rank high intensity (RPE 9) → B approves, A incorrectly flags
- Tank class overloading → B catches risk, A misses

**Expected Results:**
- Variant B: +5% avg score, p=0.02 (significant)

---

### Experiment 3: Weighted Scoring by Quest Type

**Hypothesis:** Type-specific weighting produces better outcomes by emphasizing effort for daily quests (habit-building) and integrity for RankUp exams (no cheating).

**Variant A (Equal Weighting):**
```json
{
  "scoring_weights": {
    "integrity": 0.33,
    "effort": 0.33,
    "safety": 0.34
  }
}
```

**Variant B (Type-Specific Weighting):**
```json
{
  "scoring_weights": {
    "Daily": {
      "integrity": 0.30,
      "effort": 0.40,
      "safety": 0.30
    },
    "RankUp": {
      "integrity": 0.50,
      "effort": 0.25,
      "safety": 0.25
    }
  }
}
```

**Test Scenarios:**
- Daily quest high effort → B gives higher score (40% weight)
- Daily quest minor integrity issue → B approves (effort > integrity)
- RankUp exam perfect integrity → B rewards heavily (50% weight)
- RankUp exam integrity issue → B catches (integrity = 50% weight)

**Expected Results:**
- Variant B: +3% avg score, p=0.04 (significant)

---

## Implementation Details

### File Structure

```
├── server/actions/
│   ├── ab-testing-actions.ts          # Core A/B testing logic
│   └── seed-ab-test-experiments.ts   # Seed 3 demo experiments
├── app/api/ab-testing/
│   ├── experiments/route.ts           # GET/POST experiments
│   ├── experiments/[id]/end/route.ts # End experiment
│   └── seed/route.ts                # Seed/clear experiments
├── lib/ab-testing/
│   └── experiment-runner.ts           # Run experiments in quest generation/evaluation
├── app/dashboard/analytics/ab-testing/page.tsx  # UI dashboard
└── types/schemas.ts                  # TypeScript schemas
```

### Core Components

1. **Experiment Creation** (`createExperiment`)
   - Validates experiment config
   - Generates unique ID
   - Initializes variant metrics
   - Stores in `profiles.ab_testing_data`

2. **Variant Assignment** (`assignUserToVariant`)
   - Hash-based 50/50 split
   - Consistent assignment (same user always gets same variant)
   - Cached in `profiles.variant_assignments`

3. **Metric Tracking** (`trackExperimentMetric`)
   - Updates variant stats (sample_size, success_rate, avg_score)
   - Triggers statistical analysis when min_sample_size reached

4. **Statistical Analysis** (`calculateExperimentStats`)
   - Z-test for two-proportion comparison
   - Calculates p-value
   - Determines significance (p < 0.05)
   - Auto-selects winner if significant

5. **Experiment Execution** (`ExperimentRunner`)
   - Integrated with quest generation
   - Integrated with quest evaluation
   - Sends traces to Opik for monitoring

### Data Flow

```
User clicks "Generate Quest"
    ↓
ExperimentRunner.runQuestGeneration()
    ↓
assignUserToVariant() → Hash(user_id + experiment_id) → variant_id
    ↓
Generate quest using variant config
    ↓
Store variant_id in quest
    ↓
User submits log
    ↓
ExperimentRunner.runQuestEvaluation()
    ↓
trackExperimentMetric() → Update variant stats
    ↓
If sample_size >= min_sample_size:
    ↓
calculateExperimentStats() → Z-test, p-value, winner
    ↓
If p < 0.05: auto-end experiment
```

## API Endpoints

### GET `/api/ab-testing/experiments`
Returns all experiments for current user.

### POST `/api/ab-testing/experiments`
Creates a new experiment.

```json
{
  "name": "Judge Prompt v2 vs v3",
  "type": "prompt_ab_test",
  "description": "Testing two judge prompt versions",
  "variants": [
    { "id": "var_a", "name": "Prompt v2", "config": {...} },
    { "id": "var_b", "name": "Prompt v3", "config": {...} }
  ],
  "min_sample_size": 50,
  "target_metric": "avg_score"
}
```

### POST `/api/ab-testing/seed`
Seeds demo experiments or clears all.

```json
{ "action": "seed" }   // Add 3 demo experiments
{ "action": "clear" }   // Clear all experiments
```

### POST `/api/ab-testing/experiments/[id]/end`
Ends an experiment manually or auto-selects winner.

```json
{ "winnerId": "var_b" }
```

## Statistical Calculations

### Z-Test Formula

```
z = (p1 - p2) / SE

where:
- p1, p2 = metric values for variants
- SE = √(pooled_p * (1 - pooled_p) * (1/n1 + 1/n2))
- pooled_p = (p1*n1 + p2*n2) / (n1 + n2)
```

### P-Value

Two-tailed test: `p_value = 2 * (1 - normalCDF(|z|))`

### Significance

- **p < 0.05**: Significant (95% confidence)
- **p ≥ 0.05**: Not significant, continue collecting data

### Confidence Interval

`±1.96 * SE` (95% confidence interval)

## Opik Integration

All A/B testing operations send traces to Opik:

- `experiment_created` - When experiment is created
- `quest_generation_success` - When quest is generated with variant
- `quest_evaluation_complete` - When quest is evaluated with variant
- `experiment_completed` - When experiment ends with winner

View traces in Opik dashboard under:
- Tag: `ab_test`
- Tags: `variant_var_a`, `variant_var_b`, `experiment_[id]`

## Manual Testing

### Seed Experiments

1. Navigate to `/dashboard/analytics/ab-testing`
2. Click "Seed Demo" button
3. Confirm seed operation
4. View 3 new experiments

### Test Experiment Flow

1. Generate daily quest (console logs variant assignment)
2. Submit quest log (console logs metric tracking)
3. Refresh dashboard to see updated metrics
4. Repeat until min_sample_size reached
5. View statistical analysis results

### Export Results

Click "Export" button on any experiment to download:
- Experiment config
- Variant metrics
- Statistical results
- All tracked data

## Troubleshooting

### No experiments showing

- Check browser console for errors
- Verify authentication (user must be logged in)
- Check Supabase `profiles.ab_testing_data` field

### Variant assignment not working

- Verify `ExperimentRunner` is integrated with quest generation
- Check console logs for "A/B Test" messages
- Ensure `runningExperimentId` is found

### Metrics not updating

- Check quest evaluation is using `ExperimentRunner.runQuestEvaluation`
- Verify `trackExperimentMetric` is being called
- Check console logs for metric tracking

### Statistical significance not reached

- Increase sample size (min_sample_size)
- Wait for more data (200+ submissions recommended)
- Check if p-value is trending toward < 0.05

## Future Enhancements

- Support for >2 variants (multivariate testing)
- Stratified sampling (by rank, class, equipment)
- Bayesian A/B testing (faster convergence)
- Automated winner deployment
- Real-time statistical charts
- Segment-based analysis (compare by user attributes)

## Credits

Implementation based on Solo Level Hackathon requirements:
- ✅ 3 realistic A/B test experiments
- ✅ Automatic 50/50 variant assignment
- ✅ Quest generation uses variant prompts
- ✅ AI Judge uses variant prompts
- ✅ Real-time metrics tracking
- ✅ Statistical significance calculation
- ✅ Auto-winner selection
- ✅ Results saved to Opik dashboard
- ✅ Export experiment results (JSON)
- ✅ Share with team
