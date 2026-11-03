import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import icons from '../static/icons.json';
import { pages, routeMap, ORIGIN, type Page } from '../static/routes';
import {
  services, reasons, processSteps, industries, testimonials, faqs, partners,
  projectImages, coverage, serviceOptions, locationOptions, contact,
} from '../src/data/site';
import { primaryMenu, serviceMenu } from '../src/data/menu';

const DIST = path.resolve('dist');
const ASSET_SRC = path.resolve('static/asset-source');
const OUTGOING = 'info@hutaibinfotech.com';
const iconsMap = icons as Record<string, string>;

/* ---------------------------------------------------------------- helpers */

const esc = (s: unknown) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

function icon(name: string, size = 24, cls = '') {
  const inner = iconsMap[name] ?? '';
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
}

function rel(from: string, to: string): string {
  if (/^(mailto:|tel:|sms:|https?:)/i.test(to)) return to;
  const fromDir = from.replace(/[^/]*$/, '');
  const a = fromDir.split('/').filter(Boolean);
  const b = to.split('/').filter(Boolean);
  while (a.length && b.length && a[a.length - 1] === b[b.length - 1]) { a.pop(); b.pop(); }
  const up = a.map(() => '../').join('');
  return (up ? up : './') + b.join('/');
}

/** Resolve any menu/page href to a local dist-relative path. */
function local(href: string): string {
  if (!href || href.startsWith('#')) {
    if (href === '#top') return 'index.html';
    if (href === '#locations') return 'uae/index.html';
    if (href === '#services') return 'services/index.html';
    if (href === '#quote') return 'contact-us/index.html#quote';
    if (href === '#meeting') return 'services/meeting-room-management-solutions/index.html';
    if (href === '#main') return '#main';
    return href;
  }
  if (/^(mailto:|tel:|sms:)/i.test(href)) return href;
  if (routeMap.has(href)) return routeMap.get(href)!;
  try {
    const u = new URL(href);
    if (u.hostname.includes('securitysolutionsdubai') || u.hostname.includes('hutaibinfotech')) {
      let p = u.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      const known = new Map<string, string>([
        ['about-us', 'about-us/index.html'],
        ['how-it-works', 'how-it-works/index.html'],
        ['blog', 'blog/index.html'],
        ['resources', 'resources/index.html'],
        ['careers', 'careers/index.html'],
        ['contact-us', 'contact-us/index.html'],
        ['uae', 'uae/index.html'],
        ['saudi-arabia', 'saudi-arabia/index.html'],
        ['oman', 'oman/index.html'],
        ['privacy-policy', 'privacy-policy/index.html'],
        ['terms', 'terms/index.html'],
        ['sitemap.xml', 'sitemap.html'],
        ['services', 'services/index.html'],
      ]);
      if (p === '') return 'index.html';
      if (known.has(p)) return known.get(p)!;
      // svc/slug or slug — find a matching generated page
      const slug = p.split('/').pop()!;
      const hit = pages.find((pg) => pg.path.replace(/\/index\.html$/, '').split('/').pop() === slug);
      if (hit) return hit.path;
      return 'index.html';
    }
  } catch { /* ignore */ }
  return href;
}

function link(page: Page, href: string, label: string, cls = '') {
  const target = local(href);
  const external = /^(mailto:|tel:|sms:|https?:)/i.test(target);
  const r = target.startsWith('#') || external ? target : rel(page.path, target);
  const attrs = target.startsWith('http') ? ' target="_blank" rel="noreferrer noopener"' : '';
  return `<a href="${esc(r)}" class="${cls}"${attrs}>${esc(label)}</a>`;
}

/* ------------------------------------------------------------------ assets */

const assetNames: Record<string, string> = {
  logo: 'logo-primary.png',
  logoAlt: 'logo-alternate.png',
  iso: 'iso-badge.png',
  hero: 'photo-hero.webp',
  network: 'photo-network.webp',
  meeting: 'photo-meeting.webp',
  attendance: 'photo-attendance.webp',
  people: 'photo-attendance.webp',
  access: 'photo-access.webp',
  cctv: 'photo-cctv.webp',
  skyline: 'photo-skyline.webp',
  school: 'photo-school.webp',
};
const clients = ['deloitte', 'du', 'mubadala', 'alnaboodah', 'arabtec', 'heinz', 'weatherford', 'averda', 'rostamani', 'alainhospital']
  .map((n) => ({ key: n, file: `client-logo-${n}.webp` }));

const assets: Record<string, string> = {};
async function publishAsset(src: string): Promise<string> {
  const buf = await fs.readFile(path.join(ASSET_SRC, src));
  const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
  const ext = path.extname(src);
  const base = path.basename(src, ext);
  const dist = `assets/${hash}-${base}${ext}`;
  await fs.mkdir(path.join(DIST, path.dirname(dist)), { recursive: true });
  await fs.writeFile(path.join(DIST, dist), buf);
  return dist;
}
async function publishAllAssets() {
  for (const [key, file] of Object.entries(assetNames)) {
    assets[key] = await publishAsset(file);
    assets[file.replace(/\.[^.]+$/, '')] = assets[key];
  }
  for (const c of clients) assets[`client:${c.key}`] = await publishAsset(c.file);
  assets.font = await publishAsset('manrope-font.woff2');
}
const asset = (key: string) => assets[key] ?? assets[key.replace(/\.[^.]+$/, '')] ?? key;

/* ----------------------------------------------------------- page head/meta */

function breadcrumb(page: Page) {
  const home = `<a href="${rel(page.path, 'index.html')}">Home</a>`;
  if (page.kind === 'home') return '';
  const segs: string[] = [];
  if (page.kind === 'service' || page.kind === 'services') segs.push(`<a href="${rel(page.path, 'services/index.html')}">Services</a>`);
  else if (page.kind === 'article') segs.push(`<a href="${rel(page.path, 'blog/index.html')}">Blog</a>`);
  else if (page.kind === 'location') segs.push(`<a href="${rel(page.path, 'uae/index.html')}">Locations</a>`);
  else if (page.kind === 'about' || page.kind === 'process') segs.push(`<a href="${rel(page.path, 'about-us/index.html')}">Company</a>`);
  else if (page.kind === 'careers') segs.push(`<a href="${rel(page.path, 'careers/index.html')}">Careers</a>`);
  else if (page.kind === 'contact') segs.push(`<a href="${rel(page.path, 'contact-us/index.html')}">Contact</a>`);
  else if (page.kind === 'legal') segs.push(`<a href="${rel(page.path, 'privacy-policy/index.html')}">Legal</a>`);
  const here = segs.length ? `<span aria-current="page">${esc(page.title)}</span>` : `<span aria-current="page">${esc(page.title)}</span>`;
  return `<nav aria-label="Breadcrumb" class="breadcrumb flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/50">${home}${segs.length ? `<span class="text-white/25">/</span>${segs.join('<span class="text-white/25">/</span>')}<span class="text-white/25">/</span>` : '<span class="text-white/25">/</span>'}${here}</nav>`;
}

function jsonld(page: Page) {
  const canonical = `${ORIGIN}/${page.path.replace(/index\.html$/, '')}`;
  const org = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'Hutaib InfoTech Solutions', url: ORIGIN + '/',
    image: `${ORIGIN}/${asset('logo')}`,
    email: contact.email, telephone: `+${contact.phoneDisplay.replace(/[^0-9]/g, '')}`,
    address: { '@type': 'PostalAddress', streetAddress: 'Level 33, Al Saqr Business Tower, Sheikh Zayed Road', addressLocality: 'Dubai', addressCountry: 'AE' },
  };
  const parts: string[] = [JSON.stringify(org)];
  parts.push(JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Security Solutions Dubai', url: ORIGIN, publisher: { '@type': 'Organization', name: 'Hutaib InfoTech Solutions' } }));
  const crumbs = [{ '@type': 'Thing', name: 'Home', item: `${ORIGIN}/` }];
  if (page.kind === 'service' || page.kind === 'services') crumbs.push({ '@type': 'Thing', name: 'Services', item: `${ORIGIN}/services/` });
  if (page.kind === 'article') crumbs.push({ '@type': 'Thing', name: 'Blog', item: `${ORIGIN}/blog/` });
  if (page.kind === 'location') crumbs.push({ '@type': 'Thing', name: 'Locations', item: `${ORIGIN}/uae/` });
  if (page.kind !== 'home') crumbs.push({ '@type': 'Thing', name: page.title, item: canonical });
  parts.push(JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })) }));
  if (page.kind === 'home') {
    parts.push(JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }));
    parts.push(JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.description, url: canonical, image: `${ORIGIN}/${asset('hero')}` }));
  }
  if (page.kind === 'service') {
    parts.push(JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: page.title, description: page.description, provider: { '@type': 'Organization', name: 'Hutaib InfoTech Solutions', url: ORIGIN }, areaServed: { '@type': 'Place', name: 'United Arab Emirates' }, url: canonical }));
  }
  if (page.kind === 'article') {
    parts.push(JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: page.title, description: page.description, image: `${ORIGIN}/${asset(page.image || 'network')}`, datePublished: '2026-02-20', author: { '@type': 'Organization', name: 'Hutaib InfoTech Solutions' }, publisher: { '@type': 'Organization', name: 'Hutaib InfoTech Solutions' } }));
  }
  if (page.kind === 'contact') {
    parts.push(JSON.stringify({ '@context': 'https://schema.org', '@type': 'ContactPoint', contactPoint: { '@type': 'ContactPoint', telephone: `+${contact.phoneDisplay.replace(/[^0-9]/g, '')}`, contactType: 'sales', email: contact.email, areaServed: 'AE', availableLanguage: ['en'] } }));
  }
  return `<script type="application/ld+json">${parts.map(esc).join('\n')}</script>`;
}

function head(page: Page) {
  const canonical = `${ORIGIN}/${page.path.replace(/index\.html$/, '')}`;
  const ogImage = `${ORIGIN}/${asset(page.image || 'hero')}`;
  return `<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}" />
<meta name="generator" content="Hutaib static preview build" />
<link rel="icon" href="${rel(page.path, 'favicon.svg')}" type="image/svg+xml" />
<link rel="canonical" href="${esc(canonical)}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${esc(page.title)}" />
<meta property="og:description" content="${esc(page.description)}" />
<meta property="og:url" content="${esc(canonical)}" />
<meta property="og:site_name" content="Security Solutions Dubai — Hutaib InfoTech Solutions" />
<meta property="og:image" content="${esc(ogImage)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(page.title)}" />
<meta name="twitter:description" content="${esc(page.description)}" />
<meta name="twitter:image" content="${esc(ogImage)}" />
<link rel="stylesheet" href="${rel(page.path, 'assets/app.css')}" />
${jsonld(page)}`;
}

