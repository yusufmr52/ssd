import { faqs, industries, processSteps, reasons, services, testimonials } from "./site";
import { serviceMenu } from "./menu";

/**
 * Strictly native build plan: TheGem 5.13.1 + WPBakery 9.0.1.
 * No custom JavaScript, no child theme, no custom post types.
 */

export const stackFacts = [
  ["Theme", "TheGem 5.13.1 (unchanged)"],
  ["Page builder", "WPBakery Page Builder 9.0.1"],
  ["Elements", "TheGem Theme Elements for WPBakery"],
  ["Custom JS", "None"],
  ["Child theme", "Not required"],
  ["Custom CSS", "Optional — 1 small snippet for spacing only"],
];

export type NativeSection = {
  n: string;
  section: string;
  element: string;
  thegem: string;
  settings: string;
  content: string;
};

export const nativeSections: NativeSection[] = [
  {
    n: "01",
    section: "Hero",
    element: "Row + 2 Columns (7/12 · 5/12) → Heading, Text Block, Button ×2, Single Image",
    thegem: "—",
    settings: "Row: Stretch row, background #0a1a2c, vertical padding 60/60. Heading: H1, 44px, 800, white. Image: 1200×900, top-right.",
    content: "H1 + 3-line introduction + “Request a site survey” and “Talk to our team” buttons.",
  },
  {
    n: "02",
    section: "Trust strip",
    element: "Row → 4 Columns → Icon Box ×4",
    thegem: "Icon Box",
    settings: "Icon position top-left, size 24px, brand blue icons, 20px padding, light-grey icons background. No hover animation.",
    content: "ISO 9001:2015 · one delivery team · UAE-wide coverage · support after go-live.",
  },
  {
    n: "03",
    section: "Services",
    element: "Row → 8 Columns of 1/3 (3 per row) → Icon Box ×8 + one CTA card",
    thegem: "Icon Box + CTA Box",
    settings: "Icon box style 1, icon size 32, link each box to its service page. 24px gap. Last cell: CTA Box, dark background, button.",
    content: "CCTV, access control, visitor management, networking, Wi-Fi, IT infrastructure, meeting rooms, connectivity.",
  },
  {
    n: "04",
    section: "Why Hutaib",
    element: "Row + 2 Columns → Single Image ×2, Text Block, Icon Box ×4",
    thegem: "Icon Box",
    settings: "Images 4:5 and 1:1, second image offset. Icon boxes small, left aligned, 16px gap, no borders.",
    content: "Survey first · designed and documented · installed by one team · supported after go-live.",
  },
  {
    n: "05",
    section: "How we work",
    element: "Row → 3 Columns ×2 → Icon Box ×6 with Counter numbers",
    thegem: "Icon Box + Counter",
    settings: "3 per row on desktop, 2 on tablet, 1 on mobile. Number in a small circle or Counter above the title.",
    content: "Discuss needs → site survey → recommend a solution → installation → testing & handover → support.",
  },
  {
    n: "06",
    section: "Industries",
    element: "Row → 4 Columns → Icon Box ×7 + CTA Box",
    thegem: "Icon Box + CTA Box",
    settings: "Compact icon boxes, 1-line title, short description. Equal heights.",
    content: "Offices, healthcare, banking, retail, warehouses, education, government.",
  },
  {
    n: "07",
    section: "Client feedback",
    element: "Row → 2 Columns → Testimonials + Text Block",
    thegem: "Testimonials",
    settings: "Style 1, image size 80×80, autoplay 6s, no fullwidth. Pull testimonials from the existing Testimonials post type.",
    content: "Four existing client testimonials; use the best three.",
  },
  {
    n: "08",
    section: "Clients",
    element: "Row → Text Block + Clients",
    thegem: "Clients",
    settings: "Client set: existing logos. Grayscale off, 5 per row, small gaps, no carousel (static grid is calmer).",
    content: "Deloitte, du, Mubadala, Al Naboodah, Arabtec, Heinz, Weatherford and the rest already on the site.",
  },
  {
    n: "09",
    section: "FAQs",
    element: "Row + 2 Columns → Text Block + Accordion",
    thegem: "Accordions & Toggles",
    settings: "Style simple, icon plus/minus, first item closed, 14px question text, 13px answer. One column.",
    content: "Coverage, site survey, upgrades, brands, after-installation support, timelines, integration.",
  },
  {
    n: "10",
    section: "Contact / CTA",
    element: "Row + 2 Columns → Text Block + Contact Form 7 (or existing form plugin)",
    thegem: "Contact Form 7 element",
    settings: "Dark row, #0a1a2c. Form in a white box. Phone, email and WhatsApp links as plain buttons.",
    content: "Name, company, email, phone, location, service, message, consent. Existing inbox.",
  },
  {
    n: "11",
    section: "Footer",
    element: "TheGem Footer Builder / Global Row",
    thegem: "—",
    settings: "Use the existing footer builder. Add the two offices and the same 9-item menu.",
    content: "Existing NAP, service links, legal, social.",
  },
];

