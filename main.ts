// Writes the single-line excuse to the grader's output folder.
//
// The line itself is kept here as one literal so the program has no
// other input to read: what it prints is exactly what is in this file,
// byte for byte, on every run. The output directory comes from the
// harness when it is set, and a local folder is used only as a fallback
// for a manual run.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const excuse =
  'I missed the deadline because I compacted my context window to save tokens, and the deadline was the one detail the summary decided was not important enough to keep.';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(import.meta.dirname, 'out');

// The gate caps the line at 200 characters; refuse to write anything
// longer rather than silently shipping a line the scorer would reject.
if (excuse.length > 200 || excuse.trim().length === 0) {
  throw new Error(`excuse is ${excuse.length} chars, outside the 1-200 range`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), excuse, 'utf8');
