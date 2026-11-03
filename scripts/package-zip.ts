import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createZip } from '../src/utils/zip';

const DIST = path.resolve('dist');
const OUT = path.resolve('/home/user/securitysolutionsdubai-static-preview.zip');
const FOLDER = 'securitysolutionsdubai/';

async function walk(dir: string, base: string): Promise<string[]> {
  const out: string[] = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full, base + entry.name + '/'));
    else out.push(base + entry.name);
  }
  return out;
}

async function main() {
  const files = await walk(DIST, '');
  const entries = await Promise.all(
    files.map(async (rel) => ({
      path: FOLDER + rel,
      data: new Uint8Array(await fs.readFile(path.join(DIST, rel))),
    })),
  );
  const blob = createZip(entries);
  const buf = Buffer.from(await blob.arrayBuffer());
  await fs.writeFile(OUT, buf);
  const mb = (buf.length / 1024 / 1024).toFixed(2);
  console.log(`ZIP written: ${path.relative(process.cwd(), OUT)} (${files.length} files, ${mb} MB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
