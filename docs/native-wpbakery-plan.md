# Homepage 2026 — native TheGem + WPBakery build plan

**Stack:** TheGem 5.13.1 · WPBakery Page Builder 9.0.1 · TheGem Theme Elements for WPBakery
**Constraint:** no custom JavaScript, no child theme, no custom post types. Optional CSS is a short spacing snippet only.
**Editing:** every text, image, link, icon and CTA is editable from the WPBakery backend.

---

## 1. Build order

1. Stage the site and take a backup.
2. Theme Options → General: disable the TheGem preloader.
3. Create the page **Homepage 2026** with a full-width TheGem template; hide the page title.
4. Set typography, colours and button radius in Theme Options (section 4).
5. Rebuild the 9-item menu in Appearance → Menus (section 5).
6. Build rows 01–11 from the table below using only existing elements.
7. Replace images with the files already in the Media Library (section 6).
8. Connect the contact form and test delivery.
9. Set SEO title/description and check the FAQ schema.
10. Settings → Reading → set the new static homepage **after client sign-off**.

---

## 2. Row-by-row element mapping

| # | Section | Elements to add | Key backend settings |
|---|---|---|---|
| 01 | Hero | Row + 2 columns (7/12 · 5/12) → Heading, Text Block, Button ×2, Single Image | Row: stretch, background #0a1a2c, padding 60/60. Heading = H1, white, 44px. Image 1200×900, no parallax. |
| 02 | Trust strip | Row → 4 columns → Icon Box ×4 | Icon top, 24px, brand blue. Light icons background, no animation. |
| 03 | Services | Row → 9 × 1/3 columns → Icon Box ×8 + CTA Box | Icon Box style 1, icon 32px. Each box links to its service page. CTA dark background. |
| 04 | Why Hutaib | Row + 2 columns → Single Image ×2, Text Block, Icon Box ×4 | Images 4:5 and 1:1. Icon boxes small, left aligned, no border. |
| 05 | How we work | Row → 3 columns × 2 → Icon Box ×6 + Counter | Number each step. 3/2/1 columns desktop/tablet/mobile. |
| 06 | Industries | Row → 4 columns → Icon Box ×7 + CTA Box | Compact style, equal heights, one-line titles. |
| 07 | Client feedback | Row + 2 columns → Testimonials + Text Block | Testimonials style 1, image 80×80, autoplay 6s, existing post type. |
| 08 | Clients | Row → Text Block + Clients | Existing client set, 5 per row, no carousel, grayscale off. |
| 09 | FAQs | Row + 2 columns → Text Block + Accordion | Simple style, plus/minus icon, first item closed. |
| 10 | Contact | Row + 2 columns → Text Block + Contact Form 7 element | Dark row. White form card. Keep existing inboxes. |
| 11 | Footer | Existing Footer Builder | Two offices, same menu, legal links, social. |

**Rules**
- Never paste page HTML into a Text Block; use the element itself.
- Build 3-column layouts as three 1/3 columns, not tables.
- Backgrounds belong on Rows, not inner elements.
- Keep one H1 (the hero heading).

---

## 3. What was simplified from the concept

| Concept | Native replacement | Reason |
|---|---|---|
| Live system builder | "Request a site survey" CTA Box | Needs custom JS; no native equivalent. |
| ⌘K search palette | Header search (optional) | Not needed for launch. |
| Service filters | Static 3×3 grid | Eight services fit; filters add JS. |
| Industry tab explorer | Icon Box grid | All sectors visible to search engines. |
| Clickable process stepper | Six Icon Boxes + Counter | Simpler to edit, prints well. |
| Hero image switcher | One strong hero image | Fewer assets, faster page. |
| Service modals | Link to existing service pages | Better SEO, less maintenance. |
| Custom font | Theme font setting | No font upload or licence work. |
| Mobile sticky action bar | Header phone button | No custom JS. |

---

