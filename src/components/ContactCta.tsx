import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { contact, locationOptions, serviceOptions } from "../data/site";
import { cn } from "../utils/cn";
import { assets } from "../assets/assets";

const requestTypes = ["Site survey", "Get a quote", "Maintenance / AMC", "General enquiry"] as const;
type RequestType = (typeof requestTypes)[number];

type FormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyForm: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  location: "Dubai",
  service: "",
  message: "",
  consent: false,
};

type ContactCtaProps = {
  intent: string;
  requestId: number;
  messagePreset?: string;
};

export function ContactCta({ intent, requestId, messagePreset }: ContactCtaProps) {
  const [requestType, setRequestType] = useState<RequestType>("Site survey");
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<{ name: string; requestType: RequestType; service: string } | null>(
    null,
  );

  useEffect(() => {
    if (!intent) return;
    setSubmitted(null);
    if (requestTypes.includes(intent as RequestType)) {
      setRequestType(intent as RequestType);
      return;
    }
    if (serviceOptions.includes(intent)) {
      setRequestType("Site survey");
      setValues((current) => ({ ...current, service: intent }));
    }
  }, [intent, requestId]);

  useEffect(() => {
    if (!messagePreset) return;
    setSubmitted(null);
    setValues((current) => ({ ...current, message: messagePreset }));
  }, [messagePreset, requestId]);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!values.email.trim()) next.email = "Please add your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Please check the email address.";
    const digits = values.phone.replace(/\D/g, "");
    if (!values.phone.trim()) next.phone = "Please add a contact number.";
    else if (digits.length < 7) next.phone = "Please add a valid phone number.";
    if (!values.consent) next.consent = "Please confirm we can contact you about this enquiry.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted({
      name: values.name.trim().split(" ")[0],
      requestType,
      service: values.service,
    });
  };

  const reset = () => {
    setSubmitted(null);
    setValues(emptyForm);
    setErrors({});
    setRequestType("Site survey");
  };

  const formTitle =
    requestType === "Get a quote"
      ? "Request a project quote"
      : requestType === "Maintenance / AMC"
        ? "Request maintenance support"
        : requestType === "General enquiry"
          ? "Ask us a question"
          : "Request a site survey";

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-20 text-white lg:py-24"
    >
      <img
        src={assets.skyline}
        alt=""
        aria-hidden="true"
        width={1400}
        height={934}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/95 to-ink-950/65"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" aria-hidden="true" />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <span className="eyebrow text-signal">Let&apos;s talk</span>
            <h2 className="mt-4 max-w-[480px] text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-white sm:text-[2.6rem]">
              Let&apos;s protect what matters to your business.
            </h2>
            <p className="mt-5 max-w-[440px] text-[14px] leading-relaxed text-white/60">
              Tell us what is changing — a new office, a system upgrade, a recurring maintenance issue, or a
              requirement you are still shaping. We will help you scope the next step.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 lg:hidden">
              <a href={contact.phoneHref} className="btn-outline-light !px-4 !py-2.5 text-[12px]">
                <Icon name="phone" size={14} /> Call us
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-outline-light !px-4 !py-2.5 text-[12px]"
              >
                <Icon name="whatsapp" size={14} /> WhatsApp
              </a>
              <a href={`mailto:${contact.email}`} className="btn-outline-light !px-4 !py-2.5 text-[12px]">
                <Icon name="mail" size={14} /> Email
              </a>
            </div>

            <div className="mt-7 hidden space-y-2.5 lg:block">
              <a
                href={contact.phoneHref}
                className="group flex items-center gap-3.5 rounded-xl border border-white/12 bg-white/[0.04] p-3.5 transition hover:border-white/25 hover:bg-white/[0.07]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-signal text-ink-950">
                  <Icon name="phone" size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[9px] tracking-[0.14em] text-white/65 uppercase">
                    Call the team
                  </span>
                  <span className="mt-0.5 block truncate text-[14px] font-extrabold text-white">
                    {contact.phoneDisplay}
                  </span>
                </span>
                <Icon
                  name="arrowUpRight"
                  size={16}
                  className="shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                />
              </a>

              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3.5 rounded-xl border border-white/12 bg-white/[0.04] p-3.5 transition hover:border-white/25 hover:bg-white/[0.07]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                  <Icon name="whatsapp" size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[9px] tracking-[0.14em] text-white/65 uppercase">
                    WhatsApp
                  </span>
                  <span className="mt-0.5 block truncate text-[14px] font-extrabold text-white">
                    Message the team
                  </span>
                </span>
                <Icon
                  name="arrowUpRight"
                  size={16}
                  className="shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                />
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-3.5 rounded-xl border border-white/12 bg-white/[0.04] p-3.5 transition hover:border-white/25 hover:bg-white/[0.07]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                  <Icon name="mail" size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[9px] tracking-[0.14em] text-white/65 uppercase">
                    Email
                  </span>
                  <span className="mt-0.5 block truncate text-[14px] font-extrabold text-white">
                    {contact.email}
                  </span>
                </span>
                <Icon
                  name="arrowUpRight"
                  size={16}
                  className="shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                />
              </a>
            </div>

            <ul className="mt-6 hidden space-y-2.5 lg:block">
              {[
                "A site survey before any recommendation",
                "Written scope, equipment list and programme",
                "One team from installation to support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[12px] leading-snug text-white/60">
                  <Icon name="check" size={14} className="mt-px shrink-0 text-signal" strokeWidth={2.2} />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 flex max-w-[420px] items-start gap-2 border-t border-white/10 pt-4 text-[11.5px] leading-relaxed text-white/60 transition hover:text-white/70"
            >
              <Icon name="pin" size={14} className="mt-0.5 shrink-0" />
              {contact.address}
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-5 text-ink-950 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)] sm:p-7">
              {submitted ? (
                <div className="flex min-h-[460px] flex-col items-center justify-center py-8 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand">
                    <Icon name="check" size={28} strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 text-[24px] font-extrabold tracking-[-0.025em]">
                    Thank you{submitted.name ? `, ${submitted.name}` : ""}.
                  </h3>
                  <p className="mt-2 max-w-[360px] text-[13.5px] leading-relaxed text-body">
                    Your {submitted.requestType.toLowerCase()} request has been recorded
                    {submitted.service ? ` for ${submitted.service.toLowerCase()}` : ""}. Our Dubai team will
                    review it and respond during UAE business hours.
                  </p>
                  <div className="mt-6 grid w-full max-w-[340px] grid-cols-2 gap-2">
                    <a href={contact.phoneHref} className="btn-brand !px-3 !py-3 text-[12.5px]">
                      <Icon name="phone" size={15} /> Call now
                    </a>
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn-outline-dark !px-3 !py-3 text-[12.5px]"
                    >
                      <Icon name="whatsapp" size={15} /> WhatsApp
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-4 text-[12px] font-bold text-brand-700 underline decoration-brand/30 underline-offset-4 hover:text-ink-950"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
                    <div>
                      <p className="font-mono text-[9.5px] tracking-[0.16em] text-[#5f7386] uppercase">
                        Project enquiry
                      </p>
                      <h3 className="mt-1.5 text-[22px] leading-none font-extrabold tracking-[-0.025em]">
                        {formTitle}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2.5 py-1.5 font-mono text-[9px] tracking-[0.08em] text-body uppercase">
                      <Icon name="clock" size={12} className="text-brand" />
                      UAE business hours
                    </span>
                  </div>
                  <p className="mt-3.5 text-[12.5px] leading-relaxed text-body">
                    A few details are enough to get started. If you have drawings or photos, mention them and
                    we will request them by email.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="mt-5">
                    <div role="group" aria-label="What do you need?" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {requestTypes.map((type) => {
                        const selected = requestType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setRequestType(type)}
                            className={cn(
                              "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-[11px] font-bold transition",
                              selected
                                ? "border-ink-950 bg-ink-950 text-white"
                                : "border-line bg-white text-body hover:border-ink-950/30 hover:text-ink-950",
                            )}
                          >
                            <span
                              className={cn(
                                "size-1.5 rounded-full",
                                selected ? "bg-signal" : "bg-[#c5d2dd]",
                              )}
                            />
                            {type}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                      <div>
                        <label className="field-label" htmlFor="contact-name">
                          Full name <span className="text-signal">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          autoComplete="name"
                          value={values.name}
                          onChange={(event) => update("name", event.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "error-name" : undefined}
                          className={cn("field", errors.name && "border-[#d34f3f]")}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p id="error-name" className="mt-1 text-[11px] font-medium text-[#c0392b]">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="field-label" htmlFor="contact-company">
                          Company <span className="font-medium text-[#64798c]">(optional)</span>
                        </label>
                        <input
                          id="contact-company"
                          name="company"
                          autoComplete="organization"
                          value={values.company}
                          onChange={(event) => update("company", event.target.value)}
                          className="field"
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <label className="field-label" htmlFor="contact-email">
                          Work email <span className="text-signal">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={(event) => update("email", event.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "error-email" : undefined}
                          className={cn("field", errors.email && "border-[#d34f3f]")}
                          placeholder="you@company.com"
                        />
                        {errors.email && (
                          <p id="error-email" className="mt-1 text-[11px] font-medium text-[#c0392b]">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="field-label" htmlFor="contact-phone">
                          Phone <span className="text-signal">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={values.phone}
                          onChange={(event) => update("phone", event.target.value)}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "error-phone" : undefined}
                          className={cn("field", errors.phone && "border-[#d34f3f]")}
                          placeholder="+971 00 000 0000"
                        />
                        {errors.phone && (
                          <p id="error-phone" className="mt-1 text-[11px] font-medium text-[#c0392b]">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="field-label" htmlFor="contact-location">
                          Site location
                        </label>
                        <select
                          id="contact-location"
                          name="location"
                          value={values.location}
                          onChange={(event) => update("location", event.target.value)}
                          className="field appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7d8f%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:14px] bg-[right_0.9rem_center] bg-no-repeat pr-9"
                        >
                          {locationOptions.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="field-label" htmlFor="contact-service">
                          System or service
                        </label>
                        <select
                          id="contact-service"
                          name="service"
                          value={values.service}
                          onChange={(event) => update("service", event.target.value)}
                          className="field appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7d8f%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:14px] bg-[right_0.9rem_center] bg-no-repeat pr-9"
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="field-label" htmlFor="contact-message">
                          Tell us about the site{" "}
                          <span className="font-medium text-[#64798c]">(optional)</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={3}
                          value={values.message}
                          onChange={(event) => update("message", event.target.value)}
                          className="field resize-none"
                          placeholder="For example: new office fit-out, 12 cameras, 4 access doors, existing cabling needs review."
                        />
                      </div>
                    </div>

                    <div className="mt-3.5">
                      <label className="flex cursor-pointer items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={values.consent}
                          onChange={(event) => update("consent", event.target.checked)}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={errors.consent ? "error-consent" : undefined}
                          className="mt-0.5 size-4 shrink-0 rounded border-line accent-[#1483c6]"
                        />
                        <span className="text-[11px] leading-relaxed text-body">
                          I agree to be contacted about this enquiry. My details will not be used for
                          third-party marketing.
                        </span>
                      </label>
                      {errors.consent && (
                        <p id="error-consent" className="mt-1 pl-6 text-[11px] font-medium text-[#c0392b]">
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    <button type="submit" className="btn-signal mt-4 w-full !py-3.5">
                      Send my request
                      <Icon name="arrowRight" size={17} />
                    </button>
                    <p className="mt-2.5 text-center text-[10.5px] text-[#5f7386]">
                      Prefer to speak first?{" "}
                      <a href={contact.phoneHref} className="font-bold text-ink-800 underline underline-offset-2">
                        {contact.phoneDisplay}
                      </a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