export const simplifications = [
  ["Live system builder", "Cut", "No native equivalent. Replace with a short “Request a site survey” CTA box."],
  ["⌘K search palette", "Cut", "TheGem header search can be enabled if wanted; not needed for launch."],
  ["Service category filters", "Cut", "Eight services fit in one grid. Filters add JS for no SEO benefit."],
  ["Industry tab explorer", "Icon Box grid", "Native Icon Box row; all seven stay visible to crawlers."],
  ["Clickable process stepper", "Six Icon Boxes", "Native static row. Simpler to edit and prints well."],
  ["Hero image switcher", "Single image", "One strong hero image. Faster and easier to maintain."],
  ["Service detail modals", "Real service pages", "Each card links to its existing page — better for SEO."],
  ["Testimonial slider", "Testimonials element", "Native element already on the site."],
  ["Custom font", "TheGem font setting", "Use a built-in Google font from Theme Options (e.g. Montserrat + Poppins)."],
  ["Mobile sticky action bar", "Cut", "Add a phone button in the header if needed; no custom JS."],
];

export const themeSetup = [
  ["Body font", "Poppins, 15px, line-height 1.7", "Theme Options → Typography"],
  ["Headings", "Montserrat, 700/800, letter-spacing −0.02em", "Theme Options → Typography"],
  ["H1 size", "44px desktop / 32px mobile", "Theme Options → Typography"],
  ["Primary accent", "#1483c6", "Theme Options → Colors"],
  ["Secondary accent", "#ee7a22", "Theme Options → Colors"],
  ["Dark surface", "#0a1a2c", "WPBakery row background"],
  ["Page background", "#ffffff", "Theme Options → Colors"],
  ["Light surface", "#f4f7fa", "WPBakery row background"],
  ["Button radius", "6px", "Theme Options → Buttons"],
  ["Preloader", "Off", "Theme Options → General"],
  ["Page title", "Hidden", "Page settings"],
  ["Header", "Sticky, light", "Header Builder"],
];

export const optionalCss = `/* OPTIONAL: paste into TheGem -> Theme Options -> Custom CSS.
   Spacing and corner polish only. No JavaScript. Delete if not needed. */

.vc_row.ht-section { padding: 72px 0; }
.vc_row.ht-section-light { background: #f4f7fa; }
.vc_row.ht-hero { background: #0a1a2c; }
.vc_row.ht-hero h1 { color: #fff; }
.vc_row.ht-dark { background: #0a1a2c; }
.vc_row.ht-dark h1, .vc_row.ht-dark h2, .vc_row.ht-dark h3 { color: #fff; }

.gem-icon-box { height: 100%; }
.gem-icon-box .gem-icon-box-content { height: 100%; }

@media (max-width: 767px) {
  .vc_row.ht-section { padding: 48px 0; }
}
`;

export const buildOrder = [
  "Stage the site and disable the TheGem preloader.",
  "Create the page “Homepage 2026” and set it to a full-width TheGem template.",
  "Set Theme Options typography and colours from the Theme setup tab.",
  "Add the 9-item primary menu in Appearance → Menus (exact tree in the Menu tab).",
  "Build rows 01–11 in order, using only the elements listed.",
  "Replace placeholder photography with the existing Media Library images.",
  "Connect the contact form and test delivery to the real inbox.",
  "Set SEO title, description and OG image; keep FAQ answers identical to schema.",
  "Run Lighthouse mobile and check every service link.",
  "Set Settings → Reading to the new homepage only after client sign-off.",
];

