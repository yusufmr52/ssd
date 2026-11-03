export const PREVIEW_FOLDER = "preview-2026";
export const PREVIEW_URL = `https://securitysolutionsdubai.com/${PREVIEW_FOLDER}/`;

export type DeployStep = {
  title: string;
  body: string;
  code?: string;
};

export const deploySteps: DeployStep[] = [
  {
    title: "Download the preview package",
    body: "Use the button above. You get a ZIP with index.html, .htaccess, INSTALL.txt and PREVIEW-NOTES.txt. The HTML already contains every style, script, font and logo it needs.",
  },
  {
    title: "Open your hosting file manager",
    body: "In cPanel → File Manager (or connect with FTP/SFTP using your host credentials), open public_html — the same folder that contains wp-config.php, wp-content and wp-admin. Do not edit any of those files.",
  },
  {
    title: "Create a preview folder",
    body: `Create a new folder inside public_html named ${PREVIEW_FOLDER}. A less guessable name also works; if you change it, keep the same name in the URL you share. Folder permission 755.`,
  },
  {
    title: "Upload the package contents",
    body: "Upload index.html, .htaccess, INSTALL.txt and PREVIEW-NOTES.txt into that folder (not into wp-content). File permission 644. Make sure the file is named exactly index.html so WordPress is never loaded for this URL.",
  },
  {
    title: "Open the preview URL",
    body: `Visit https://securitysolutionsdubai.com/${PREVIEW_FOLDER}/. You should see the new homepage with a small “Preview build” badge. If you see the old site, a 404 or a directory listing, the folder/path is wrong — recheck that you are in public_html and that index.html exists.`,
  },
  {
    title: "Confirm it is protected",
    body: "View the page source and confirm <meta name=\"robots\" content=\"noindex, nofollow…\"> is present. Check the response headers for X-Robots-Tag: noindex (mod_headers). Do not add this URL to the public menu, sitemap or social profiles.",
  },
  {
    title: "Optional password protection",
    body: "cPanel → Directory Privacy → select the folder → create a user. Or enable the commented basic-auth block in .htaccess after creating a .htpasswd file. Share the password with the client separately from the URL.",
  },
  {
    title: "Share for review, then decide",
    body: "Send the URL (and password) to the client. Collect feedback on the preview. When approved, either rebuild the page in WPBakery using the kit or follow one of the go-live paths below. Never make it live by overwriting the WordPress homepage file.",
  },
  {
    title: "Rollback is one folder",
    body: `The preview never touches WordPress. To remove it, delete public_html/${PREVIEW_FOLDER}/. The theme, plugins, database, menus and homepage stay exactly as they are.`,
  },
];

export const htaccessContent = `# Hutaib 2026 homepage preview
# Place in: public_html/${PREVIEW_FOLDER}/.htaccess
# Static folder only. Does not touch WordPress.

DirectoryIndex index.html
Options -Indexes

<IfModule mod_headers.c>
  # Keep the preview out of search results, even if the URL is shared.
  Header always set X-Robots-Tag "noindex, nofollow, noarchive, nosnippet"

  # Safe defaults for a standalone static page.
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"

  # Never cache the preview HTML: the client always sees the latest upload.
  <FilesMatch "index\\.html$">
    Header always set Cache-Control "no-store, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>

<IfModule mod_mime.c>
  AddType font/woff2 .woff2
</IfModule>

# ---------------------------------------------------------------
# OPTIONAL PASSWORD PROTECTION
# 1. cPanel -> Directory Privacy (easiest), or create .htpasswd with:
#      htpasswd -c /home/YOUR_CPANEL_USER/public_html/${PREVIEW_FOLDER}/.htpasswd preview
# 2. Uncomment the lines below and replace YOUR_CPANEL_USER.
# ---------------------------------------------------------------
# AuthType Basic
# AuthName "Hutaib homepage preview"
# AuthUserFile /home/YOUR_CPANEL_USER/public_html/${PREVIEW_FOLDER}/.htpasswd
# Require valid-user
`;

