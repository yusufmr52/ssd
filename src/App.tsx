import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero, CredentialsBar } from "./components/Hero";
import { Services } from "./components/Services";
import { WhyUs } from "./components/WhyUs";
import { Process } from "./components/Process";
import { Industries } from "./components/Industries";
import { Proof } from "./components/Proof";
import { Faq } from "./components/Faq";
import { ContactCta } from "./components/ContactCta";
import { Footer } from "./components/Footer";
import { WpKit } from "./components/WpKit";
import { PreviewBadge } from "./components/PreviewBadge";

export default function App() {
  const [clientPreview] = useState(
    () => typeof window !== "undefined" && window.__HUTAIB_CLIENT_PREVIEW__ === true,
  );
  const [view, setView] = useState<"site" | "kit">(() =>
    typeof window !== "undefined" &&
    !window.__HUTAIB_CLIENT_PREVIEW__ &&
    window.location.hash === "#wp-kit"
      ? "kit"
      : "site",
  );
  const [previewMode] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.__HUTAIB_PREVIEW__ === true || new URLSearchParams(window.location.search).has("preview")),
  );
  const [quoteRequest, setQuoteRequest] = useState({ intent: "Site survey", requestId: 0 });

  const handleQuote = useCallback((intent = "Site survey") => {
    setQuoteRequest((current) => ({ intent, requestId: current.requestId + 1 }));
    window.setTimeout(() => {
      const target = document.getElementById("contact");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 60);
  }, []);

  const openKit = useCallback(() => {
    if (clientPreview) return;
    window.location.hash = "wp-kit";
    setView("kit");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [clientPreview]);

  const closeKit = useCallback(() => {
    if (window.location.hash === "#wp-kit") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setView("site");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const sync = () => {
      const next = window.location.hash === "#wp-kit" ? "kit" : "site";
      setView(next);
      if (next === "kit") window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  if (view === "kit" && !clientPreview) {
    return <WpKit onBack={closeKit} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onQuote={handleQuote} />
      <main id="main">
        <Hero onQuote={handleQuote} />
        <CredentialsBar />
        <Services onQuote={handleQuote} />
        <WhyUs />
        <Process onQuote={handleQuote} />
        <Industries onQuote={handleQuote} />
        <Proof />
        <Faq onQuote={handleQuote} />
        <ContactCta intent={quoteRequest.intent} requestId={quoteRequest.requestId} />
      </main>
      <Footer onQuote={handleQuote} onOpenKit={previewMode || clientPreview ? undefined : openKit} />
      {previewMode && window.__HUTAIB_PREVIEW_BADGE__ !== false && <PreviewBadge />}
    </div>
  );
}
