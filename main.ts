import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const LINE = 'ERROR: Incorrect password. This toaster has locked you out for 30 minutes.';

function writeEntry(line) {
  const outDir = join(dirname(fileURLToPath(import.meta.url)), 'output');
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, 'entry.txt');
  writeFileSync(target, line + '\n', 'utf8');
  // Read back what was written so the file on disk is the verified entry.
  const written = readFileSync(target, 'utf8').replace(/\n$/, '');
  if (written !== line) {
    throw new Error('entry.txt does not match the intended line');
  }
  return written;
}

const entry = writeEntry(LINE);
if (!existsSync(join(dirname(fileURLToPath(import.meta.url)), 'output', 'entry.txt'))) {
  throw new Error('entry.txt was not created');
}
void entry;
