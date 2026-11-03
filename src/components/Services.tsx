import { Icon } from "./Icon";
import { serviceMenu } from "../data/menu";
import { services } from "../data/site";

const serviceUrl: Record<string, string> = {
  cctv: "https://securitysolutionsdubai.com/services/cctv-video-surveillance/",
  "access-control": "https://securitysolutionsdubai.com/services/premise-access-control-solutions/",
  "visitor-management": "https://securitysolutionsdubai.com/services/visitor-management-solution/",
  networking: "https://securitysolutionsdubai.com/services/structured-cabling-networking-solutions/",
  wifi: "https://securitysolutionsdubai.com/services/wireless-connectivity-solution/",
  "it-infrastructure": "https://securitysolutionsdubai.com/services/ict-elv-infrastructure-setup-solutions/",
  "meeting-rooms": "https://securitysolutionsdubai.com/services/visitor-management-solution/",
  connectivity: "https://securitysolutionsdubai.com/services/professional-starlink-installation-in-dubai-uae/",
};

const meetingUrl = "https://securitysolutionsdubai.com/wisemeet-meeting-room-management-solution/";

type ServicesProps = {
  onQuote: (intent?: string) => void;
};

export function Services({ onQuote }: ServicesProps) {
  return (
    <section id="services" className="bg-white py-14 lg:py-20">
      <div className="shell">
        <div className="grid items-end gap-7 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow text-brand-700">What we do</span>
            <h2 className="mt-4 max-w-[650px] text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink-950 sm:text-[2.6rem]">
              One partner for the systems your building depends on.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-[430px] text-[14px] leading-relaxed text-body">
              Eight connected capability lines — from the camera on the wall to the cable in the ceiling. Each
              service has its own page with scope, brands and project detail.
            </p>
          </div>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <a
              key={service.id}
              href={service.id === "meeting-rooms" ? meetingUrl : serviceUrl[service.id]}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative flex h-full flex-col rounded-xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-6"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-xl bg-signal transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-paper text-ink-800 transition duration-300 group-hover:border-brand/25 group-hover:bg-ink-950 group-hover:text-signal">
                  <Icon name={service.icon} size={21} />
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.16em] text-[#8598a9]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-[16.5px] leading-snug font-extrabold tracking-[-0.015em] text-ink-950">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-body">{service.short}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {service.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded border border-line px-1.5 py-1 font-mono text-[9px] tracking-[0.03em] text-[#52687c]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5">
                <span className="text-[11.5px] font-bold text-ink-800 transition group-hover:text-brand-700">
                  View service page
                </span>
                <Icon name="arrowUpRight" size={14} className="text-[#8598a9] transition group-hover:text-brand" />
              </div>
            </a>
          ))}

          <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-ink-950 p-5 text-white sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-60" aria-hidden="true" />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[8.5px] tracking-[0.14em] text-white/70 uppercase">
                <span className="size-1.5 rounded-full bg-signal" />
                Not sure where to start?
              </span>
              <h3 className="mt-4 text-[21px] leading-[1.12] font-extrabold tracking-[-0.025em] text-white">
                Tell us the outcome. We&apos;ll scope the system.
              </h3>
              <p className="mt-2.5 flex-1 text-[12px] leading-relaxed text-white/80">
                A site survey turns a requirement into a right-sized scope — cameras, doors, cabling and support
                included.
              </p>
              <button
                type="button"
                onClick={() => onQuote("Site survey")}
                className="mt-5 inline-flex items-center justify-between gap-3 rounded-lg bg-signal px-4 py-3 text-[12px] font-extrabold text-ink-950 transition hover:bg-[#f68b3c]"
              >
                Request a site survey
                <Icon name="arrowRight" size={15} />
              </button>
              <p className="mt-2.5 font-mono text-[8.5px] tracking-[0.08em] text-white/60 uppercase">
                {serviceMenu.length} service groups · UAE-wide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
