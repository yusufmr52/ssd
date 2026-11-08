#!/usr/bin/env node
/**
 * Mini WPBakery template renderer — validates template JSON structure by
 * emitting HTML the way WPBakery would (row/column/text_block/image/
 * button/custom_html/posts_grid/thegem_* elements only).
 * Usage: node scripts/render-wpbakery.mjs <template.json> <out.html>
 */
import { readFileSync, writeFileSync } from 'fs';

const file = process.argv[2];
const out = process.argv[3];
const tpl = JSON.parse(readFileSync(file, 'utf8'));

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderEl(el) {
  const type = el.type;
  const attrs = el.attrs || {};
  const elClass = attrs.el_class || '';
  const cls = (base) => base + (elClass ? ' ' + elClass : '');

  switch (type) {
    case 'row': {
      const inner = (el.content || []).map(renderEl).join('\n');
      return `<div class="${esc(cls('vc_row'))}">\n${inner}\n</div>`;
    }
    case 'column': {
      const inner = (el.content || []).map(renderEl).join('\n');
      const w = attrs.width || '1/1';
      return `<div class="${esc(cls('vc_column'))}" style="width:${esc(w)}">\n<div class="${esc(cls('vc_column-inner'))}">\n${inner}\n</div>\n</div>`;
    }
    case 'text_block': {
      return `<div class="${esc(cls('vc_text_block'))}">${el.content || ''}</div>`;
    }
    case 'image': {
      const url = attrs.image || '';
      const alt = attrs.alt || '';
      return `<div class="${esc(cls('vc_single_image'))}">${url ? `<img src="${esc(url)}" alt="${esc(alt)}" loading="lazy" decoding="async">` : ''}</div>`;
    }
    case 'button': {
      return `<div class="${esc(cls('vc_button_wrap'))}"><a class="${esc(cls('vc_btn'))}" href="${esc(attrs.link || '#')}">${esc(attrs.text || '')}</a></div>`;
    }
    case 'custom_html': {
      return `<div class="${esc(cls('vc_custom_html'))}">${attrs.html || ''}</div>`;
    }
    case 'posts_grid': {
      return `<div class="${esc(cls('vc_posts_grid'))}" data-source="${esc(attrs.source || '')}" data-per-page="${esc(attrs.posts_per_page || '')}"><!-- WP post grid (dynamic) --></div>`;
    }
    case 'thegem_breadcrumbs':
      return `<div class="thegem_breadcrumbs"></div>`;
    case 'thegem_page_title':
      return `<div class="thegem_page_title"></div>`;
    case 'thegem_page_content':
      return `<div class="thegem_page_content"></div>`;
    case 'thegem_post_grid':
      return `<div class="thegem_post_grid" data-design="${esc(attrs.design || '')}"></div>`;
    default:
      return `<div class="vc_unknown_${esc(type)}"></div>`;
  }
}

const html = (tpl.content || []).map(renderEl).join('\n');
const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WPBakery template preview — ${esc(out)}</title>
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<div style="max-width:1170px;margin:0 auto;padding:0 24px">
${html}
</div>
</body>
</html>`;
writeFileSync(out, page);
console.log('rendered', out, '—', html.length, 'bytes');
