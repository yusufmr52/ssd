#!/usr/bin/env node
/**
 * Builds a static preview of the complete theme (header + WPBakery homepage
 * content + footer) so the design can be reviewed in a browser.
 * Usage: node scripts/build-theme-preview.mjs <out.html>
 */
import { readFileSync, writeFileSync } from 'fs';

const OUT = process.argv[2];
const ROOT = new URL('../wordpress-theme/security-solutions-dubai-child/', import.meta.url).pathname;
const CSS = readFileSync(ROOT + 'assets/css/style.css', 'utf8');
const CRIT = readFileSync(ROOT + 'assets/css/critical.css', 'utf8');
const JS = readFileSync(ROOT + 'assets/js/main.js', 'utf8');
const IMG = 'https://securitysolutionsdubai.com/wp-content/themes/security-solutions-dubai-child/assets/img';

// --- Render the WPBakery homepage template (same renderer as verification) ---
const tpl = JSON.parse(readFileSync(ROOT + 'templates/homepage.json', 'utf8'));
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function renderEl(el) {
  const attrs = el.attrs || {};
  const elClass = attrs.el_class || '';
  const cls = (base) => base + (elClass ? ' ' + elClass : '');
  switch (el.type) {
    case 'row': return `<div class="${esc(cls('vc_row'))}">\n${(el.content || []).map(renderEl).join('\n')}\n</div>`;
    case 'column': return `<div class="${esc(cls('vc_column'))}" style="width:${esc(attrs.width || '1/1')}"><div class="${esc(cls('vc_column-inner'))}">\n${(el.content || []).map(renderEl).join('\n')}\n</div></div>`;
    case 'text_block': return `<div class="${esc(cls('vc_text_block'))}">${el.content || ''}</div>`;
    case 'image': return `<div class="${esc(cls('vc_single_image'))}">${attrs.image ? `<img src="${esc(attrs.image)}" alt="${esc(attrs.alt || '')}" loading="lazy" decoding="async">` : ''}</div>`;
    case 'button': return `<div class="${esc(cls('vc_button_wrap'))}"><a class="${esc(cls('vc_btn'))}" href="${esc(attrs.link || '#')}">${esc(attrs.text || '')}</a></div>`;
    case 'custom_html': return `<div class="${esc(cls('vc_custom_html'))}">${attrs.html || ''}</div>`;
    case 'posts_grid': return `<div class="${esc(cls('vc_posts_grid'))}"><!-- dynamic posts grid --></div>`;
    default: return `<div><!-- ${esc(el.type)} --></div>`;
  }
}
const content = (tpl.content || []).map(renderEl).join('\n');

const svg = (n, s = 18) => `<span class="ssdk-ic" style="width:${s}px;height:${s}px">` + {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  pinterest: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
}[n] + '</span>';

const services = [
  ['01', 'CCTV Security Surveillance', '/services/cctv-security-surveillance/'],
  ['02', 'Access Control System', '/services/access-control-system/'],
  ['03', 'Time Attendance', '/services/time-attendance/'],
  ['04', 'Wireless Solutions', '/services/wireless-solutions/'],
  ['05', 'Meeting Room Solutions', '/services/meeting-room-solutions/'],
  ['06', 'ICT Infrastructure', '/services/ict-infrastructure/'],
  ['07', 'PABX Telephony', '/services/pabx-telephony/'],
  ['08', 'IT Support &amp; Services', '/services/it-support-services/'],
];
const menu = ['Home', 'About Us', 'How it works', 'Services', 'Blog', 'Resources', 'Locations', 'Careers', 'Contact Us']
  .map((t, i) => `<li class="menu-item-top${i === 3 ? ' menu-item-has-children ssdk-mega' : ''}"><a class="menu-link" href="#">${t}</a>` +
  (i === 3 ? '<button type="button" class="menu-trigger menu-trigger-mega" aria-expanded="false"><span></span><span></span><span></span></button><div class="menu-panel mega"><div class="mega-links">' +
    services.map((s) => `<a class="menu-link mega-link" href="#"><span class="mega-link-ic">${s[0]}</span>${s[1]}</a>`).join('') +
    '</div><a class="menu-link mega-link mega-link-all" href="#">Explore all services &rarr;</a></div>' : '') + '</li>').join('');