/* ------------------------------------------------------------------ header */

function navItem(page: Page, item: (typeof primaryMenu)[number]): string {
  if (item.type === 'link') {
    const target = local(item.href);
    const isCurrent = strip(target) === strip(page.path);
    return `<li><a class="nav-link" href="${esc(rel(page.path, target))}"${isCurrent ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
  }
  const children = item.children ?? [];
  const open = children.length ? 'is-open' : '';
  const panel =
    item.type === 'mega'
      ? megaPanel(page, item.label, children)
      : `<div class="dropdown-panel" role="menu">${dropdownItems(page, children)}${item.label === 'Locations' ? `<a class="dropdown-foot" href="${contact.mapsUrl}" target="_blank" rel="noreferrer noopener">${icon('pin', 13, 'text-signal')} View on map</a>` : ''}</div>`;
  return `<li class="nav-item has-mega">
    <button type="button" class="nav-trigger" aria-expanded="false" aria-haspopup="${item.type === 'mega' ? 'true' : 'menu'}">${esc(item.label)}${icon('chevronDown', 13, 'nav-caret')}</button>
    ${panel}
  </li>`;
}

function megaPanel(page: Page, label: string, children: { label: string; href: string; children?: { label: string; href: string }[] }[]): string {
  const core = services.map((s) => {
    const href = local(svcHref(s.id));
    return `<a class="mega-card" href="${esc(rel(page.path, href))}">
      <span class="mega-icon">${icon(s.icon, 18)}</span>
      <span><span class="mega-title">${esc(s.title)}</span><span class="mega-short">${esc(s.short)}</span></span>
    </a>`;
  }).join('');
  return `<div class="mega-panel" role="menu" aria-label="${esc(label)}">
    <div class="shell mega-grid">${core}</div>
    <div class="mega-foot">
      <a class="mega-foot-link" href="${rel(page.path, 'services/index.html')}">Explore all ${serviceMenu.length} services ${icon('arrowRight', 14)}</a>
    </div>
  </div>`;
}

function dropdownItems(page: Page, children: { label: string; href: string; children?: { label: string; href: string }[] }[]): string {
  return `<ul>${children.map((c) => `<li><a class="dropdown-item" href="${esc(rel(page.path, local(c.href)))}">${esc(c.label)}${icon('arrowUpRight', 12, 'text-[#b6c5d2]')}</a></li>`).join('')}</ul>`;
}

function header(page: Page): string {
  const nav = primaryMenu.map((item) => navItem(page, item)).join('');
  const drawerNav = primaryMenu.map((item) => {
    const target = local(item.href);
    const isCurrent = strip(target) === strip(page.path);
    const kids = (item.children ?? []);
    const kidsHtml = kids.length ? `<div class="drawer-sub" hidden>${kids.map((c) => `<a href="${esc(rel(page.path, local(c.href)))}">${esc(c.label)}</a>`).join('')}</div>` : '';
    const nested = kids.flatMap((c) => c.children ?? []);
    const nestedHtml = nested.length ? `<div class="drawer-sub drawer-sub-2" hidden>${nested.map((c) => `<a href="${esc(rel(page.path, local(c.href)))}">${esc(c.label)}</a>`).join('')}</div>` : '';
    return `<li class="drawer-item${kids.length ? ' has-kids' : ''}">
      <a href="${esc(rel(page.path, target))}"${isCurrent ? ' aria-current="page"' : ''}>${esc(item.label)}${kids.length ? icon('chevronDown', 14, 'drawer-caret') : ''}</a>
      ${kidsHtml}${nestedHtml}
    </li>`;
  }).join('');
  return `<header class="site-header" id="site-header">
  <div class="util-bar">
    <div class="shell util-inner">
      <span class="util-address">${icon('pin', 12, 'text-signal')} Dubai HQ · Level 33, Al Saqr Business Tower, Sheikh Zayed Road</span>
      <span class="util-links">
        <span class="util-sep">Site visits by appointment</span>
        <a href="${contact.phoneHref}">${icon('phone', 12, 'text-signal')} ${esc(contact.phoneDisplay)}</a>
        <a href="${contact.whatsapp}" target="_blank" rel="noreferrer noopener">${icon('whatsapp', 12, 'text-signal')} WhatsApp</a>
        <a href="mailto:${contact.email}">${icon('mail', 12, 'text-signal')} ${esc(contact.email)}</a>
      </span>
    </div>
  </div>
  <div class="nav-bar">
    <div class="shell nav-inner">
      <a class="brand" href="${rel(page.path, 'index.html')}" aria-label="Security Solutions Dubai — home">
        <img src="${esc(rel(page.path, asset('logo')))}" alt="Hutaib InfoTech Solutions" width="180" height="49" class="brand-logo" />
      </a>
      <nav aria-label="Primary" class="primary-nav"><ul class="nav-list">${nav}</ul></nav>
      <div class="nav-actions">
        <a class="btn btn-signal btn-quote" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('sparkles', 15)} Request a quote</a>
        <a class="nav-phone" href="${contact.phoneHref}">${icon('phone', 15, 'text-signal')}<span>${esc(contact.phoneDisplay)}</span></a>
      </div>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">${icon('menu', 22)}</button>
    </div>
  </div>
</header>
<div class="mobile-drawer" id="mobile-drawer" hidden inert>
  <div class="drawer-backdrop" data-drawer-close></div>
  <aside class="drawer-panel" role="dialog" aria-modal="true" aria-label="Site menu">
    <div class="drawer-head">
      <a class="brand" href="${rel(page.path, 'index.html')}"><img src="${esc(rel(page.path, asset('logo')))}" alt="Hutaib InfoTech Solutions" width="150" height="41" class="brand-logo" /></a>
      <button type="button" class="drawer-close" data-drawer-close aria-label="Close menu">${icon('close', 20)}</button>
    </div>
    <nav aria-label="Mobile" class="drawer-nav"><ul class="drawer-list">${drawerNav}</ul></nav>
    <div class="drawer-foot">
      <a href="${contact.phoneHref}" class="drawer-contact">${icon('phone', 15, 'text-signal')}<span>${esc(contact.phoneDisplay)}</span></a>
      <a href="mailto:${contact.email}" class="drawer-contact">${icon('mail', 15, 'text-signal')}<span>${esc(contact.email)}</span></a>
      <a href="${contact.whatsapp}" target="_blank" rel="noreferrer noopener" class="drawer-contact">${icon('whatsapp', 15, 'text-signal')}<span>WhatsApp</span></a>
    </div>
  </aside>
</div>`;
}

const strip = (p: string) => p.replace(/\/+$/, '').replace(/index\.html$/, '');

/* ------------------------------------------------------------------ footer */

function footer(page: Page): string {
  const svcLinks = serviceMenu.slice(0, 9).map((s) => `<li><a href="${esc(rel(page.path, local(s.href)))}">${esc(s.label)}</a></li>`).join('');
  const company = primaryMenu.filter((i) => i.label !== 'Home' && i.label !== 'Services').map((i) => {
    const href = i.href === '#' ? 'uae/index.html' : local(i.href);
    return `<li><a href="${esc(rel(page.path, href))}">${esc(i.label)}</a></li>`;
  }).join('');
  return `<footer class="site-footer">
  <div class="shell">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${rel(page.path, 'index.html')}" aria-label="Hutaib InfoTech Solutions — back to top">
          <img src="${esc(rel(page.path, asset('logo')))}" alt="Hutaib InfoTech Solutions" width="180" height="49" class="brand-logo" />
        </a>
        <p class="footer-desc">Hutaib InfoTech Solutions plans, installs and supports security, networking and IT infrastructure across the UAE — one accountable team from site survey to handover and beyond.</p>
        <a class="btn btn-signal btn-sm" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('sparkles', 14)} Request a survey</a>
      </div>
      <div class="footer-offices">
        <p class="footer-eyebrow">Dubai head office</p>
        <address class="footer-address">
          <p>${icon('pin', 13, 'text-signal')}<a href="${contact.mapsUrl}" target="_blank" rel="noreferrer noopener">${esc(contact.address)}</a></p>
          <p>${icon('phone', 13, 'text-signal')}<a href="${contact.phoneHref}">${esc(contact.phoneDisplay)}</a></p>
          <p>${icon('mail', 13, 'text-signal')}<a href="mailto:${contact.email}">${esc(contact.email)}</a></p>
        </address>
        <p class="footer-eyebright">Sharjah office</p>
        <p class="footer-sharjah">${icon('pin', 13, 'text-white/30')}${esc(contact.sharjahAddress)}</p>
        <p class="footer-region">Regional support: Saudi Arabia &amp; Oman · Site visits by appointment.</p>
      </div>
      <div class="footer-col">
        <p class="footer-eyebrow">Services</p>
        <ul class="footer-links">${svcLinks}<li><a class="footer-all" href="${rel(page.path, 'services/index.html')}">All ${serviceMenu.length} services ${icon('arrowUpRight', 12)}</a></li></ul>
      </div>
      <div class="footer-col">
        <p class="footer-eyebrow">Company</p>
        <ul class="footer-links">${company}<li><a href="${rel(page.path, 'services/index.html')}">Capabilities</a></li></ul>
      </div>
      <div class="footer-news">
        <p class="footer-eyebrow">Stay in touch</p>
        <p class="footer-news-text">Project briefs, site-survey availability and quarterly planning notes — no spam.</p>
        <form class="news-form" data-news-form novalidate>
          <label class="field-label" for="news-email">Work email</label>
          <input class="field" id="news-email" name="email" type="email" required placeholder="you@company.com" autocomplete="email" />
          <button class="btn btn-brand btn-sm" type="submit">${icon('arrowRight', 14)} Keep me informed</button>
          <p class="news-note" data-news-note>This preview prepares an email to ${esc(contact.email)} instead of sending automatically.</p>
        </form>
        <div class="footer-social">
          <a href="https://www.facebook.com/hutaibinfotech" target="_blank" rel="noreferrer noopener">Facebook</a>
          <a href="https://twitter.com/HUTAIBIS" target="_blank" rel="noreferrer noopener">X / Twitter</a>
          <a href="${contact.whatsapp}" target="_blank" rel="noreferrer noopener">WhatsApp</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© 2026 Hutaib InfoTech Solutions. All rights reserved.<span class="footer-brand-note">Security Solutions Dubai is a Hutaib InfoTech Solutions brand.</span></p>
      <div class="footer-legal">
        <a href="${rel(page.path, 'privacy-policy/index.html')}">Privacy</a>
        <a href="${rel(page.path, 'terms/index.html')}">Terms</a>
        <a href="${rel(page.path, 'sitemap.html')}">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
