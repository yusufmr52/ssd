# Security Solutions Dubai — Child Theme for TheGem 5.13.1

New fast, SEO-optimized design for **www.securitysolutionsdubai.com** built as a
child theme of **TheGem 5.13.1** with **WPBakery Page Builder 9.0.1** and the
**TheGem Theme Elements (for WPBakery)** plugin.

## What this package contains

| Folder / file | Purpose |
|---|---|
| `style.css` | Child theme header |
| `functions.php` | Enqueue, speed optimizations, lazy-load, resource hints |
| `header.php` / `footer.php` | New common header & footer (identical on every page) |
| `inc/class-header.php` | Header renderer + mega-menu walker + social icons |
| `inc/class-footer.php` | Footer renderer + CTA band |
| `inc/class-page.php` | Breadcrumbs, title area, blog grid, sidebar logic |
| `inc/class-seo.php` | JSON-LD schema, Open Graph, Twitter cards |
| `page.php` | **Common inner-page layout** (all pages share this) |
| `single.php` | Blog post layout |
| `archive.php` | Blog / category / tag archives — justified image grid |
| `front-page.php` | Homepage (renders WPBakery content) |
| `404.php` | Error page |
| `index.php` | Fallback template |
| `assets/css/style.css` | Full design system |
| `assets/css/critical.css` | Above-the-fold CSS (inlined in `<head>`) |
| `assets/fonts/manrope.woff2` + `manrope.css` | Manrope (variable, `display=swap`) |
| `assets/js/main.js` | Sticky header, mobile drawer, testimonial slider, FAQ, reveal |
| `assets/img/` | Logo, ISO badge, hero/photo images, client logos |
| `templates/homepage.json` | **WPBakery homepage template** (distinct layout) |
| `templates/inner-page.json` | WPBakery inner-page template (TheGem Theme Elements) |
| `templates/blog.json` | WPBakery blog archive template (TheGem Theme Elements) |

## Layout strategy (per requirements)

- **Homepage** — distinct layout via `templates/homepage.json` (WPBakery).
- **Inner pages & blog** — one common layout (`page.php` / `archive.php`), different content.
- **Header & footer** — identical across every page (child-theme overrides).

## Install (5 steps)

### 1. Upload & activate the child theme
1. In WordPress: **Appearance → Themes → Add New → Upload Theme**.
2. Upload this ZIP (the folder must be named `security-solutions-dubai-child`).
3. Activate it. TheGem parent must already be active (version 5.13.1).

### 2. Install required plugins
- **WPBakery Page Builder 9.0.1** — already bundled with TheGem; confirm it's active.
- **TheGem Theme Elements (for WPBakery)** — install & activate from the
  plugin bundle or the codex-themes.com download. (Needed only for the
  `inner-page.json` / `blog.json` templates.)

### 3. Import the WPBakery templates
1. Go to **WPBakery → Templates → Import**.
2. Upload `templates/homepage.json`, then `templates/inner-page.json` and
   `templates/blog.json`.
3. Templates appear under **WPBakery → Templates**.

### 4. Set up the homepage
1. **Pages → Add New** → title "Home" → **Edit with WPBakery**.
2. In the WPBakery editor, open **Templates** → choose **Homepage** → **Use on this page**.
3. Update → Publish.
4. **Settings → Reading**: choose **A static page** → set **Homepage** to the
   "Home" page.

### 5. Set up menus & widgets (optional but recommended)
1. **Appearance → Menus**: create a menu with the site structure
   (Home, About Us, How it works, Services, Blog, Resources, Locations,
   Careers, Contact Us) and assign it to the **Primary** location.
   The header automatically renders a mega-menu for the Services item.
2. If no menu is set, the theme falls back to the default structure.
3. Footer widgets (optional): **Appearance → Widgets** → populate
   `Footer Brand`, `Footer Navigation`, `Footer Contact`. Defaults are
   used when empty.

