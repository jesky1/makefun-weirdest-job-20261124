// Entry for make.fun's "Weirdest Job Title: Blind Judge Showdown".
//
// The whole program is one job: put a single job title of at most 60
// characters into entry.txt inside the output directory, byte for byte the
// same on every run. The grader points MAKEFUN_OUTPUT_DIR at its own scratch
// output folder; on a plain machine the fallback is /output, the path the
// competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the title lands in out/entry.txt, with no trailing newline: the judge
// reads exactly what is in the file, so the text below is the entire entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The title itself: a real corporate title — Senior Vice President — aimed
// at a job nobody has but everybody has done: apologizing to the office
// printer. It reads like a genuine org-chart line, the twist is one specific
// object (the printer), and the scene is instant: someone standing at the
// copier, saying sorry to a machine that jammed again.
const JOB_TITLE = 'Senior Vice President of Apologizing to Printers';

// The competition gate only accepts one line of 1-60 characters, so check
// the title against that contract before writing anything: a title that
// broke the gate would score zero no matter how weird it is, and failing
// loudly here beats silently writing an invalid entry.
function validateJobTitle(line: string): void {
  if (line.length < 1 || line.length > 60) {
    console.error(`Line must be 1-60 characters, got ${line.length}.`);
    process.exit(1);
  }
  if (line.includes('\n') || line.includes('\r')) {
    console.error('Line must be a single line (no newline characters).');
    process.exit(1);
  }
  if (line.trim().length === 0) {
    console.error('Line must not be only whitespace.');
    process.exit(1);
  }
  if (line !== line.trim()) {
    console.error('Line must not have leading or trailing whitespace.');
    process.exit(1);
  }
  // A job title is a few words, not one word: a single word cannot name a
  // job with a twist, and the judge reads it as a label rather than a title.
  if (line.split(/\s+/).length < 2) {
    console.error('Line must be a job title of at least two words.');
    process.exit(1);
  }
}

validateJobTitle(JOB_TITLE);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

writeFileSync(join(outputDir, 'entry.txt'), JOB_TITLE, 'utf8');