## 4. Theme setup

| Setting | Value | Location |
|---|---|---|
| Body font | Poppins 15px / 1.7 | Theme Options → Typography |
| Headings | Montserrat 700–800 | Theme Options → Typography |
| H1 | 44px desktop / 32px mobile | Theme Options → Typography |
| Primary accent | #1483c6 | Theme Options → Colors |
| Secondary accent | #ee7a22 | Theme Options → Colors |
| Dark surface | #0a1a2c | Row background |
| Light surface | #f4f7fa | Row background |
| Button radius | 6px | Theme Options → Buttons |
| Preloader | Off | Theme Options → General |
| Page title | Hidden | Page settings |
| Header | Sticky, light | Header Builder |

### Optional CSS (spacing only — safe to delete)

```css
.vc_row.ht-section { padding: 72px 0; }
.vc_row.ht-section-light { background: #f4f7fa; }
.vc_row.ht-hero { background: #0a1a2c; }
.vc_row.ht-dark { background: #0a1a2c; }
.vc_row.ht-dark h1, .vc_row.ht-dark h2, .vc_row.ht-dark h3 { color: #fff; }
.gem-icon-box, .gem-icon-box .gem-icon-box-content { height: 100%; }
@media (max-width: 767px) { .vc_row.ht-section { padding: 48px 0; } }
```

---

## 5. Primary menu — exact live structure

Nine top-level items, in this order:
Home · About Us · How it works · Services · Blog · Resources · Locations · Careers · Contact Us

- **About Us (5):** Verticals · Awards & Accolades · Brand, Logo & Philosophy · Hutaib Awarded with ISO 9001:2015 Certification · QHSE Policy
- **Locations (3):** UAE · Saudi Arabia · Oman
- **Services (29 groups, 2 columns, 5 nested links):** see `docs/menu-structure.md` for every label and URL.

Assign the menu in Header Builder → Primary Menu. Enable the TheGem multi-column dropdown for Services.

---

## 6. Assets

Use the client's existing Media Library files. The logo and photos are already on the site.

| File | Use |
|---|---|
| `logo_9bcdd…_3x.png` | Header logo (live site uses 164px width) |
| `2022/02/door-access-control.jpg` | Hero, access control |
| `2017/08/wireless-solutions.jpg` | Wireless / networking |
| `2017/10/matrix-ipbx.jpg` | Unified communications |
| `2017/08/time-attendance.jpg` | Workforce / corporate |
| `2017/08/Access-Control.png` | Access control secondary |
| `2024/12/cctv-access-control-thegem-blog-justified.jpeg` | CCTV |
| `2017/08/School.jpg` | Education |
| `2017/06/*.png` | Client logos (published on the current site) |
| `2017/08/ISO-9001-2008.png` | ISO badge — filename says **2008** while copy says **2015**; confirm the current certificate. |

---

## 7. Private preview (optional, before going live)

The design can be shown to the client without touching the theme:

1. In the preview site open `/#wp-kit` → **Preview deploy** → download the ZIP.
2. Create `public_html/preview-2026/` and upload the files (folder 755, files 644).
3. Open `https://securitysolutionsdubai.com/preview-2026/`.
4. The page is `noindex` (meta + `X-Robots-Tag`) and optional password protection is provided.
5. Delete the folder to roll back. The theme, plugins, menus and database are untouched.

The preview form does not send email; it is visual only.

---

## 8. Launch checklist

- [ ] Copy approved and all service links point to the correct pages.
- [ ] Theme Options colours, fonts and button radius set.
- [ ] 9-item menu assigned; Services mega menu uses 2 columns.
- [ ] All images picked from the existing Media Library.
- [ ] Contact form delivers to the correct inboxes with spam protection.
- [ ] One H1, logical H2 order, title and meta description set.
- [ ] FAQ answers match the FAQPage schema.
- [ ] Mobile check at 360 / 768 / 1024 / 1440px.
- [ ] Lighthouse mobile pass on staging.
- [ ] Backup and rollback confirmed before switching the homepage.

