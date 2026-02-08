# A/B Testing Implementation & Examples

## Overview

This directory contains a complete A/B testing system for optimizing AI prompts, specifically designed for the Judge AI in the SoloLevel fitness app. The system includes realistic test scenarios that demonstrate concrete differences between prompt versions.

## Files Created

### 1. Data File
**`public/data/realistic-ab-test-examples.json`**

Contains 4 complete experiments with:
- Full prompt text for each variant (ready to copy-paste)
- 5-7 realistic test scenarios per experiment
- Expected statistical results (p-values, confidence intervals)
- Concrete workout data and evaluation results

### 2. Demo Script
**`public/demo/ab-testing-demo.js`**

Browser console script for hackathon demo:
- `loadExample(0-3)` - Load examples into form
- `listExamples()` - Show all available examples
- Auto-populates A/B testing form with realistic data

### 3. Documentation
**`AB-TESTING-DEMO-GUIDE.md`**

Complete quick-start guide with:
- 3 methods to load examples (UI, console, seed)
- Demo script for hackathon presentation
- Test scenario explanations
- Troubleshooting tips

### 4. UI Integration
**`app/dashboard/analytics/ab-testing/page.tsx`**

Updated CreateExperimentForm with:
- "Load Ex 1-4" buttons for quick loading
- Automatic form population with example data
- Error handling for loading examples

## Experiments Included

### Experiment 1: Enhanced Integrity Detection
**Hypothesis:** Specific, quantified formulas reduce false negatives while catching more cheaters

**Variant A:** Vague check ("physically impossible")
**Variant B:** Exercise-specific thresholds with formulas

**Key Scenarios:**
- Normal honest submission (both approve)
- Suspicious 40 squats in 9s (B rejects, A approves)
- Suspicious 500 push-ups in 30s (B rejects, A flags)
- Partial completion (< 50% threshold)

**Expected Results:**
- Improvement: +11.5%
- P-Value: 0.034 (significant)
- Winner: Variant B

### Experiment 2: Context-Aware Effort Scoring
**Hypothesis:** Considering user's rank/class history produces fairer effort evaluations

**Variant A:** Simple RPE delta (one-size-fits-all)
**Variant B:** Rank-aware with class context

**Key Scenarios:**
- E-Rank user exceeds expectations (B: 1.15, A: 1.2)
- C-Rank Tank class heavy squats (accounts for class)
- S-Rank elite performance (B: 1.25, A: 1.2)
- E-Rank user struggling (B: 0.85, A: 0.8 - more lenient)

**Expected Results:**
- Improvement: +8.5%
- P-Value: 0.028 (significant)
- Winner: Variant B

### Experiment 3: Exercise-Specific Integrity
**Hypothesis:** Per-exercise thresholds improve accuracy vs global 80/min rule

**Variant A:** Global 80 reps/min rule
**Variant B:** Exercise-specific (pull-ups 40/min, burpees 30/min, etc.)

**Key Scenarios:**
- Suspicious 100 pull-ups in 3 min (B catches, A misses)
- Fast crunches 150 in 2 min (A suspicious, B approves - correct)
- Slow strength training (both approve correctly)
- Suspicious 150 burpees in 2 min (B catches, A misses)

**Expected Results:**
- Improvement: +21.3%
- P-Value: 0.015 (significant)
- Winner: Variant B

### Experiment 4: Safety-Aware Evaluation
**Hypothesis:** Explicit safety rules prevent injury-risk scenarios

**Variant A:** No safety check (always 1.0)
**Variant B:** Comprehensive safety (soreness + intensity + exercise type)

**Key Scenarios:**
- High intensity burpees with mild leg soreness (B flags, A ignores)
- Moderate soreness, normal intensity (both approve, B: 0.8)
- Heavy squats with severe knee pain (B rejects, A approves - dangerous!)

