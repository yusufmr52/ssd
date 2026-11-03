import { Icon } from "./Icon";
import { processSteps } from "../data/site";

const outcomes = [
  "A short requirement brief and clear next step",
  "Coverage, entry points and constraints documented",
  "Right-sized design, equipment list and written scope",
  "Installed to the approved plan with minimal disruption",
  "Commissioning records, training and documentation",
  "Preventive checks and responsive on-site support",
];

const durations = ["30 min call", "1–2 hrs", "2–3 days", "By schedule", "1–2 days", "Ongoing"];

type ProcessProps = {
  onQuote: (intent?: string) => void;
};

export function Process({ onQuote }: ProcessProps) {
  return (
    <section id="process" className="relative overflow-hidden bg-ink-950 py-14 text-white lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-60" aria-hidden="true" />
      <div className="shell relative">
        <div className="grid items-end gap-7 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow text-signal">How we work</span>
            <h2 className="mt-4 max-w-[620px] text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-white sm:text-[2.6rem]">
              Six clear steps, from first call to aftercare.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-[410px] text-[14px] leading-relaxed text-white/65">
              No vague quotes or surprise variations. Each stage has an owner, an output and your sign-off
              before we move forward.
            </p>
            <button type="button" onClick={() => onQuote("Site survey")} className="btn-signal mt-5 !px-5">
              Start with a site survey
              <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <li key={step.number} className="relative overflow-hidden rounded-xl border border-white/12 bg-white/[0.05] p-5">
              <div className="flex items-start justify-between">
                <span className="flex size-9 items-center justify-center rounded-lg bg-signal font-mono text-[10px] font-bold text-ink-950">
                  {step.number}
                </span>
                <Icon name={step.icon} size={18} className="text-white/35" />
              </div>
              <h3 className="mt-4 text-[14.5px] leading-snug font-extrabold text-white">{step.title}</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/65">{step.body}</p>
              <div className="mt-3.5 border-t border-white/10 pt-2.5">
                <p className="font-mono text-[8.5px] tracking-[0.1em] text-white/45 uppercase">
                  {durations[index]} · Output
                </p>
                <p className="mt-1 text-[10.5px] leading-snug text-white/70">{outcomes[index]}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex flex-col gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/70">
            <span className="font-bold text-white">Already have a system?</span> We audit CCTV, access, networking
            and IT before recommending any replacement.
          </p>
          <button
            type="button"
            onClick={() => onQuote("Maintenance / AMC")}
            className="inline-flex shrink-0 items-center gap-2 text-[11.5px] font-bold text-signal transition hover:text-white"
          >
            Request a system review
            <Icon name="arrowUpRight" size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
