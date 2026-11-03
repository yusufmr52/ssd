import { Icon } from "./Icon";
import { contact } from "../data/site";
import { primaryMenu, serviceMenu } from "../data/menu";
import { assets } from "../assets/assets";

type FooterProps = {
  onOpenService?: (id: string) => void;
  onQuote: (intent?: string) => void;
  onOpenKit?: () => void;
};

const companyLinks = primaryMenu
  .filter((item) => !["Home", "Services"].includes(item.label))
  .map((item) => {
    const href = item.href === "#" ? "https://securitysolutionsdubai.com/uae/" : item.href;
    return { label: item.label, href, external: href.startsWith("http") };
  });

export function Footer({ onQuote, onOpenKit }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-[#050f1b] pt-14 text-white/60 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-30" aria-hidden="true" />
      <div className="shell relative">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <a href="#top" aria-label="Hutaib InfoTech Solutions — back to top" className="inline-block">
              <img
                src={assets.logo}
                alt="Hutaib InfoTech Solutions"
                width={180}
                height={49}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto rounded-md bg-white px-2 py-1"
              />
            </a>
            <p className="mt-4 max-w-[320px] text-[12.5px] leading-relaxed">
              Security, networking and IT systems integrator in Dubai. Hutaib InfoTech Solutions designs,
              installs and supports connected systems for organisations across the UAE.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
              <Icon name="award" size={13} className="text-signal" />
              <span className="font-mono text-[9px] tracking-[0.12em] text-white/60 uppercase">
                ISO 9001:2015 certified
              </span>
            </div>
            <div className="mt-5 flex gap-4 text-[11px] font-semibold">
              <a
                href="https://www.facebook.com/hutaibinfotech"
                target="_blank"
                rel="noreferrer noopener"
                className="transition hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com/HUTAIBIS"
                target="_blank"
                rel="noreferrer noopener"
                className="transition hover:text-white"
              >
                X / Twitter
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="transition hover:text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-white/60 uppercase">Services</p>
            <ul className="mt-4 grid gap-2">
              {serviceMenu.slice(0, 9).map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    target={service.href.startsWith("http") ? "_blank" : undefined}
                    rel={service.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="text-left text-[11.5px] leading-snug transition hover:text-white"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://securitysolutionsdubai.com/services/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-signal transition hover:text-white"
                >
                  All 29 services
                  <Icon name="arrowUpRight" size={12} />
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-white/60 uppercase">Company</p>
            <ul className="mt-4 grid gap-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer noopener" : undefined}
                    className="text-[11.5px] leading-snug transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#services" className="text-[11.5px] leading-snug transition hover:text-white">
                  Capabilities
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => onQuote("Site survey")}
              className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-signal px-3 py-2 text-[11px] font-extrabold text-ink-950 transition hover:bg-[#f68b3c]"
            >
              Request a survey
              <Icon name="arrowRight" size={13} />
            </button>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-white/60 uppercase">Dubai head office</p>
            <address className="mt-4 space-y-2.5 text-[12px] leading-relaxed not-italic">
              <p className="flex items-start gap-2">
                <Icon name="pin" size={13} className="mt-0.5 shrink-0 text-signal" />
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition hover:text-white"
                >
                  {contact.address}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="phone" size={13} className="shrink-0 text-signal" />
                <a href={contact.phoneHref} className="transition hover:text-white">
                  {contact.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="mail" size={13} className="shrink-0 text-signal" />
                <a href={`mailto:${contact.email}`} className="truncate transition hover:text-white">
                  {contact.email}
                </a>
              </p>
            </address>

            <p className="mt-5 font-mono text-[9.5px] tracking-[0.18em] text-white/60 uppercase">
              Sharjah office
            </p>
            <p className="mt-2 flex items-start gap-2 text-[12px] leading-relaxed">
              <Icon name="pin" size={13} className="mt-0.5 shrink-0 text-white/30" />
              {contact.sharjahAddress}
            </p>
            <p className="mt-3 text-[11.5px] leading-relaxed text-white/65">
              Regional support: Saudi Arabia &amp; Oman · Site visits by appointment.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[11px] text-white/60">
            © {new Date().getFullYear()} Hutaib InfoTech Solutions. All rights reserved.{" "}
            <span className="hidden text-white/25 sm:inline">·</span>{" "}
            <span className="block pt-1 text-white/25 sm:inline sm:pt-0">
              Security Solutions Dubai is a Hutaib InfoTech Solutions brand.
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/65">
            <a href="https://www.securitysolutionsdubai.com/privacy-policy/" className="transition hover:text-white">
              Privacy
            </a>
            <a href="https://www.securitysolutionsdubai.com/terms/" className="transition hover:text-white">
              Terms
            </a>
            <a
              href="https://www.securitysolutionsdubai.com/sitemap.xml"
              className="transition hover:text-white"
            >
              Sitemap
            </a>
            {onOpenKit && (
              <button
                type="button"
                onClick={onOpenKit}
                className="inline-flex items-center gap-1.5 rounded border border-white/15 bg-white/5 px-2 py-1 font-bold text-white/70 transition hover:border-white/35 hover:text-white"
              >
                <Icon name="layers" size={12} />
                WP / WPBakery build kit
              </button>
            )}
            <a href="#top" className="inline-flex items-center gap-1.5 font-bold text-white/60 hover:text-white">
              Back to top
              <Icon name="arrowUpRight" size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