---

## 9. Header & footer — and why staging solves the “collision”

TheGem renders the **header** from Header Builder / Theme Options and the **footer** from Footer Builder / a Global Section. Both are **global**: a test page automatically shows the current header and footer. That is expected, not a bug.

You cannot give one page a different header without creating and assigning a second header template — and assignment options vary by TheGem version. The safe route is a **staging copy**, where header, footer and page can change together with zero risk to live.

### Header build spec

| Item | Setting |
|---|---|
| Builder | TheGem → Header Builder. Duplicate the current header, rename “Hutaib 2026”. Do not start from zero. |
| Layout | Logo left · primary menu right · phone / Get a quote right. 82px desktop, 74px mobile. |
| Background | `#ffffff`, 1px `#dde6ed` bottom border, shadow only when sticky. |
| Sticky | On. No transparent header. |
| Logo | Existing site logo (`logo_9bcdd…`), 164px wide, alt “Security Solutions Dubai”. |
| Menu | Existing Primary Menu — 9 items, exact live tree. Do not create a second menu. |
| Services | TheGem multi-column dropdown, 2 columns, 29 groups, 5 nested links. |
| CTA | “Get a quote” button → `/contact-us/`. Signal `#ee7a22`, dark text, 6px radius. |
| Phone | Infotext element, `tel:+971503605274`, hidden below 1440px. |
| Utility bar | Optional: address · ISO 9001:2015 · phone · email. Hidden below 1024px. |
| Mobile | Logo + hamburger + phone. Same menu in the TheGem drawer. |

### Footer build spec

| Item | Setting |
|---|---|
| Builder | TheGem → Footer Builder (or Global Section). Keep global. |
| Background | `#071321`; light logo variant on a white pill. |
| Column 1 | Logo · one-line description · ISO 9001:2015 · social. |
| Column 2 | Services: 9 key links + All services. |
| Column 3 | Company: About Us, How it works, Blog, Resources, Locations, Careers, Contact Us. |
| Column 4 | Dubai + Sharjah offices with full NAP, phone, email. |
| Bottom bar | Copyright (dynamic year), Privacy, Terms, Cookies, Back to top. |

### Staging → live

1. Full staging copy (files + database), search engines blocked.
2. Confirm TheGem 5.13.1 / WPBakery 9.0.1 / Theme Elements; note current header/footer template names.
3. Rebuild header and footer **first** (global), by duplicating the existing ones.
4. Optional: install the child theme (`/#wp-kit` → Header & footer → download). CSS polish only.
5. Build the homepage page from this plan; keep it out of the menu.
6. Review the whole staging site, not just the homepage.
7. Ship: push via your staging tool, or repeat the same steps on live. Never push the entire database blindly.
8. On live: assign header/footer, switch the homepage in Settings → Reading, clear caches, test the form, keep the previous version for 30 days.

### Optional child theme — what it is

Installable ZIP: `style.css`, `functions.php`, `assets/hutaib.css`, `README.txt`.

- **Does:** enqueues the parent stylesheet and small header/footer spacing/colour rules.
- **Does not:** replace header, footer or page templates; build the page; or add custom post types.
- Test on staging first. If anything looks wrong, activate TheGem again and delete the child theme.
- The parent folder must be named exactly `thegem` for `Template: thegem` to resolve.

### What I need to refine the spec against your install

1. Staging URL (no admin password).
2. Screenshot of TheGem → Header Builder with the current template name.
3. Screenshot of Theme Options → Typography and Colours.
4. One WPBakery page open in Backend Editor, to confirm element names in your version.
5. Active plugin list, especially the form plugin.

I cannot install files on your server or test against a configuration I cannot see. Everything above is meant to be applied on staging, verified, then repeated or pushed to live.
