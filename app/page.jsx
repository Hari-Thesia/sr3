"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Check, Download, FileText, Loader2, Lock, MessageCircle,
  PencilRuler, Route, ShieldCheck, Sparkles, Waves,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CONFIG                                                             */
/* ------------------------------------------------------------------ */
const PDF_URL = "/dossier/The-Lake-Side-Confidential-Dossier.pdf"; // placeholder PDF — replace with the real dossier
const IMG = {
  hero: "/images/hero-dusk.png",
  aerial: "/images/aerial-lakefront.jpg",
  pool: "/images/clubhouse-pool.jpg",
  villa: "/images/gallery-extra.jpg",
};

const LOCKED = ["Plot Floor Plans", "Complete Price Schedule", "Payment Milestones", "Land Title Documents"];

const HIGHLIGHTS = [
  { icon: PencilRuler, title: "Designed by Apurva Amin", text: "A quiet, earth-toned villa language shaped by an architect's eye." },
  { icon: Waves, title: "Private Lakefront Living", text: "A natural lake with promenade, amphitheatre and a boating edge." },
  { icon: Route, title: "20 Minutes from SG Highway", text: "Easy to reach on a Friday evening, far enough to feel away." },
  { icon: Sparkles, title: "30+ Resort Amenities", text: "Clubhouse, infinity pool and landscaped leisure spaces." },
];

const GALLERY = [
  { src: IMG.aerial, title: "Lake Promenade", sub: "Amphitheatre and clubhouse lawn" },
  { src: IMG.pool, title: "Infinity Pool", sub: "Water that meets the lake" },
  { src: IMG.hero, title: "Dusk at the Water", sub: "Villas glowing over the lake" },
  { src: IMG.villa, title: "Villa Facade", sub: "Brick, stone and living green" },
];

const INTENTS = [
  { id: "buy30", label: "Looking to Buy in 30 Days", note: "Priority call back" },
  { id: "explore", label: "Exploring Options", note: "Dossier only" },
];

