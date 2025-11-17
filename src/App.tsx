/// <reference types="vite/client" />
import React, { useMemo, useState } from "react";

// ===== Quick Settings (edit these) =====
const AGENT_NAME = "Greg Dumas";
const TAGLINE = "Friendly, helpful, and professional real estate guidance for Baldwin & Mobile County";
const PHONE = "(251) 752-2814";
const EMAIL = "gregorymdumas@gmail.com";
const BROKERAGE = "Key Performance Team — Keller Williams (Daphne Office)";
const BROKER_URL = "https://keyperformanceteam.com/";
const BRAND_COLOR = "#0f766e"; // teal-700
const HEADSHOT_URL = import.meta.env.BASE_URL + "headshot.png"; // place your headshot in /public/headshot.png

// ===== Data you can tweak later =====
const serviceAreas = [
  {
    name: "Fairhope",
    blurb: "Great Schools • Walkable downtown • Arts & dining.",
    img: "https://plus.unsplash.com/premium_photo-1712767020333-170a34d85386?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Sailboat on the bay",
  },
  {
    name: "Daphne",
    blurb: "Mobile Bay • Old Town Daphne • Family-friendly neighborhoods.",
    img: "https://images.unsplash.com/photo-1703639854187-9c2853b2a600?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Sunset over Mobile Bay",
  },
  {
    name: "Spanish Fort",
    blurb: "Historic Blakeley State Park • Quick I-10 commute.",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
    alt: "Trail through historic battlefield woods",
  },
  {
    name: "Foley",
    blurb: "Shopping • Value and growth.",
    img: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1600&auto=format&fit=crop",
    alt: "Vintage train and depot museum",
  },
  {
    name: "Gulf Shores",
    blurb: "Sugar-sand beaches • Short-term rentals.",
    img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop",
    alt: "Gulf Shores beach shoreline",
  },
  {
    name: "Orange Beach",
    blurb: "Perdido Pass • Fishing & boating • Resort amenities.",
    img: "https://images.unsplash.com/photo-1508182311256-e3f7d50bd1b7?q=80&w=1600&auto=format&fit=crop",
    alt: "Fishing boat near Perdido Pass",
  },
];

// Temporary search links until IDX is connected (keeps you compliant)
const searchLinks = [
  {
    id: "SRCH-1",
    title: "Baldwin County — All Homes",
    desc: "Browse the full market across price points and cities.",
    href: "https://www.zillow.com/baldwin-county-al/",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "SRCH-2",
    title: "Daphne — New This Week",
    desc: "See the freshest listings added in the last 7 days.",
    href: "https://www.zillow.com/daphne-al/newest/",
    img: "https://images.unsplash.com/photo-1560185008-b033106af2a7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "SRCH-3",
    title: "Gulf Shores — Condos",
    desc: "Beach and lagoon-side condos at a range of budgets.",
    href: "https://www.zillow.com/gulf-shores-al/condos/",
    img: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1600&auto=format&fit=crop",
  },
];

// ===== UI Helpers =====
function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate-600 mt-2 max-w-3xl">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

