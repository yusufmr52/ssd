#!/usr/bin/env node
/**
 * Generates WPBakery 9.0.1 template JSONs for the Security Solutions Dubai child theme:
 *   - homepage.json   (distinct homepage layout)
 *   - inner-page.json (common inner-page layout, TheGem Theme Elements)
 *   - blog.json       (blog archive layout, TheGem Theme Elements)
 * Run: node scripts/build-wpbakery-templates.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';

const OUT = new URL('../wordpress-theme/security-solutions-dubai-child/templates/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const SITE = 'https://securitysolutionsdubai.com';
const THEME = '/wp-content/themes/security-solutions-dubai-child/assets/img';
const IMG = (name) => SITE + THEME + '/' + name;

/* ---------- builders ---------- */
const row = (elClass, children, extra = {}) => ({
  type: 'row',
  attrs: { class: 'vc_row ssdk-row', css_animation: '', el_class: elClass || '', ...extra },
  content: children,
});
const col = (width, elClass, children, extra = {}) => ({
  type: 'column',
  attrs: { width, css_animation: '', el_class: elClass || '', ...extra },
  content: children,
});
const text = (html, elClass = '') => ({
  type: 'text_block',
  attrs: { class: 'vc_text_block', css_animation: '', el_class: elClass },
  content: html,
});
const img = (url, alt, elClass = '') => ({
  type: 'image',
  attrs: {
    image: url,
    image_size: 'full',
    link: '',
    alt,
    title: '',
    css_animation: '',
    el_class: elClass,
    sc_img_effect: '',
  },
  content: '',
});
const btn = (url, label, elClass = '') => ({
  type: 'button',
  attrs: {
    link: url,
    text: label,
    style: 'flat',
    color: 'accent',
    custom_css: '',
    css_animation: '',
    el_class: elClass,
  },
  content: '',
});
const html = (markup, elClass = '') => ({
  type: 'custom_html',
  attrs: { html: markup, css_animation: '', el_class: elClass },
  content: '',
});

/* =====================================================================
   HOMEPAGE
   ===================================================================== */
const services = [
  {
    num: '01',
    title: 'CCTV & Video Surveillance',
    desc: 'IP and analog CCTV, solar &amp; 4G connectivity cameras, AI-driven analytics and remote monitoring for any site.',
    img: IMG('photo-cctv.webp'),
    link: SITE + '/services/cctv-security-surveillance/',
  },
  {
    num: '02',
    title: 'Access Control &amp; Door Systems',
    desc: 'Biometric, card and mobile access, multi-door controllers, visitor management and full audit trails.',
    img: IMG('photo-access.webp'),
    link: SITE + '/services/access-control-system/',
  },
  {
    num: '03',
    title: 'Wireless &amp; Networking',
    desc: 'Structured cabling, Wi-Fi coverage, point-to-point links and secure ICT infrastructure.',
    img: IMG('photo-network.webp'),
    link: SITE + '/services/wireless-solutions/',
  },
  {
    num: '04',
    title: 'Meeting Rooms &amp; PABX',
    desc: 'Video conferencing, room control, PABX telephony and unified communications.',
    img: IMG('photo-meeting.webp'),
    link: SITE + '/services/meeting-room-solutions/',
  },
];

const industries = [
  { title: 'Education', desc: 'Secure campuses, classrooms and student data.', img: IMG('photo-school.webp') },
  { title: 'Telecommunication', desc: 'Uptime-critical networks and controlled access.', img: IMG('photo-network.webp') },
  { title: 'Smart Cities', desc: 'Public-space surveillance and infrastructure.', img: IMG('photo-skyline.webp') },
  { title: 'Healthcare', desc: 'Protected facilities, records and equipment.', img: IMG('photo-cctv.webp') },
  { title: 'Government &amp; Public Sector', desc: 'Classified-grade security for public assets.', img: IMG('photo-access.webp') },
  { title: 'Commercial &amp; Corporate', desc: 'Offices, retail and multi-site enterprises.', img: IMG('photo-meeting.webp') },
];