const cleanPhone = (v) => v.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
const validPhone = (v) => /^[6-9]\d{9}$/.test(cleanPhone(v));
const inputCls =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-zinc-500 transition focus:border-gold focus:bg-white/[0.07]";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Page() {
  // stage: form -> sending -> downloading -> done
  const [stage, setStage] = useState("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [intent, setIntent] = useState("buy30");
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const linkRef = useRef(null);

  const unlocked = stage === "downloading" || stage === "done";

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (name.trim().length < 2) next.name = "Please enter your full name.";
    if (!validPhone(phone)) next.phone = "Enter a valid 10-digit WhatsApp number.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: POST { name, phone: cleanPhone(phone), intent } to your CRM / WhatsApp Business API here.
    setStage("sending");
    setTimeout(() => {
      setProgress(0);
      setStage("downloading");
    }, 900);
  };

  // animate the "Downloading your PDF..." bar, then trigger the file
  useEffect(() => {
    if (stage !== "downloading") return;
    const id = setInterval(() => {
      setProgress((p) => {
        const n = Math.min(100, p + 4 + Math.random() * 6);
        if (n >= 100) {
          clearInterval(id);
          setTimeout(() => {
            setStage("done");
            setTimeout(() => linkRef.current?.click(), 50);
          }, 350);
        }
        return n;
      });
    }, 160);
    return () => clearInterval(id);
  }, [stage]);

  const reset = () => {
    setStage("form"); setName(""); setPhone(""); setProgress(0); setErrors({});
  };

  return (
    <div className="min-h-screen bg-midnight text-white">
      {/* ---------- Slim header ---------- */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <p className="font-display text-xl tracking-wide sm:text-2xl">
            The Lake Side <span className="ml-1 text-xs text-gold/80">by SR Group</span>
          </p>
          <a href="#dossier" className="rounded-full border border-gold/40 px-4 py-1.5 text-xs text-gold transition hover:bg-gold/10 sm:text-sm">
            Private access
          </a>
        </div>
      </header>

      {/* ---------- 1. Hero ---------- */}
      <section className="relative isolate overflow-hidden">
        <img src={IMG.hero} alt="Luxury lakeside villas glowing at dusk" className="kenburns absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight/80 via-midnight/55 to-midnight" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_45%,transparent,rgba(10,13,18,.75))]" />
        <div className="mx-auto flex min-h-[78vh] max-w-4xl flex-col items-center justify-center px-5 pb-40 pt-32 text-center sm:px-8">
          <p className="rise mb-6 flex items-center gap-3 text-xs text-gold">
            <span className="h-px w-8 bg-gold/60" /> By invitation · Phase 1 <span className="h-px w-8 bg-gold/60" />
          </p>
          <h1 className="rise font-display text-4xl leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,.7)] sm:text-6xl lg:text-7xl" style={{ animationDelay: ".1s" }}>
            The Lake Side — <span className="italic text-gold">Sanand&rsquo;s Most Exclusive Weekend Sanctuary.</span>
          </h1>
          <p className="rise mt-6 max-w-2xl text-base text-zinc-200 sm:text-lg" style={{ animationDelay: ".25s" }}>
            95 Luxury 3BHK Villas. Download the Complete Master Plan, Price Matrix, and Architectural Brochure.
          </p>
          <a href="#dossier" className="rise group mt-9 inline-flex items-center gap-2 text-sm text-gold" style={{ animationDelay: ".4s" }}>
            Request the dossier <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      {/* ---------- 2. Locked digital asset card ---------- */}
      <section id="dossier" className="relative z-10 mx-auto -mt-32 max-w-6xl scroll-mt-6 px-4 sm:-mt-36 sm:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-white/15 bg-white/[0.05] shadow-[0_50px_120px_-30px_rgba(0,0,0,.9)] backdrop-blur-2xl lg:grid-cols-[1.05fr_1fr]">
          {/* Left: 3D dossier + locked badges */}
          <div className="relative flex flex-col items-center justify-center gap-8 border-b border-white/10 bg-gradient-to-br from-gold/[0.07] to-transparent p-8 sm:p-12 lg:border-b-0 lg:border-r">
            <Dossier unlocked={unlocked} />
            <ul className="grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
              {LOCKED.map((item) => (
                <li key={item} className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition ${unlocked ? "border-gold/50 bg-gold/10 text-white" : "border-white/10 bg-black/20 text-zinc-300"}`}>
                  {unlocked ? <Check className="h-4 w-4 shrink-0 text-gold" /> : <Lock className="h-4 w-4 shrink-0 text-gold/80" />}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form / success */}
          <div className="p-8 sm:p-12">
            {(stage === "form" || stage === "sending") && (
              <form onSubmit={submit} noValidate>
                <p className="flex items-center gap-2 text-xs text-gold"><FileText className="h-4 w-4" /> Confidential Project Dossier · PDF</p>
                <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">Unlock the complete dossier</h2>
                <p className="mt-2 text-sm text-zinc-400">Two details. We send the PDF straight to your WhatsApp.</p>

                <div className="mt-7 space-y-4">
                  <label className="block text-sm text-zinc-400">
                    Full name
                    <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your full name" className={`mt-1.5 ${inputCls}`} />
                    {errors.name && <span role="alert" className="mt-1 block text-sm text-red-400">{errors.name}</span>}
                  </label>
                  <label className="block text-sm text-zinc-400">
                    WhatsApp phone number
                    <div className="mt-1.5 flex">
                      <span className="flex items-center rounded-l-lg border border-r-0 border-white/10 bg-white/[0.06] px-3 text-zinc-300">+91</span>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel-national" placeholder="98765 43210" className={`${inputCls} rounded-l-none`} />
                    </div>
                    {errors.phone && <span role="alert" className="mt-1 block text-sm text-red-400">{errors.phone}</span>}
                  </label>

                  <fieldset>
                    <legend className="text-sm text-zinc-400">Your intent</legend>
                    <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                      {INTENTS.map((o) => (
                        <label key={o.id} className={`cursor-pointer rounded-lg border px-4 py-3 transition ${intent === o.id ? "border-gold bg-gold/10" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}>
                          <input type="radio" name="intent" value={o.id} checked={intent === o.id} onChange={() => setIntent(o.id)} className="sr-only" />
                          <span className="block text-sm text-white">{o.label}</span>
                          <span className="block text-xs text-zinc-500">{o.note}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <button
                  disabled={stage === "sending"}
                  className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#B8922B] via-gold to-[#F0D77A] px-6 py-4 text-sm font-semibold text-midnight shadow-[0_16px_40px_-12px_rgba(212,175,55,.6)] transition hover:brightness-110 disabled:opacity-80 sm:text-base"
                >
                  {stage === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
                  {stage === "sending" ? "Verifying…" : "Instant Unlock & Send Dossier to WhatsApp"}
                </button>
                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-500">
                  <ShieldCheck className="h-4 w-4 text-gold/70" /> Private. No spam. Shared only with the SR Group sales team.
                </p>
              </form>
            )}

            {stage === "downloading" && (
              <div role="status" aria-live="polite" className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                <Download className="h-10 w-10 text-gold motion-safe:animate-bounce" strokeWidth={1.3} />
                <h2 className="mt-5 font-display text-3xl">Downloading your PDF&hellip;</h2>
                <p className="mt-2 text-sm text-zinc-400">Preparing The Lake Side Confidential Project Dossier</p>
                <div className="mt-7 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full rounded-full bg-gradient-to-r from-[#B8922B] to-[#F0D77A] transition-all duration-150" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 font-mono text-xs text-gold">{Math.round(progress)}%</p>
              </div>
            )}

            {stage === "done" && (
              <div role="status" className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/10"><Check className="h-8 w-8 text-gold" /></span>
                <h2 className="mt-5 font-display text-3xl sm:text-4xl">Dossier unlocked</h2>
                <p className="mt-3 max-w-sm text-sm text-zinc-300">
                  Thank you, {name.trim().split(" ")[0]}. Your PDF has downloaded and a copy is on its way to
                  <span className="text-white"> +91 {cleanPhone(phone)}</span> on WhatsApp.
                  {intent === "buy30" && " Our senior advisor will call you shortly."}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a ref={linkRef} href={PDF_URL} download className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#B8922B] via-gold to-[#F0D77A] px-5 py-3 text-sm font-semibold text-midnight">
                    <Download className="h-4 w-4" /> Download again
                  </a>
                  <button onClick={reset} className="rounded-lg border border-white/15 px-5 py-3 text-sm text-zinc-300 hover:border-gold hover:text-gold">Request for another number</button>
                </div>
                <p className="mt-5 flex items-center gap-2 text-xs text-zinc-500"><MessageCircle className="h-4 w-4 text-gold/70" /> Delivered via WhatsApp</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- 3. Highlights ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="text-center font-display text-3xl sm:text-5xl">Quietly <span className="italic text-gold">extraordinary</span></h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-midnight p-7 transition hover:bg-slate2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50"><Icon className="h-5 w-5 text-gold" strokeWidth={1.4} /></span>
              <h3 className="mt-5 font-display text-2xl leading-snug">{title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 4. Amenity gallery ---------- */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <h2 className="font-display text-3xl sm:text-5xl">A life lived <span className="italic text-gold">by the water</span></h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((g) => (
            <figure key={g.title} className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
              <img src={g.src} alt={`${g.title} — ${g.sub}`} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="block h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
                <span className="mt-3 block font-display text-2xl">{g.title}</span>
                <span className="block text-sm text-zinc-300">{g.sub}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-zinc-500">Project designed by Architect Apurva Amin. Images are artistic impressions.</p>
      </section>

      {/* ---------- 5. Footer ---------- */}
      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <p className="flex items-center gap-2 font-display text-xl text-gold"><Lock className="h-4 w-4" /> Private &amp; Confidential — SR Group Official Sales Portal.</p>
          <div className="mt-5 space-y-2 text-xs leading-relaxed text-zinc-500">
            <p>RERA: [Gujarat RERA registration number to be added]. [Placeholder: confirm legal entity, promoter details and project approvals before publishing.]</p>
            <p>
              All images, plans, specifications and amenities are artistic impressions and indicative only. They are subject to
              change by the developer or approving authorities without notice, and do not constitute an offer, contract or
              warranty. Prices and availability are subject to confirmation by the sales team. By submitting your details you
              consent to being contacted on WhatsApp, phone and email about The Lake Side.
            </p>
            <p>© {new Date().getFullYear()} SR Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3D dossier mock                                                    */
/* ------------------------------------------------------------------ */
function Dossier({ unlocked }) {
  return (
    <div className="[perspective:1400px]" aria-label="The Lake Side Confidential Project Dossier preview" role="img">
      <div className="relative mx-auto h-[330px] w-[236px] transition-transform duration-700 [transform-style:preserve-3d] [transform:rotateY(-24deg)_rotateX(6deg)] hover:[transform:rotateY(-9deg)_rotateX(3deg)] sm:h-[380px] sm:w-[272px]">
        <div className="absolute inset-0 translate-x-3 translate-y-2 rounded-r-md bg-zinc-300 [transform:translateZ(-20px)]" />
        <div className="absolute inset-0 translate-x-1.5 translate-y-1 rounded-r-md bg-zinc-100 [transform:translateZ(-10px)]" />
        <div className="absolute left-0 top-0 h-full w-5 origin-left bg-gradient-to-r from-[#7a5f14] to-gold [transform:rotateY(-90deg)]" />
        <div className="absolute inset-0 overflow-hidden rounded-r-md border border-gold/50 shadow-[0_40px_70px_-20px_rgba(0,0,0,.9)]">
          <img src={IMG.hero} alt="" className={`h-full w-full object-cover transition duration-700 ${unlocked ? "" : "scale-110 blur-[1.5px]"}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,.12)_50%,transparent_60%)]" />
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <div>
              <p className="text-[10px] text-gold">SR GROUP</p>
              <span className="mt-2 block h-px w-10 bg-gold" />
            </div>
            <div>
              <p className="font-display text-3xl leading-none">The Lake<br />Side</p>
              <p className="mt-3 text-[10px] leading-snug text-zinc-300">Confidential Project Dossier<br />Master Plan · Price Matrix · Brochure</p>
            </div>
          </div>
          <span className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur ${unlocked ? "border-gold bg-gold text-midnight" : "border-gold/60 bg-midnight/60 text-gold"}`}>
            {unlocked ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
          </span>
        </div>
      </div>
    </div>
  );
}