**Expected Results:**
- P-Value: 0.45 (not significant)
- Note: Safety-first approach may lower scores but protects users

## How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│          A/B Testing Dashboard UI                     │
│  (app/dashboard/analytics/ab-testing/page.tsx)        │
└─────────────────────────────────────────────────────────┘
                         │
                         ├─► Load Example Buttons
                         │   (Ex 1-4)
                         │
                         └─► Create Experiment
                             │
                             ▼
                    ┌────────────────┐
                    │  API Route   │
                    │  /api/ab-   │
                    │  testing/... │
                    └────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Database     │
                    │  (experiments)│
                    └────────────────┘
```

### Data Flow

1. **Load Examples** → Read from `public/data/realistic-ab-test-examples.json`
2. **Populate Form** → Fill React state with example data
3. **Submit Experiment** → POST to `/api/ab-testing/experiments`
4. **Store in DB** → Save experiment config to database
5. **Run Evaluations** → Use Judge AI with different prompts
6. **Calculate Stats** → Compute p-value, significance, winner
7. **Display Results** → Show metrics in ExperimentDetail modal

### Scoring Logic

The test scenarios simulate the Judge AI evaluation:

```
integrity_score × effort_score × safety_score = final_score
```

Each score is 0.0-1.0 based on:
- **Integrity**: Timing, completion rate, realistic rep counts
- **Effort**: RPE delta compared to target
- **Safety**: Soreness, intensity, exercise type

## Using the Examples

### Quick Start (Method 1: UI Buttons)

1. Navigate to `/dashboard/analytics/ab-testing`
2. Click "New Experiment"
3. Click "Load Ex 1" (or 2, 3, 4)
4. Review the populated form
5. Click "Create Experiment"
6. View results by clicking experiment card

### Demo Script (Method 2: Console)

1. Navigate to `/dashboard/analytics/ab-testing`
2. Click "New Experiment"
3. Open browser console (F12)
4. Paste and run:

```javascript
const script = document.createElement('script');
script.src = '/demo/ab-testing-demo.js';
document.head.appendChild(script);
```

5. Run: `listExamples()` to see all options
6. Run: `loadExample(0)` to load first example
7. Click "Create Experiment"

### Seed Demo (Method 3: One-Click)

1. Navigate to `/dashboard/analytics/ab-testing`
2. Click "Seed Demo" (purple button)
3. View the 3 auto-created experiments

## Technical Details

### JSON Schema

Each experiment follows this structure:

```json
{
  "id": "string",
  "name": "string",
  "type": "prompt_ab_test",
  "description": "string",
  "min_sample_size": 50,
  "target_metric": "avg_score",
  "variants": [
    {
      "id": "var_a",
      "name": "Variant A Name",
      "config": {
        "prompt": "Full prompt text here..."
      }
    },
    {
      "id": "var_b",
      "name": "Variant B Name",
      "config": {
        "prompt": "Full prompt text here..."
      }
    }
  ],
  "test_scenarios": [...],
  "expected_results": {...}
}
```

### Test Scenario Format

Each scenario includes:

```json
{
  "name": "Scenario Name",
  "quest": {
    "quest_name": "Name",
    "exercises": [...]
  },
  "submission": {
    "exercises_completed": [...],
    "rpe_actual": number,
    "duration_actual": number,
    "muscle_soreness": "string"
  },
  "variant_a_result": {
    "status": "APPROVED",
    "integrity_score": 1.0,
    "effort_score": 1.0,
    "safety_score": 1.0,
    "reasoning": "Explanation"
  },
  "variant_b_result": {...},
  "difference": "What changed"
}
```

### Statistical Analysis

The expected results use these metrics:

- **total_runs**: Number of test evaluations
- **success_rate**: Percentage of approvals
- **avg_score**: Mean final score (integrity × effort × safety)
- **avg_time_ms**: Average evaluation time
- **p_value**: Statistical significance (t-test)
- **is_significant**: true if p < 0.05
- **improvement_delta**: Winner improvement over loser
- **winner_id**: Which variant won

## Customization

### Adding New Experiments

1. Edit `public/data/realistic-ab-test-examples.json`
2. Add new experiment to the `experiments` array
3. Include 5-7 test scenarios
4. Add expected statistical results
5. Update the "Load Example" buttons in UI (optional)

### Modifying Existing Experiments

1. Open `public/data/realistic-ab-test-examples.json`
2. Find the experiment by ID
3. Edit variants, scenarios, or expected results
4. Save the file

### Creating Custom Scenarios

Follow this template:

```json
{
  "name": "Your Scenario Name",
  "quest": {
    "quest_name": "Quest Name",
    "quest_rank": "C-Rank",
    "target_class": "Striker",
    "exercises": [
      {
        "name": "Exercise Name",
        "sets": number,
        "reps": "string",
        "rpe_target": number
      }
    ]
  },
  "submission": {
    "exercises_completed": [
      {
        "name": "Exercise Name",
        "sets_done": number,
        "reps_done": "string"
      }
    ],
    "rpe_actual": number,
    "duration_actual": number,
    "muscle_soreness": "None | Mild | Moderate | Severe"
  },
  "variant_a_result": {
    "status": "APPROVED | REJECTED | FLAGGED",
    "integrity_score": 0.0-1.0,
    "effort_score": 0.0-1.0,
    "safety_score": 0.0-1.0,
    "reasoning": "Explanation of result"
  },
  "variant_b_result": {...},
  "difference": "What's different between A and B"
}
```

## Integration Points

### Database

Experiments are stored in the `experiments` table with columns matching `ExperimentSchema` from `types/schemas.ts`.

### API Routes

- `GET /api/ab-testing/experiments` - List all experiments
- `POST /api/ab-testing/experiments` - Create new experiment
- `POST /api/ab-testing/experiments/{id}/end` - End experiment and finalize results

### UI Components

- **CreateExperimentForm**: Form with "Load Example" buttons
- **ExperimentCard**: Display experiment in list
- **ExperimentDetail**: Show detailed metrics and variant comparison

## Future Enhancements

1. **Architect Prompt Experiments** - Test quest generation prompts
2. **More Variants** - Support 3-4 variants per experiment
3. **Real-time Stats** - Live updates as evaluations run
4. **Visualization** - Charts showing score distributions
5. **Export/Import** - Save and load experiment configurations
6. **Auto-seed** - One-button setup for hackathon
7. **Scenario Builder** - UI for creating test scenarios

## Testing

### Manual Testing

1. Load each example using all 3 methods
2. Verify form populates correctly
3. Create experiment and view results
4. Check statistical calculations
5. Export experiment data

### Automated Testing

```bash
# Run A/B test suite
npm run test:ab-testing
```

## Troubleshooting

### Examples Don't Load
- Check file path: `public/data/realistic-ab-test-examples.json`
- Verify JSON syntax (use JSON validator)
- Check browser console for errors

### Form Validation Fails
- Ensure prompt text is valid JSON
- Check all required fields are filled
- Verify variant configs are valid JSON objects

### Stats Look Wrong
- Verify p-value < 0.05 for significance
- Check sample sizes (min 50 recommended)
- Ensure winner has better score than loser

### Demo Script Errors
- Make sure you're on the A/B testing page
- Check that `/demo/ab-testing-demo.js` exists
- Verify browser allows inline scripts

## References

- **Prompts**: `lib/ai/prompts.ts`
- **Schemas**: `types/schemas.ts`
- **UI**: `app/dashboard/analytics/ab-testing/page.tsx`
- **Demo Guide**: `AB-TESTING-DEMO-GUIDE.md`

## Credits

Created for SoloLevel Hackathon Demo
Demonstrates A/B testing for AI prompt optimization in fitness app

---

**Ready to demo! 🚀**