export const robotsGuidance = `# OPTIONAL — read the trade-off first
#
# The page already sends X-Robots-Tag: noindex and a noindex meta tag.
# That is the reliable way to keep it OUT of Google.
#
# If you also add "Disallow: /${PREVIEW_FOLDER}/" to robots.txt,
# crawlers are blocked from reading the noindex tag, which can slow
# down removal if the URL is ever discovered. Prefer:
#   1. unguessable URL
#   2. noindex header + meta (already included)
#   3. optional password protection
# 4. do not link the URL publicly
#
# If your policy requires a robots.txt block, add this to the file
# managed by Yoast (SEO -> Tools -> File editor):
Disallow: /${PREVIEW_FOLDER}/
`;

export const previewNotes = `HUTAIB HOMEPAGE — CLIENT APPROVAL PREVIEW

WHAT THIS IS
- A fully self-contained static preview of the 2026 homepage design.
- One index.html file: all CSS, JavaScript, the font, the Hutaib logo,
  all photography and the published client logos are embedded.
- No WordPress, no CDN and no hotlinking required. It works on any
  testing server, subdomain or subfolder, even on a different domain.
- It does not read or write the WordPress database.

WHAT IT IS NOT
- It is not the production WordPress homepage.
- The developer kit is disabled in this build; the client cannot reach it.
- The enquiry form is a visual prototype. It shows a success state but
  does NOT send email or store leads. Do not collect real customer data
  in it during the preview.
- The developer kit is disabled in this client-preview build. Ask for the
  internal package if you need it during the review.

SEO / GO-LIVE
- This file is client-rendered React. Search engines and AI crawlers
  see very little in the raw HTML compared with the live WordPress
  site. Do not replace the production homepage with this file without
  addressing that.
- Recommended go-live: rebuild the homepage in WPBakery with the kit,
  then switch the static homepage in Settings -> Reading.
- If the client insists on this exact build, either (a) serve it at the
  root with a prerendered HTML snapshot, or (b) keep WordPress and
  place this page behind a full-width template. Get SEO sign-off first.

CLIENT REVIEW CHECKLIST
- Open on a phone and a desktop.
- Confirm the logo, hero image and service cards look right.
- Click a service card: it opens the existing service page in a new tab.
- Use the menu: 9 items, same labels and order as the current site.
- Try the enquiry form: it validates but does not send by design. Use the
  call/WhatsApp links in the preview notice for real contact.
- Note any copy, image or section changes and send them as a list.

MAINTENANCE
- Replacing the preview: overwrite index.html only.
- Removing it: delete the preview folder. No rollback needed.
- Caching: clear the host/CDN cache after replacing the file.
`;