const trust = [
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 3-3 3 3 5-6"/></svg>',
    title: 'Survey-led planning',
    desc: 'Every project starts with a site survey, risk assessment and written scope before anything is ordered.',
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/><path d="M3 9h6M15 9h6M9 3v6M9 15v6"/></svg>',
    title: 'Professional system design',
    desc: 'Engineered layouts, cabling schedules and device schedules reviewed with your team before installation.',
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    title: 'Installation &amp; integration',
    desc: 'Certified technicians install, configure and integrate systems into your existing infrastructure.',
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    title: 'Post-installation support',
    desc: 'Handover with training, documentation, and a support plan keeping systems running 24/7.',
  },
];

const testimonials = [
  {
    initials: 'CT',
    name: 'Ms. Catherine Pineda Tigas',
    role: 'Time attendance &amp; HR systems',
    text: '&ldquo;Very user-friendly Leave and Time Attendance Management Solutions. Their brilliant support team and quick turnover time make Employee Time Management most effective.&rdquo;',
  },
  {
    initials: 'IA',
    name: 'Ishraq Alkhufash',
    role: 'Client feedback',
    text: '&ldquo;Very good communication and fast in the response, trying the best to satisfy the customer. Providing the support and time flexibility according to our requirements.&rdquo;',
  },
  {
    initials: 'S',
    name: 'Siraj',
    role: 'AqsaCom',
    text: '&ldquo;Thanks a lot Hutaib. A very good service &mdash; we could deliver our critical project before timeline and our project manager was well informed on the proceedings.&rdquo;',
  },
  {
    initials: 'SA',
    name: 'Sathish Arya',
    role: 'WatchNET International Trading LLC',
    text: '&ldquo;Good initiative. Keep rocking, as this will have a lot of advantage &mdash; educating the customer and building the brand. All the best.&rdquo;',
  },
];

const partners = [
  'Avigilon', 'Mobotix', 'FingerTec', 'Evoko', 'Humly', 'Starlink',
  'SANGFOR', 'Alcatel Lucent', 'CAMBIUM', 'CISCO', 'EATON', 'FORTINET',
  'INFOSEC', 'NORDEN', 'VIRDI', 'WATCHNET', 'FUJITSU', 'Condeco',
  'ATLAS.ti', 'ABB', 'Supermicro', 'ISS',
];

const clients = [
  'deloitte', 'du', 'comguard', 'belleli', 'mubadala', 'weatherford',
  'arabtec', 'alnaboodah', 'alainhospital', 'averda',
];