## Speed optimizations (built-in)

- **Critical CSS** inlined at the top of `<head>` (avoids render-blocking).
- **Lazy loading** for all images (`loading="lazy" decoding="async"`) via
  content filters + `wp_get_attachment_image_attributes`.
- **Deferred JS**: child script loads in the footer; legacy inline scripts
  in post content are deferred.
- **Font hints**: `preconnect` + `preload` for Manrope woff2, `display=swap`.
- **No heavy libraries**: header/footer/slider/FAQ are vanilla JS (~3 KB).
- **Reduced motion** support in CSS + JS.

### Recommended TheGem settings (for maximum speed)
1. **TheGem → Performance / PageSpeed**: enable minification, combine CSS/JS,
   enable lazy-load for WPBakery images.
2. **Appearance → Customize → TheGem Performance**: disable unused modules.
3. Add a caching plugin (LiteSpeed Cache, WP Rocket, or equivalent) and enable
   **optimize CSS delivery** + **preload fonts**.
4. Serve images as **WebP** (the theme already uses WebP assets).
5. Ensure **HTTP/2** and **Gzip/Brotli** are enabled at the server level.

## SEO features (built-in)

- **JSON-LD schema** (organized in `inc/class-seo.php`):
  - `Organization` — name, address, phone, email, logo, sameAs (socials)
  - `WebSite` — with `SearchAction`
  - `BreadcrumbList` on inner pages & posts
  - `WebPage` / `Article` on posts
  - `FAQPage` (if FAQ sections are added)
- **Open Graph + Twitter cards** on every page/post.
- **Semantic HTML5** (`<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`).
- **Skip-to-content** link for accessibility.
- **`title` / `description`** via theme supports.

## Customizing colors & typography

All design tokens live in `assets/css/style.css` under `:root`:

```css
--ssdk-blue: #1763C6;       /* primary brand blue (brighter) */
--ssdk-blue-dark: #124F99;
--ssdk-blue-deep: #0C2A44;
--ssdk-accent: #F58A2B;     /* CTA orange */
--ssdk-ink: #12293E;        /* headings */
--ssdk-body: #4A5C6E;       /* body text */
```

Change these values to re-skin the entire theme. Typography scale, section
padding, and card styles are also in `style.css`.

## Important notes

- **Images in WPBakery templates** reference the live site URL
  (`https://securitysolutionsdubai.com/wp-content/themes/security-solutions-dubai-child/assets/img/...`).
  After import, WPBakery may keep the URL or attach to the media library.
  If an image shows broken after a domain change, re-select it in the
  WPBakery editor.
- **TheGem page options** (sidebar etc.) are respected by `page.php` via
  `thegem_get_page_option()`. Sidebar can be set per page in TheGem's page
  metabox; default is full-width.
- **TheGem Theme Elements** (`thegem_breadcrumbs`, `thegem_page_title`,
  `thegem_page_content`, `thegem_post_grid`) are used in the inner-page and
  blog templates. If an element doesn't render, confirm the
  "TheGem Theme Elements (for WPBakery)" plugin is active.
- **Child theme overrides**: any file here overrides the parent TheGem file
  of the same name. TheGem core files are never modified.
- **Child theme updates are safe**: upgrade TheGem freely; child theme
  files are independent.

## Files not overridable in child theme (TheGem limitation)

TheGem does not allow child-theme override of: `functions.php` (of the parent),
`wishlist.css`, `wpml-config.php`, `screenshot.png`. Our child theme uses its
own `functions.php` (which is the child's own functions file — this is fine;
TheGem's limitation refers to overriding TheGem's own `functions.php`).

## Support

Tested against TheGem 5.13.1 + WPBakery 9.0.1. If something renders
incorrectly, check:
1. Parent TheGem version (must be 5.13.x).
2. WPBakery version (must be 9.0.x).
3. TheGem Theme Elements plugin active (for inner-page/blog templates).
