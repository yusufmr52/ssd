import { useState } from "react";
import { Icon } from "./Icon";
import { contact } from "../data/site";

export function PreviewBadge() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-3 pb-3 sm:justify-start sm:px-4 sm:pb-4">
      <div className="pointer-events-auto w-full max-w-[420px] overflow-hidden rounded-xl border border-white/15 bg-ink-950/95 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md">
        <div className="flex items-start gap-2.5 p-3">
          <span className="anim-pulse-soft mt-1 size-1.5 shrink-0 rounded-full bg-signal" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] leading-tight font-extrabold">
              Client preview <span className="font-medium text-white/55">· design only, not live</span>
            </p>
            <p className="mt-1 text-[9.5px] leading-relaxed text-white/60">
              The enquiry form is a visual demo and does not send yet. To reach the team now, call or WhatsApp.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-white transition hover:text-signal"
              >
                <Icon name="phone" size={11} className="text-signal" />
                {contact.phoneDisplay}
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/75 transition hover:text-white"
              >
                <Icon name="whatsapp" size={11} className="text-signal" />
                WhatsApp
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="hidden items-center gap-1 text-[10px] font-semibold text-white/75 transition hover:text-white sm:inline-flex"
              >
                <Icon name="mail" size={11} className="text-signal" />
                Email
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss preview notice"
            className="flex size-6 shrink-0 items-center justify-center rounded-md text-white/45 transition hover:bg-white/10 hover:text-white"
          >
            <Icon name="close" size={13} />
          </button>
        </div>
        <div className="bg-white/[0.06] px-3 py-1.5 text-[8.5px] tracking-[0.06em] text-white/40 uppercase">
          Hutaib InfoTech Solutions · homepage concept for approval
        </div>
      </div>
    </div>
  );
}
