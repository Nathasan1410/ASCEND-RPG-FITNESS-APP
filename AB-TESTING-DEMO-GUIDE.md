# A/B Testing Demo - Quick Start Guide

## Overview

This guide shows you how to use the realistic A/B test examples to demonstrate the Judge AI prompt optimization system. The examples show specific differences between prompt versions with concrete workout scenarios and expected results.

## What You'll See

The demo includes **4 experiments** that test different aspects of Judge AI:

1. **Enhanced Integrity Detection** - Shows how exercise-specific thresholds catch cheaters
2. **Context-Aware Effort Scoring** - Demonstrates rank/class-aware effort evaluation
3. **Exercise-Specific Integrity** - Compares global rules vs exercise-specific limits
4. **Safety-Aware Evaluation** - Tests comprehensive safety logic vs no safety check

Each experiment has **5-7 realistic test scenarios** with:
- Concrete workout data (exercises, sets, reps, duration)
- Expected results for both variants
- Clear explanation of differences
- Statistical outcomes (p-values, confidence intervals)

## Method 1: Load Examples via UI (Easiest)

### Step 1: Navigate to A/B Testing Page
```
http://localhost:3000/dashboard/analytics/ab-testing
```

### Step 2: Create New Experiment
Click the **"New Experiment"** button

### Step 3: Load Example Data
In the form header, you'll see 4 buttons labeled **"Load Ex 1"** through **"Load Ex 4"**:
- **Load Ex 1**: Enhanced Integrity Detection
- **Load Ex 2**: Context-Aware Effort Scoring
- **Load Ex 3**: Exercise-Specific Integrity
- **Load Ex 4**: Safety-Aware Evaluation

Click any button to automatically populate the form with realistic experiment data.

### Step 4: Review the Form
The form will now show:
- Experiment name and description
- Type (Prompt A/B Test)
- Variant A and B names
- **Complete prompt text** for both variants
- Full JSON configuration

### Step 5: Create Experiment
Click **"Create Experiment"** to add it to your dashboard.

### Step 6: View Experiment
Click on the experiment card to see:
- Total runs and sample sizes
- Statistical significance and p-value
- Improvement percentage
- Variant comparison with winner highlighted

## Method 2: Use Browser Console (For Hackathon Demo)

### Step 1: Open the A/B Testing Page
```
http://localhost:3000/dashboard/analytics/ab-testing
```

### Step 2: Click "New Experiment"
This opens the form modal

### Step 3: Load Demo Script
Open browser console (F12) and paste:

```javascript
// Load the demo script
const script = document.createElement('script');
script.src = '/demo/ab-testing-demo.js';
document.head.appendChild(script);
```

### Step 4: List Available Examples
In console, run:
```javascript
listExamples()
```

This will show all 4 experiments with descriptions.

### Step 5: Load an Example
In console, run:
```javascript
loadExample(0)  // Load Enhanced Integrity Detection
loadExample(1)  // Load Context-Aware Effort
loadExample(2)  // Load Exercise-Specific Integrity
loadExample(3)  // Load Safety-Aware Evaluation
```

The console will show:
- ✅ Confirmation that example was loaded
- 📊 Expected statistical results
- 🔬 Preview of all test scenarios
- 📝 Form ready message

### Step 6: Review and Submit
Review the populated form, then click **"Create Experiment"**.

## Method 3: Seed Demo Experiments (Quick Setup)

### Step 1: Navigate to A/B Testing Page
```
http://localhost:3000/dashboard/analytics/ab-testing
```

### Step 2: Seed Demo Experiments
Click the **"Seed Demo"** button (purple button next to "New Experiment")

This will automatically create **3 demo experiments** with realistic data.

### Step 3: View Experiments
Click on any experiment card to see:
- Detailed metrics and results
- Variant comparison
- Winner highlighted
- Statistical significance

## Understanding the Test Scenarios

Each experiment includes **5-7 realistic test scenarios** that show concrete differences between variants. Here's how to interpret them:

### Scenario Types

1. **Normal/Honest** - Both variants approve equally
   - Shows baseline behavior
   - No cheating or unusual patterns

2. **Suspicious** - Variant B catches, Variant A misses
   - Demonstrates superior cheating detection
   - Shows why the new prompt is better

3. **False Positive** - Variant A flags honest user, Variant B approves
   - Shows fairness improvements
   - Reduces incorrect rejections

4. **Safety Risk** - Variant B catches injury patterns, Variant A ignores
   - Demonstrates safety features
   - Protects users from injury