export function copyDeck(): string {
  const lines: string[] = [
    "# Homepage copy — ready to paste into WPBakery",
    "",
    "## 1. Hero",
    "H1: Security, networking & IT solutions in Dubai.",
    "Intro: Hutaib InfoTech Solutions plans, installs and supports CCTV, access control, networking, IT infrastructure and meeting-room systems for offices, banks, schools and industrial sites across the UAE. One accountable team — from site survey to handover and ongoing support.",
    "Buttons: Request a site survey / Talk to our team",
    "Trust: ISO 9001:2015 · one delivery team · UAE-wide coverage · support after go-live",
    "",
    "## 2. Services intro",
    "H2: One partner for the systems your building depends on.",
    "Text: Eight connected capability lines — from the camera on the wall to the cable in the ceiling.",
    "",
    "## 3. Service cards",
  ];
  services.forEach((service, index) => {
    lines.push(`${index + 1}. ${service.title}`, `   ${service.short}`);
  });

  lines.push("", "## 4. Why Hutaib", "H2: A systems partner you can hold to the plan.");
  reasons.forEach((reason) => lines.push(`- ${reason.title}: ${reason.body}`));

  lines.push("", "## 5. How we work", "H2: Six clear steps, from first call to aftercare.");
  processSteps.forEach((step) => lines.push(`${step.number}. ${step.title} — ${step.body} (Output: ${step.output})`));

  lines.push("", "## 6. Industries", "H2: Built around how your site actually operates.");
  industries.forEach((industry) => lines.push(`- ${industry.name}: ${industry.body}`));

  lines.push("", "## 7. Client feedback");
  testimonials.forEach((item) => lines.push(`- “${item.quote}” — ${item.name}, ${item.role}`));

  lines.push("", "## 8. FAQs", "H2: Good questions, answered clearly.");
  faqs.forEach((faq, index) => lines.push(`${index + 1}. Q: ${faq.q}`, `   A: ${faq.a}`));

  lines.push(
    "",
    "## 9. Contact",
    "H2: Let’s protect what matters to your business.",
    "Text: Tell us what is changing — a new office, a system upgrade, a recurring maintenance issue, or a requirement you are still shaping.",
    "CTA: Request a site survey / Get a quote / Talk to our team",
    "",
    "## 10. Service links (exact live URLs)",
  );
  serviceMenu.forEach((group) => {
    lines.push(`- ${group.label} — ${group.href}`);
    (group.children ?? []).forEach((child) => lines.push(`  - ${child.label} — ${child.href}`));
  });

  return lines.join("\n");
}

export function nativePlanMarkdown(): string {
  const lines = [
    "# Native build plan — TheGem 5.13.1 + WPBakery 9.0.1",
    "",
    "No custom JavaScript. No child theme. No custom post types.",
    "Optional: one small spacing snippet in Theme Options → Custom CSS.",
    "",
    "## Sections",
    "",
    "| # | Section | WPBakery / TheGem elements | Key settings |",
    "|---|---|---|---|",
  ];
  nativeSections.forEach((row) => {
    lines.push(`| ${row.n} | ${row.section} | ${row.element} ${row.thegem !== "—" ? `(${row.thegem})` : ""} | ${row.settings} |`);
  });

  lines.push("", "## What was simplified (and why)", "");
  simplifications.forEach(([feature, replacement, note]) => {
    lines.push(`- **${feature}** → ${replacement}. ${note}`);
  });

  lines.push("", "## Theme setup", "");
  themeSetup.forEach(([item, value, where]) => lines.push(`- ${item}: ${value} (${where})`));

  lines.push("", "## Build order", "");
  buildOrder.forEach((step, index) => lines.push(`${index + 1}. ${step}`));

  lines.push("", "## Optional CSS", "", "```css", optionalCss, "```");

  return lines.join("\n");
}

export type TestStep = {
  n: string;
  title: string;
  time: string;
  body: string;
  bullets?: string[];
};

