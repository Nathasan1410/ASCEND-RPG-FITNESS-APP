#!/usr/bin/env python3
import re

with open('D:\\Projekan\\OpikAI-SoloLevel\\scripts\\test-opik-direct.js', 'r') as f:
    content = f.read()

# Fix line 121 and 156 - replace wrong quote pattern
fixed = re.sub(
    r"logSuccess\('✓ Trace ID: \${testTrace\.data\?\.id \|\| 'N/A'}`\);",
    "logSuccess(`✓ Trace ID: ${testTrace.data?.id || 'N/A'}`);",
    content
)

with open('D:\\Projekan\\OpikAI-SoloLevel\\scripts\\test-opik-direct.js', 'w') as f:
    f.write(fixed)

print("Fixed syntax errors in test-opik-direct.js")