export const installReadme = (includeBadge: boolean) => `HUTAIB 2026 HOMEPAGE — PREVIEW INSTALL
=====================================

Package contents
----------------
index.html        The complete preview. Everything is embedded:
                  CSS, JavaScript, font, logo, photography, client logos.
                  No CDN and no WordPress files are required.
.htaccess         Noindex headers, no directory listing, optional password
INSTALL.txt       This file
PREVIEW-NOTES.txt Form limitation, client checklist and go-live guidance
robots-guidance.txt  Indexing trade-off (optional reading)

Works anywhere
--------------
Because every asset is embedded, you can upload this to:
- a folder on the existing domain: /preview-2026/
- a separate testing domain or subdomain
- a plain Apache/Nginx static host
No database, PHP, WordPress or CORS setup is needed.

Install (cPanel / File Manager)
-------------------------------
1. Log in to cPanel -> File Manager.
2. Open public_html (the WordPress root, next to wp-config.php).
3. Create the folder: ${PREVIEW_FOLDER}
4. Upload all four files into that folder.
5. Set the folder to 755 and the files to 644.
6. Open: ${PREVIEW_URL}

Install (FTP / SFTP)
--------------------
Host:     your hosting FTP host
User:     your cPanel/FTP user
Path:     /public_html/${PREVIEW_FOLDER}/
Upload:   index.html, .htaccess, INSTALL.txt, PREVIEW-NOTES.txt
Mode:     binary (for index.html)

Alternative: single file at the root
------------------------------------
If you cannot create a folder, rename index.html to preview-2026.html and
upload it to public_html. URL: /preview-2026.html. Add this inside the
root .htaccess <IfModule mod_headers.c> block:

  <Files "preview-2026.html">
    Header always set X-Robots-Tag "noindex, nofollow"
    Header always set Cache-Control "no-store, max-age=0, must-revalidate"
  </Files>

A folder is still cleaner: its .htaccess applies automatically and deleting
the folder removes everything in one step. A subdomain such as
preview.securitysolutionsdubai.com also works; point it at a folder containing
the same files. In that case, re-upload the images or allow hotlinking, since
they come from the main domain.

If images or fonts do not appear
---------------------------------
They are embedded as data URIs, so this usually means index.html was not
uploaded completely. Re-upload the full file (about 1 MB) in binary mode.

If the URL shows the WordPress homepage or a 404
------------------------------------------------
- Confirm index.html is directly inside public_html/${PREVIEW_FOLDER}/.
- Confirm the file starts with <!doctype html> and is not 0 bytes.
- If your host uses nginx (no .htaccess), ask support to serve the folder
  as static files and to send X-Robots-Tag: noindex for that path.
- Clear the host and CDN cache, then retry in a private window.

Protect it (recommended)
------------------------
- Noindex is already inside index.html and in .htaccess.
- Optional password: cPanel -> Directory Privacy -> select the folder.
- Do not link the preview from the public menu, sitemap or social media.

Client-preview notice
---------------------
${includeBadge ? "The small “Client preview — design only” notice is INCLUDED.\nIt explains that the form is a demo and offers call/WhatsApp links,\nso the client is not confused when the form does not send.\nIt is dismissible." : "The notice is EXCLUDED, so the page looks exactly like the final design.\nSend the client a short message that the form is not connected yet."}

What is not included
--------------------
- No email sending: the enquiry form is a visual prototype.
- No WordPress theme/plugin/database changes.
- No admin area: this is static HTML, not a WordPress page.
- The developer kit is disabled in this build.
  On a different domain, re-upload the images and update the URLs.

Developer kit
-------------
The developer kit is DISABLED in this client-approval build. There is no
/#wp-kit page inside this package, so the client cannot reach build notes,
internal copy or the WPBakery plan. Ask for the internal package separately.

Rollback
--------
Delete public_html/${PREVIEW_FOLDER}/. Nothing else changes.

Go-live (recommended)
---------------------
Rebuild the page in WPBakery using the internal build kit, then set the
static homepage in Settings -> Reading. Do not make this client-rendered
file the permanent homepage without an SEO review.
`;

export type GoLiveOption = {
  title: string;
  recommended?: boolean;
  body: string;
};

export const goLiveOptions: GoLiveOption[] = [
  {
    title: "Rebuild in WPBakery, then switch the homepage",
    recommended: true,
    body: "Use the kit in the Page & elements, Styles, Scripts and Menu tabs. The design is reproduced with TheGem/WPBakery elements, keeps the theme, and gives search engines real HTML. Set the new page as the static homepage only after the preview is signed off.",
  },
  {
    title: "Keep this static build and point the homepage to it",
    body: "Possible if the host lets you replace the homepage response, but the initial HTML is nearly empty because React renders on the client. You would need to prerender a snapshot and keep WordPress admin/plugins working at their existing paths. Get an SEO sign-off and keep a full backup.",
  },
  {
    title: "Preview-only forever (not recommended long term)",
    body: "Leave the preview folder live but noindexed. Useful for sales conversations or a design archive, but never a substitute for the production homepage.",
  },
];

export const deployChecklist = [
  "ZIP downloaded from /#wp-kit → Deploy tab",
  "Folder created inside public_html, not wp-content",
  "index.html uploaded and opens in a private window",
  "Page source contains the noindex meta tag",
  "Response headers contain X-Robots-Tag: noindex",
  "Preview URL is not linked from the public site or sitemap",
  "Client has the URL (and password, if enabled)",
  "Enquiry form understood as a non-sending prototype",
  "Rollback scoped to deleting the preview folder",
];
