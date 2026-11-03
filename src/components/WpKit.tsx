import { useMemo, useState, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { assets, imageByName } from "../assets/assets";
import { menuCounts, menuTreeMarkdown, primaryMenu, serviceMenu } from "../data/menu";
import {
  buildOrder,
  copyDeck,
  nativePlanMarkdown,
  nativeSections,
  optionalCss,
  simplifications,
  stackFacts,
  testPageDoc,
  testPageSteps,
  themeSetup,
  reviewOptions,
} from "../data/native";
import {
  childCss,
  childFunctions,
  childReadme,
  childStyle,
  footerSpec,
  headerSpec,
  hfReality,
  partnerScope,
  stagingPlan,
} from "../data/headerFooter";
import {
  PREVIEW_FOLDER,
  PREVIEW_URL,
  deployChecklist,
  deploySteps,
  goLiveOptions,
  htaccessContent,
  installReadme,
  previewNotes,
  robotsGuidance,
} from "../data/deployGuide";
import { createZipAsync, downloadBlob, downloadText, encoder } from "../utils/zip";
import { cn } from "../utils/cn";

type Tab = "overview" | "elements" | "copy" | "menu" | "header" | "theme" | "test" | "deploy" | "qa";

const tabs: { id: Tab; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "layers" },
  { id: "elements", label: "Native build", icon: "server" },
  { id: "copy", label: "Page copy", icon: "clipboard" },
  { id: "menu", label: "Menu", icon: "menu" },
  { id: "header", label: "Header & footer", icon: "layers" },
  { id: "theme", label: "Theme setup", icon: "sparkles" },
  { id: "test", label: "Test page", icon: "wrench" },
  { id: "deploy", label: "Preview deploy", icon: "arrowUpRight" },
  { id: "qa", label: "Launch", icon: "shield" },
];

function copyText(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
  return Promise.resolve();
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await copyText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          setCopied(false);
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1.5 text-[10.5px] font-bold text-ink-800 transition hover:border-brand/40 hover:text-brand-700"
    >
      <Icon name={copied ? "check" : "clipboard"} size={12} className={copied ? "text-[#1f9d61]" : ""} />
      {copied ? "Copied" : label}
    </button>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("min-w-0 overflow-hidden rounded-xl border border-line bg-white p-5 shadow-card sm:p-6", className)}>{children}</div>;
}