export const testPageSteps: TestStep[] = [
  {
    n: "01",
    title: "Back up and note the current homepage",
    time: "10 min",
    body: "Take a database + files backup. In Settings → Reading, note which page is currently the static homepage. Do not change that setting during the test.",
    bullets: [
      "Keep the old homepage published — it is your rollback.",
      "Record the current Theme Options values (screenshot each panel) before touching anything global.",
    ],
  },
  {
    n: "02",
    title: "Create the test page",
    time: "5 min",
    body: "Pages → Add New. Title: “Homepage 2026 – TEST”. Set the TheGem page options before adding content.",
    bullets: [
      "Page Attributes: use the full-width TheGem template.",
      "TheGem page settings: hide the page title, no sidebar, content top/bottom padding 0.",
      "Leave the page as Draft until the first row is built.",
    ],
  },
  {
    n: "03",
    title: "Validate with the hero row only",
    time: "20–30 min",
    body: "Open WPBakery Backend Editor and build row 01 (Hero) from the Native build tab. Save the draft and preview. This proves fonts, images, buttons and column widths before you invest in the whole page.",
    bullets: [
      "Row: stretch, background #0a1a2c, padding 60/60.",
      "Heading element set to H1, white; one H1 on the page only.",
      "Add two Button elements and link them to #contact and tel:+971503605274.",
      "Add a Single Image from the existing Media Library.",
    ],
  },
  {
    n: "04",
    title: "Style at element level, not globally",
    time: "Ongoing",
    body: "TheGem Theme Options are site-wide. Changing the heading font or accent colour there immediately restyles the live site. During the test, use each Row/Element’s Design Options instead.",
    bullets: [
      "Set backgrounds and padding on the Row’s Design Options.",
      "Set heading size/weight/colour in the Heading element.",
      "Keep a written list of every global change you want at launch (fonts, accents, button radius).",
      "Apply that global list on launch day, or better, on a staging copy first.",
    ],
  },
  {
    n: "05",
    title: "Build rows 02–11 in order",
    time: "4–6 hrs",
    body: "Work down the Native build tab. Save after each row so revisions capture working states. Copy the text from the Page copy tab — nothing needs typing from scratch.",
    bullets: [
      "Use Icon Box for sections 02, 04, 05 and 06.",
      "Use the existing Testimonials, Clients and Accordion elements for 07, 08 and 09.",
      "Each service card links to its existing service page (real URLs, not modals).",
      "Leave the site’s Primary Menu untouched — the test page does not need menu changes.",
    ],
  },
  {
    n: "06",
    title: "Reuse the client’s own images",
    time: "30 min",
    body: "All photography and logos are already in the Media Library. Select the existing files instead of uploading duplicates. Write descriptive alt text on the hero and service images.",
    bullets: [
      "Hero: 2022/02/door-access-control.jpg.",
      "Wireless / PBX / attendance / access / CCTV / School images as listed in the plan.",
      "Only use client logos the client has approved (they are already public on the site).",
    ],
  },
  {
    n: "07",
    title: "Keep the test page out of search",
    time: "5 min",
    body: "A published test page can be indexed. Before sharing it: Yoast/Rank Math → Advanced → “Allow search engines to show this page?” = No. Then exclude it from the XML sitemap and never link it from the menu, footer or blog.",
    bullets: [
      "Do not add it to the primary menu while testing.",
      "Do not submit it to Search Console.",
      "For extra safety, enable WordPress → Pages → Quick Edit → Password protected.",
    ],
  },
  {
    n: "08",
    title: "Test the form with a safe inbox",
    time: "20 min",
    body: "Duplicate the existing Contact Form 7 form and point the test page at the copy. Change the recipient to an internal test address, then send three real submissions and confirm all arrive (including from a phone).",
    bullets: [
      "Do not use the live sales inbox until the client approves the page.",
      "Check the thank-you message and spam protection.",
      "At launch, switch the form back to the real recipients.",
    ],
  },
  {
    n: "09",
    title: "Review with the client",
    time: "—",
    body: "Pick the review method that matches how the client works. Draft previews only work for logged-in admins, so a client without an account cannot see a draft.",
    bullets: [
      "Password-protected published page + noindex — easiest for a WordPress-native review.",
      "Static preview folder (the Deploy tab ZIP) — zero impact on WordPress, but not editable in WPBakery.",
      "Staging clone — best if you want to change global Theme Options during testing.",
    ],
  },
  {
    n: "10",
    title: "Sign-off, then switch the homepage",
    time: "30 min",
    body: "Only after written approval: go to Settings → Reading → “A static page” and select the new page. Keep the old homepage published for 30 days.",
    bullets: [
      "Apply the global Theme Options list you collected in step 04.",
      "Clear TheGem, page-cache and CDN caches.",
      "Check the menu, footer, form inbox and mobile.",
      "Update the sitemap, then request indexing for the homepage.",
    ],
  },
  {
    n: "11",
    title: "Rollback is a single setting",
    time: "2 min",
    body: "If anything is wrong after switching: Settings → Reading → set the previous page as the static homepage. Your test page still exists and nothing is deleted.",
  },
];

