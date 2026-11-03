export const hfReality = [
  {
    title: "Header Builder is global",
    body: "TheGem renders the header from Header Builder / Theme Options for every page. A test page cannot have a different header unless you create a second header and assign it — and assignment options depend on your TheGem version.",
  },
  {
    title: "Footer is global too",
    body: "The footer comes from the Footer Builder or a Global Section. It follows the page, not the reverse. Building the new page does not change it.",
  },
  {
    title: "That is why staging is the right call",
    body: "On staging you can rebuild header and footer globally and see the whole site in the new design. Nothing reaches the live domain until you push or repeat the steps there.",
  },
  {
    title: "The new design is deliberately close to the current header",
    body: "Same logo, same nine-item menu, light background, sticky. The changes are a Get a quote button, spacing, and the Services mega-menu columns — not a different navigation model.",
  },
];

export type SpecRow = { item: string; setting: string };

export const headerSpec: SpecRow[] = [
  { item: "Builder", setting: "TheGem → Header Builder. Create one header named “Hutaib 2026”." },
  { item: "Layout", setting: "Logo left · primary menu right · phone/button far right. One row, 82px tall on desktop, 74px on mobile." },
  { item: "Background", setting: "#ffffff, bottom border 1px #dde6ed, subtle shadow only after scrolling." },
  { item: "Sticky", setting: "Enabled. Do not use transparent header on this design." },
  { item: "Logo", setting: "Existing site logo (logo_9bcdd…), display width 164px, alt “Security Solutions Dubai”." },
  { item: "Menu", setting: "Assign the existing Primary Menu (9 items, exact live tree). Do not create a second menu." },
  { item: "Services item", setting: "Enable TheGem multi-column dropdown, 2 columns, keep all 29 groups and 5 nested links." },
  { item: "CTA", setting: "Button element “Get a quote” → /contact-us/ (or #contact). Signal colour #ee7a22, dark text, 6px radius." },
  { item: "Phone", setting: "Infotext element: +971 50 360 5274, link tel:+971503605274. Hide below 1440px to save space." },
  { item: "Utility bar", setting: "Optional. If Header Builder offers a top row: address · ISO 9001:2015 · phone · email. Hide below 1024px." },
  { item: "Mobile", setting: "Logo + hamburger + phone icon. The full menu opens in TheGem’s mobile drawer, same items and order." },
  { item: "Search", setting: "Optional header search element. Not required for launch." },
];

export const footerSpec: SpecRow[] = [
  { item: "Builder", setting: "TheGem → Footer Builder (or a Global Section row). Keep it global." },
  { item: "Background", setting: "#071321. Light logo variant on a white pill so it stays legible." },
  { item: "Column 1", setting: "Logo · one-line company description · ISO 9001:2015 · social profiles (existing Facebook, X, WhatsApp)." },
  { item: "Column 2", setting: "Services: 9 key service links + “All services” to /services/. Use the live URLs from the menu tree." },
  { item: "Column 3", setting: "Company: About Us, How it works, Blog, Resources, Locations, Careers, Contact Us." },
  { item: "Column 4", setting: "Dubai head office and Sharjah office — full NAP, phone and email, same as the current site." },
  { item: "Bottom bar", setting: "Copyright with dynamic year, Privacy, Terms, Cookies, Back to top. No extra legal pages invented." },
  { item: "Newsletter", setting: "Skip unless the client already has a Mailchimp list and consent flow." },
  { item: "Mobile", setting: "Columns stack 1 per row; office blocks last. Keep tap targets at least 40px." },
];

export const stagingPlan = [
  {
    step: "1",
    title: "Create the staging copy",
    body: "Use your host’s staging tool (cPanel, Cloudways, Kinsta, WP Engine) or a staging plugin. Staging must be a full copy: files + database. Block search engines on staging (host setting or noindex).",
  },
  {
    step: "2",
    title: "Confirm versions and plugins",
    body: "Check TheGem 5.13.1, WPBakery 9.0.1 and TheGem Theme Elements are active on staging. Do not update anything mid-build. Note the current header/footer template names so you can revert.",
  },
  {
    step: "3",
    title: "Build header and footer first",
    body: "They are global, so do them before the page. Copy the existing header, then modify the copy — never rebuild from zero. That keeps the logo, menu, mobile behaviour and phone links intact.",
  },
  {
    step: "4",
    title: "Install the optional child theme",
    body: "Upload the child theme ZIP from this tab only if you want exact spacing/colour polish. It does not replace the header or footer; it adds CSS. The page and header still come from TheGem.",
  },
  {
    step: "5",
    title: "Build the page",
    body: "Pages → Add New → “Homepage 2026 – TEST”, full-width template, hide title. Build the 11 rows from the Native build tab. Link service cards to existing service pages.",
  },
  {
    step: "6",
    title: "Review the whole site on staging",
    body: "The new header/footer will apply to every staging page. Check the homepage, one service page and the contact page so nothing looks broken outside the new homepage.",
  },
  {
    step: "7",
    title: "Decide how to ship",
    body: "If your staging tool supports push-to-live, push selected database tables and files. Otherwise repeat the same header/footer and page steps on live. Do not push the whole database blindly — it would overwrite newer live content.",
  },
  {
    step: "8",
    title: "Cut over and keep a rollback",
    body: "On live: assign the new header/footer, set Settings → Reading to the new page, clear caches, test the form. Keep the previous homepage and old header template for 30 days.",
  },
];