5. **Edge Case** - Unusual data that exposes ambiguity
   - Shows robust handling
   - Tests edge cases

### Example Scenario Breakdown

Here's an example from the **Enhanced Integrity Detection** experiment:

**Scenario: Suspicious World Record Pace**

**Quest:** C-Rank Squat Protocol (5 sets of 8 reps)

**Submission:** Claims 40 squats in 9 seconds

**Variant A (Vague Check):**
- Status: APPROVED
- Integrity Score: 0.9
- Reasoning: "Vague 'physically impossible' check - 9 seconds might be interpreted as a fast warm-up set"

**Variant B (Exercise-Specific Limits):**
- Status: REJECTED
- Integrity Score: 0.0
- Reasoning: "Expected: 30.8s, Actual: 9s = 0.29× expected < 0.3 threshold → PHYSICALLY IMPOSSIBLE"

**Difference:** "Variant B REJECTS (catches cheater), Variant A APPROVES (misses it)"

### Key Takeaways

- **Specific thresholds catch cheaters** that vague checks miss
- **Exercise-specific formulas** are more accurate than global rules
- **Statistical significance** shows real improvement (p < 0.05)
- **Clear reasoning** helps understand why decisions differ

## Demo Script for Hackathon Presentation

Use this script to walk judges through the demo:

```
1. "Let me show you our A/B testing system for optimizing AI prompts."

2. "I'll load a real example that tests our Judge AI's integrity detection."

3. [Click "New Experiment" then "Load Ex 1"]

4. "This experiment compares two versions of our Judge prompt.
    Variant A uses a vague 'physically impossible' check.
    Variant B uses exercise-specific formulas with concrete thresholds."

5. "Let me show you the test scenarios that demonstrate the difference."

6. [Open the JSON examples file or use console to show scenarios]

7. "Here's a suspicious scenario: 40 squats in 9 seconds.
    Variant A (vague) APPROVES this because it doesn't have specific numbers.
    Variant B (with formulas) REJECTS this because it knows
    squats take about 30 seconds, and 9 is only 29% of expected - impossible."

8. "This shows why specific, quantified prompts are more effective at catching cheaters."

9. [Click "Create Experiment" then show the experiment card]

10. "The expected results show a 11.5% improvement with statistical significance
    (p = 0.034), confirming Variant B is superior."

11. "We have 4 experiments total testing integrity, effort, and safety scoring.
    All use realistic workout data and show concrete improvements."
```

## Statistical Metrics Explained

### P-Value
- **p < 0.05**: Statistically significant (real improvement)
- **p ≥ 0.05**: Not significant (could be random chance)

### Improvement Delta
- Percentage improvement of winner over loser
- Example: +0.115 = 11.5% better score

### Success Rate
- Percentage of evaluations that approve valid submissions
- Higher is better (less false rejections)

### Average Score
- Combined metric: integrity × effort × safety
- Closer to 1.0 is better

### Sample Size
- Number of test evaluations run
- Larger samples = more reliable results

## Troubleshooting

### "Load Example" buttons don't work
- Make sure the data file exists: `public/data/realistic-ab-test-examples.json`
- Check browser console for errors (F12)

### Demo script doesn't load
- Verify you're on the A/B testing page
- Check that `/demo/ab-testing-demo.js` file exists

### "Seed Demo" button fails
- Check if the seed API route exists: `app/api/ab-testing/seed/route.ts`
- Verify database connection

### Form validation errors
- Ensure JSON is valid (no trailing commas, proper quotes)
- Check that all required fields are filled

## Next Steps

After the demo:

1. **Review Test Scenarios** - Examine all scenarios in the JSON file
2. **Analyze Results** - Compare expected vs actual results
3. **Modify Experiments** - Edit prompts and create new tests
4. **Run Real Experiments** - Test with actual user data
5. **Iterate** - Use insights to improve prompts

## Files Reference

- **Data**: `public/data/realistic-ab-test-examples.json`
- **Demo Script**: `public/demo/ab-testing-demo.js`
- **UI**: `app/dashboard/analytics/ab-testing/page.tsx`
- **Prompts**: `lib/ai/prompts.ts`
- **Schemas**: `types/schemas.ts`

## Questions?

For questions or issues, refer to:
- **Codebase**: Main project directory
- **Prompt Examples**: See the JSON file for complete prompt text
- **Test Scenarios**: All scenarios with expected results are documented

---

**Good luck with the hackathon demo! 🚀**