function Code({ code, filename }: { code: string; filename: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-paper px-3.5 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-bold text-ink-950">{filename}</p>
          <p className="font-mono text-[9px] text-[#5f7386]">{code.split("\n").length} lines</p>
        </div>
        <CopyButton text={code} />
        <button
          type="button"
          onClick={() => downloadText(filename, code)}
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1.5 text-[10.5px] font-bold text-ink-800 hover:text-brand-700"
        >
          <Icon name="arrowRight" size={12} className="rotate-90" /> Download
        </button>
      </div>
      <pre className={cn("overflow-auto bg-[#0a1a2c] p-4 font-mono text-[10.5px] leading-[1.65] whitespace-pre-wrap text-[#c9d8e5]", open ? "" : "max-h-[220px]")}>
        <code>{code}</code>
      </pre>
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-center gap-1.5 border-t border-line bg-paper py-2 text-[10px] font-bold text-[#52687c]">
        <Icon name="chevronDown" size={12} className={cn(open && "rotate-180")} />
        {open ? "Collapse" : "Show all"}
      </button>
    </div>
  );
}

function Heading({ kicker, title, body }: { kicker: string; title: string; body: ReactNode }) {
  return (
    <div className="mb-6">
      <span className="eyebrow text-brand-700">{kicker}</span>
      <h2 className="mt-3 max-w-[760px] text-[1.8rem] leading-[1.12] font-extrabold tracking-[-0.03em] text-ink-950 sm:text-[2.1rem]">{title}</h2>
      <div className="mt-2.5 max-w-[760px] text-[13px] leading-relaxed text-body">{body}</div>
    </div>
  );
}

function harden(html: string, badge: boolean) {
  const noindex = "noindex, nofollow, noarchive, nosnippet, max-image-preview:none";
  const title = "Preview — Security, Networking & IT Solutions in Dubai | Hutaib";
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    let robots = doc.head.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = doc.createElement("meta");
      robots.setAttribute("name", "robots");
      doc.head.appendChild(robots);
    }
    robots.setAttribute("content", noindex);
    doc.title = title;
    doc.head.querySelectorAll('link[rel="canonical"], meta[property="og:url"]').forEach((node) => node.remove());
    const flag = doc.createElement("script");
    flag.id = "hutaib-preview-flag";
    flag.textContent = `window.__HUTAIB_PREVIEW__=true;window.__HUTAIB_CLIENT_PREVIEW__=true;window.__HUTAIB_PREVIEW_BADGE__=${badge};`;
    const charset = doc.head.querySelector("meta[charset]");
    if (charset) charset.insertAdjacentElement("afterend", flag);
    else doc.head.prepend(flag);
    return `<!doctype html>\n${doc.documentElement.outerHTML}`;
  } catch {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`).replace(/<head([^>]*)>/i, `<head$1><script>window.__HUTAIB_PREVIEW__=true;window.__HUTAIB_CLIENT_PREVIEW__=true;window.__HUTAIB_PREVIEW_BADGE__=${badge};</script><meta name="robots" content="${noindex}">`);
  }
}

export function WpKit({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const [badge, setBadge] = useState(true);

  const plan = useMemo(() => nativePlanMarkdown(), []);
  const copy = useMemo(() => copyDeck(), []);
  const menu = useMemo(() => menuTreeMarkdown(), []);

  const go = (id: Tab) => {
    setTab(id);
    document.getElementById("kit-body")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const downloadPlan = async () => {
    setBusy("plan");
    try {
      const entries = [
        { path: "docs/native-build-plan.md", data: encoder.encode(plan) },
        { path: "docs/page-copy.md", data: encoder.encode(copy) },
        { path: "docs/menu-structure.md", data: encoder.encode(menu) },
        { path: "docs/TEST-PAGE.md", data: encoder.encode(testPageDoc) },
        { path: "optional.css", data: encoder.encode(optionalCss) },
        { path: "assets/hutaib-logo.png", data: new Uint8Array(await (await fetch(assets.logo)).arrayBuffer()) },
        { path: "assets/hutaib-logo-light.png", data: new Uint8Array(await (await fetch(assets.logoLight)).arrayBuffer()) },
      ];
      downloadBlob(await createZipAsync(entries), "hutaib-native-wpbakery-plan.zip");
      setMessage("Plan ZIP downloaded: build plan, page copy, menu tree, test-page guide, optional CSS and logos.");
    } catch {
      setMessage("Could not build the ZIP in this browser. Use the individual copy/download buttons.");
    }
    setBusy("");
  };

  const downloadChild = async () => {
    setBusy("child");
    try {
      const entries = [
        { path: "hutaib-child/style.css", data: encoder.encode(childStyle) },
        { path: "hutaib-child/functions.php", data: encoder.encode(childFunctions) },
        { path: "hutaib-child/assets/hutaib.css", data: encoder.encode(childCss) },
        { path: "hutaib-child/README.txt", data: encoder.encode(childReadme) },
      ];
      downloadBlob(await createZipAsync(entries), "hutaib-child-theme.zip");
      setMessage("Child theme ZIP downloaded. Install on staging: Appearance → Themes → Add New → Upload.");
    } catch {
      setMessage("Could not build the ZIP. Use the copy buttons for the individual files.");
    }
    setBusy("");
  };

  const downloadPreview = async () => {
    setBusy("preview");
    try {
      let source = "";
      try {
        source = await (await fetch(window.location.href.split("#")[0], { cache: "no-store" })).text();
      } catch {
        source = "";
      }
      if (!source || !source.includes('id="root"')) source = `<!doctype html>\n${document.documentElement.outerHTML}`;
      const entries = [
        { path: "index.html", data: encoder.encode(harden(source, badge)) },
        { path: ".htaccess", data: encoder.encode(htaccessContent) },
        { path: "INSTALL.txt", data: encoder.encode(installReadme(badge)) },
        { path: "PREVIEW-NOTES.txt", data: encoder.encode(previewNotes) },
        { path: "robots-guidance.txt", data: encoder.encode(robotsGuidance) },
      ];
      downloadBlob(await createZipAsync(entries), "hutaib-homepage-client-preview.zip");
      setMessage(`Preview package downloaded. Upload to public_html/${PREVIEW_FOLDER}/`);
    } catch {
      setMessage("Could not build the preview package. Open the live site root and retry.");
    }
    setBusy("");
  };

  return (
    <div className="min-h-screen bg-[#f5f9fc] text-ink-900">
      <div className="bg-ink-950 text-white">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <img src={assets.logoLight} alt="Hutaib InfoTech Solutions" width={140} height={38} className="h-8 w-auto rounded bg-white px-1.5 py-1" />
            <p className="hidden font-mono text-[9px] tracking-[0.16em] text-white/60 uppercase sm:block">Native WordPress build plan</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[8.5px] tracking-[0.1em] text-white/65 uppercase md:inline-flex">
              TheGem 5.13.1 · WPBakery 9.0.1
            </span>
            <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-white/20">
              <Icon name="arrowRight" size={13} className="rotate-180" /> Live preview
            </button>
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden bg-ink-950 pb-9 text-white">
        <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1180px] px-5 pt-5 md:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[9px] tracking-[0.16em] text-white/70 uppercase">
            <span className="size-1.5 rounded-full bg-signal" /> No custom JS · no child theme · 100% backend-editable
          </p>
          <h1 className="mt-3.5 max-w-[760px] text-[2rem] leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-[2.6rem]">
            The whole homepage, built only with TheGem &amp; WPBakery.
          </h1>
          <p className="mt-3 max-w-[720px] text-[13px] leading-relaxed text-white/70">
            Every section below uses an element that ships with your current versions. The design has been simplified
            from the concept so nothing depends on custom JavaScript, custom post types or theme files. The client can
            edit all content from the WPBakery backend.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button type="button" onClick={downloadPlan} disabled={busy === "plan"} className="btn-signal !px-5 !py-2.5 text-[12px] disabled:opacity-70">
              <Icon name="layers" size={15} /> {busy === "plan" ? "Packing…" : "Download native plan (.zip)"}
            </button>
            <button type="button" onClick={() => go("elements")} className="btn-outline-light !px-5 !py-2.5 text-[12px]">
              See element mapping <Icon name="arrowRight" size={14} />
            </button>
          </div>
          {message && <p className="mt-2 text-[10.5px] font-semibold text-[#9fe3bd]">{message}</p>}
        </div>
      </header>

      <div className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] gap-1.5 overflow-x-auto px-5 py-2.5 md:px-8">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[11.5px] font-bold transition",
                tab === item.id ? "bg-ink-950 text-white" : "text-[#52687c] hover:bg-paper hover:text-ink-950",
              )}
            >
              <Icon name={item.icon} size={14} className={tab === item.id ? "text-signal" : "text-brand"} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <main id="kit-body" className="mx-auto max-w-[1180px] scroll-mt-20 px-5 py-9 md:px-8">
        {tab === "overview" && (
          <div className="space-y-6">
            <Heading
              kicker="Overview"
              title="What you are building, in plain terms"
              body="Eleven rows, all made with standard rows, columns and existing elements. No shortcode hacking, no PHP, no JavaScript. If you can add an element in WPBakery, you can build this page."
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {stackFacts.map(([label, value]) => (
                <Panel key={label} className="!p-4">
                  <p className="font-mono text-[8.5px] tracking-[0.14em] text-[#5f7386] uppercase">{label}</p>
                  <p className="mt-1 text-[12px] font-extrabold text-ink-950">{value}</p>
                </Panel>
              ))}
            </div>

            <Panel className="border-[#d6e8f4] bg-[#f3faff]">
              <p className="text-[13px] font-extrabold text-ink-950">The honest trade-off</p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#52687c]">
                The earlier concept had a live system builder, ⌘K search, category filters and animated tabs. Those
                need custom JavaScript, which breaks the “editable from the backend” rule and is the usual source of
                bugs after a theme update. They are replaced with native equivalents below — the page still looks
                modern, and you can hand it to the client without a maintenance burden.
              </p>
            </Panel>

            <div>
              <p className="mb-2 font-mono text-[9px] tracking-[0.16em] text-[#5f7386] uppercase">What changes</p>
              <div className="overflow-x-auto rounded-xl border border-line bg-white">
                <table className="w-full min-w-[620px] text-left">
                  <thead>
                    <tr className="bg-paper">
                      {["Concept feature", "Native replacement", "Why"].map((h) => (
                        <th key={h} className="border-b border-line px-3.5 py-2.5 font-mono text-[9px] tracking-[0.1em] text-[#52687c] uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {simplifications.map(([feature, replacement, note]) => (
                      <tr key={feature}>
                        <td className="border-b border-line px-3.5 py-3 text-[11.5px] font-bold text-ink-950">{feature}</td>
                        <td className="border-b border-line px-3.5 py-3 text-[11.5px] text-[#0c5f92]">{replacement}</td>
                        <td className="border-b border-line px-3.5 py-3 text-[11px] leading-relaxed text-body">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Panel>
                <p className="font-mono text-[9px] tracking-[0.16em] text-[#5f7386] uppercase">Package contents</p>
                <ul className="mt-2 grid gap-1.5 text-[11px] leading-relaxed text-body">
                  <li>• <strong>native-build-plan.md</strong> — 11 rows, elements, settings</li>
                  <li>• <strong>page-copy.md</strong> — all copy, ready to paste</li>
                  <li>• <strong>menu-structure.md</strong> — exact 9-item live menu</li>
                  <li>• <strong>TEST-PAGE.md</strong> — implement it as a test page safely</li>
                  <li>• <strong>optional.css</strong> — spacing only, deletable</li>
                  <li>• logos for the Media Library</li>
                </ul>
                <div className="mt-3">
                  <CopyButton text={plan} label="Copy native plan" />
                </div>
              </Panel>
              <Panel>
                <p className="font-mono text-[9px] tracking-[0.16em] text-[#5f7386] uppercase">Build order</p>
                <ol className="mt-2 grid gap-1 text-[10.5px] leading-relaxed text-body">
                  {buildOrder.slice(0, 7).map((step, index) => (
                    <li key={step}>{index + 1}. {step}</li>
                  ))}
                </ol>
              </Panel>
            </div>

            <Panel className="bg-ink-950 text-white">
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[14px] font-extrabold">Want the preview on the site first?</p>
                  <p className="mt-1 text-[11px] text-white/60">Static folder, no theme change, noindexed. Same page you are reviewing.</p>
                </div>
                <button type="button" onClick={() => go("deploy")} className="btn-signal shrink-0 !px-4 !py-2.5 text-[11.5px]">
                  Preview deployment <Icon name="arrowRight" size={13} />
                </button>
              </div>
            </Panel>
          </div>
        )}

        {tab === "elements" && (
          <div className="space-y-5">
            <Heading kicker="Native build" title="Row-by-row element mapping" body="Use the Add Element panel. Element names are exactly as they appear in WPBakery with TheGem Theme Elements active." />
            <div className="space-y-2">
              {nativeSections.map((row) => (
                <Panel key={row.n} className="!p-4">
                  <div className="flex flex-wrap items-start gap-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded bg-ink-950 font-mono text-[9px] text-signal">{row.n}</span>
                    <p className="text-[12.5px] font-extrabold text-ink-950">{row.section}</p>
                    {row.thegem !== "—" && <span className="rounded bg-brand-50 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.06em] text-[#0c5f92] uppercase">{row.thegem}</span>}
                  </div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[8px] tracking-[0.1em] text-[#8598a9] uppercase">Elements</p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-ink-800">{row.element}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[8px] tracking-[0.1em] text-[#8598a9] uppercase">Backend settings</p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-body">{row.settings}</p>
                    </div>
                  </div>
                  <p className="mt-2 rounded bg-paper px-2.5 py-1.5 text-[10.5px] leading-relaxed text-[#52687c]">
                    <span className="font-bold text-ink-900">Content:</span> {row.content}
                  </p>
                </Panel>
              ))}
            </div>
            <Panel className="border-[#f0dcbe] bg-[#fffaf2]">
              <p className="text-[12px] font-extrabold text-ink-950">Rules that keep it editable</p>
              <ul className="mt-1.5 grid gap-1 text-[10.5px] leading-relaxed text-[#52687c]">
                <li>• Never paste page HTML into a Text Block. Use the element itself.</li>
                <li>• Build 3-column rows as three separate 1/3 columns, not one column with a table.</li>
                <li>• Use the theme’s Icon Box, Testimonials, Clients and Accordion so content stays in WordPress.</li>
                <li>• Keep section backgrounds on the Row, not on inner elements.</li>
                <li>• Set the page template to full width before building; padding is in each row’s Design Options.</li>
              </ul>
            </Panel>
          </div>
        )}

        {tab === "copy" && (
          <div className="space-y-5">
            <Heading kicker="Page copy" title="All the words, ready to paste" body="Approved homepage copy arranged in build order. No HTML — just headings, paragraphs and card text." />
            <div className="flex flex-wrap gap-2">
              <CopyButton text={copy} label="Copy everything" />
              <button type="button" onClick={() => downloadText("page-copy.md", copy)} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1.5 text-[10.5px] font-bold text-ink-800 hover:text-brand-700">
                <Icon name="arrowRight" size={12} className="rotate-90" /> Download .md
              </button>
            </div>
            <pre className="max-h-[70vh] overflow-auto rounded-xl border border-line bg-white p-4 font-sans text-[11.5px] leading-[1.8] whitespace-pre-wrap text-ink-800">{copy}</pre>
          </div>
        )}

        {tab === "menu" && (
          <div className="space-y-5">
            <Heading kicker="Menu" title="The exact live menu" body={`${menuCounts.topLevel} top-level items, ${menuCounts.services} service groups and ${menuCounts.serviceSubItems} nested links. Rebuild it in Appearance → Menus; no code needed.`} />
            <div className="grid gap-3 sm:grid-cols-4">
              {[["Top level", menuCounts.topLevel], ["About Us", menuCounts.about], ["Service groups", menuCounts.services], ["Locations", menuCounts.locations]].map(([label, value]) => (
                <Panel key={String(label)} className="!p-4">
                  <p className="font-mono text-[8.5px] tracking-[0.12em] text-[#5f7386] uppercase">{label}</p>
                  <p className="mt-1 font-mono text-[20px] font-medium text-ink-950">{value}</p>
                </Panel>
              ))}
            </div>
            <Panel>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[12.5px] font-extrabold text-ink-950">Top-level items</p>
                <CopyButton text={menu} label="Copy full tree" />
              </div>
              <ol className="mt-2.5 grid gap-1">
                {primaryMenu.map((item, index) => (
                  <li key={item.label} className="flex flex-wrap items-center gap-2 rounded border border-line px-2.5 py-1.5">
                    <span className="font-mono text-[9px] text-[#8598a9]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-[11.5px] font-bold text-ink-950">{item.label}</span>
                    <span className="rounded bg-paper px-1.5 py-0.5 font-mono text-[8px] text-[#52687c] uppercase">{item.type}</span>
                    {item.children && <span className="font-mono text-[8.5px] text-[#8598a9]">{item.children.length} children</span>}
                  </li>
                ))}
              </ol>
            </Panel>
            <Panel>
              <p className="text-[12.5px] font-extrabold text-ink-950">Services mega menu</p>
              <p className="mt-1 text-[10.5px] text-body">Enable TheGem’s multi-column menu for Services with 2 columns. Keep the order and labels.</p>
              <div className="mt-2.5 grid gap-x-5 gap-y-1 sm:grid-cols-2">
                {serviceMenu.map((group, index) => (
                  <div key={group.label} className="min-w-0">
                    <p className="flex gap-1.5 text-[10.5px] leading-snug text-[#52687c]">
                      <span className="font-mono text-[8.5px] text-[#b3c2ce]">{String(index + 1).padStart(2, "0")}</span>
                      {group.label}
                    </p>
                    {group.children && (
                      <ul className="ml-4 border-l border-line pl-2">
                        {group.children.map((child) => (
                          <li key={child.label} className="py-0.5 text-[9.5px] text-[#8598a9]">{child.label}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Panel>
            <Code code={menu} filename="menu-structure.md" />
          </div>
        )}

        {tab === "header" && (
          <div className="space-y-5">
            <Heading
              kicker="Header & footer"
              title="They are global — that is why you use staging"
              body="TheGem renders the header and footer for every page. A test page will show the current ones until you change them in Header Builder / Footer Builder. On staging you can change them globally with zero risk to the live site."
            />

            <div className="grid gap-2 sm:grid-cols-2">
              {hfReality.map((item) => (
                <Panel key={item.title} className="!p-4">
                  <p className="text-[11.5px] font-extrabold text-ink-950">{item.title}</p>
                  <p className="mt-1 text-[10.5px] leading-relaxed text-body">{item.body}</p>
                </Panel>
              ))}
            </div>

            <Panel className="border-[#f0dcbe] bg-[#fffaf2]">
              <div className="flex items-start gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-signal text-ink-950">
                  <Icon name="shield" size={15} />
                </span>
                <div>
                  <p className="text-[12.5px] font-extrabold text-ink-950">No standalone theme — and here is why</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#52687c]">
                    A custom “complete theme” would replace TheGem’s Header Builder, Theme Elements and backend editing —
                    exactly what you asked to keep. <strong>Stay on TheGem, rebuild the header/footer in the builders,
                    and optionally install the child theme below for polish.</strong> That gives you an installable
                    package and a backend-editable site, without untested template overrides.
                  </p>
                </div>
              </div>
            </Panel>

            <div className="grid gap-4 lg:grid-cols-2">
              <Panel>
                <p className="font-mono text-[9px] tracking-[0.16em] text-[#5f7386] uppercase">Header build spec</p>
                <div className="mt-2 overflow-hidden rounded-lg border border-line">
                  <table className="w-full border-collapse text-left">
                    <tbody>
                      {headerSpec.map((row) => (
                        <tr key={row.item} className="align-top">
                          <td className="w-[30%] border-b border-line px-2.5 py-2 text-[10.5px] font-bold text-ink-950">{row.item}</td>
                          <td className="border-b border-line px-2.5 py-2 text-[10px] leading-relaxed text-[#52687c]">{row.setting}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
              <Panel>
                <p className="font-mono text-[9px] tracking-[0.16em] text-[#5f7386] uppercase">Footer build spec</p>
                <div className="mt-2 overflow-hidden rounded-lg border border-line">
                  <table className="w-full border-collapse text-left">
                    <tbody>
                      {footerSpec.map((row) => (
                        <tr key={row.item} className="align-top">
                          <td className="w-[30%] border-b border-line px-2.5 py-2 text-[10.5px] font-bold text-ink-950">{row.item}</td>
                          <td className="border-b border-line px-2.5 py-2 text-[10px] leading-relaxed text-[#52687c]">{row.setting}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-[#5f7386] uppercase">Staging → live</p>
                  <p className="mt-1 text-[14px] font-extrabold text-ink-950">Eight steps, no guesswork</p>
                </div>
                <CopyButton text={stagingPlan.map((s) => `${s.step}. ${s.title}\n${s.body}`).join("\n\n")} label="Copy staging plan" />
              </div>
              <ol className="grid gap-2 sm:grid-cols-2">
                {stagingPlan.map((step) => (
                  <li key={step.step} className="rounded-xl border border-line bg-white p-3.5 shadow-card">
                    <div className="flex items-start gap-2.5">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded bg-ink-950 font-mono text-[9px] text-signal">{step.step}</span>
                      <div>
                        <p className="text-[11.5px] font-extrabold text-ink-950">{step.title}</p>
                        <p className="mt-1 text-[10.5px] leading-relaxed text-body">{step.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Panel className="border-[#d6e8f4] bg-[#f3faff]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="max-w-[560px]">
                  <p className="text-[14px] font-extrabold text-ink-950">Optional: Hutaib Child theme</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#52687c]">
                    An installable ZIP for staging. It enqueues the parent stylesheet and a small CSS file for header/footer
                    spacing and colours. It does <strong>not</strong> replace the header, footer or page templates, and it
                    does not build the page. If you skip it, Header Builder alone is enough.
                  </p>
                  <ul className="mt-2 grid gap-1 text-[10.5px] leading-relaxed text-[#52687c]">
                    <li>• <code className="rounded bg-white px-1 font-mono text-[9.5px]">style.css</code> — Template: thegem</li>
                    <li>• <code className="rounded bg-white px-1 font-mono text-[9.5px]">functions.php</code> — enqueues only</li>
                    <li>• <code className="rounded bg-white px-1 font-mono text-[9.5px]">assets/hutaib.css</code> — header/footer polish</li>
                    <li>• <code className="rounded bg-white px-1 font-mono text-[9.5px]">README.txt</code> — install and rollback</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={downloadChild} disabled={busy === "child"} className="btn-signal !px-4 !py-2.5 text-[11.5px] disabled:opacity-70">
                    <Icon name="layers" size={14} /> {busy === "child" ? "Packing…" : "Download child theme (.zip)"}
                  </button>
                  <CopyButton text={childReadme} label="Copy install notes" />
                </div>
              </div>
            </Panel>

            <Code code={childCss} filename="hutaib-child/assets/hutaib.css" />

            <div className="grid gap-2 lg:grid-cols-2">
              {partnerScope.map(([title, body]) => (
                <Panel key={title} className="!p-4">
                  <p className="text-[11.5px] font-extrabold text-ink-950">{title}</p>
                  <p className="mt-1 text-[10.5px] leading-relaxed text-body">{body}</p>
                </Panel>
              ))}
            </div>

            <Panel className="bg-ink-950 text-white">
              <p className="text-[13px] font-extrabold">What to send me when staging is ready</p>
              <ol className="mt-2 grid gap-1 text-[11px] leading-relaxed text-white/70">
                <li>1. Staging URL (no admin password needed).</li>
                <li>2. Screenshot of TheGem → Header Builder, showing the current header template name.</li>
                <li>3. Screenshot of Theme Options → Typography and Colours.</li>
                <li>4. One WPBakery page open in Backend Editor (so I can match the element names in your version).</li>
                <li>5. List of active plugins, especially the form plugin.</li>
              </ol>
              <p className="mt-2 text-[10.5px] text-white/50">
                With those I can confirm the header/footer settings against your exact install and adjust the spec
                rather than guessing.
              </p>
            </Panel>
          </div>
        )}

        {tab === "theme" && (
          <div className="space-y-5">
            <Heading kicker="Theme setup" title="Set it once in Theme Options" body="Colours, fonts and button shape come from the theme — not from custom code. These settings match the approved design closely using fonts already available in TheGem." />
            <div className="overflow-x-auto rounded-xl border border-line bg-white">
              <table className="w-full min-w-[560px] text-left">
                <thead>
                  <tr className="bg-paper">
                    {["Setting", "Value", "Where"].map((h) => (
                      <th key={h} className="border-b border-line px-3.5 py-2.5 font-mono text-[9px] tracking-[0.1em] text-[#52687c] uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {themeSetup.map(([setting, value, where]) => (
                    <tr key={setting}>
                      <td className="border-b border-line px-3.5 py-2.5 text-[11.5px] font-bold text-ink-950">{setting}</td>
                      <td className="border-b border-line px-3.5 py-2.5 text-[11.5px] text-[#0c5f92]">{value}</td>
                      <td className="border-b border-line px-3.5 py-2.5 text-[10.5px] text-body">{where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Panel>
              <p className="text-[12.5px] font-extrabold text-ink-950">Optional spacing snippet</p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-body">
                Completely optional. Use it only if the default row padding feels too tight. It contains no
                JavaScript and no layout rules, so removing it never breaks the page.
              </p>
              <div className="mt-2.5">
                <Code code={optionalCss} filename="optional.css" />
              </div>
            </Panel>
          </div>
        )}

        {tab === "test" && (
          <div className="space-y-5">
            <Heading
              kicker="Test page"
              title="Build it as a page, not as the homepage"
              body="Create a separate WordPress page in the same install, build it with WPBakery, review it, and only then point Settings → Reading at it. The live homepage stays untouched throughout."
            />

            <Panel className="border-[#f0dcbe] bg-[#fffaf2]">
              <div className="flex items-start gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-signal text-ink-950">
                  <Icon name="shield" size={15} />
                </span>
                <div>
                  <p className="text-[12.5px] font-extrabold text-ink-950">The one rule for a test page on a live install</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#52687c]">
                    <strong>TheGem Theme Options are global.</strong> Changing heading fonts, accent colours or button
                    radius there immediately restyles every live page. During the test, apply backgrounds and sizes at
                    <strong> Row / Element level</strong> and keep a written list of global changes for launch day.
                    If you must test global options now, do it on a staging copy.
                  </p>
                </div>
              </div>
            </Panel>

            <div className="grid gap-3 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="mb-2 font-mono text-[9px] tracking-[0.16em] text-[#5f7386] uppercase">Step by step</p>
                <ol className="space-y-1.5">
                  {testPageSteps.map((step) => (
                    <li key={step.n} className="rounded-xl border border-line bg-white p-3.5 shadow-card">
                      <div className="flex items-start gap-2.5">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded bg-ink-950 font-mono text-[9px] text-signal">{step.n}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                            <p className="text-[12px] font-extrabold text-ink-950">{step.title}</p>
                            <span className="font-mono text-[8.5px] tracking-[0.08em] text-[#8598a9] uppercase">{step.time}</span>
                          </div>
                          <p className="mt-1 text-[10.5px] leading-relaxed text-body">{step.body}</p>
                          {step.bullets && (
                            <ul className="mt-1.5 grid gap-0.5">
                              {step.bullets.map((bullet) => (
                                <li key={bullet} className="flex gap-1.5 text-[10px] leading-relaxed text-[#52687c]">
                                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#b6c6d3]" />
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-3 lg:col-span-5">
                <Panel>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-[#5f7386] uppercase">Review the page</p>
                  <p className="mt-1 text-[10.5px] leading-relaxed text-body">
                    A draft preview only works for logged-in admins. Choose the method that matches how the client reviews.
                  </p>
                  <div className="mt-2.5 space-y-2">
                    {reviewOptions.map((option) => (
                      <div key={option.title} className="rounded-lg border border-line bg-paper p-2.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <p className="text-[11px] font-extrabold text-ink-950">{option.title}</p>
                          <span className="font-mono text-[8px] tracking-[0.06em] text-[#0c5f92] uppercase">{option.best}</span>
                        </div>
                        <p className="mt-1 text-[10px] leading-relaxed text-[#52687c]">{option.body}</p>
                        <p className="mt-1 text-[9.5px] leading-relaxed text-[#8598a9]">Watch out: {option.risk}</p>
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel className="border-[#d6e8f4] bg-[#f3faff]">
                  <p className="text-[12px] font-extrabold text-ink-950">First checkpoint — 20 minutes</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-[#52687c]">Stop after the hero row and verify:</p>
                  <ul className="mt-2 grid gap-1">
                    {[
                      "Page uses the full-width template, no title, no sidebar",
                      "Hero renders correctly at 1440 and 390px",
                      "Exactly one H1 on the page",
                      "Buttons scroll to contact / dial the number",
                      "A Media Library image loads correctly",
                      "Page is Draft or noindex, and not in the menu",
                    ].map((item) => (
                      <li key={item} className="flex gap-1.5 text-[10px] leading-relaxed text-body">
                        <span className="text-brand">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[10px] leading-relaxed text-[#8598a9]">
                    If those pass, the remaining ten rows are repetition — not unknowns.
                  </p>
                </Panel>

                <Panel>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-[#5f7386] uppercase">Go live (on approval)</p>
                  <ol className="mt-1.5 grid gap-1 text-[10px] leading-relaxed text-body">
                    <li>1. Settings → Reading → static page → select the new page.</li>
                    <li>2. Apply the collected global Theme Options changes.</li>
                    <li>3. Switch form recipients back to the real inboxes.</li>
                    <li>4. Clear theme, page and CDN caches.</li>
                    <li>5. Update the sitemap and request indexing.</li>
                    <li>6. Keep the old homepage for 30 days.</li>
                  </ol>
                  <p className="mt-2 rounded bg-paper px-2 py-1.5 text-[10px] text-[#52687c]">
                    <strong>Rollback:</strong> Settings → Reading → previous page. Two minutes, nothing deleted.
                  </p>
                </Panel>
              </div>
            </div>

            <Panel>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[12.5px] font-extrabold text-ink-950">Take the checklist with you</p>
                  <p className="mt-0.5 text-[10.5px] text-body">The full guide is included in the plan ZIP as docs/TEST-PAGE.md.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <CopyButton text={testPageDoc} label="Copy guide" />
                  <button
                    type="button"
                    onClick={() => downloadText("TEST-PAGE.md", testPageDoc)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1.5 text-[10.5px] font-bold text-ink-800 hover:text-brand-700"
                  >
                    <Icon name="arrowRight" size={12} className="rotate-90" /> Download .md
                  </button>
                  <button type="button" onClick={downloadPlan} disabled={busy === "plan"} className="btn-signal !px-3.5 !py-2 text-[11px] disabled:opacity-70">
                    <Icon name="layers" size={13} /> Plan ZIP
                  </button>
                </div>
              </div>
            </Panel>
          </div>
        )}

        {tab === "deploy" && (
          <div className="space-y-5">
            <Heading kicker="Preview deploy" title="A self-contained HTML ZIP for client approval" body="One HTML file with CSS, JavaScript, font, logo, photography and client logos embedded. Upload it to any testing server, subdomain or folder — no WordPress, no database, no hotlink protection. Uploading the folder leaves TheGem, WPBakery and the database untouched." />
            <div className="grid gap-3 sm:grid-cols-3">
              {[["Theme", "Unchanged"], ["Database", "No writes"], ["Rollback", "Delete one folder"]].map(([a, b]) => (
                <Panel key={a} className="!p-4">
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-[#5f7386]">{a}</p>
                  <p className="mt-1 text-[12px] font-extrabold text-ink-950">{b}</p>
                </Panel>
              ))}
            </div>
            <Panel className="border-[#d6e8f4] bg-[#f3faff]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[14px] font-extrabold text-ink-950">Preview package</p>
                  <p className="mt-1 max-w-[520px] text-[11px] leading-relaxed text-[#52687c]">
                    One <strong>index.html</strong> (everything embedded), plus <strong>.htaccess</strong> with
                    noindex, install notes and a client review checklist. The developer kit is disabled so the
                    client cannot reach it.
                  </p>
                </div>
                <span className="rounded-full border border-[#cfe4f2] bg-white px-2.5 py-1 font-mono text-[8.5px] text-[#0c5f92] uppercase">Static · noindex</span>
              </div>
              <label className="mt-3 flex items-start gap-2 rounded-lg border border-[#cfe4f2] bg-white p-2.5 text-[10.5px] leading-relaxed text-[#52687c]">
                <input type="checkbox" checked={badge} onChange={(e) => setBadge(e.target.checked)} className="mt-0.5 size-4 accent-[#1483c6]" />
                Show the “Client preview — design only” notice (recommended for approval)
              </label>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button type="button" onClick={downloadPreview} disabled={busy === "preview"} className="btn-signal !px-4 !py-2.5 text-[11.5px] disabled:opacity-70">
                  <Icon name="layers" size={14} /> {busy === "preview" ? "Packing…" : "Download client approval ZIP"}
                </button>
                <CopyButton text={installReadme(badge)} label="Copy install notes" />
                <CopyButton text={PREVIEW_URL} label="Copy preview URL" />
              </div>
              <p className="mt-2 font-mono text-[9.5px] text-[#5f7386]">Upload to public_html/{PREVIEW_FOLDER}/ · folder 755 · files 644</p>
            </Panel>
            <div className="grid gap-2 sm:grid-cols-2">
              {deploySteps.map((step, index) => (
                <Panel key={step.title} className="!p-4">
                  <p className="font-mono text-[8.5px] text-[#8598a9]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-1 text-[11.5px] font-extrabold text-ink-950">{step.title}</p>
                  <p className="mt-1 text-[10.5px] leading-relaxed text-body">{step.body}</p>
                </Panel>
              ))}
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <Code code={htaccessContent} filename=".htaccess" />
              <Panel>
                <p className="text-[12px] font-extrabold text-ink-950">Before sharing</p>
                <ul className="mt-1.5 grid gap-1">
                  {deployChecklist.map((item) => (
                    <li key={item} className="flex gap-1.5 text-[10.5px] leading-relaxed text-body"><span className="text-brand">✓</span>{item}</li>
                  ))}
                </ul>
              </Panel>
            </div>
            <div className="grid gap-2 lg:grid-cols-3">
              {goLiveOptions.map((option) => (
                <Panel key={option.title} className={option.recommended ? "border-[#bcd9ee] bg-[#f5fbff]" : ""}>
                  {option.recommended && <span className="mb-1.5 inline-flex rounded-full bg-brand px-2 py-0.5 font-mono text-[8px] text-white uppercase">Recommended</span>}
                  <p className="text-[11.5px] font-extrabold text-ink-950">{option.title}</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-body">{option.body}</p>
                </Panel>
              ))}
            </div>
          </div>
        )}

        {tab === "qa" && (
          <div className="space-y-5">
            <Heading kicker="Launch" title="Checklist before the client sees it" body="Native build means fewer failure points — but content, SEO and forms still need a deliberate pass." />
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                ["Content", ["Copy approved", "Real project photos in the Media Library", "Client logos approved", "Both office addresses confirmed"]],
                ["Build", ["Theme Options colours and fonts set", "All 11 rows match the element plan", "Every service card links to its page", "9-item menu assigned in Header Builder"]],
                ["Forms & contact", ["Form delivers to the real inboxes", "Spam protection enabled", "Phone / WhatsApp links tested on mobile", "Privacy consent line present"]],
                ["SEO & launch", ["One H1, logical H2s", "Title and meta description set", "FAQ matches FAQPage schema", "Sitemap submitted after switching the homepage"]],
              ].map(([group, items]) => (
                <Panel key={String(group)}>
                  <p className="text-[11.5px] font-extrabold text-ink-950">{String(group)}</p>
                  <ul className="mt-1.5 grid gap-1">
                    {(items as string[]).map((item) => (
                      <li key={item} className="flex gap-1.5 text-[10.5px] leading-relaxed text-body"><span className="text-brand">✓</span>{item}</li>
                    ))}
                  </ul>
                </Panel>
              ))}
            </div>
            <Panel className="border-[#f0dcbe] bg-[#fffaf2]">
              <p className="text-[12px] font-extrabold text-ink-950">Assets already available</p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-[#52687c]">
                The logo, service photography and client logos are already in the site’s Media Library. Use the
                download links in the plan ZIP or select the existing files — no new uploads needed.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Object.keys(imageByName).slice(0, 8).map((file) => (
                  <a key={file} href={imageByName[file]} target="_blank" rel="noreferrer noopener" className="rounded border border-line bg-white px-1.5 py-1 font-mono text-[9px] text-[#0c5f92] hover:border-brand/40">
                    {file}
                  </a>
                ))}
              </div>
            </Panel>
          </div>
        )}
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-5 py-5 text-[10.5px] text-[#5f7386] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Hutaib InfoTech Solutions · Native build plan · TheGem 5.13.1 / WPBakery 9.0.1</p>
          <button type="button" onClick={onBack} className="self-start font-bold text-brand-700 hover:text-ink-950">Back to preview</button>
        </div>
      </footer>
    </div>
  );
}
