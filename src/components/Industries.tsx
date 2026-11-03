import { Icon } from "./Icon";
import { industries } from "../data/site";

type IndustriesProps = {
  onQuote: (intent?: string) => void;
};

export function Industries({ onQuote }: IndustriesProps) {
  return (
    <section id="industries" className="bg-white py-14 lg:py-20">
      <div className="shell">
        <div className="grid items-end gap-7 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow text-brand-700">Industries we serve</span>
            <h2 className="mt-4 max-w-[640px] text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink-950 sm:text-[2.6rem]">
              Built around how your site actually operates.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-[430px] text-[14px] leading-relaxed text-body">
              Every sector brings different risks, access rules and reporting needs. We plan systems around the
              environment — not a template.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <div key={industry.name} className="rounded-xl border border-line bg-white p-5 transition duration-200 hover:border-brand/30 hover:bg-paper">
              <span className="flex size-9 items-center justify-center rounded-lg bg-paper text-brand">
                <Icon name={industry.icon} size={18} />
              </span>
              <h3 className="mt-3.5 text-[13.5px] font-extrabold tracking-[-0.01em] text-ink-950">{industry.name}</h3>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-body">{industry.body}</p>
            </div>
          ))}

          <div className="relative flex flex-col overflow-hidden rounded-xl bg-ink-950 p-5 text-white">
            <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-50" aria-hidden="true" />
            <div className="relative flex h-full flex-col">
              <span className="flex size-9 items-center justify-center rounded-lg bg-signal text-ink-950">
                <Icon name="sparkles" size={18} />
              </span>
              <h3 className="mt-3.5 text-[13.5px] font-extrabold text-white">Your sector not listed?</h3>
              <p className="mt-1.5 flex-1 text-[11.5px] leading-relaxed text-white/75">
                We scope systems for new environments. Tell us about the site and the outcome you need.
              </p>
              <button
                type="button"
                onClick={() => onQuote("General enquiry")}
                className="mt-3.5 inline-flex items-center gap-2 text-[11px] font-bold text-signal transition hover:text-white"
              >
                Discuss your site
                <Icon name="arrowRight" size={13} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2.5 rounded-xl border border-line bg-paper px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-sm">
              <Icon name="pin" size={16} />
            </span>
            <div>
              <p className="text-[12px] font-extrabold text-ink-950">On-site support across the Emirates</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-body">
                Dubai · Sharjah · Abu Dhabi · Ajman · Ras Al Khaimah · Fujairah — regional projects in Saudi Arabia
                &amp; Oman.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onQuote("Site survey")}
            className="inline-flex shrink-0 items-center gap-2 text-[11.5px] font-bold text-brand-700 transition hover:text-ink-950"
          >
            Plan a site visit
            <Icon name="arrowRight" size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
