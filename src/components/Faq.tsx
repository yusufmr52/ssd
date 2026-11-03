import { useState } from "react";
import { Icon } from "./Icon";
import { contact, faqs } from "../data/site";
import { cn } from "../utils/cn";

type FaqProps = {
  onQuote: (intent?: string) => void;
};

export function Faq({ onQuote }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-white py-16 lg:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow text-brand-700">FAQs</span>
              <h2 className="mt-4 text-[2rem] leading-[1.1] font-extrabold tracking-[-0.03em] text-ink-950 sm:text-[2.5rem]">
                Good questions, answered clearly.
              </h2>
              <p className="mt-4 max-w-[400px] text-[14px] leading-relaxed text-body">
                A few things clients ask before a site survey. If your question is not here, call or message
                the team — we will give you a straight answer.
              </p>
              <p className="mt-3 font-mono text-[9.5px] tracking-[0.14em] text-[#5f7386] uppercase">
                Page reviewed February 2026
              </p>

              <div className="relative mt-7 overflow-hidden rounded-xl bg-ink-950 p-6 text-white">
                <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-50" aria-hidden="true" />
                <div className="relative">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-signal text-ink-950">
                    <Icon name="headset" size={18} />
                  </span>
                  <p className="mt-4 text-[16px] font-extrabold tracking-[-0.01em]">
                    Prefer to talk it through?
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/55">
                    Reach the Dubai team directly. Share your plans or photos and we will help you frame the
                    right scope.
                  </p>
                  <div className="mt-4 space-y-1">
                    <a
                      href={contact.phoneHref}
                      className="flex items-center gap-2.5 rounded-md py-2 text-[12.5px] font-bold text-white transition hover:text-signal"
                    >
                      <Icon name="phone" size={14} className="text-signal" />
                      {contact.phoneDisplay}
                    </a>
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-2.5 rounded-md py-2 text-[12.5px] text-white/70 transition hover:text-white"
                    >
                      <Icon name="whatsapp" size={14} className="text-signal" />
                      WhatsApp the team
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2.5 rounded-md py-2 text-[12.5px] text-white/70 transition hover:text-white"
                    >
                      <Icon name="mail" size={14} className="text-signal" />
                      {contact.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => onQuote("Site survey")}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-[12px] font-bold text-white transition hover:bg-white/15"
                  >
                    Request a site survey
                    <Icon name="arrowRight" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-line">
              {faqs.map((faq, index) => {
                const isOpen = open === index;
                return (
                  <div key={faq.q} className="border-b border-line">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-trigger-${index}`}
                        className="group flex w-full items-start gap-4 py-5 text-left"
                      >
                        <span className="mt-0.5 shrink-0 font-mono text-[10px] tracking-[0.1em] text-[#64798c]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "flex-1 text-[14.5px] leading-snug font-bold transition sm:text-[15px]",
                            isOpen ? "text-brand-700" : "text-ink-950 group-hover:text-brand-700",
                          )}
                        >
                          {faq.q}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition",
                            isOpen
                              ? "border-brand bg-brand text-white"
                              : "border-line bg-white text-ink-800 group-hover:border-brand/40",
                          )}
                        >
                          <Icon name={isOpen ? "minus" : "plus"} size={13} strokeWidth={2} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pr-8 pb-5 pl-8 text-[13.5px] leading-[1.75] text-body">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex flex-col gap-3 rounded-lg bg-paper px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12px] text-body">
                <span className="font-bold text-ink-900">Still deciding?</span> Ask a project engineer.
              </p>
              <button
                type="button"
                onClick={() => onQuote("General enquiry")}
                className="inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-700 transition hover:text-ink-950"
              >
                Send us your question
                <Icon name="arrowRight" size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