<div class="preview-badge" id="preview-badge" hidden>
  <div class="preview-badge-inner">
    <span class="preview-pulse" aria-hidden="true"></span>
    <div class="preview-text">
      <p><strong>Client preview · design only, not live</strong></p>
      <p>This static demo opens a prepared email instead of sending automatically. To reach the team now, call or WhatsApp.</p>
      <div class="preview-contacts">
        <a href="${contact.phoneHref}">${icon('phone', 11, 'text-signal')} ${esc(contact.phoneDisplay)}</a>
        <a href="${contact.whatsapp}" target="_blank" rel="noreferrer noopener">${icon('whatsapp', 11, 'text-signal')} WhatsApp</a>
        <a href="mailto:${contact.email}">${icon('mail', 11, 'text-signal')} Email</a>
      </div>
    </div>
    <button type="button" class="preview-close" id="preview-close" aria-label="Dismiss preview notice">${icon('close', 14)}</button>
  </div>
  <div class="preview-bar">Hutaib InfoTech Solutions · static approval preview — not the live website</div>
</div>`;
}

/* --------------------------------------------------------------- homepage */

function homeHero(page: Page): string {
  return `<section id="top" class="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="shell hero-inner">
    <div class="hero-copy">
      <p class="hero-eyebrow"><span class="hero-dot" aria-hidden="true"></span>Security systems integrator · Dubai</p>
      <h1 class="hero-title">Security, networking<br />&amp; IT solutions <span class="hero-accent">in Dubai.</span></h1>
      <p class="hero-lede">Hutaib InfoTech Solutions plans, installs and supports CCTV, access control, networking, IT infrastructure and meeting-room systems for offices, banks, schools and industrial sites across the UAE. One accountable team — from site survey to handover and beyond.</p>
      <div class="hero-actions">
        <a class="btn btn-signal btn-lg" href="${rel(page.path, 'contact-us/index.html#quote')}">Request a site survey ${icon('arrowRight', 17)}</a>
        <a class="btn btn-outline-light btn-lg" href="${contact.phoneHref}">${icon('phone', 16)} Talk to our team</a>
      </div>
      <dl class="hero-stats">
        <div><dt>ISO</dt><dd>9001:2015 certified</dd></div>
        <div><dt>8</dt><dd>Connected service lines</dd></div>
        <div><dt>UAE</dt><dd>Dubai HQ · KSA · Oman</dd></div>
      </dl>
    </div>
    <figure class="hero-figure">
      <img src="${esc(rel(page.path, asset('hero')))}" alt="Hutaib door access control system installed for a UAE client" width="1200" height="800" fetchpriority="high" decoding="async" />
      <div class="hero-fig-gradient" aria-hidden="true"></div>
      <figcaption class="hero-fig-card">
        <p class="hero-fig-kicker">One accountable partner</p>
        <p class="hero-fig-title">Every system, specified to work together.</p>
        <div class="hero-fig-trust">
          <span>${icon('check', 10, 'text-signal')} One delivery team</span>
          <span>${icon('check', 10, 'text-signal')} Survey-led scope</span>
          <span>${icon('check', 10, 'text-signal')} Support after handover</span>
        </div>
      </figcaption>
    </figure>
  </div>
</section>
<div class="credentials">
  <div class="shell credentials-grid">
    ${[
      { i: 'award', t: 'ISO 9001:2015 certified', b: 'Quality-managed delivery' },
      { i: 'users', t: 'One delivery team', b: 'Survey → design → handover' },
      { i: 'pin', t: 'UAE-wide coverage', b: 'Dubai HQ · KSA · Oman' },
      { i: 'wrench', t: 'Support after go-live', b: 'Maintenance & AMC options' },
    ].map((c, idx) => `<div class="cred-cell${idx % 2 ? ' cred-l' : ''}${idx > 1 ? ' cred-t' : ''}${idx > 0 ? ' cred-lr' : ''}">
      <span class="cred-icon">${icon(c.i, 16)}</span>
      <span><span class="cred-title">${esc(c.t)}</span><span class="cred-body">${esc(c.b)}</span></span>
    </div>`).join('')}
  </div>
</div>`;
}

function servicesSection(page: Page): string {
  const cards = services.map((s) => `<article class="svc-card">
    <span class="svc-icon">${icon(s.icon, 22)}</span>
    <h3 class="svc-title">${esc(s.title)}</h3>
    <p class="svc-short">${esc(s.short)}</p>
    <div class="svc-tags">${s.tags.slice(0, 2).map((t) => `<span class="svc-tag">${esc(t)}</span>`).join('')}</div>
    <a class="svc-link" href="${esc(rel(page.path, local(svcHref(s.id))))}">Explore service ${icon('arrowRight', 14)}</a>
  </article>`).join('');
  return `<section id="services" class="section-services">
  <div class="shell">
    <div class="sec-head">
      <div>
        <span class="eyebrow">What we do</span>
        <h2 class="sec-title">One partner for the systems your building depends on.</h2>
      </div>
      <p class="sec-lede">Eight connected capability lines — from the camera on the wall to the cable in the ceiling. Each service has its own page with scope, brands and project detail.</p>
    </div>
    <div class="svc-grid">${cards}</div>
    <div class="svc-cta">
      <span class="svc-cta-icon">${icon('sparkles', 20)}</span>
      <h3 class="svc-cta-title">A site survey turns a requirement into a right-sized scope — cameras, doors, cabling and support included.</h3>
      <div class="svc-cta-actions">
        <a class="btn btn-signal" href="${rel(page.path, 'contact-us/index.html#quote')}">Request a site survey ${icon('arrowRight', 15)}</a>
        <a class="btn btn-outline-light" href="${contact.phoneHref}">${icon('phone', 15)} Call ${esc(contact.phoneDisplay)}</a>
      </div>
      <p class="svc-cta-note">${serviceMenu.length} service groups · UAE-wide</p>
    </div>
  </div>
</section>`;
}

function svcHref(id: string): string {
  const map: Record<string, string> = {
    cctv: `${ORIGIN}/services/cctv-video-surveillance/`,
    'access-control': `${ORIGIN}/services/premise-access-control-solutions/`,
    'visitor-management': `${ORIGIN}/services/visitor-management-solution/`,
    networking: `${ORIGIN}/services/structured-cabling-networking-solutions/`,
    wifi: `${ORIGIN}/services/wireless-connectivity-solution/`,
    'it-infrastructure': `${ORIGIN}/services/ict-elv-infrastructure-setup-solutions/`,
    'meeting-rooms': 'services/meeting-room-management-solutions/index.html',
    connectivity: `${ORIGIN}/services/professional-starlink-installation-in-dubai-uae/`,
  };
  return map[id] ?? `${ORIGIN}/services/`;
}

function whyUsSection(page: Page): string {
  const cards = reasons.map((r) => `<article class="why-card">
    <span class="why-icon">${icon(r.icon, 20)}</span>
    <h3 class="why-title">${esc(r.title)}</h3>
    <p class="why-body">${esc(r.body)}</p>
  </article>`).join('');
  return `<section id="why-us" class="section-why">
  <div class="shell">
    <div class="sec-head">
      <div>
        <span class="eyebrow">Why Hutaib</span>
        <h2 class="sec-title">A systems partner you can hold to the plan.</h2>
      </div>
      <p class="sec-lede">Projects fail on the details: a camera that cannot see the gate, a door that will not fail safe, a network that was never sized for the load. We plan for those details before a single item is ordered.</p>
    </div>
    <div class="why-grid">${cards}</div>
    <div class="why-partners">
      <p class="why-partners-label">Technology partners we work with</p>
      <div class="why-partner-list">${partners.map((p) => `<span class="why-partner">${esc(p)}</span>`).join('')}</div>
    </div>
  </div>
</section>`;
}

function processSection(page: Page): string {
  const steps = [
    { n: '30 min call', t: 'Discuss your needs', b: 'A short conversation about your sites, systems, priorities and timeline — with no obligation.', o: 'A short requirement brief and clear next step' },
    { n: '1–2 hrs', t: 'Site survey', b: 'We inspect coverage, entry points, existing cabling, power and access constraints.', o: 'Coverage, entry points and constraints documented' },
    { n: '2–3 days', t: 'Recommend a solution', b: 'Receive a right-sized design, equipment list, clear scope and a proposed delivery programme.', o: 'Right-sized design, equipment list and written scope' },
    { n: 'By schedule', t: 'Installation & configuration', b: 'Our team installs to the agreed plan, coordinating around your operations and building rules.', o: 'Installed to the approved plan with minimal disruption' },
    { n: '1–2 days', t: 'Testing & handover', b: 'Commissioning, user training and as-built documentation — before we call the job complete.', o: 'Commissioning records, training and documentation' },
    { n: 'Ongoing', t: 'Ongoing support', b: 'Warranty support, preventive maintenance and advice as your sites, teams and systems grow.', o: 'Preventive checks and responsive on-site support' },
  ];
  const cards = steps.map((s, idx) => `<li class="proc-step">
    <span class="proc-num">${String(idx + 1).padStart(2, '0')}</span>
    <span class="proc-icon">${icon(processSteps[idx].icon, 18)}</span>
    <h3 class="proc-title">${esc(s.t)}</h3>
    <p class="proc-body">${esc(s.b)}</p>
    <div class="proc-out"><span class="proc-duration">${esc(s.n)} · Output</span><span class="proc-output">${esc(s.o)}</span></div>
  </li>`).join('');
  return `<section id="process" class="section-process">
  <div class="process-bg" aria-hidden="true"></div>
  <div class="shell">
    <div class="sec-head sec-head-light">
      <div>
        <span class="eyebrow">How we work</span>
        <h2 class="sec-title">Six clear steps, from first call to aftercare.</h2>
      </div>
      <p class="sec-lede">No vague quotes or surprise variations. Each stage has an owner, an output and your sign-off before we move forward.</p>
    </div>
    <ol class="proc-grid">${cards}</ol>
    <div class="proc-cta">
      <p><strong>Already have a system?</strong> We audit CCTV, access, networking and IT setups — keep what works, upgrade what does not.</p>
      <a class="btn btn-signal" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('sparkles', 15)} Request an audit ${icon('arrowRight', 15)}</a>
    </div>
  </div>