const homeRows = [
  /* ---------- Hero ---------- */
  row('ssdk-hero', [
    col('6/10', '', [
      text(
        '<span class="ssdk-hero-eyebrow"><span class="dot"></span> Starlink is NOW in the UAE &mdash; ask us about satellite connectivity</span>' +
        '<h1>Security systems Dubai businesses <span class="accent">actually rely on</span></h1>' +
        '<p class="ssdk-hero-lead">From CCTV surveillance and access control to wireless infrastructure and meeting room technology &mdash; we design, install and support secure systems across the UAE, with ISO 9001:2015 quality management.</p>' +
        '<div class="ssdk-hero-stats">' +
        '<div class="ssdk-hero-stat"><div class="num">17+</div><div class="lab">Years in the UAE</div></div>' +
        '<div class="ssdk-hero-stat"><div class="num">500+</div><div class="lab">Projects delivered</div></div>' +
        '<div class="ssdk-hero-stat"><div class="num">ISO</div><div class="lab">9001:2015 certified</div></div>' +
        '</div>' +
        '<div class="ssdk-hero-actions">' +
        '<a class="ssdk-cta" href="' + SITE + '/contact-us/">Get a Quote</a>' +
        '<a class="ssdk-cta ssdk-cta-ghost" href="tel:+971503605274">Call us: +971 50 360 5274</a>' +
        '</div>'
      ),
    ]),
    col('4/10', '', [
      img(IMG('photo-hero.webp'), 'Dubai skyline with security systems', 'ssdk-hero-img'),
      html(
        '<div class="ssdk-hero-iso"><img src="' + IMG('iso-badge.png') + '" alt="ISO 9001:2015 certified" width="54" height="54" loading="lazy">' +
        '<div><div>ISO 9001:2015</div><div>Quality-managed delivery</div></div></div>'
      ),
    ]),
  ]),

  /* ---------- Trust strip ---------- */
  row('ssdk-trust', [
    col('1/1', 'ssdk-trust-inner', trust.map((t) =>
      col('1/4', '', [
        text(
          '<div class="ssdk-trust-item">' +
          '<span class="ssdk-trust-ic">' + t.icon + '</span>' +
          '<div><h3>' + t.title + '</h3><p>' + t.desc + '</p></div>' +
          '</div>'
        ),
      ])
    )),
  ]),
  row('ssdk-trust-cta-row', [
    col('1/1', '', [
      text('<div style="text-align:center;padding:10px 0 0"><a class="ssdk-cta" href="' + SITE + '/about-us/">Why Work With Hutaib?</a></div>'),
    ]),
  ]),

  /* ---------- Services ---------- */
  row('ssdk-section', [
    col('1/1', '', [
      text(
        '<div class="ssdk-section-head"><span class="ssdk-eyebrow">What we do</span>' +
        '<h2>One partner for every system your business relies on</h2>' +
        '<p>CCTV, access control, networking, meetings and telephony &mdash; engineered to work together, delivered on time, supported for years.</p></div>'
      ),
    ]),
  ]),
  row('ssdk-section', [
    col('1/1', 'ssdk-services-grid', services.map((s) =>
      row('ssdk-service-card', [
        col('4/10', '', [img(s.img, s.title.replace(/&amp;/g, '&'), 'ssdk-service-card-img')]),
        col('6/10', '', [
          text(
            '<div class="ssdk-service-card-body">' +
            '<div class="ssdk-service-num">' + s.num + '</div>' +
            '<h3>' + s.title + '</h3>' +
            '<p>' + s.desc + '</p>' +
            '<a class="ssdk-service-link" href="' + s.link + '">Learn more</a>' +
            '</div>'
          ),
        ]),
      ])
    )),
    col('1/1', '', [
      text('<div style="text-align:center"><a class="ssdk-cta-ghost" href="' + SITE + '/services/">Explore all services &rarr;</a></div>'),
    ]),
  ]),

  /* ---------- Industries ---------- */
  row('ssdk-section ssdk-alt', [
    col('1/1', '', [
      text(
        '<div class="ssdk-section-head"><span class="ssdk-eyebrow">Industries we serve</span>' +
        '<h2>Security and connectivity for every sector</h2>' +
        '<p>One proven approach across the UAE&rsquo;s most demanding environments.</p></div>'
      ),
    ]),
  ]),
  row('ssdk-section ssdk-alt', [
    col('1/1', 'ssdk-industries-grid', industries.map((ind) =>
      col('1/3', 'ssdk-industry-cell', [
        img(ind.img, ind.title.replace(/&amp;/g, '&'), 'ssdk-industry-card'),
        html(
          '<div class="ssdk-industry-body"><h3>' + ind.title + '</h3><p>' + ind.desc + '</p></div>'
        ),
      ])
    )),
  ]),

  /* ---------- Why us ---------- */
  row('ssdk-section', [
    col('1/1', '', [
      text(
        '<div class="ssdk-section-head"><span class="ssdk-eyebrow">Why Hutaib</span>' +
        '<h2>Delivered with the discipline of a certified partner</h2></div>'
      ),
    ]),
    col('1/1', 'ssdk-why-grid', [
      col('1/4', '', [text('<div class="ssdk-why-card"><div class="ssdk-why-num">01</div><h3>ISO 9001:2015 Certified</h3><p>Quality-managed delivery: documented scope, controlled project records, tested handover.</p></div>')]),
      col('1/4', '', [text('<div class="ssdk-why-card"><div class="ssdk-why-num">02</div><h3>17+ Years in the UAE</h3><p>Local presence, local stock, local engineers &mdash; from Dubai to every emirate.</p></div>')]),
      col('1/4', '', [text('<div class="ssdk-why-card"><div class="ssdk-why-num">03</div><h3>500+ Projects Delivered</h3><p>From single-door offices to multi-site enterprise rollouts.</p></div>')]),
      col('1/4', '', [text('<div class="ssdk-why-card"><div class="ssdk-why-num">04</div><h3>24/7 Support &amp; Maintenance</h3><p>Real humans on call, rapid response, and preventive maintenance plans.</p></div>')]),
    ]),
  ]),

  /* ---------- Process ---------- */
  row('ssdk-process', [
    col('1/1', '', [
      text(
        '<div class="ssdk-section-head"><span class="ssdk-eyebrow" style="background:rgba(255,255,255,.12);color:#FFD9A8">How it works</span>' +
        '<h2>From first survey to long-term support</h2></div>'
      ),
    ]),
    col('1/1', 'ssdk-process-track', [
      col('1/4', '', [
        text('<div class="ssdk-process-step"><span class="ssdk-process-ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFD9A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 3-3 3 3 5-6"/></svg></span><h3>Site Survey</h3><p>On-site risk assessment, cabling survey and requirements workshop.</p></div>'),
      ]),
      col('1/4', '', [
        text('<div class="ssdk-process-step"><span class="ssdk-process-ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFD9A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg></span><h3>System Design</h3><p>Engineered design, device schedule and budget &mdash; approved before installation.</p></div>'),
      ]),
      col('1/4', '', [
        text('<div class="ssdk-process-step"><span class="ssdk-process-ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFD9A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span><h3>Installation &amp; Integration</h3><p>Certified technicians install, configure and integrate with your systems.</p></div>'),
      ]),
      col('1/4', '', [
        text('<div class="ssdk-process-step"><span class="ssdk-process-ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFD9A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></span><h3>Support &amp; Maintenance</h3><p>Training, documentation, 24/7 monitoring and preventive maintenance.</p></div>'),
      ]),
    ]),
  ]),

  /* ---------- Testimonials ---------- */
  row('ssdk-section', [
    col('1/1', '', [
      text(
        '<div class="ssdk-section-head"><span class="ssdk-eyebrow">Client feedback</span>' +
        '<h2>Trusted for the systems that cannot afford to fail</h2></div>'
      ),
    ]),
    col('1/1', 'ssdk-testimonials-slider', [
      ...testimonials.map((t) =>
        text(
          '<div class="ssdk-testimonial" role="listitem">' +
          '<p class="ssdk-testimonial-text">' + t.text + '</p>' +
          '<div class="ssdk-testimonial-author">' +
          '<span class="ssdk-testimonial-avatar">' + t.initials + '</span>' +
          '<div><div class="ssdk-testimonial-name">' + t.name + '</div>' +
          '<div class="ssdk-testimonial-role">' + t.role + '</div></div>' +
          '</div></div>'
        )
      ),
      text(
        '<div class="ssdk-testimonial-nav">' +
        '<button type="button" class="ssdk-testimonial-btn" data-slide="prev" aria-label="Previous testimonial">&#8249;</button>' +
        '<button type="button" class="ssdk-testimonial-btn" data-slide="next" aria-label="Next testimonial">&#8250;</button>' +
        '</div>'
      ),
    ]),
  ]),

  /* ---------- Technology partners ---------- */
  row('ssdk-section ssdk-partners', [
    col('1/1', '', [
      text(
        '<div class="ssdk-section-head"><span class="ssdk-eyebrow">Technology partners</span>' +
        '<h2>Integrated with the brands we trust</h2></div>'
      ),
    ]),
    col('1/1', '', [
      html(partners.map((p) => '<div class="ssdk-partner">' + p + '</div>').join(''), 'ssdk-partner-grid'),
    ]),
  ]),

  /* ---------- Clients ---------- */
  row('ssdk-section', [
    col('1/1', '', [
      text(
        '<div class="ssdk-section-head"><span class="ssdk-eyebrow">Our clients</span>' +
        '<h2>Onsite across the region&rsquo;s leading organizations</h2></div>'
      ),
    ]),
    col('1/1', 'ssdk-clients-strip', [
      html(
        '<div class="ssdk-clients-track">' +
        clients.map((c) => '<span class="ssdk-client-logo"><img src="' + IMG('client-' + c + '.webp') + '" alt="' + c + ' client logo" loading="lazy"></span>').join('') +
        '</div>'
      ),
    ]),
  ]),

  /* ---------- Latest articles ---------- */
  row('ssdk-section', [
    col('1/1', '', [
      text(
        '<div class="ssdk-section-head"><span class="ssdk-eyebrow">Insights</span>' +
        '<h2>Latest articles</h2>' +
        '<p>Practical guidance on security systems, networking and connectivity in the UAE.</p></div>'
      ),
    ]),
    col('1/1', 'ssdk-blog-preview-grid', [
      {
        type: 'posts_grid',
        attrs: {
          source: 'category',
          category: '',
          taxonomy: 'category',
          posts_per_page: '3',
          orderby: 'date',
          order: 'DESC',
          design: 'default',
          image_size: 'full',
          show_title: 'yes',
          title_tag: 'h3',
          title_color: '',
          show_excerpt: 'yes',
          excerpt_words: '22',
          show_date: 'yes',
          date_format: 'M j, Y',
          show_comments: 'no',
          show_cats: 'yes',
          cats_color: 'accent',
          show_read_more: 'yes',
          read_more_text: 'Read more',
          columns: '3',
          css_animation: '',
          el_class: 'ssdk-blog-preview-grid',
        },
        content: '',
      },
    ]),
    col('1/1', '', [
      text('<div class="ssdk-blog-preview-all"><a href="' + SITE + '/blog/">View all articles &rarr;</a></div>'),
    ]),
  ]),

  /* ---------- CTA band ---------- */
  row('ssdk-cta-band', [
    col('1/1', '', [
      text(
        '<div class="ssdk-cta-band-inner"><div class="ssdk-container">' +
        '<h2>Get your free security assessment</h2>' +
        '<p>Tell us about your site and we will propose the right systems &mdash; with a fixed-price survey and no obligation.</p>' +
        '<a class="ssdk-cta" href="' + SITE + '/contact-us/">Get a Quote</a>' +
        '</div></div>'
      ),
    ]),
  ]),
];