function Button({ href, onClick, children, variant = "primary" }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-700"
      : "bg-white/90 text-slate-900 hover:bg-white focus:ring-slate-300 border border-slate-200";

  if (href) {
    return (
      <a href={href} className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function Stat({ icon, label, text }: { icon: string; label: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="text-lg font-semibold flex items-center gap-2">
        {icon} {label}
      </div>
      <div className="text-slate-600 mt-2 text-sm leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function SearchCard({ item }: { item: any }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition border border-slate-200 bg-white">
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
        <div className="text-slate-600">{item.desc}</div>
        <div className="flex gap-2">
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition bg-teal-700 text-white hover:bg-teal-800"
          >
            Open search
          </a>
          <button
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition bg-white/90 text-slate-900 hover:bg-white border border-slate-200"
            onClick={() => console.log("Requesting custom search", item.title)}
          >
            Request custom search
          </button>
        </div>
      </div>
    </div>
  );
}

function Testimonial({ quote, name, sub }: { quote: string; name: string; sub: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <p className="text-slate-800 italic">“{quote}”</p>
      <div className="mt-4 font-semibold">{name}</div>
      <div className="text-slate-600 text-sm">{sub}</div>
    </div>
  );
}

function ContactForm({ onSubmit }: { onSubmit?: (d: any) => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Lead submitted", form); // replace with AWS SES/API route later
    setSent(true);
    if (onSubmit) onSubmit(form);
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-teal-50 border border-teal-200 p-6">
        <div className="font-semibold text-teal-900">Thank you!</div>
        <div className="text-teal-800 mt-1">I’ll get back to you shortly.</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input
        required
        name="name"
        placeholder="Full name"
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
        value={form.name}
        onChange={update}
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Email"
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
        value={form.email}
        onChange={update}
      />
      <input
        name="phone"
        placeholder="Phone"
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
        value={form.phone}
        onChange={update}
      />
      <input
        name="subject"
        placeholder="Subject (optional)"
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
      />
      <textarea
        name="message"
        placeholder="How can I help?"
        rows={5}
        className="md:col-span-2 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
        value={form.message}
        onChange={update}
      />
      <div className="md:col-span-2 flex items-center gap-3">
        <button
          className="px-6 py-3 rounded-xl bg-teal-700 text-white font-semibold hover:bg-teal-800 focus:ring-2 focus:ring-teal-700"
          type="submit"
        >
          Send message
        </button>
        <a
          className="text-slate-600 underline"
          href={`tel:${PHONE.replace(/[^\d]/g, "")}`}
        >
          or call {PHONE}
        </a>
      </div>
    </form>
  );
}

function LeadCaptureModal({
  open,
  onClose,
  payload,
}: {
  open: boolean;
  onClose: () => void;
  payload: any;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold">Let’s connect</h3>
              <p className="text-slate-600 mt-1">
                I’ll send details for:{" "}
                <span className="font-medium">
                  {payload?.type === "schedule"
                    ? "Tour request"
                    : "Property info"}
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </div>

          {payload?.listing && (
            <div className="mt-4 flex gap-4">
              <img
                src={payload.listing.img}
                alt=""
                className="w-24 h-16 object-cover rounded-lg border border-slate-200"
              />
              <div>
                <div className="font-semibold">{payload.listing.address}</div>
                <div className="text-slate-600 text-sm">
                  {payload.listing.meta}
                </div>
              </div>
            </div>
          )}

          {!sent ? (
            <div className="mt-5">
              <label className="block text-sm text-slate-700 mb-1">
                Your best email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
              />
              <button
                onClick={() => {
                  console.log("Lead modal", { email, payload });
                  setSent(true);
                }}
                className="mt-4 w-full rounded-xl bg-teal-700 text-white font-semibold py-3 hover:bg-teal-800"
              >
                Send
              </button>
              <div className="text-xs text-slate-500 mt-2">
                By submitting, you agree to be contacted about real estate
                services. You may unsubscribe at any time.
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl bg-teal-50 border border-teal-200 p-4 text-teal-900">
              Thank you! I’ll follow up shortly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [leadModal, setLeadModal] = useState<{
    open: boolean;
    payload: any;
  }>({ open: false, payload: null });
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white font-bold">
                GD
              </div>
              <div>
                <div className="font-extrabold tracking-tight">
                  {AGENT_NAME}
                </div>
                <div className="text-xs text-slate-600">{BROKERAGE}</div>
              </div>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#buy" className="hover:text-teal-700">
                Buy
              </a>
              <a href="#sell" className="hover:text-teal-700">
                Sell
              </a>
              <a href="#areas" className="hover:text-teal-700">
                Areas
              </a>
              <a href="#listings" className="hover:text-teal-700">
                Listings
              </a>
              <a href="#testimonials" className="hover:text-teal-700">
                Reviews
              </a>
              <a href="#contact" className="hover:text-teal-700">
                Contact
              </a>
              <a
                href={`tel:${PHONE.replace(/[^\d]/g, "")}`}
                className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100"
              >
                📞 {PHONE}
              </a>
            </nav>
            <button
              className="md:hidden text-2xl"
              onClick={() => setMobileOpen((v) => !v)}
            >
              ☰
            </button>
          </div>
          {mobileOpen && (
            <div className="md:hidden pb-4 grid gap-2 text-sm">
              {["#buy", "#sell", "#areas", "#listings", "#testimonials", "#contact"].map(
                (href) => (
                  <a
                    key={href}
                    href={href}
                    className="px-3 py-2 rounded-lg hover:bg-slate-100"
                  >
                    {href.replace("#", "")}
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2400&auto=format&fit=crop"
            alt="Gulf Coast Homes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-36">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/20 mb-4">
              <span className="text-xs">Equal Housing Opportunity</span>
              <span className="text-xs">•</span>
              <span className="text-xs">REALTOR®</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1]">
              {AGENT_NAME} — Your Gulf Coast Real Estate Partner
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">{TAGLINE}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#listings">Browse listings</Button>
              <Button variant="secondary" href="#sell">
                Get a free home valuation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <Section
        id="value"
        title="What you can expect"
        subtitle="Clear communication • Straightforward guidance • Backed by the Key Performance Team at Keller Williams"
      >
        <div className="grid md:grid-cols-4 gap-6">
          <Stat
            icon="📬"
            label="Proactive updates"
            text="You’ll always know what’s next and where things stand — from first showing through close."
          />
          <Stat
            icon="📊"
            label="Data-driven pricing"
            text="Local comps and trend analysis tailored to each neighborhood and property type."
          />
          <Stat
            icon="🤝"
            label="Skilled negotiation"
            text="Offer strategies and clean terms that protect your interests while staying competitive."
          />
          <Stat
            icon="🛠️"
            label="Trusted network"
            text="Inspectors, lenders, contractors, and closing attorneys vetted by our team."
          />
        </div>
      </Section>

      {/* Buy */}
      <Section
        id="buy"
        title="Buy with confidence"
        subtitle="From first showing to closing table, I’ll handle the details and keep you informed."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Local market guidance",
              text: "Daily watch on Baldwin & Mobile inventory, pricing trends, and incentives.",
            },
            {
              title: "Offer strategy",
              text: "Win competitively with clean terms, smart contingencies, and lender alignment.",
            },
            {
              title: "Trusted network",
              text: "Inspectors, lenders, contractors, and closing attorneys I’d use myself.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="text-xl font-semibold">{c.title}</div>
              <div className="text-slate-600 mt-2">{c.text}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Sell */}
      <Section
        id="sell"
        title="Sell for top dollar"
        subtitle="Pricing precision, polished presentation, and proactive communication."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Pricing & prep",
              text: "Data-backed pricing plus a concise prep checklist to maximize return.",
            },
            {
              title: "Pro marketing",
              text: "Photography, 3D tours, targeted social, email, and yard-to-URL capture.",
            },
            {
              title: "Transparent updates",
              text: "Weekly metrics and feedback summaries — no guesswork.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="text-xl font-semibold">{c.title}</div>
              <div className="text-slate-600 mt-2">{c.text}</div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button
            onClick={() =>
              setLeadModal({ open: true, payload: { type: "valuation" } })
            }
          >
            Request your free valuation
          </Button>
          <span className="ml-3 text-slate-500 text-sm">
            Backed by the Key Performance Team at Keller Williams
          </span>
        </div>
      </Section>

      {/* Areas */}
      <Section
        id="areas"
        title="Neighborhoods I serve"
        subtitle="Baldwin & Mobile County — from historic streets to sugar-sand beaches."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {serviceAreas.map((a) => (
            <div
              key={a.name}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
            >
              <img
                src={a.img}
                alt={a.name}
                className="aspect-[4/3] w-full object-cover object-center transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <div className="text-lg font-semibold">{a.name}</div>
                <div className="text-white/90 text-sm">{a.blurb}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Listings (temporary links) */}
      <Section
        id="listings"
        title="Start your home search"
        subtitle="Until my IDX feed is live, use these quick links to explore the market. I’m happy to set up a tailored search with instant alerts."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {searchLinks.map((s) => (
            <SearchCard key={s.id} item={s} />
          ))}
        </div>
        <div className="mt-4 text-xs text-slate-500">
          Links open third-party sites. Data believed accurate but not
          guaranteed. For the most current information, request a custom search.
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        id="testimonials"
        title="Happy clients"
        subtitle="Clear communication, smooth transactions, no surprises."
      >
        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial
            quote="Greg was responsive and strategic. Our offer beat multiple bids without overpaying."
            name="Ashley & Ben"
            sub="Bought in Fairhope"
          />
          <Testimonial
            quote="Our home sold in 6 days at 101% of list. The prep checklist was gold."
            name="The Martins"
            sub="Sold in Daphne"
          />
          <Testimonial
            quote="From tour to close, every detail handled. Zero stress at the beach!"
            name="Carrie R."
            sub="Bought in Gulf Shores"
          />
        </div>
      </Section>

      {/* Contact */}
      <Section
        id="contact"
        title="Let’s talk"
        subtitle="Tell me your goals. I’ll map the plan."
      >
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="text-lg font-semibold">Message me</div>
            <div className="text-slate-600 text-sm mb-4">
              I typically reply same day.
            </div>
            <ContactForm
              onSubmit={(d) => console.log("Contact form submitted", d)}
            />
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={HEADSHOT_URL}
                alt={AGENT_NAME + " — REALTOR®, Baldwin & Mobile County"}
                className="w-24 h-24 rounded-full object-cover shadow"
              />
              <div>
                <div className="text-lg font-semibold">{AGENT_NAME}</div>
                <div className="text-slate-600 text-sm">
                  Your trusted real estate advisor in Baldwin & Mobile County
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold">Direct</div>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>
                📞{" "}
                <a
                  className="underline"
                  href={`tel:${PHONE.replace(/[^\d]/g, "")}`}
                >
                  {PHONE}
                </a>
              </li>
              <li>
                ✉️{" "}
                <a className="underline" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </li>
              <li>
                🏢{" "}
                <a
                  className="underline"
                  href={BROKER_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {BROKERAGE}
                </a>
              </li>
            </ul>
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title="Map"
                width="100%"
                height="100%"
                loading="lazy"
                src="https://www.google.com/maps?q=Daphne%2C%20AL&output=embed"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-extrabold text-lg">{AGENT_NAME}</div>
            <div className="text-slate-600">{TAGLINE}</div>
            <div className="text-slate-500 text-sm mt-3">
              Serving Baldwin & Mobile County, Alabama
            </div>
            <div className="text-slate-500 text-xs mt-3">
              Member of the{" "}
              <a
                className="underline"
                href={BROKER_URL}
                target="_blank"
                rel="noreferrer"
              >
                Key Performance Team
              </a>{" "}
              at Keller Williams (Daphne Office). Equal Housing Opportunity.
              REALTOR®. This site uses sample images and links to third-party
              search pages until IDX is connected.
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Quick links</div>
            <ul className="space-y-1 text-slate-700">
              <li>
                <a className="hover:underline" href="#buy">
                  Buy
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#sell">
                  Sell
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#areas">
                  Areas
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#listings">
                  Listings
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Stay in the loop</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.currentTarget as any).email?.value;
                console.log("Newsletter", email);
              }}
              className="flex gap-2"
            >
              <input
                name="email"
                type="email"
                placeholder="you@email.com"
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
              />
              <button className="px-4 py-3 rounded-xl bg-teal-700 text-white font-semibold hover:bg-teal-800">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">
          © {year} {AGENT_NAME}. All rights reserved.
        </div>
      </footer>

      {/* Lead modal */}
      <LeadCaptureModal
        open={leadModal.open}
        onClose={() => setLeadModal({ open: false, payload: null })}
        payload={leadModal.payload}
      />

      <style>{`
        :root { --brand: ${BRAND_COLOR}; }
        .text-brand { color: var(--brand); }
        .bg-brand { background-color: var(--brand); }
        .border-brand { border-color: var(--brand); }
      `}</style>
    </div>
  );
}
