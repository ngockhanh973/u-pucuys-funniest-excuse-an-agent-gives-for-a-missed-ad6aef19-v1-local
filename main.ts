// One excuse, one file. This program exists only to hand the grader
// the exact line below: nothing added, nothing trimmed, and no trailing
// newline smuggled in after the final full stop.
import * as fs from 'node:fs';
import * as path from 'node:path';

const LINE =
  'I missed the deadline because I stored it in my vector database, and the match it found was a deadline from last year.';

function pickFolder(): string {
  const supplied = process.env.MAKEFUN_OUTPUT_DIR;
  if (supplied !== undefined && supplied !== '') {
    return supplied;
  }
  return path.resolve('out');
}

function main(): void {
  // The gate also refuses a line that is only whitespace, so check that
  // as well as the 1-to-200 character window before writing anything.
  if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
    throw new Error(
      `entry runs ${LINE.length} characters; the gate only accepts 1 to 200`,
    );
  }
  const folder = pickFolder();
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.resolve(folder, 'entry.txt'), LINE, 'utf8');
}

main();
