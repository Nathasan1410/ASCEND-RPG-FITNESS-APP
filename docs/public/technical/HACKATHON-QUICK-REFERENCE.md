# 🎯 Hackathon Quick Reference - A/B Testing Demo

## Quick Commands

### Load Examples (UI)
1. `/dashboard/analytics/ab-testing`
2. Click "New Experiment"
3. Click "Load Ex 1-4"
4. Click "Create Experiment"

### Load Examples (Console)
```javascript
// Paste in browser console
const script = document.createElement('script');
script.src = '/demo/ab-testing-demo.js';
document.head.appendChild(script);

// List examples
listExamples()

// Load specific example
loadExample(0) // Enhanced Integrity
loadExample(1) // Context-Aware Effort
loadExample(2) // Exercise-Specific
loadExample(3) // Safety-Aware
```

## 4 Experiments Summary

| # | Experiment | Variant A | Variant B | Improvement | Key Win |
|---|-------------|-----------|-----------|--------------|----------|
| 1 | Enhanced Integrity | Vague check | Specific formulas | +11.5% | Catches 40 squats in 9s |
| 2 | Context-Aware Effort | Simple RPE delta | Rank + class aware | +8.5% | More lenient for beginners |
| 3 | Exercise-Specific | Global 80/min rule | Per-exercise limits | +21.3% | Catches 100 pull-ups in 3 min |
| 4 | Safety-Aware | No safety check | Soreness + intensity | N/A | Prevents dangerous heavy squats |

## 2-Minute Demo Script

```
"This is our A/B testing system for optimizing AI prompts."

[Click "New Experiment" → "Load Ex 1"]

"We're testing our Judge AI - it evaluates user workout submissions.
 Variant A uses vague checks like 'physically impossible'.
 Variant B uses specific formulas like 'squats take 30 seconds'."

"Here's a suspicious case: 40 squats in 9 seconds.
 Variant A APPROVES because it's vague.
 Variant B REJECTS because it knows squats need 30 seconds
 and 9 is only 29% of expected - impossible!"

"The results show a 11.5% improvement with statistical significance,
 confirming specific formulas work better."

"We have 4 experiments testing integrity, effort, and safety.
 All use real workout data and show concrete improvements."
```

## Key Talking Points

### Why Specific Prompts Matter
- **Vague**: "If physically impossible..." → Misses edge cases
- **Specific**: "Squats: expected = (reps÷50) + (sets×6)" → Catches cheaters

### Realistic Scenarios
- **23 total scenarios** across 4 experiments
- **Concrete data**: Sets, reps, RPE, duration, soreness
- **Clear outcomes**: APPROVED, REJECTED, FLAGGED with reasoning

### Statistical Proof
- **P-values**: All significant except safety (p < 0.05)
- **Confidence**: Results aren't random chance
- **Improvement**: 8-21% better scoring

### Fairness & Safety
- **Context-aware**: Considers rank and class
- **Beginner-friendly**: More lenient for E-Rank users
- **Injury prevention**: Flags dangerous patterns

## Troubleshooting

### Buttons Don't Work
- Check: `public/data/realistic-ab-test-examples.json` exists
- Check: Browser console for errors (F12)

### Console Script Fails
- Make sure you're on the A/B testing page
- Check: `/demo/ab-testing-demo.js` exists

### JSON Validation Error
- Check for trailing commas
- Ensure quotes are double quotes: `"key": "value"`
- Use JSON validator if needed

## File Locations

```
public/data/realistic-ab-test-examples.json  (44KB)
public/demo/ab-testing-demo.js               (5KB)
app/dashboard/analytics/ab-testing/page.tsx    (updated)
AB-TESTING-README.md                         (12KB)
AB-TESTING-DEMO-GUIDE.md                     (9KB)
```

## Expected Demo Flow

1. **Setup** (30s)
   - Navigate to `/dashboard/analytics/ab-testing`
   - Click "New Experiment"

2. **Load Example** (15s)
   - Click "Load Ex 1"
   - Briefly scroll through prompt text

3. **Explain Scenario** (45s)
   - Explain the suspicious scenario
   - Show why A fails and B succeeds

4. **Create & View** (30s)
   - Click "Create Experiment"
   - Show experiment card with stats

5. **Wrap Up** (30s)
   - Mention 4 experiments total
   - Highlight key improvements

**Total: ~2.5 minutes per experiment**

## Backup Options

### If UI Buttons Fail
- Use console script (Method 2)
- Or manually copy JSON from file

### If Database Fails
- Show the JSON file directly
- Explain the structure and scenarios

### If Internet Down
- Everything works offline after initial load
- Data files are static in public/

## Success Metrics

✅ **4 experiments** with complete prompts
✅ **23 realistic scenarios** with workout data
✅ **3 loading methods** (UI, console, seed)
✅ **Statistical proof** (p-values, significance)
✅ **Clear differences** between variants
✅ **Ready for hackathon** (2-3 min demo)

---

## Quick Reference: Scenario Types

| Type | Description | What It Shows |
|------|-------------|---------------|
| Normal | Both approve | Baseline behavior |
| Suspicious | B catches, A misses | Superior cheating detection |
| False Positive | A flags, B approves | Fairness improvements |
| Safety Risk | B catches, A ignores | Injury prevention |
| Edge Case | Unusual data | Robust handling |

---

**🎤 Good luck with the demo!**

Remember: The key is showing **concrete differences** with **real numbers**.
Don't just explain - **show the data**.