</section>`;
}

function industriesSection(page: Page): string {
  const cards = industries.map((i) => `<article class="ind-card">
    <span class="ind-icon">${icon(i.icon, 20)}</span>
    <h3 class="ind-name">${esc(i.name)}</h3>
    <p class="ind-body">${esc(i.body)}</p>
  </article>`).join('');
  return `<section id="industries" class="section-industries">
  <div class="shell">
    <div class="sec-head">
      <div>
        <span class="eyebrow">Industries we serve</span>
        <h2 class="sec-title">Built around how your site actually operates.</h2>
      </div>
      <p class="sec-lede">Different environments bring different risks, access rules and reporting needs. We scope the system around your operations, not a template.</p>
    </div>
    <div class="ind-grid">${cards}</div>
    <div class="ind-cta">${link(page, 'services/verticals/index.html', 'Explore industries & verticals', 'btn btn-outline-dark')}${link(page, 'contact-us/index.html#quote', 'Discuss your site', 'btn btn-brand')}</div>
  </div>
</section>`;
}

function proofSection(page: Page): string {
  const imgs = projectImages.map((im, idx) => {
    const src = im.src.startsWith('data:') ? asset(im.src.includes('access') ? 'access' : im.src.includes('meeting') ? 'meeting' : 'network') : im.src;
    return `<figure class="proof-fig${idx === 0 ? ' proof-fig-wide' : ''}">
      <img src="${esc(rel(page.path, src))}" alt="${esc(im.alt)}" width="${im.width}" height="${im.height}" loading="lazy" decoding="async" />
      <div class="proof-fig-grad" aria-hidden="true"></div>
      <figcaption><span class="proof-cap">${esc(im.caption)}</span><span class="proof-zoom">${icon('arrowUpRight', 12)}</span></figcaption>
    </figure>`;
  }).join('');
  const testimonial = testimonials.map((t, idx) => `<article class="testi-slide" data-slide="${idx}" ${idx === 0 ? '' : 'hidden'}>
    <blockquote class="testi-quote">“${esc(t.quote)}”</blockquote>
    <div class="testi-author">
      <span class="testi-initials">${esc(t.initials)}</span>
      <span><span class="testi-name">${esc(t.name)}</span><span class="testi-role">${esc(t.role)}</span></span>
    </div>
  </article>`).join('');
  const dots = testimonials.map((t, idx) => `<button type="button" class="testi-dot${idx === 0 ? ' is-active' : ''}" data-slide-to="${idx}" aria-label="View testimonial from ${esc(t.name)}" aria-current="${idx === 0}"></button>`).join('');
  const logos = clients.map((c) => `<img class="client-logo" src="${esc(rel(page.path, asset(`client:${c.key}`)))}" alt="${esc(c.key)} client logo" loading="lazy" decoding="async" />`).join('');
  return `<section id="proof" class="section-proof">
  <div class="shell">
    <div class="sec-head">
      <div>
        <span class="eyebrow">Proof &amp; trust</span>
        <h2 class="sec-title">Trusted for the systems that cannot afford to fail.</h2>
      </div>
      <p class="sec-lede">Security and IT work is rarely visible when it is done well. These are the system types we deliver behind reception desks, warehouse gates and meeting rooms — plus feedback from the people who use them.</p>
    </div>
    <div class="proof-grid">
      <div class="proof-images">
        ${imgs}
        <div class="proof-note">From our security portfolio — CCTV, access control and connectivity projects. <a href="${rel(page.path, 'services/index.html')}">Explore services ${icon('arrowRight', 13)}</a></div>
      </div>
      <div class="proof-feedback">
        <div class="testi-card" data-carousel>
          <div class="testi-head"><span class="testi-kicker">Client feedback</span>${icon('quote', 26, 'testi-quote-icon')}</div>
          ${testimonial}
          <div class="testi-controls">
            <button type="button" class="testi-btn" data-carousel-prev aria-label="Previous testimonial">${icon('chevronLeft', 15)}</button>
            <button type="button" class="testi-btn" data-carousel-next aria-label="Next testimonial">${icon('chevronRight', 15)}</button>
            <div class="testi-dots" role="tablist">${dots}</div>
            <span class="testi-counter" data-carousel-counter>01 / ${String(testimonials.length).padStart(2, '0')}</span>
          </div>
        </div>
        <div class="proof-iso">
          <span class="proof-iso-badge"><img src="${esc(rel(page.path, asset('iso')))}" alt="ISO certification badge" width="120" height="120" loading="lazy" decoding="async" /></span>
          <div>
            <p class="proof-iso-title">ISO 9001:2015</p>
            <p class="proof-iso-body">Quality-managed delivery: documented scope, controlled project records, tested handover.</p>
          </div>
        </div>
        <div class="proof-clients">
          <div class="proof-clients-grid">${logos}</div>
          <p class="proof-clients-note">Client logos shown for approval — final client consent required before publication.</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function faqSection(page: Page): string {
  const items = faqs.map((f, idx) => `<div class="faq-item${idx === 0 ? ' is-open' : ''}">
    <h3><button type="button" class="faq-q" aria-expanded="${idx === 0}" aria-controls="faq-panel-${idx}">${esc(f.q)}<span class="faq-plus">${icon('minus', 16)}</span></button></h3>
    <div class="faq-panel" id="faq-panel-${idx}" ${idx === 0 ? '' : 'hidden'}><p class="faq-a">${esc(f.a)}</p></div>
  </div>`).join('');
  return `<section id="faq" class="section-faq">
  <div class="shell">
    <div class="sec-head">
      <div>
        <span class="eyebrow">FAQs</span>
        <h2 class="sec-title">Good questions, answered clearly.</h2>
      </div>
      <p class="sec-lede">A few things clients ask before a site survey. If your question is not here, call or message the team — we will give you a straight answer.</p>
    </div>
    <div class="faq-list">${items}</div>
    <div class="faq-foot">
      <p class="faq-foot-title">Prefer to talk it through?</p>
      <p class="faq-foot-text">Call or WhatsApp the Dubai team — site visits are arranged by appointment.</p>
      <div class="faq-foot-actions">
        <a class="btn btn-signal" href="${contact.phoneHref}">${icon('phone', 15)} ${esc(contact.phoneDisplay)}</a>
        <a class="btn btn-outline-dark" href="${contact.whatsapp}" target="_blank" rel="noreferrer noopener">${icon('whatsapp', 15)} WhatsApp us</a>
      </div>
    </div>
  </div>
</section>`;
}

function quoteForm(page: Page, opts: { id?: string; title?: string } = {}) {
  const id = opts.id ?? 'quote';
  const requestTypes = ['Site survey', 'Get a quote', 'Maintenance / AMC', 'General enquiry'];
  const intentChips = requestTypes.map((t) => `<button type="button" class="quote-chip" data-intent="${esc(t)}">${esc(t)}</button>`).join('');
  const svcOptions = serviceOptions.map((s: unknown) => {
    const v = typeof s === 'string' ? s : s.value;
    return `<option value="${esc(v)}">${esc(v)}</option>`;
  }).join('');
  const locOptions = (locationOptions as unknown[]).map((s: unknown) => {
    const v = typeof s === 'string' ? s : s.value;
    return `<option value="${esc(v)}">${esc(v)}</option>`;
  }).join('');
  return `<form class="quote-form" id="${id}-form" data-quote-form novalidate>
    <div class="quote-head">
      <p class="quote-kicker">Project enquiry</p>
      <h3 class="quote-title">${esc(opts.title ?? 'Request a site survey')}</h3>
      <span class="quote-badge">${icon('clock', 12, 'text-brand')} UAE business hours</span>
    </div>
    <p class="quote-help">A few details are enough to get started. If you have drawings or photos, mention them and we will request them by email.</p>
    <div class="quote-intents" role="group" aria-label="What do you need?">${intentChips}</div>
    <div class="quote-grid">
      <label class="field-label" for="${id}-name">Name <span class="req">*</span></label>
      <input class="field" id="${id}-name" name="name" type="text" required autocomplete="name" placeholder="Your full name" />
      <label class="field-label" for="${id}-company">Company</label>
      <input class="field" id="${id}-company" name="company" type="text" autocomplete="organization" placeholder="Company name" />
      <label class="field-label" for="${id}-email">Email <span class="req">*</span></label>
      <input class="field" id="${id}-email" name="email" type="email" required autocomplete="email" placeholder="you@company.com" />
      <label class="field-label" for="${id}-phone">Phone <span class="req">*</span></label>
      <input class="field" id="${id}-phone" name="phone" type="tel" required autocomplete="tel" placeholder="+971 00 000 0000" />
      <label class="field-label" for="${id}-location">Location</label>
      <select class="field" id="${id}-location" name="location"><option value="">Select location</option>${locOptions}</select>
      <label class="field-label" for="${id}-service">Service interest</label>
      <select class="field" id="${id}-service" name="service"><option value="">Select service</option>${svcOptions}</select>
      <label class="field-label" for="${id}-message">What is changing?</label>
      <textarea class="field quote-message" id="${id}-message" name="message" rows="4" placeholder="For example: new office fit-out, 12 cameras, 4 access doors, existing cabling needs review."></textarea>
      <label class="quote-consent"><input type="checkbox" id="${id}-consent" name="consent" required /> <span>I agree to be contacted about this enquiry. <a href="${rel(page.path, 'privacy-policy/index.html')}">Privacy notice</a></span></label>
    </div>
    <button class="btn btn-signal btn-lg quote-submit" type="submit">${icon('mail', 16)} Prepare my enquiry</button>
    <p class="quote-status" data-quote-status role="status" aria-live="polite"></p>
  </form>`;
}