export const partnerScope = [
  ["What I will deliver", "Header/footer build spec, the exact 9-item menu, page element map, page copy, optional child theme ZIP with CSS tokens, test-page and launch checklists, and the static preview package."],
  ["What the child theme contains", "style.css, functions.php (enqueues only), and a small CSS file for header/footer spacing and colour polish. No template overrides, no custom post types, no page-builder code."],
  ["What it does not do", "It does not replace TheGem’s header or footer and it does not build the page for you. Those are Header Builder/Footer Builder and WPBakery tasks."],
  ["Why not a standalone theme", "A custom theme would abandon TheGem’s elements, Header Builder and TheGem Theme Elements — the opposite of “easy to edit from the backend”. It would also be untested against your exact install."],
  ["What I need from you", "Three screenshots: (1) Header Builder screen, (2) Theme Options → Typography/Colours, (3) one WPBakery page in backend mode. Plus your staging URL and the plugins active on staging. No admin password."],
  ["What I cannot do", "Access your server, install files for you, or guarantee a theme ZIP against a configuration I cannot see. Every file I hand over is meant to be tested on staging first."],
];

export const childStyle = `/*
Theme Name:   Hutaib Child
Theme URI:    https://www.securitysolutionsdubai.com/
Description:  Optional child theme for Hutaib 2026 header/footer polish. Does not replace TheGem templates.
Author:       Hutaib InfoTech Solutions
Template:     thegem
Version:      1.0.0
Text Domain:  hutaib-child
*/

/* Keep this file clean. All styles live in assets/hutaib.css. */
`;

export const childFunctions = `<?php
/**
 * Hutaib Child — enqueue parent theme stylesheet and optional polish CSS.
 * No template overrides, no custom post types, no page-builder code.
 */

add_action( 'wp_enqueue_scripts', function () {
    $theme = wp_get_theme( get_template() );
    $dir   = get_stylesheet_directory();
    $uri   = get_stylesheet_directory_uri();

    wp_enqueue_style(
        'thegem-parent',
        get_template_directory_uri() . '/style.css',
        array(),
        $theme->get( 'Version' )
    );

    wp_enqueue_style(
        'hutaib-child',
        $uri . '/assets/hutaib.css',
        array( 'thegem-parent' ),
        file_exists( $dir . '/assets/hutaib.css' )
            ? filemtime( $dir . '/assets/hutaib.css' )
            : '1.0.0'
    );
}, 20 );
`;

export const childCss = `/* =========================================================
   Hutaib 2026 — header/footer polish only.
   Safe to delete. No layout replacement, no JavaScript.
   ========================================================= */

:root {
  --ht-brand: #1483c6;
  --ht-signal: #ee7a22;
  --ht-ink: #071321;
  --ht-line: #dde6ed;
}

/* Sticky header: border + shadow after scrolling (TheGem adds its own class) */
.header-sticky-active .header-main,
.header-main.header-sticky-active {
  border-bottom: 1px solid var(--ht-line);
  box-shadow: 0 10px 30px -24px rgba(7, 19, 33, 0.55);
}

/* Keep the logo at the same visual width as the live site */
.site-logo img { max-height: 44px; width: auto; }

/* Primary navigation spacing */
.header-main .primary-navigation > ul > li > a {
  font-weight: 600;
  letter-spacing: -0.01em;
}

/* Services mega-menu: cleaner grid */
.header-main .megamenu .sub-menu { padding: 14px; border-radius: 12px; }
.header-main .megamenu .sub-menu > li > a { border-radius: 8px; }

/* Get a quote button */
.header-main .ht-quote-button a {
  border-radius: 7px;
  background: var(--ht-signal);
  color: var(--ht-ink) !important;
  font-weight: 700;
  padding: 10px 16px;
}
.header-main .ht-quote-button a:hover { background: #f68b3c; }

/* Footer */
.footer-main { background: var(--ht-ink); }
.footer-main a:hover { color: #ffffff; }
.footer-main .widget-title { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
.footer-main .footer-office { font-size: 12px; line-height: 1.7; }

@media (max-width: 1023px) {
  .header-main .ht-utility-bar { display: none; }
}
`;

export const childReadme = `HUTAIB CHILD THEME (OPTIONAL)
=============================

WHAT IT IS
A minimal child theme for TheGem 5.13.1. It enqueues the parent stylesheet
and one small CSS file for header/footer polish.

WHAT IT IS NOT
- It is not a complete theme. TheGem must remain installed and active as
  the parent.
- It does not replace the header, footer or page templates.
- It does not build the homepage. That is WPBakery + Header Builder work.

INSTALL
1. Staging only. Back up first.
2. Appearance -> Themes -> Add New -> Upload Theme -> choose the ZIP.
3. Activate "Hutaib Child". The site should look unchanged.
4. If it does not look unchanged, deactivate immediately and check that the
   parent folder is named exactly "thegem".

FILES
style.css                child theme declaration (Template: thegem)
functions.php            enqueues parent CSS + assets/hutaib.css
assets/hutaib.css        optional header/footer spacing and colour polish
screenshot.png           optional 1200x900 preview

EDITING
Edit assets/hutaib.css for spacing/colour only. Do not put layout logic here.
Header and footer structure belongs in Header Builder / Footer Builder so the
client can edit it from the backend.

ROLLBACK
Appearance -> Themes -> activate TheGem (parent). Then delete the child theme.
`;
