import { Icon } from "./Icon";
import { assets } from "../assets/assets";
import { contact } from "../data/site";

type HeroProps = {
  onQuote: (intent?: string) => void;
};

const stats = [
  { value: "ISO", label: "9001:2015 certified" },
  { value: "8", label: "Connected service lines" },
  { value: "UAE", label: "Dubai HQ · KSA · Oman" },
];

const trust = ["One delivery team", "Survey-led scope", "Support after handover"];

export function Hero({ onQuote }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-950 pb-12 text-white lg:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />

      <div className="shell relative">
        <div className="grid items-center gap-10 pt-10 pb-4 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:pt-14">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 font-mono text-[9.5px] tracking-[0.16em] text-white/75 uppercase">
              <span className="size-1.5 rounded-full bg-signal" />
              Security systems integrator · Dubai
            </p>

            <h1 className="mt-6 text-[2.3rem] leading-[1.04] font-extrabold tracking-[-0.04em] text-white sm:text-[3.05rem] lg:text-[3rem] xl:text-[3.35rem]">
              Security, networking
              <br className="hidden sm:block" /> &amp; IT solutions <span className="relative inline-block whitespace-nowrap">in Dubai.
                <span className="absolute right-0 -bottom-0.5 left-0 h-[5px] rounded-full bg-gradient-to-r from-signal via-[#f7a45f] to-signal/40" aria-hidden="true" />
              </span>
            </h1>

            <p className="mt-6 max-w-[555px] text-[15px] leading-[1.75] text-white/65 lg:text-[16px]">
              Hutaib InfoTech Solutions plans, installs and supports CCTV, access control, networking, IT
              infrastructure and meeting-room systems for offices, banks, schools and industrial sites across
              the UAE. One accountable team — from site survey to handover and beyond.
            </p>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <button type="button" onClick={() => onQuote("Site survey")} className="btn-signal !px-6">
                Request a site survey
                <Icon name="arrowRight" size={17} />
              </button>
              <a href={contact.phoneHref} className="btn-outline-light !px-6">
                <Icon name="phone" size={16} />
                Talk to our team
              </a>
            </div>

            <dl className="mt-8 grid max-w-[480px] grid-cols-3 gap-3 border-t border-white/10 pt-5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-mono text-[19px] font-medium tracking-[-0.02em] text-white tabular-nums">{stat.value}</dd>
                  <dd className="mt-0.5 text-[10px] leading-snug text-white/60">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="relative overflow-hidden rounded-2xl border border-white/15 bg-ink-900">
            <img
              src={assets.hero}
              alt="Hutaib door access control system installed for a UAE client"
              width={1200}
              height={800}
              fetchPriority="high"
              decoding="async"
              className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" aria-hidden="true" />
            <figcaption className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/12 bg-ink-950/60 p-4 backdrop-blur-md">
              <p className="font-mono text-[9px] tracking-[0.16em] text-signal uppercase">One accountable partner</p>
              <p className="mt-1.5 text-[15px] leading-snug font-bold text-white">
                Every system, specified to work together.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-white/12 pt-2.5 text-[10px] text-white/60">
                {trust.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1">
                    <Icon name="check" size={10} className="text-signal" strokeWidth={2.4} />
                    {item}
                  </span>
                ))}
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const credentials = [
  { icon: "award" as const, title: "ISO 9001:2015 certified", body: "Quality-managed delivery" },
  { icon: "users" as const, title: "One delivery team", body: "Survey → design → handover" },
  { icon: "pin" as const, title: "UAE-wide coverage", body: "Dubai HQ · KSA · Oman" },
  { icon: "wrench" as const, title: "Support after go-live", body: "Maintenance & AMC options" },
];

export function CredentialsBar() {
  return (
    <div className="relative z-20 border-b border-line bg-white">
      <div className="shell">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {credentials.map((item, index) => (
            <div
              key={item.title}
              className={`flex items-start gap-3 border-line p-4 sm:p-5 ${index % 2 === 1 ? "border-l" : ""} ${
                index > 1 ? "border-t lg:border-t-0" : ""
              } ${index > 0 ? "lg:border-l" : ""}`}
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                <Icon name={item.icon} size={16} />
              </span>
              <span>
                <span className="block text-[12px] leading-tight font-extrabold text-ink-950">{item.title}</span>
                <span className="mt-1 block text-[10.5px] leading-snug text-body">{item.body}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