function contactCta(page: Page): string {
  return `<section id="contact-cta" class="section-cta">
  <div class="cta-bg" aria-hidden="true"></div>
  <div class="shell">
    <div class="cta-grid">
      <div class="cta-copy">
        <span class="eyebrow">Let&apos;s talk</span>
        <h2 class="sec-title">Let&apos;s protect what matters to your business.</h2>
        <p class="sec-lede">Tell us what is changing — a new office, a system upgrade, a recurring maintenance issue, or a requirement you are still shaping. We will help you scope the next step.</p>
        <div class="cta-quick">
          <a class="cta-quick-item" href="${contact.phoneHref}">${icon('phone', 18, 'text-signal')}<span><span class="cta-quick-label">Call</span><span class="cta-quick-value">${esc(contact.phoneDisplay)}</span></span></a>
          <a class="cta-quick-item" href="${contact.whatsapp}" target="_blank" rel="noreferrer noopener">${icon('whatsapp', 18, 'text-signal')}<span><span class="cta-quick-label">WhatsApp</span><span class="cta-quick-value">Dubai team</span></span></a>
          <a class="cta-quick-item" href="mailto:${contact.email}">${icon('mail', 18, 'text-signal')}<span><span class="cta-quick-label">Email</span><span class="cta-quick-value">${esc(contact.email)}</span></span></a>
        </div>
      </div>
      <div class="cta-form-wrap">${quoteForm(page, { id: 'quote' })}</div>
    </div>
  </div>
</section>`;
}

/* ----------------------------------------------------------- page builders */

function pageHero(page: Page): string {
  return `<section class="page-hero">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="shell page-hero-inner">
    ${breadcrumb(page)}
    ${page.eyebrow ? `<span class="eyebrow">${esc(page.eyebrow)}</span>` : ''}
    ${page.heading ? `<h1 class="page-title">${esc(page.heading)}</h1>` : `<h1 class="page-title">${esc(page.title)}</h1>`}
    ${page.intro ? `<p class="page-lede">${esc(page.intro)}</p>` : ''}
  </div>
</section>`;
}

function serviceCard(page: Page, s: { id?: string; title: string; icon: string }, href: string): string {
  return `<article class="svc-card"><span class="svc-icon">${icon(s.icon, 22)}</span><h3 class="svc-title">${esc(s.title)}</h3><a class="svc-link" href="${esc(rel(page.path, href))}">View service ${icon('arrowRight', 14)}</a></article>`;
}

function renderServicesIndex(page: Page): string {
  const core = services.map((s) => `<article class="svc-card">
    <span class="svc-icon">${icon(s.icon, 22)}</span>
    <h3 class="svc-title">${esc(s.title)}</h3>
    <p class="svc-short">${esc(s.short)}</p>
    <div class="svc-tags">${s.tags.slice(0, 2).map((t) => `<span class="svc-tag">${esc(t)}</span>`).join('')}</div>
    <a class="svc-link" href="${esc(rel(page.path, local(svcHref(s.id))))}">Explore service ${icon('arrowRight', 14)}</a>
  </article>`).join('');
  const groups = pages.filter((p) => p.kind === 'service' && p.detail && p.detail.icon !== 'monitor' || p.kind === 'service');
  const groupsByCategory = new Map<string, typeof pages>();
  for (const p of pages.filter((p) => p.kind === 'service')) {
    const cat = p.detail?.category ?? 'Connected capabilities';
    const arr = groupsByCategory.get(cat) ?? [];
    arr.push(p);
    groupsByCategory.set(cat, arr);
  }
  const catBlocks = [...groupsByCategory.entries()].map(([cat, ps]) => `
    <div class="dir-group">
      <p class="dir-group-label">${esc(cat)}</p>
      <div class="dir-grid">${ps.map((p) => `<a class="dir-card" href="${esc(rel(page.path, p.path))}">
        <span class="dir-icon">${icon(p.detail!.icon, 18)}</span>
        <span class="dir-name">${esc(p.title)}</span>
        <span class="dir-go">${icon('arrowRight', 14)}</span>
      </a>`).join('')}</div>
    </div>`).join('');
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell">
    <div class="sec-head"><div><span class="eyebrow">Connected capabilities</span><h2 class="sec-title">Eight service lines, one delivery team.</h2></div>
    <p class="sec-lede">From a camera on the wall to the cable in the ceiling — the systems your building depends on, specified to work together.</p></div>
    <div class="svc-grid">${core}</div>
  </div>
</section>
<section class="section-block section-block-mist">
  <div class="shell">
    <div class="sec-head"><div><span class="eyebrow">The full service directory</span><h2 class="sec-title">${serviceMenu.length} services, each with its own page.</h2></div>
    <p class="sec-lede">Browse the complete Hutaib service range below — security, workforce, infrastructure, connectivity and IT operations.</p></div>
    ${catBlocks}
  </div>
</section>
${contactCta(page)}
</main>`;
}

function renderServiceDetail(page: Page): string {
  const d = page.detail!;
  const svc = page.service;
  const related = pages.filter((p) => p.kind === 'service' && p.path !== page.path && p.detail?.category === d.category).slice(0, 4);
  const more = related.length ? `<div class="rel-grid">${related.map((p) => `<a class="rel-card" href="${esc(rel(page.path, p.path))}"><span class="rel-icon">${icon(p.detail!.icon, 18)}</span><span><span class="rel-name">${esc(p.title)}</span><span class="rel-go">${icon('arrowRight', 14)}</span></span></a>`).join('')}</div>` : '';
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell svc-detail">
    <div class="svc-detail-main">
      <div class="svc-detail-intro"><span class="eyebrow">${esc(d.category)}</span><h2 class="sec-title">${esc(page.title)}</h2><p class="sec-lede">${esc(d.intro)}</p></div>
      <h3 class="detail-h3">What this service covers</h3>
      <ul class="detail-list">${d.bullets.map((b) => `<li>${icon('check', 16, 'text-signal')}<span>${esc(b)}</span></li>`).join('')}</ul>
      ${svc?.description ? `<h3 class="detail-h3">How we deliver it</h3><p class="detail-text">${esc(svc.description)}</p>` : ''}
      <div class="detail-cta">
        <a class="btn btn-signal" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('sparkles', 15)} Request a survey ${icon('arrowRight', 15)}</a>
        <a class="btn btn-outline-dark" href="${contact.phoneHref}">${icon('phone', 15)} Call ${esc(contact.phoneDisplay)}</a>
      </div>
    </div>
    <aside class="svc-detail-side">
      <figure class="detail-figure"><img src="${esc(rel(page.path, asset(d.image)))}" alt="${esc(page.title)} — delivered by Hutaib InfoTech Solutions" width="900" height="675" loading="lazy" decoding="async" /></figure>
      <div class="detail-card">
        <p class="detail-card-kicker">Planning this service?</p>
        <p class="detail-card-text">Share your site, existing systems and timing. We confirm the survey, design and delivery programme in writing.</p>
        <a class="btn btn-brand btn-sm" href="${rel(page.path, 'contact-us/index.html#quote')}">Start a conversation ${icon('arrowRight', 14)}</a>
      </div>
    </aside>
  </div>
</section>
<section class="section-block section-block-mist">
  <div class="shell">
    <div class="sec-head"><div><span class="eyebrow">Related services</span><h2 class="sec-title">Explore the connected systems.</h2></div></div>
    ${more}
  </div>
</section>
</main>`;
}

function renderAbout(page: Page): string {
  const isVerticals = page.path === 'services/verticals/index.html';
  const intro = page.intro ?? '';
  if (isVerticals) {
    const cards = industries.map((i) => `<article class="ind-card"><span class="ind-icon">${icon(i.icon, 20)}</span><h3 class="ind-name">${esc(i.name)}</h3><p class="ind-body">${esc(i.body)}</p></article>`).join('');
    return `<main id="main">
${pageHero(page)}
<section class="section-block"><div class="shell"><div class="ind-grid">${cards}</div>
<div class="ind-cta">${link(page, 'contact-us/index.html#quote', 'Discuss your industry', 'btn btn-brand')}${link(page, 'services/index.html', 'Browse services', 'btn btn-outline-dark')}</div></div></section>
${contactCta(page)}</main>`;
  }
  const paras: Record<string, string[]> = {
    'about-us/awards-accolades/index.html': [
      'Recognition only matters if it reflects how work is actually delivered. The ISO 9001:2015 credential featured in the new design stands for a documented approach: a clear scope before work starts, controlled project records through installation, and a tested handover at the end.',
      'We keep the focus on delivery quality rather than a wall of certificates. Client feedback is captured after each project, and the same team that surveys and installs stays available for support afterwards.',
    ],
    'about-us/brand-logo-philosophy/index.html': [
      'Security Solutions Dubai is a Hutaib InfoTech Solutions brand. The new visual direction brings a confident navy foundation, blue technology accents and an orange signal colour into one consistent experience — across the website, proposals and project documentation.',
      'The philosophy behind it is simple: one accountable team for security, networking and IT. No hand-offs between vendors, no surprise variations at handover — just a clear scope and a team that answers after go-live.',
    ],
    'about-us/hutaib-awarded-iso-90012015-certification/index.html': [
      'ISO 9001:2015 is a quality-management standard built around doing what you said you would do, and improving how you do it. For a systems integrator that means a controlled process from the first conversation to the final commissioning record.',
      'In practice it looks like: a survey before equipment is specified, a written design and equipment list, controlled change management if the scope moves, and documented training at handover. The credential shown in this preview is the ISO 9001:2015 certification presented in the new design.',
    ],
    'about-us/qhse-policy/index.html': [
      'Quality, Health, Safety & Environment — QHSE — is how we keep projects safe to deliver and reliable to operate. A responsible installation considers the people who install the system, the people who use it, and the environment the work happens in.',
      'This preview presents a proposed QHSE framework covering quality-controlled delivery, safe working practices on site, responsible handling of materials and waste, and continuous improvement through project reviews. Final policy documents are issued with the project pack.',
    ],
  };
  const paragraphs = paras[page.path] ?? [intro];
  const bullets: Record<string, string[]> = {
    'about-us/awards-accolades/index.html': ['ISO 9001:2015 certification presented in the new design', 'Documented delivery: survey → design → install → test → handover', 'Client feedback captured after each project'],
    'about-us/brand-logo-philosophy/index.html': ['One delivery team for security, networking and IT', 'Survey-led, documented delivery', 'Support after go-live with maintenance options'],
    'about-us/hutaib-awarded-iso-90012015-certification/index.html': ['Clear scope approved before equipment is ordered', 'Controlled project records and change management', 'Tested handover with training and as-built documents'],
    'about-us/qhse-policy/index.html': ['Quality: documented delivery and project review', 'Health & safety: safe working practices for installations', 'Environment: responsible material handling and waste', 'Continuous improvement: feedback and post-project review'],
  };
  const notes: Record<string, string> = {
    'about-us/awards-accolades/index.html': 'Recognition shown in this preview is limited to the ISO 9001:2015 credential featured in the design. Additional awards will be added once confirmed.',
    'about-us/hutaib-awarded-iso-90012015-certification/index.html': 'Approval note: the ISO badge artwork supplied references 2008, while the copy states 9001:2015 — please confirm the final artwork before production.',
    'about-us/qhse-policy/index.html': 'The QHSE text presented here is a proposed framework for approval. The final policy document is issued with the project pack.',
  };
  const ul = bullets[page.path] ?? [];
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell about-grid">
    <div class="about-main">
      ${paragraphs.map((p) => `<p class="about-p">${esc(p)}</p>`).join('')}
      ${ul.length ? `<h3 class="detail-h3">What to expect</h3><ul class="detail-list">${ul.map((b) => `<li>${icon('check', 16, 'text-signal')}<span>${esc(b)}</span></li>`).join('')}</ul>` : ''}
      ${notes[page.path] ? `<p class="approval-note">${icon('sparkles', 14, 'text-signal')} ${esc(notes[page.path])}</p>` : ''}
      <div class="detail-cta">
        <a class="btn btn-signal" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('sparkles', 15)} Talk to the team ${icon('arrowRight', 15)}</a>
        <a class="btn btn-outline-dark" href="${rel(page.path, 'how-it-works/index.html')}">How we work</a>
      </div>
    </div>
    <aside class="about-side">
      <figure class="detail-figure"><img src="${esc(rel(page.path, asset(page.image || 'people')))}" alt="${esc(page.title)}" width="900" height="675" loading="lazy" decoding="async" /></figure>
      <div class="detail-card">
        <p class="detail-card-kicker">About Hutaib</p>
        <p class="detail-card-text">Security, networking and IT infrastructure delivered by one accountable team across the UAE — Dubai HQ, with regional support in Saudi Arabia and Oman.</p>
        <a class="btn btn-brand btn-sm" href="${rel(page.path, 'about-us/index.html')}">Read more about us ${icon('arrowRight', 14)}</a>
      </div>
    </aside>
  </div>
