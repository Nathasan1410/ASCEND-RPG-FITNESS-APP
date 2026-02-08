/**
 * Demo script for hackathon - auto-populates A/B testing form with realistic examples
 *
 * Usage:
 * 1. Open browser console on /dashboard/analytics/ab-testing page
 * 2. Paste this entire script
 * 3. Run: loadExample(0) to load first experiment, loadExample(1) for second, etc.
 * 4. Click "Create Experiment" to submit
 */

// Fetch examples from public data
async function loadExamples() {
  try {
    const response = await fetch('/data/realistic-ab-test-examples.json');
    const data = await response.json();
    return data.experiments;
  } catch (error) {
    console.error('Failed to load examples:', error);
    return [];
  }
}

/**
 * Load an example experiment into the form
 * @param {number} index - Index of experiment to load (0-3)
 */
async function loadExample(index) {
  const examples = await loadExamples();
  
  if (index < 0 || index >= examples.length) {
    console.error(`Invalid index ${index}. Available indices: 0-${examples.length - 1}`);
    return;
  }
  
  const example = examples[index];
  
  // Find form elements
  const nameInput = document.querySelector('input[placeholder="e.g., Judge Prompt v2 vs v3"]');
  const typeSelect = document.querySelector('select');
  const descTextarea = document.querySelector('textarea[placeholder="What are you testing?"]');
  
  // Find variant inputs
  const variantANameInput = document.querySelectorAll('input[type="text"]')[1];
  const variantAConfigTextarea = document.querySelectorAll('textarea')[1];
  const variantBNameInput = document.querySelectorAll('input[type="text"]')[2];
  const variantBConfigTextarea = document.querySelectorAll('textarea')[2];
  
  if (!nameInput || !typeSelect || !descTextarea) {
    console.error('Could not find form elements. Make sure you\'re on the /dashboard/analytics/ab-testing page and clicked "New Experiment"');
    return;
  }
  
  // Populate form
  nameInput.value = example.name;
  typeSelect.value = example.type;
  descTextarea.value = example.description;
  
  // Populate Variant A
  variantANameInput.value = example.variants[0].name;
  variantAConfigTextarea.value = JSON.stringify(example.variants[0].config, null, 2);
  
  // Populate Variant B
  variantBNameInput.value = example.variants[1].name;
  variantBConfigTextarea.value = JSON.stringify(example.variants[1].config, null, 2);
  
  // Trigger change events to update React state
  nameInput.dispatchEvent(new Event('input', { bubbles: true }));
  typeSelect.dispatchEvent(new Event('change', { bubbles: true }));
  descTextarea.dispatchEvent(new Event('input', { bubbles: true }));
  variantANameInput.dispatchEvent(new Event('input', { bubbles: true }));
  variantAConfigTextarea.dispatchEvent(new Event('input', { bubbles: true }));
  variantBNameInput.dispatchEvent(new Event('input', { bubbles: true }));
  variantBConfigTextarea.dispatchEvent(new Event('input', { bubbles: true }));
  
  console.log(`✅ Loaded example: "${example.name}"`);
  console.log(`📊 Expected results:`, example.expected_results);
  console.log(`🔬 Test scenarios: ${example.test_scenarios.length} scenarios`);
  console.log('\nPreview of scenarios:');
  example.test_scenarios.forEach((scenario, i) => {
    console.log(`${i + 1}. ${scenario.name}`);
    console.log(`   Variant A: ${scenario.variant_a_result.status} (integrity: ${scenario.variant_a_result.integrity_score})`);
    console.log(`   Variant B: ${scenario.variant_b_result.status} (integrity: ${scenario.variant_b_result.integrity_score})`);
    console.log(`   Difference: ${scenario.difference}`);
  });
  console.log('\n✍️ Form is ready! Review and click "Create Experiment"');
}

/**
 * List all available examples
 */
async function listExamples() {
  const examples = await loadExamples();
  console.log('📋 Available Examples:');
  examples.forEach((example, index) => {
    console.log(`${index}. ${example.name}`);
    console.log(`   ${example.description}`);
    console.log(`   Type: ${example.type}`);
    console.log(`   Scenarios: ${example.test_scenarios.length}`);
    console.log('');
  });
}

// Export functions for easy access
window.loadExample = loadExample;
window.listExamples = listExamples;

console.log('🚀 A/B Test Demo Script Loaded!');
console.log('📖 Usage:');
console.log('   - listExamples() - List all available examples');
console.log('   - loadExample(0) - Load first example (Enhanced Integrity Detection)');
console.log('   - loadExample(1) - Load second example (Context-Aware Effort)');
console.log('   - loadExample(2) - Load third example (Exercise-Specific Integrity)');
console.log('   - loadExample(3) - Load fourth example (Safety-Aware Evaluation)');
console.log('');
console.log('📝 Steps:');
console.log('   1. Navigate to /dashboard/analytics/ab-testing');
console.log('   2. Click "New Experiment" button');
console.log('   3. Run loadExample(0) in console');
console.log('   4. Review the populated form');
console.log('   5. Click "Create Experiment"');
console.log('');
