#!/usr/bin/env node
/**
 * PHP syntax linter using @php-wasm/node (PHP 8.1 in wasm).
 * Parse errors => FAIL. Runtime errors (undefined WP funcs) => OK (it parsed).
 * Usage: node scripts/php-lint.mjs <path> [path...]
 */
import { PHP, PHPExecutionFailureError } from '@php-wasm/universal';
import { loadNodeRuntime } from '@php-wasm/node';
import { readFileSync, readdirSync, statSync } from 'fs';
import { argv, exit, cwd, chdir } from 'process';

const ORIG_CWD = cwd();

function collect(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === '.git' || entry === 'node_modules') continue;
    const p = dir + '/' + entry;
    const st = statSync(p);
    if (st.isDirectory()) collect(p, out);
    else if (p.endsWith('.php')) out.push(p);
  }
  return out;
}

const roots = argv.slice(2).map(r => r.startsWith('/') ? r : ORIG_CWD + '/' + r);
const files = [];
for (const r of roots) {
  const st = statSync(r);
  if (st.isDirectory()) files.push(...collect(r));
  else if (r.endsWith('.php')) files.push(r);
}

// wasm path resolves relative to cwd — move into the asyncify build dir.
chdir(new URL('../node_modules/@php-wasm/node-8-1/asyncify', import.meta.url).pathname);
const runtimeId = await loadNodeRuntime('8.1', { emscriptenOptions: { processId: 42 } });
const php = new PHP(runtimeId);

let failed = 0;
for (const f of files) {
  const code = readFileSync(f, 'utf8');
  try {
    await php.run({ code: 'define("ABSPATH","/tmp/");\n' + code });
    console.log('OK   ' + f);
  } catch (e) {
    const msg = String((e && e.message) || e);
    if (/parse error|syntax error/i.test(msg)) {
      failed++;
      console.log('FAIL ' + f);
      console.log(msg.slice(0, 800));
    } else if (e instanceof PHPExecutionFailureError) {
      // Runtime failure only — file parsed successfully.
      console.log('OK   ' + f + '  (runtime note: ' + msg.split('\n')[0].slice(0, 120) + ')');
    } else {
      console.log('OK   ' + f + '  (note: ' + msg.split('\n')[0].slice(0, 120) + ')');
    }
  }
}
exit(failed ? 1 : 0);