</section>
</main>`;
}

function renderProcess(page: Page): string {
  const steps = processSteps.map((s, idx) => {
    const durations = ['30 min call', '1–2 hrs', '2–3 days', 'By schedule', '1–2 days', 'Ongoing'];
    const outcomes = ['A short requirement brief and clear next step', 'Coverage, entry points and constraints documented', 'Right-sized design, equipment list and written scope', 'Installed to the approved plan with minimal disruption', 'Commissioning records, training and documentation', 'Preventive checks and responsive on-site support'];
    return `<article class="proc-step proc-step-lg">
    <span class="proc-num">${s.number}</span>
    <span class="proc-icon">${icon(s.icon, 20)}</span>
    <h3 class="proc-title">${esc(s.title)}</h3>
    <p class="proc-body">${esc(s.body)}</p>
    <div class="proc-out"><span class="proc-duration">${esc(durations[idx])} · Output</span><span class="proc-output">${esc(outcomes[idx])}</span></div>
  </article>`;
  }).join('');
  return `<main id="main">
${pageHero(page)}
<section class="section-block section-block-dark">
  <div class="process-bg" aria-hidden="true"></div>
  <div class="shell">
    <div class="sec-head sec-head-light"><div><span class="eyebrow">How we work</span><h2 class="sec-title">Six clear steps, from first call to aftercare.</h2></div>
    <p class="sec-lede">No vague quotes or surprise variations. Each stage has an owner, an output and your sign-off before we move forward.</p></div>
    <div class="proc-grid-lg">${steps}</div>
    <div class="proc-cta"><p><strong>Already have a system?</strong> We audit CCTV, access, networking and IT setups — keep what works, upgrade what does not.</p>
    <a class="btn btn-signal" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('sparkles', 15)} Request an audit ${icon('arrowRight', 15)}</a></div>
  </div>
</section>
</main>`;
}

function renderLocation(page: Page): string {
  const isUae = page.path === 'uae/index.html';
  if (isUae) {
    return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell loc-grid">
    <div class="about-main">
      <h2 class="sec-title">Dubai head office</h2>
      <p class="about-p">Level 33, Al Saqr Business Tower, Sheikh Zayed Road, Dubai, United Arab Emirates. The team plans surveys, designs and installations from here and visits sites across the Emirates by appointment.</p>
      <ul class="detail-list">${coverage.map((c) => `<li>${icon('pin', 16, 'text-signal')}<span>${esc(c)}</span></li>`).join('')}</li></ul>
      <h3 class="detail-h3">Sharjah office</h3>
      <p class="about-p">Office 105, Al Noor Tower, Arooba Street, Sharjah, UAE — for project coordination and client meetings in the eastern emirates.</p>
      <div class="detail-cta">
        <a class="btn btn-signal" href="${contact.mapsUrl}" target="_blank" rel="noreferrer noopener">${icon('pin', 15)} Open in maps</a>
        <a class="btn btn-outline-dark" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('sparkles', 15)} Book a site visit</a>
      </div>
    </div>
    <aside class="about-side">
      <figure class="detail-figure"><img src="${esc(rel(page.path, asset('skyline')))}" alt="UAE skyline — Hutaib InfoTech Solutions operates across the Emirates" width="900" height="675" loading="lazy" decoding="async" /></figure>
      <div class="detail-card">
        <p class="detail-card-kicker">Site visits by appointment</p>
        <p class="detail-card-text">Share your location, site access arrangements and the systems you are planning. We confirm survey availability for Dubai, the other emirates, Saudi Arabia and Oman.</p>
        <a class="btn btn-brand btn-sm" href="${rel(page.path, 'contact-us/index.html#quote')}">Request a survey ${icon('arrowRight', 14)}</a>
      </div>
    </aside>
  </div>
</section>
<section class="section-block section-block-mist">
  <div class="shell">
    <div class="sec-head"><div><span class="eyebrow">Regional support</span><h2 class="sec-title">Beyond the Emirates.</h2></div>
    <p class="sec-lede">We support security, networking and IT projects in Saudi Arabia and Oman from our Dubai base — survey access, installation and handover arranged per project.</p></div>
    <div class="rel-grid">
      <a class="rel-card" href="${rel(page.path, 'saudi-arabia/index.html')}"><span class="rel-icon">${icon('pin', 18)}</span><span><span class="rel-name">Saudi Arabia</span><span class="rel-go">${icon('arrowRight', 14)}</span></span></a>
      <a class="rel-card" href="${rel(page.path, 'oman/index.html')}"><span class="rel-icon">${icon('pin', 18)}</span><span><span class="rel-name">Oman</span><span class="rel-go">${icon('arrowRight', 14)}</span></span></a>
    </div>
  </div>
</section>
</main>`;
  }
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell loc-grid">
    <div class="about-main">
      <h2 class="sec-title">Regional project support</h2>
      <p class="about-p">We support security, networking and IT projects in ${esc(page.title)} from our Dubai head office. Every regional project starts with the same discipline: understand the site, document the requirement, agree the scope in writing — then deliver with the team that stays on after handover.</p>
      <h3 class="detail-h3">What to share with us</h3>
      <ul class="detail-list">
        <li>${icon('check', 16, 'text-signal')}<span>Site address and access arrangements for the survey</span></li>
        <li>${icon('check', 16, 'text-signal')}<span>Existing systems — cameras, doors, cabling, network, meeting rooms</span></li>
        <li>${icon('check', 16, 'text-signal')}<span>Planned timeline and any contract or compliance requirements</span></li>
      </ul>
      <div class="detail-cta">
        <a class="btn btn-signal" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('sparkles', 15)} Discuss your project ${icon('arrowRight', 15)}</a>
        <a class="btn btn-outline-dark" href="${contact.phoneHref}">${icon('phone', 15)} Call ${esc(contact.phoneDisplay)}</a>
      </div>
    </div>
    <aside class="about-side">
      <figure class="detail-figure"><img src="${esc(rel(page.path, asset(page.image || 'network')))}" alt="${esc(page.title)} — Hutaib InfoTech Solutions regional support" width="900" height="675" loading="lazy" decoding="async" /></figure>
      <div class="detail-card">
        <p class="detail-card-kicker">Dubai HQ · Regional delivery</p>
        <p class="detail-card-text">Survey access, equipment logistics, installation and handover are scoped per project. Warranty support and maintenance arrangements are confirmed in writing before work starts.</p>
        <a class="btn btn-brand btn-sm" href="${rel(page.path, 'uae/index.html')}">UAE coverage ${icon('arrowRight', 14)}</a>
      </div>
    </aside>
  </div>
</section>
</main>`;
}

function renderCareers(page: Page): string {
  const disciplines = [
    { i: 'shield', t: 'Security & surveillance', b: 'CCTV, access control, visitor management and perimeter systems — survey, design, install and support.' },
    { i: 'network', t: 'Networking & wireless', b: 'Structured cabling, enterprise LAN/Wi-Fi, racks, fibre and secure site connectivity.' },
    { i: 'server', t: 'IT infrastructure', b: 'Server rooms, storage, backup, telephony, endpoint and email security.' },
    { i: 'monitor', t: 'Meeting-room technology', b: 'Room booking, displays, video conferencing and unified communications.' },
    { i: 'clipboard', t: 'Project delivery', b: 'Surveys, designs, specifications, installation coordination and handover documentation.' },
    { i: 'headset', t: 'Client support', b: 'Helpdesk support, AMC renewals, remote assistance and on-site maintenance.' },
  ];
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell">
    <div class="sec-head"><div><span class="eyebrow">Join the team</span><h2 class="sec-title">Build systems people depend on.</h2></div>
    <p class="sec-lede">Good projects need curious people, careful planning and a team that takes ownership. If you work in security, networking or IT infrastructure, we would like to hear from you.</p></div>
    <div class="why-grid">${disciplines.map((d) => `<article class="why-card"><span class="why-icon">${icon(d.i, 20)}</span><h3 class="why-title">${esc(d.t)}</h3><p class="why-body">${esc(d.b)}</p></article>`).join('')}</div>
  </div>
</section>
<section class="section-block section-block-mist">
  <div class="shell">
    <div class="sec-head"><div><span class="eyebrow">What we look for</span><h2 class="sec-title">Detail-focused, accountable people.</h2></div></div>
    <ul class="detail-list detail-list-lg">
      <li>${icon('check', 18, 'text-signal')}<span>Comfortable on site — surveys, installs and commissioning</span></li>
      <li>${icon('check', 18, 'text-signal')}<span>Documentation skills — scopes, drawings, as-built records</span></li>
      <li>${icon('check', 18, 'text-signal')}<span>Communication with clients and project teams</span></li>
      <li>${icon('check', 18, 'text-signal')}<span>A maintenance mindset — support after go-live matters</span></li>
    </ul>
    <div class="detail-cta">
      <a class="btn btn-signal" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('mail', 15)} Send your details ${icon('arrowRight', 15)}</a>
      <a class="btn btn-outline-dark" href="mailto:${contact.email}?subject=Career%20enquiry%20—%20Hutaib%20InfoTech">Email the team directly</a>
    </div>
  </div>
</section>
</main>`;
}