writeFileSync(OUT + 'homepage.json', JSON.stringify({ content: homeRows }, null, 2));
console.log('homepage.json written:', homeRows.length, 'rows');

/* =====================================================================
   INNER PAGE (TheGem Theme Elements)
   ===================================================================== */
const innerRows = [
  row('ssdk-inner-title-row', [
    col('1/1', '', [
      { type: 'thegem_breadcrumbs', attrs: { css_animation: '', el_class: '' }, content: '' },
      { type: 'thegem_page_title', attrs: { css_animation: '', el_class: '' }, content: '' },
    ]),
  ]),
  row('ssdk-inner-content-row', [
    col('1/1', '', [
      { type: 'thegem_page_content', attrs: { css_animation: '', el_class: '' }, content: '' },
    ]),
  ]),
  row('ssdk-inner-cta-row', [
    col('1/1', '', [
      text(
        '<div class="ssdk-cta-band"><div class="ssdk-container">' +
        '<h2>Need help with your security systems?</h2>' +
        '<p>Free consultation and UAE-wide on-site surveys &mdash; get in touch today.</p>' +
        '<a class="ssdk-cta" href="' + SITE + '/contact-us/">Get a Quote</a>' +
        '</div></div>'
      ),
    ]),
  ]),
];
writeFileSync(OUT + 'inner-page.json', JSON.stringify({ content: innerRows }, null, 2));
console.log('inner-page.json written');

/* =====================================================================
   BLOG (TheGem Theme Elements)
   ===================================================================== */
const blogRows = [
  row('ssdk-blog-title-row', [
    col('1/1', '', [
      { type: 'thegem_page_title', attrs: { css_animation: '', el_class: '' }, content: '' },
    ]),
  ]),
  row('ssdk-blog-grid-row', [
    col('1/1', '', [
      {
        type: 'thegem_post_grid',
        attrs: {
          source: 'category',
          category: '',
          taxonomy: 'category',
          posts_per_page: '12',
          orderby: 'date',
          order: 'DESC',
          design: 'justified',
          image_size: 'full',
          show_title: 'yes',
          title_tag: 'h3',
          title_color: '',
          show_excerpt: 'yes',
          excerpt_words: '26',
          show_date: 'yes',
          date_format: 'M j, Y',
          show_comments: 'no',
          show_cats: 'yes',
          cats_color: 'accent',
          show_read_more: 'yes',
          read_more_text: 'Read more',
          columns: '6',
          css_animation: '',
          el_class: '',
        },
        content: '',
      },
    ]),
  ]),
];
writeFileSync(OUT + 'blog.json', JSON.stringify({ content: blogRows }, null, 2));
console.log('blog.json written');
