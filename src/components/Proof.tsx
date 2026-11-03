import { useState } from "react";
import { Icon } from "./Icon";
import { clientLogos } from "../assets/assets";
import { partners, projectImages, testimonials } from "../data/site";

export function Proof() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  const previous = () =>
    setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((current) => (current + 1) % testimonials.length);

  return (
    <section id="proof" className="border-y border-line bg-paper py-16 lg:py-28">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow text-brand-700">Proof &amp; trust</span>
            <h2 className="mt-4 max-w-[640px] text-[2rem] leading-[1.1] font-extrabold tracking-[-0.03em] text-ink-950 sm:text-[2.5rem]">
              Trusted for the systems that cannot afford to fail.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-[420px] text-[14.5px] leading-relaxed text-body">
              Security and IT work is rarely visible when it is done well. These are the system types we
              deliver behind reception desks, warehouse gates and meeting rooms — plus feedback from the
              people who use them.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-3 lg:col-span-6">
            {projectImages.map((image, index) => (
              <figure
                key={image.src}
                className={`group relative overflow-hidden rounded-xl bg-ink-900 ${
                  index === 0 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                    index === 0 ? "aspect-[2/1]" : "aspect-[4/3]"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2">
                  <span className="rounded-md border border-white/15 bg-ink-950/45 px-2.5 py-1.5 text-[10.5px] font-bold text-white backdrop-blur-sm">
                    {image.caption}
                  </span>
                  <span className="flex size-6 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                    <Icon name="arrowUpRight" size={12} />
                  </span>
                </figcaption>
              </figure>
            ))}
            <div className="col-span-2 flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-4 py-3">
              <p className="text-[11px] leading-snug text-body">
                <span className="font-bold text-ink-900">From our security portfolio</span> — CCTV, access
                control and connectivity projects.
              </p>
              <a
                href="#services"
                className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-bold text-brand-700 transition hover:text-ink-950"
              >
                Explore services
                <Icon name="arrowRight" size={13} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-6">
            <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl bg-ink-950 p-6 text-white lg:p-8">
              <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-50" aria-hidden="true" />
              <div
                className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-brand/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[9.5px] tracking-[0.18em] text-white/60 uppercase">
                  Client feedback
                </span>
                <Icon name="quote" size={26} className="text-signal" strokeWidth={1.4} />
              </div>

              <div key={active} className="anim-fade-up relative flex flex-1 flex-col justify-between">
                <blockquote className="mt-6 text-[17px] leading-[1.65] font-medium tracking-[-0.01em] text-white/90 lg:text-[19px]">
                  “{testimonial.quote}”
                </blockquote>
                <div className="mt-7 flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-signal font-mono text-[11px] font-bold text-ink-950">
                    {testimonial.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-extrabold text-white">{testimonial.name}</p>
                    <p className="truncate text-[11.5px] text-white/65">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              <div className="relative mt-7 flex items-center justify-between border-t border-white/12 pt-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous testimonial"
                    className="flex size-8 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <Icon name="chevronLeft" size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next testimonial"
                    className="flex size-8 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <Icon name="chevronRight" size={15} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {testimonials.map((item, index) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-label={`View testimonial from ${item.name}`}
                        aria-current={index === active}
                        className={`h-1 rounded-full transition-all ${
                          index === active ? "w-5 bg-signal" : "w-1.5 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[9.5px] tracking-[0.1em] text-white/65">
                    {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand">
                    <Icon name="award" size={16} />
                  </span>
                  <div>
                    <p className="text-[11.5px] font-extrabold text-ink-950">ISO 9001:2015</p>
                    <p className="font-mono text-[9px] tracking-[0.08em] text-body uppercase">
                      Quality management
                    </p>
                  </div>
                </div>
                <span className="hidden h-7 w-px bg-line sm:block" />
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand">
                    <Icon name="shield" size={16} />
                  </span>
                  <div>
                    <p className="text-[11.5px] font-extrabold text-ink-950">Survey-led proposals</p>
                    <p className="font-mono text-[9px] tracking-[0.08em] text-body uppercase">
                      No template scope
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-t border-line pt-3">
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#5f7386] uppercase">
                  Technology partners
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  {partners.map((partner) => (
                    <span key={partner} className="text-[11.5px] font-extrabold text-[#4d6072]">
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-line bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
            <div>
              <p className="font-mono text-[9px] tracking-[0.16em] text-[#5f7386] uppercase">
                Selected clients
              </p>
              <p className="mt-1 text-[13px] font-extrabold tracking-[-0.01em] text-ink-950">
                Organisations that have worked with Hutaib
              </p>
            </div>
            <p className="max-w-[300px] text-[10.5px] leading-relaxed text-[#52687c]">
              Logos are taken from the client list published on securitysolutionsdubai.com. Confirm current
              approval before republishing.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 items-center gap-2 sm:grid-cols-5">
            {clientLogos.map((logo) => (
              <div
                key={logo.name}
                className="group flex h-12 items-center justify-center rounded-lg border border-transparent px-1 transition hover:border-line hover:bg-paper"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} — client of Hutaib InfoTech Solutions`}
                  width={150}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="max-h-8 w-auto max-w-[120px] object-contain opacity-60 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