export const reviewOptions = [
  {
    title: "Draft preview",
    best: "Only you / another admin",
    body: "WordPress “Preview Changes” or WPBakery Preview. No index risk, but requires a logged-in admin account.",
    risk: "Client cannot see it without an account",
  },
  {
    title: "Published + password + noindex",
    best: "Client review",
    body: "Publish the test page, set a password in Quick Edit and noindex it. Fully editable in WPBakery and visible to anyone with the URL + password.",
    risk: "Lives on the domain; must stay out of menus and sitemap",
  },
  {
    title: "Static preview folder",
    best: "Zero-risk presentation",
    body: "Upload the packaged index.html to public_html/preview-2026/. No theme or database impact, already noindexed.",
    risk: "Not editable in WPBakery; form does not send",
  },
];

export const testPageDoc = `# Implementing as a test page in your current install

Goal: build and review the new homepage as its own WordPress page, without changing
the live homepage or restyling the current site.

IMPORTANT
- Theme Options are global. Changing fonts/colours there changes the live site
  immediately. Build with Row/Element Design Options during the test, and keep a list
  of global changes for launch day (or test them on a staging copy).
- Do not change Settings -> Reading until the client signs off.
- Do not add the test page to the live menu, footer or sitemap.

STEPS
1. Back up database + files. Note the current static homepage in Settings -> Reading.
2. Pages -> Add New. Title: "Homepage 2026 - TEST".
   - Page Attributes: full-width TheGem template.
   - TheGem page settings: hide page title, no sidebar, top/bottom content padding 0.
   - Save Draft.
3. Open WPBakery Backend Editor. Build ONLY the hero row first (row 01 in the plan).
   Save, preview, confirm fonts/images/columns. Then continue.
4. Style via Row and Element Design Options. Note global changes separately.
5. Build rows 02-11 from the native build plan. Save after each row.
6. Use existing Media Library images and the existing client logos.
7. Publish (or keep draft) and protect:
   - Yoast/Rank Math -> Advanced -> search engines: No.
   - Exclude from XML sitemap.
   - Optional: Pages -> Quick Edit -> Password protected.
   - Never link it from the menu while testing.
8. Duplicate the contact form, point it to an internal test inbox, send 3 test emails.
9. Share the review URL (or use the static preview folder) and collect feedback.
10. On written approval:
   - Settings -> Reading -> static page -> select "Homepage 2026".
   - Apply the collected global Theme Options changes.
   - Clear theme/page/CDN caches.
   - Switch the form recipients back to the real inboxes.
   - Update the sitemap and request indexing.
11. Rollback: Settings -> Reading -> select the previous homepage. Nothing is deleted.

REVIEW OPTIONS
- Draft preview: private, admins only. Not shareable with the client.
- Published + password + noindex: best for client review; fully WPBakery-editable.
- Static preview folder: zero risk to WordPress; not editable; form does not send.

FIRST-DAY CHECKPOINT (stop and test here)
- Hero renders correctly on desktop and mobile.
- The H1 is the only H1 on the page.
- Buttons scroll to the contact section / dial the number.
- A Single Image loads from the Media Library.
- The page is set to noindex and absent from the menu.
If those pass, the remaining rows are repetition, not unknowns.
`;