function renderContact(page: Page): string {
  const cards = [
    { i: 'phone', t: 'Call us', v: contact.phoneDisplay, h: contact.phoneHref },
    { i: 'whatsapp', t: 'WhatsApp', v: 'Dubai team', h: contact.whatsapp },
    { i: 'mail', t: 'Email', v: contact.email, h: `mailto:${contact.email}` },
    { i: 'clock', t: 'Availability', v: contact.hours, h: contact.phoneHref },
  ];
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell loc-grid">
    <div class="about-main">
      <h2 class="sec-title">Talk to the Dubai team.</h2>
      <p class="about-p">A new office, an upgrade or a recurring issue — tell us what is changing. We will help you frame the next step, whether that is a site survey, a design or a maintenance plan.</p>
      <div class="nap-grid">${cards.map((c) => `<a class="nap-card" href="${esc(c.h)}"${c.h.startsWith('http') ? ' target="_blank" rel="noreferrer noopener"' : ''}><span class="nap-icon">${icon(c.i, 20)}</span><span><span class="nap-label">${esc(c.t)}</span><span class="nap-value">${esc(c.v)}</span></span></a>`).join('')}</div>
      <h3 class="detail-h3">Offices</h3>
      <ul class="detail-list">
        <li>${icon('pin', 16, 'text-signal')}<span>Dubai — ${esc(contact.address)}</span></li>
        <li>${icon('pin', 16, 'text-signal')}<span>Sharjah — ${esc(contact.sharjahAddress)}</span></li>
        <li>${icon('pin', 16, 'text-signal')}<span>Regional support — Saudi Arabia &amp; Oman</span></li>
      </ul>
      <div class="detail-cta">
        <a class="btn btn-signal" href="${contact.mapsUrl}" target="_blank" rel="noreferrer noopener">${icon('pin', 15)} Open in maps</a>
        <a class="btn btn-outline-dark" href="${rel(page.path, 'uae/index.html')}">View locations</a>
      </div>
    </div>
    <aside class="about-side">
      <figure class="detail-figure"><img src="${esc(rel(page.path, asset(page.image || 'skyline')))}" alt="Hutaib InfoTech Solutions — Dubai head office" width="900" height="675" loading="lazy" decoding="async" /></figure>
      ${quoteForm(page, { id: 'contact', title: 'Request a site survey' })}
    </aside>
  </div>
</section>
</main>`;
}

function renderBlog(page: Page): string {
  const cards = (globalThis as unknown as { __articles?: { slug: string; title: string; description: string; category: string; icon: string; image: string }[] }).__articles ?? [];
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell">
    <div class="blog-grid">${cards.map((a) => `<article class="blog-card">
      <a class="blog-img" href="${esc(rel(page.path, `blog/${a.slug}/index.html`))}"><img src="${esc(rel(page.path, asset(a.image)))}" alt="${esc(a.title)}" width="640" height="420" loading="lazy" decoding="async" /></a>
      <div class="blog-body"><p class="blog-cat">${esc(a.category)}</p><h2 class="blog-title"><a href="${esc(rel(page.path, `blog/${a.slug}/index.html`))}">${esc(a.title)}</a></h2><p class="blog-desc">${esc(a.description)}</p><a class="blog-read" href="${esc(rel(page.path, `blog/${a.slug}/index.html`))}">Read guide ${icon('arrowRight', 14)}</a></div>
    </article>`).join('')}</div>
  </div>
</section>
<section class="section-block section-block-mist">
  <div class="shell">
    <div class="sec-head"><div><span class="eyebrow">Before your survey</span><h2 class="sec-title">Planning guides &amp; checklists.</h2></div>
    <p class="sec-lede">Use the Resources page to prepare a clearer brief — coverage, doors, cabling, wireless and handover all have a checklist.</p></div>
    <div class="rel-grid">
      <a class="rel-card" href="${rel(page.path, 'resources/index.html')}"><span class="rel-icon">${icon('layers', 18)}</span><span><span class="rel-name">Browse planning resources</span><span class="rel-go">${icon('arrowRight', 14)}</span></span></a>
      <a class="rel-card" href="${rel(page.path, 'services/index.html')}"><span class="rel-icon">${icon('shield', 18)}</span><span><span class="rel-name">Explore services</span><span class="rel-go">${icon('arrowRight', 14)}</span></span></a>
    </div>
  </div>
</section>
</main>`;
}

function renderArticle(page: Page): string {
  const a = page.article!;
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell article">
    <div class="article-main">
      <div class="article-meta"><span class="article-cat">${esc(a.category)}</span><span class="article-date">Planning guide · February 2026</span></div>
      ${a.sections.map((s, idx) => `<div class="article-section">
        <h2 class="article-h2">${idx === 0 ? '01 · ' : '0' + (idx + 1) + ' · '}${esc(s.title)}</h2>
        <p class="article-p">${esc(s.text)}</p>
        ${s.bullets ? `<ul class="detail-list">${s.bullets.map((b) => `<li>${icon('check', 16, 'text-signal')}<span>${esc(b)}</span></li>`).join('')}</ul>` : ''}
      </div>`).join('')}
      <div class="detail-cta">
        <a class="btn btn-signal" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('sparkles', 15)} Get a survey ${icon('arrowRight', 15)}</a>
        <a class="btn btn-outline-dark" href="${rel(page.path, 'blog/index.html')}">More guides</a>
      </div>
    </div>
    <aside class="article-side">
      <figure class="detail-figure"><img src="${esc(rel(page.path, asset(a.image)))}" alt="${esc(a.title)}" width="900" height="675" loading="lazy" decoding="async" /></figure>
      <div class="detail-card">
        <p class="detail-card-kicker">Planning a project?</p>
        <p class="detail-card-text">Share your site and timing — we confirm the survey, design and delivery programme in writing.</p>
        <a class="btn btn-brand btn-sm" href="${rel(page.path, 'contact-us/index.html#quote')}">Start a conversation ${icon('arrowRight', 14)}</a>
      </div>
    </aside>
  </div>
</section>
</main>`;
}

function renderResources(page: Page): string {
  const guides = (globalThis as unknown as { __articles?: { slug: string; title: string; description: string; category: string; icon: string }[] }).__articles ?? [];
  const checklists = [
    { i: 'camera', t: 'CCTV & surveillance', items: ['Define the view each camera must show', 'Confirm day/night lighting at each viewpoint', 'Agree retention, who may view and export', 'Agree support and health-check arrangements'] },
    { i: 'fingerprint', t: 'Access control', items: ['List every controlled door and its purpose', 'Confirm credential types and time zones', 'Agree emergency release behaviour with specialists', 'Define the joiner/mover/leaver process'] },
    { i: 'network', t: 'Networking & Wi-Fi', items: ['Inventory users, devices and critical applications', 'Confirm cabling, rack and switch capacity', 'Segment staff, guest and operational networks', 'Agree validation method before installation'] },
    { i: 'building', t: 'Office fit-out', items: ['Coordinate architectural, electrical and technology drawings', 'Confirm building entry point and carrier lead times', 'Book installation and test dates before the move', 'Test the full user journey before occupation'] },
    { i: 'monitor', t: 'Meeting rooms', items: ['Confirm room size, table layout and display position', 'Test booking, room status and the start sequence', 'Label inputs and provide a start guide', 'Nominate a room owner for checks and reporting'] },
    { i: 'wrench', t: 'Handover & maintenance', items: ['Complete the asset register with serials and licences', 'Agree support scope, exclusions and escalation', 'Document preventive checks and reporting format', 'Update records when equipment or layouts change'] },
  ];
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell">
    <div class="sec-head"><div><span class="eyebrow">Project planning</span><h2 class="sec-title">A clearer brief starts here.</h2></div>
    <p class="sec-lede">Straightforward checklists and planning notes, organised around the decisions you need to make before work begins.</p></div>
    <div class="dir-grid dir-grid-lg">${checklists.map((c) => `<article class="dir-card dir-card-lg"><span class="dir-icon">${icon(c.i, 20)}</span><h3 class="dir-name">${esc(c.t)}</h3><ul class="check-list">${c.items.map((it) => `<li>${icon('check', 14, 'text-signal')}${esc(it)}</li>`).join('')}</ul></article>`).join('')}</div>
  </div>
</section>
<section class="section-block section-block-mist">
  <div class="shell">
    <div class="sec-head"><div><span class="eyebrow">Guides</span><h2 class="sec-title">Read the planning guides.</h2></div></div>
    <div class="blog-grid blog-grid-sm">${guides.map((a) => `<article class="blog-card blog-card-sm">
      <div class="blog-body"><p class="blog-cat">${esc(a.category)}</p><h2 class="blog-title"><a href="${esc(rel(page.path, `blog/${a.slug}/index.html`))}">${esc(a.title)}</a></h2><p class="blog-desc">${esc(a.description)}</p><a class="blog-read" href="${esc(rel(page.path, `blog/${a.slug}/index.html`))}">Read guide ${icon('arrowRight', 14)}</a></div>
    </article>`).join('')}</div>
  </div>
</section>
<section class="section-block">
  <div class="shell">
    <div class="detail-cta detail-cta-lg">
      <p class="sec-title">Ready to start?</p>
      <div><a class="btn btn-signal" href="${rel(page.path, 'contact-us/index.html#quote')}">${icon('sparkles', 15)} Request a site survey ${icon('arrowRight', 15)}</a>
      <a class="btn btn-outline-dark" href="${rel(page.path, 'services/index.html')}">Explore services</a></div>
    </div>
  </div>
</section>
</main>`;
}