const header = `<div class="ssdk-utilbar"><div class="ssdk-utilbar-inner">
<span class="util-addr">${svg('pin', 14)}<a href="#">Level 33, Al Saqr Business Tower, Sheikh Zayed Road, Dubai</a></span>
<span class="util-links">
<a href="tel:+971503605274">${svg('phone', 14)}<span>+971 50 360 5274</span></a>
<a href="mailto:info@hutaibinfotech.com">${svg('mail', 14)}<span>info@hutaibinfotech.com</span></a>
<span class="util-social">
<a class="util-social-link" href="#" aria-label="Facebook">${svg('facebook', 14)}</a>
<a class="util-social-link" href="#" aria-label="LinkedIn">${svg('linkedin', 14)}</a>
<a class="util-social-link" href="#" aria-label="Twitter">${svg('twitter', 14)}</a>
<a class="util-social-link" href="#" aria-label="Instagram">${svg('instagram', 14)}</a>
<a class="util-social-link" href="#" aria-label="Pinterest">${svg('pinterest', 14)}</a>
<a class="util-social-link" href="#" aria-label="YouTube">${svg('youtube', 14)}</a>
</span></span></div></div>
<header id="ssdk-site-header" class="ssdk-site-header" data-sticky><div class="ssdk-header-inner">
<a class="ssdk-logo" href="#"><img src="${IMG}/logo.png" alt="Hutaib InfoTech" width="200" height="56"></a>
<nav class="ssdk-nav-wrap" aria-label="Primary"><ul class="ssdk-nav">${menu}</ul></nav>
<div class="ssdk-header-actions">
<a class="ssdk-phone-btn" href="tel:+971503605274">${svg('phone', 16)}<span>+971 50 360 5274</span></a>
<a class="ssdk-cta" href="#">Get a Quote</a>
<button type="button" class="ssdk-burger" id="ssdk-burger" aria-expanded="false" aria-controls="ssdk-mobile-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
</div></div></header>
<div class="ssdk-mobile-menu" id="ssdk-mobile-menu" aria-hidden="true"><nav class="ssdk-mobile-nav"><ul class="ssdk-mobile-list">${['Home', 'About Us', 'How it works', 'Services', 'Blog', 'Resources', 'Locations', 'Careers', 'Contact Us'].map((t) => `<li><a href="#">${t}</a></li>`).join('')}</ul></nav></div>
<div class="ssdk-mobile-backdrop"></div>`;

const footer = `<footer id="ssdk-site-footer" class="ssdk-site-footer"><div class="ssdk-container ssdk-footer-grid">
<div class="footer-block footer-brand">
<a class="ssdk-logo ssdk-logo-light" href="#"><img src="${IMG}/logo.png" alt="Hutaib InfoTech" width="200" height="56"></a>
<p class="footer-tagline">Security solutions Dubai &amp; UAE &mdash; design, install and support.</p>
<img class="footer-iso" src="${IMG}/iso-badge.png" alt="ISO 9001:2015 certified" width="100" height="100" loading="lazy">
<div class="footer-social">${svg('facebook', 16)}${svg('linkedin', 16)}${svg('twitter', 16)}${svg('instagram', 16)}${svg('pinterest', 16)}${svg('youtube', 16)}</div>
</div>
<div class="footer-block footer-quick"><h4 class="footer-title">Explore</h4><ul class="footer-links">${['Home', 'About Us', 'How it works', 'Services', 'Blog', 'Resources', 'Locations', 'Careers', 'Contact Us'].map((t) => `<li><a href="#">${t}</a></li>`).join('')}</ul></div>
<div class="footer-block footer-services"><h4 class="footer-title">Services</h4><ul class="footer-links">${services.map((s) => `<li><a href="#">${s[1]}</a></li>`).join('')}</ul></div>
<div class="footer-block footer-contact"><h4 class="footer-title">Contact</h4><ul class="footer-contact-list">
<li>${svg('phone', 16)} <a href="tel:+971503605274">+971 50 360 5274</a></li>
<li>${svg('mail', 16)} <a href="mailto:info@hutaibinfotech.com">info@hutaibinfotech.com</a></li>
<li>${svg('pin', 16)} <span>Level 33, Al Saqr Business Tower, Sheikh Zayed Road, Dubai</span></li>
<li><a class="footer-whatsapp" href="#">${svg('phone', 16)} WhatsApp: +971 50 360 5274</a></li>
</ul></div>
</div>
<div class="ssdk-footer-bottom"><div class="ssdk-container ssdk-footer-bottom-inner">
<p>Hutaib InfoTech Solutions &middot; &copy; 2026 All rights reserved.</p>
<ul class="footer-legal-links"><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Use</a></li></ul>
</div></div></footer>`;

const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Security Solutions Dubai — Theme Preview</title>
<style>${CRIT}</style>
<style>${CSS}</style>
</head>
<body>
${header}
<main id="main" class="site-main">
<div class="ssdk-container">${content}</div>
</main>
${footer}
<script>${JS}</script>
</body>
</html>`;

writeFileSync(OUT, page);
console.log('preview written:', OUT, '—', page.length, 'bytes');
