import { Icon } from "./Icon";
import { contact, partners, reasons } from "../data/site";
import { assets } from "../assets/assets";

export function WhyUs() {
  return (
    <section id="why-hutaib" className="relative overflow-hidden border-t border-line bg-paper py-16 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-50" aria-hidden="true" />
      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[480px] pb-10 sm:max-w-[520px] lg:mx-0 lg:pb-12">
              <figure className="relative ml-auto w-[92%] overflow-hidden rounded-2xl border border-white shadow-lift">
                <img
                  src={assets.it}
                  alt="Hutaib time attendance and workforce management system"
                  width={1000}
                  height={667}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[5/6] w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute right-3 bottom-3 w-[56%] rounded-lg border border-white/20 bg-ink-950/60 p-3 backdrop-blur-md">
                  <p className="font-mono text-[9px] tracking-[0.16em] text-signal uppercase">
                    End-to-end delivery
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1.5">
                    {["Survey", "Design", "Install", "Support"].map((phase) => (
                      <div key={phase} className="flex items-center gap-1.5">
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                          <Icon name="check" size={9} strokeWidth={2.6} />
                        </span>
                        <span className="text-[10px] font-semibold text-white/85">{phase}</span>
                      </div>
                    ))}
                  </div>
                </figcaption>
              </figure>

              <figure className="absolute bottom-0 left-0 w-[42%] overflow-hidden rounded-xl border-[5px] border-paper bg-white shadow-lg">
                <img
                  src={assets.access}
                  alt="Access control system supplied and installed by Hutaib InfoTech Solutions"
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
              </figure>

              <div className="absolute -top-3 left-0 flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-card sm:-left-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-brand-50 text-brand">
                  <Icon name="award" size={13} />
                </span>
                <span className="text-[10.5px] font-extrabold tracking-tight text-ink-950">
                  ISO 9001:2015 certified
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="eyebrow text-brand-700">Why Hutaib</span>
            <h2 className="mt-4 text-[2rem] leading-[1.1] font-extrabold tracking-[-0.03em] text-ink-950 sm:text-[2.5rem]">
              A systems partner you can hold to the plan.
            </h2>
            <p className="mt-5 max-w-[520px] text-[14.5px] leading-relaxed text-body">
              Projects fail on the details: a camera that cannot see the gate, a door that will not fail
              safe, a network that was never sized for the load. We plan for those details before a single
              cable is pulled.
            </p>

            <div className="mt-8">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4 border-t border-[#d5e0e9] py-4 first:border-t-0 first:pt-0">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-brand shadow-sm">
                    <Icon name={reason.icon} size={17} />
                  </span>
                  <div>
                    <h3 className="text-[14px] font-extrabold tracking-[-0.01em] text-ink-950">{reason.title}</h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-body">{reason.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <a href="#process" className="btn-outline-dark">
                See how we work
                <Icon name="arrowRight" size={16} />
              </a>
              <a href={contact.phoneHref} className="btn !px-4 text-ink-800 hover:text-brand">
                <Icon name="headset" size={16} className="text-brand" />
                Talk to an engineer
              </a>
            </div>

            <div className="mt-8 border-t border-[#d5e0e9] pt-4">
              <p className="font-mono text-[9px] tracking-[0.18em] text-[#5f7386] uppercase">
                Technology partners we work with
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                {partners.slice(0, 5).map((partner) => (
                  <span
                    key={partner}
                    className="text-[12.5px] font-extrabold tracking-[-0.01em] text-[#4d6072] transition hover:text-ink-800"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