function renderLegal(page: Page): string {
  const body: Record<string, string> = {
    'privacy-policy/index.html': `This privacy notice applies to the static HTML approval preview of the Security Solutions Dubai website, provided by Hutaib InfoTech Solutions for client review. It describes how this preview handles the information you enter.

<h3>The enquiry form</h3>
The contact and enquiry forms in this preview do not transmit data to a server. When you submit the form, your browser opens a prepared email addressed to ${contact.email} containing the details you entered. No form data is stored by this static website. In the production WordPress build, the form will be connected to a configured delivery method, and this notice will be replaced by the approved production privacy policy.

<h3>Local files</h3>
The preview uses your browser's local storage only to remember that you dismissed the preview notice banner. It does not track you, create advertising profiles or share information with third parties.

<h3>Third-party links</h3>
The preview links to WhatsApp, Facebook, X (Twitter), Google Maps and email. These services have their own privacy policies, which apply when you use them. The preview does not embed third-party tracking scripts.

<h3>Images and content</h3>
Project photography and client logos shown in the preview are presented for approval. Final image rights, client consent and any licensing confirmations are handled before publication of the live website.

<h3>Your choices</h3>
You can decline to use the forms and contact the team directly by phone or WhatsApp. You can clear local storage in your browser settings at any time.`,
    'terms/index.html': `These terms apply to the static HTML approval preview of the Security Solutions Dubai website, provided by Hutaib InfoTech Solutions for review purposes.

<h3>Purpose of this preview</h3>
This package is provided to review the proposed website design, navigation, content structure and imagery before the production WordPress build. It is a design and approval preview — not the live website and not a service agreement.

<h3>Content status</h3>
Some service descriptions, policy pages and editorial content in this preview are proposed wording prepared for approval. Content that requires confirmation — including awards, policy documents, client endorsements and image rights — is marked or noted in the review materials. Nothing in this preview constitutes a warranty, guarantee or contractual commitment.

<h3>Forms</h3>
The enquiry form prepares an email rather than transmitting data automatically. No response time, availability or commitment is implied by using the form. To engage the team, use the contact details provided.

<h3>Links</h3>
External links (WhatsApp, social media, maps and email) are provided for convenience and are not endorsements. The preview does not embed third-party tracking.

<h3>Intellectual property</h3>
The design, layout, copy and imagery in this preview are the property of Hutaib InfoTech Solutions and are provided for review only. Client logos and project photography are shown for approval and may not be reused without consent.`,
  };
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell article article-legal">
    <div class="article-main">
      <div class="article-meta"><span class="article-cat">Legal</span><span class="article-date">Static preview · for approval</span></div>
      ${body[page.path] ?? '<p class="article-p">Legal content for this page is provided with the production build.</p>'}
      <div class="detail-cta">
        <a class="btn btn-outline-dark" href="${rel(page.path, 'contact-us/index.html')}">Contact the team</a>
        <a class="btn btn-brand" href="${rel(page.path, 'index.html')}">Back to home</a>
      </div>
    </div>
  </div>
</section>
</main>`;
}

function renderSitemap(page: Page): string {
  const groups: Record<string, { kind: Page['kind']; label: string }[]> = {};
  const g = (k: Page['kind'], label: string) => { (groups[label] ??= []).push({ kind: k, label }); };
  const home = pages.find((p) => p.kind === 'home')!;
  g('home', 'Home');
  const about = pages.filter((p) => p.kind === 'about' || p.kind === 'process');
  g('about', 'Company');
  const svc = pages.filter((p) => p.kind === 'service' || p.kind === 'services');
  g('services', 'Services');
  const loc = pages.filter((p) => p.kind === 'location');
  g('location', 'Locations');
  const misc = pages.filter((p) => p.kind === 'blog' || p.kind === 'article' || p.kind === 'resources');
  g('blog', 'Insights & resources');
  const other = pages.filter((p) => p.kind === 'careers' || p.kind === 'contact' || p.kind === 'legal' || p.kind === 'sitemap' || p.kind === 'notfound');
  g('contact', 'Other');
  const blocks = [
    { label: 'Home', items: [home] },
    { label: 'Company', items: about },
    { label: 'Services', items: svc },
    { label: 'Locations', items: loc },
    { label: 'Insights & resources', items: misc },
    { label: 'Other', items: other },
  ].map(({ label, items }) => `<div class="sm-group"><p class="sm-label">${esc(label)} · ${items.length}</p><ul class="sm-list">${items.map((p) => `<li><a href="${esc(rel(page.path, p.path))}">${esc(p.title)}</a></li>`).join('')}</ul></div>`).join('');
  return `<main id="main">
${pageHero(page)}
<section class="section-block">
  <div class="shell">
    <div class="sm-grid">${blocks}</div>
    <p class="sm-total">${pages.length} pages in this preview package</p>
  </div>
</section>
</main>`;
}

function render404(page: Page): string {
  return `<main id="main">
<section class="page-hero page-hero-404">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="shell page-hero-inner">
    <span class="eyebrow">404 · Page not found</span>
    <h1 class="page-title">That page is not on the plan.</h1>
    <p class="page-lede">The link may be out of date. Head back to the homepage or explore the service directory.</p>
    <div class="detail-cta">
      <a class="btn btn-signal" href="${rel(page.path, 'index.html')}">${icon('arrowRight', 15)} Back to home</a>
      <a class="btn btn-outline-light" href="${rel(page.path, 'services/index.html')}">Browse services</a>
      <a class="btn btn-outline-light" href="${rel(page.path, 'sitemap.html')}">Open sitemap</a>
    </div>
  </div>
</section>
</main>`;
}

/* ------------------------------------------------------------ main render */

async function main() {
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });
  await publishAllAssets();

  // compile CSS
  const css = `@import "../src/index.css";\n@source "../scripts";\n@source "../src";\n@source "../static";\n`;
  await fs.writeFile(path.resolve('static/input.css'), css);
  const result = await postcss([tailwindcss()]).process(css, { from: 'static/input.css' });
  const fontFace = `@font-face{font-family:"Manrope";font-style:normal;font-weight:400 800;font-display:swap;src:url("${asset('font')}") format("woff2");}`;
  const styles = await fs.readFile(path.resolve('static/styles.css'), 'utf8');
  await fs.writeFile(path.join(DIST, 'assets/app.css'), result.css + '\n' + fontFace + '\n' + styles, 'utf8');
  const mainJs = await fs.readFile(path.resolve('static/main.js'), 'utf8');
  await fs.writeFile(path.join(DIST, 'assets/main.js'), mainJs, 'utf8');
  const favicon = await fs.readFile(path.resolve('public/favicon.svg'), 'utf8');
  await fs.writeFile(path.join(DIST, 'favicon.svg'), favicon, 'utf8');

  // expose articles for page builders
  const { articles } = await import('../static/routes');
  (globalThis as unknown as { __articles: typeof articles }).__articles = articles;

  // sitemap.xml + robots.txt
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter((p) => p.kind !== 'notfound').map((p) => `<url><loc>${ORIGIN}/${p.path.replace(/index\.html$/, '')}</loc><changefreq>monthly</changefreq><priority>${p.kind === 'home' ? '1.0' : p.kind === 'services' || p.kind === 'service' ? '0.8' : '0.6'}</priority></url>`).join('\n')}\n</urlset>\n`;
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');
  await fs.writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`, 'utf8');

  // README
  const readme = `# Security Solutions Dubai — static HTML approval preview

Upload-ready static HTML build of the new website design, prepared for client approval before the production WordPress build (TheGem + WPBakery).

## What is inside
- \`index.html\` — homepage (hero, credentials, services, why us, process, industries, proof, FAQ, contact)
- \`about-us/\`, \`how-it-works/\`, \`services/\` (33 service pages + services overview)
- \`blog/\` (6 planning guides), \`resources/\`, \`careers/\`, \`contact-us/\`
- \`uae/\`, \`saudi-arabia/\`, \`oman/\` locations
- \`privacy-policy/\`, \`terms/\`, \`sitemap.html\`, \`404.html\`
- \`assets/\` — all images, fonts, compiled CSS and JavaScript

## How to upload
1. Extract the ZIP.
2. Upload the extracted folder to your web host (e.g. \`preview-2026/\` under the web root).
3. Open \`index.html\` — all navigation, images and links work from any folder level.
4. Keep \`sitemap.xml\` and \`robots.txt\` alongside the pages.

## Notes for the client review
- The enquiry form prepares an email to ${contact.email} rather than sending automatically. Delivery is connected during the production build.
- Client logos are shown for approval — final client consent is required before publication.
- The ISO badge artwork references 2008 while the copy states 9001:2015 — please confirm before production.
- Some service pages present proposed scope wording for approval; no certifications, client wins or response times beyond the approved copy have been added.

© Hutaib InfoTech Solutions — design preview for approval only.
`;
  await fs.writeFile(path.join(DIST, 'README.md'), readme, 'utf8');

  // render pages
  let count = 0;
  for (const page of pages) {
    let main = '';
    if (page.kind === 'home') main = [homeHero(page), servicesSection(page), whyUsSection(page), processSection(page), industriesSection(page), proofSection(page), faqSection(page), contactCta(page)].join('\n');
    else if (page.kind === 'services') main = renderServicesIndex(page);
    else if (page.kind === 'service') main = renderServiceDetail(page);
    else if (page.kind === 'about') main = renderAbout(page);
    else if (page.kind === 'process') main = renderProcess(page);
    else if (page.kind === 'location') main = renderLocation(page);
    else if (page.kind === 'careers') main = renderCareers(page);
    else if (page.kind === 'contact') main = renderContact(page);
    else if (page.kind === 'blog') main = renderBlog(page);
    else if (page.kind === 'article') main = renderArticle(page);
    else if (page.kind === 'resources') main = renderResources(page);
    else if (page.kind === 'legal') main = renderLegal(page);
    else if (page.kind === 'sitemap') main = renderSitemap(page);
    else if (page.kind === 'notfound') main = render404(page);

    const badge = page.kind === 'notfound' ? '' : `<script>window.__PREVIEW_BADGE__=true;</script>`;
    const html = `<!doctype html>
<html lang="en">
<head>
${head(page)}
</head>
<body>
${header(page)}
${main}
${footer(page)}
${badge}
<script src="${rel(page.path, 'assets/main.js')}" defer></script>
</body>
</html>`;
    const out = path.join(DIST, page.path);
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, html, 'utf8');
    count++;
  }
  console.log(`Rendered ${count} pages into ${path.relative(process.cwd(), DIST)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
