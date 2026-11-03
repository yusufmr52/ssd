import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { assets } from "../assets/assets";
import { contact } from "../data/site";
import { menuCounts, primaryMenu, serviceMenu, type MenuItem } from "../data/menu";
import { cn } from "../utils/cn";

type HeaderProps = {
  onQuote: (intent?: string) => void;
};

function isExternal(href: string) {
  return href.startsWith("http");
}

function LinkAttrs({ href }: { href: string }) {
  return isExternal(href) ? { target: "_blank", rel: "noreferrer noopener" } : {};
}

export function Header({ onQuote }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  const hoverOpen = (label: string) => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenMenu(label), 90);
  };

  const hoverClose = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const quote = (intent?: string) => {
    closeAll();
    onQuote(intent);
  };

  const renderDesktopMenu = (item: MenuItem) => {
    if (item.type === "link") {
      return (
        <a
          key={item.label}
          href={item.href}
          {...LinkAttrs({ href: item.href })}
          className="rounded-md px-2.5 py-2.5 text-[12.5px] font-semibold whitespace-nowrap text-ink-800 transition hover:bg-paper hover:text-ink-950 2xl:px-3 2xl:text-[13px]"
        >
          {item.label}
        </a>
      );
    }

    const open = openMenu === item.label;

    return (
      <div key={item.label} onMouseEnter={() => hoverOpen(item.label)} onMouseLeave={hoverClose}>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup={item.type === "mega" ? "true" : "menu"}
          onClick={() => setOpenMenu(open ? null : item.label)}
          className={cn(
            "relative inline-flex items-center gap-1 rounded-md px-2.5 py-2.5 text-[12.5px] font-semibold whitespace-nowrap transition 2xl:px-3 2xl:text-[13px]",
            open ? "bg-paper text-ink-950" : "text-ink-800 hover:bg-paper hover:text-ink-950",
          )}
        >
          {item.label}
          <Icon
            name="chevronDown"
            size={12}
            className={cn("text-[#64798c] transition-transform duration-200", open && "rotate-180")}
          />
          {open && <span className="absolute right-2.5 -bottom-0.5 left-2.5 h-[2px] rounded-full bg-signal" />}
        </button>

        {item.type === "dropdown" && open && (
          <div
            className={cn(
              "absolute top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-[0_30px_80px_-30px_rgba(7,19,33,0.4)]",
              item.label === "About Us" ? "left-0 w-[360px]" : "left-0 w-[220px]",
            )}
          >
            <p className="px-2.5 pt-1.5 pb-2 font-mono text-[8.5px] tracking-[0.16em] text-[#64798c] uppercase">
              {item.label}
            </p>
            <ul>
              {(item.children ?? []).map((child) => (
                <li key={child.label}>
                  <a
                    href={child.href}
                    {...LinkAttrs({ href: child.href })}
                    className="group flex items-start justify-between gap-3 rounded-lg px-2.5 py-2 text-[12px] leading-snug font-semibold text-ink-800 transition hover:bg-paper hover:text-ink-950"
                  >
                    {child.label}
                    <Icon
                      name="arrowUpRight"
                      size={12}
                      className="mt-0.5 shrink-0 text-[#b6c5d2] transition group-hover:text-brand"
                    />
                  </a>
                </li>
              ))}
            </ul>
            {item.label === "Locations" && (
              <a
                href={`${contact.mapsUrl}`}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1 flex items-center gap-2 rounded-lg bg-paper px-2.5 py-2 text-[10.5px] font-bold text-ink-800 transition hover:text-brand-700"
              >
                <Icon name="pin" size={12} className="text-brand" />
                Dubai head office
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-md bg-ink-950 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>

      <div className="hidden bg-ink-950 text-white/65 lg:block">
        <div className="shell flex h-10 items-center justify-between gap-6 text-[11.5px]">
          <div className="flex min-w-0 items-center gap-5">
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <Icon name="pin" size={13} className="text-white/45" />
              <span className="truncate">{contact.addressShort}</span>
            </a>
            <span className="hidden items-center gap-1.5 text-[#78c4ec] xl:inline-flex">
              <Icon name="award" size={13} />
              ISO 9001:2015 certified
            </span>
          </div>
          <div className="flex shrink-0 items-center divide-x divide-white/10">
            <a href={contact.phoneHref} className="inline-flex items-center gap-1.5 px-4 transition hover:text-white">
              <Icon name="phone" size={12} />
              {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 px-4 transition hover:text-white">
              <Icon name="mail" size={12} />
              {contact.email}
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 pl-4 transition hover:text-white"
            >
              <Icon name="whatsapp" size={12} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-all duration-300",
          scrolled ? "border-line shadow-[0_8px_30px_-20px_rgba(7,19,33,0.45)]" : "border-transparent",
        )}
        onMouseLeave={() => setOpenMenu(null)}
      >

        <div className="shell flex h-[74px] items-center justify-between gap-3 lg:h-[82px]">
          <a href="#top" className="shrink-0" aria-label="Security Solutions Dubai — back to top">
            <img
              src={assets.logo}
              alt="Security Solutions Dubai"
              width={164}
              height={45}
              className="h-9 w-auto lg:h-10 2xl:h-11"
              decoding="async"
            />
          </a>

          <nav aria-label="Primary" className="relative hidden items-center xl:flex">
            {primaryMenu.map(renderDesktopMenu)}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contact.phoneHref}
              className="mr-0.5 hidden items-center gap-2.5 border-r border-line pr-3 2xl:inline-flex"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-brand-50 text-brand">
                <Icon name="phone" size={15} />
              </span>
              <span className="leading-tight">
                <span className="block font-mono text-[9px] tracking-[0.12em] text-body uppercase">Talk to us</span>
                <span className="block text-[12px] font-bold whitespace-nowrap text-ink-900">{contact.phoneDisplay}</span>
              </span>
            </a>
            <button type="button" onClick={() => quote("Get a quote")} className="btn-signal hidden !px-3.5 !py-2.5 whitespace-nowrap sm:inline-flex">
              Get a quote
              <Icon name="arrowUpRight" size={14} />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex size-11 items-center justify-center gap-1.5 rounded-lg border border-line text-ink-900 transition hover:bg-paper xl:hidden"
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </div>

        {openMenu === "Services" && (
          <div className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_30px_80px_-30px_rgba(7,19,33,0.4)] xl:block">
            <div className="shell">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-md bg-ink-950 text-signal">
                    <Icon name="layers" size={14} />
                  </span>
                  <a
                    href={primaryMenu.find((item) => item.label === "Services")?.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[13px] font-extrabold text-ink-950 hover:text-brand-700"
                  >
                    All services
                  </a>
                  <span className="rounded bg-paper px-1.5 py-0.5 font-mono text-[8.5px] tracking-[0.06em] text-[#52687c] uppercase">
                    {menuCounts.services} groups · {menuCounts.serviceSubItems} sub-services
                  </span>
                </div>
                <a
                  href={primaryMenu.find((item) => item.label === "Services")?.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-700 hover:text-ink-950"
                >
                  Visit the services page
                  <Icon name="arrowUpRight" size={12} />
                </a>
              </div>

              <div
                className="max-h-[calc(100vh-220px)] overflow-y-auto py-3"
                onMouseLeave={hoverClose}
                onMouseEnter={() => {
                  if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
                }}
              >
                <div className="columns-1 gap-x-6 md:columns-3">
                  {serviceMenu.map((group) => (
                    <div key={group.label} className="mb-0.5 break-inside-avoid">
                      <a
                        href={group.href}
                        {...LinkAttrs({ href: group.href })}
                        className="group flex items-start justify-between gap-2 rounded-md px-2 py-[7px] text-[11.5px] leading-snug font-semibold text-ink-800 transition hover:bg-paper hover:text-ink-950"
                      >
                        <span className="min-w-0">{group.label}</span>
                        <Icon
                          name="arrowUpRight"
                          size={11}
                          className="mt-0.5 shrink-0 text-[#c3d1dd] transition group-hover:text-brand"
                        />
                      </a>
                      {group.children && (
                        <ul className="mt-0.5 mb-1 ml-2.5 space-y-px border-l border-line pl-2.5">
                          {group.children.map((child) => (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                {...LinkAttrs({ href: child.href })}
                                className="block rounded px-2 py-1.5 text-[10.5px] leading-snug text-[#52687c] transition hover:bg-paper hover:text-brand-700"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-paper px-1 py-3">
                <p className="text-[11px] text-body">
                  Not sure which service fits? Our team will scope it from a site survey.
                </p>
                <div className="flex items-center gap-4">
                  <a href={contact.phoneHref} className="inline-flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
                    <Icon name="phone" size={12} className="text-brand" />
                    {contact.phoneDisplay}
                  </a>
                  <button
                    type="button"
                    onClick={() => quote("Site survey")}
                    className="inline-flex items-center gap-1.5 rounded-md bg-ink-950 px-3 py-1.5 text-[10.5px] font-bold text-white transition hover:bg-brand-700"
                  >
                    Request a site survey
                    <Icon name="arrowRight" size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile / tablet navigation */}
      <div
        className={cn("fixed inset-0 z-[70] xl:hidden", mobileOpen ? "pointer-events-auto" : "pointer-events-none")}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink-950/60 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-line px-5">
            <img src={assets.logo} alt="Security Solutions Dubai" width={150} height={41} className="h-9 w-auto" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex size-10 items-center justify-center rounded-lg border border-line text-ink-900"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">

            <nav aria-label="Mobile primary" className="flex flex-col">
              {primaryMenu.map((item) => {
                if (item.type === "link") {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      {...LinkAttrs({ href: item.href })}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between border-b border-line py-3.5 text-[15px] font-bold text-ink-900"
                    >
                      {item.label}
                      <Icon name="chevronRight" size={16} className="text-body" />
                    </a>
                  );
                }

                const expanded = mobileSection === item.label;
                return (
                  <div key={item.label} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setMobileSection(expanded ? null : item.label)}
                      aria-expanded={expanded}
                      className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-bold text-ink-900"
                    >
                      {item.label}
                      <span className="flex items-center gap-2">
                        <span className="rounded bg-paper px-1.5 py-0.5 font-mono text-[9px] text-[#52687c]">
                          {item.children?.length ?? 0}
                        </span>
                        <Icon
                          name="chevronDown"
                          size={17}
                          className={cn("text-body transition-transform", expanded && "rotate-180")}
                        />
                      </span>
                    </button>
                    {expanded && (
                      <div className={cn("pb-2", item.type === "mega" && "max-h-[46vh] overflow-y-auto")}>
                        {item.type === "mega" ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="mb-1 flex items-center gap-1.5 rounded-lg bg-ink-950 px-3 py-2.5 text-[11.5px] font-bold text-white"
                          >
                            All services
                            <Icon name="arrowUpRight" size={12} className="text-signal" />
                          </a>
                        ) : null}
                        <ul className={cn(item.type === "mega" ? "space-y-0.5" : "space-y-px")}>
                          {(item.children ?? []).map((child) => (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                {...LinkAttrs({ href: child.href })}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                  "block rounded-md px-2 py-2 leading-snug transition hover:bg-paper",
                                  item.type === "mega"
                                    ? "text-[11.5px] font-semibold text-ink-800"
                                    : "text-[12.5px] font-semibold text-ink-800",
                                )}
                              >
                                {child.label}
                              </a>
                              {child.children && (
                                <ul className="mb-1 ml-3 space-y-px border-l border-line pl-2.5">
                                  {child.children.map((nested) => (
                                    <li key={nested.label}>
                                      <a
                                        href={nested.href}
                                        {...LinkAttrs({ href: nested.href })}
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded px-2 py-1.5 text-[10.5px] leading-snug text-[#52687c] transition hover:bg-paper hover:text-brand-700"
                                      >
                                        {nested.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mt-6 rounded-xl border border-line bg-paper p-4">
              <p className="font-mono text-[10px] tracking-[0.16em] text-body uppercase">Dubai head office</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-800">{contact.address}</p>
              <div className="mt-3 space-y-2">
                <a href={contact.phoneHref} className="flex items-center gap-2 text-[13px] font-bold text-ink-900">
                  <Icon name="phone" size={14} className="text-brand" />
                  {contact.phoneDisplay}
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-[13px] text-ink-800">
                  <Icon name="mail" size={14} className="text-brand" />
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="shrink-0 space-y-2 border-t border-line bg-white p-4">
            <div className="grid grid-cols-2 gap-2">
              <a href={contact.phoneHref} className="btn-outline-dark !py-3">
                <Icon name="phone" size={16} /> Call
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener" className="btn-outline-dark !py-3">
                <Icon name="whatsapp" size={16} /> WhatsApp
              </a>
            </div>
            <button type="button" onClick={() => quote("Get a quote")} className="btn-signal w-full">
              Get a quote
              <Icon name="arrowUpRight" size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
