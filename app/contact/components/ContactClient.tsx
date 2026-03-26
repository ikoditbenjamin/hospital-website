"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
  ChevronDown,
  AlertCircle,
  Ambulance,
  Wifi,
  Car,
  ArrowRight,
  HeadphonesIcon,
  Globe,
  Shield,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────── */

const contactMethods = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+256 782391512 MED CARE",
    sub: "Mon – Sat · 7am – 8pm",
    href: "tel:+256782391512",
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
    cta: "Call Now",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@jidennamedical.com",
    sub: "Response within 2 hours",
    href: "mailto:hello@jidennamedical.com",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    border: "#bae6fd",
    cta: "Send Email",
  },
  {
    icon: MessageSquare,
    label: "Live Chat",
    value: "Chat with a Navigator",
    sub: "Available right now",
    href: "#chat",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    cta: "Start Chat",
  },
  {
    icon: Calendar,
    label: "Book Online",
    value: "Schedule in 60 seconds",
    sub: "Same-day slots available",
    href: "/Book now",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    cta: "Book Now",
  },
];

const locations = [
  {
    name: "Main Medical Centre",
    address: "12 Health Avenue, Medical District",
    city: "Downtown",
    phone: "+1 800 MED CARE",
    hours: "Mon–Sat 7am–8pm · Sun 9am–5pm",
    emergency: true,
    parking: true,
    telehealth: true,
    flagship: true,
  },
  {
    name: "Northside Clinic",
    address: "48 Wellness Road, Northside",
    city: "North District",
    phone: "+1 800 MED 0048",
    hours: "Mon–Fri 8am–6pm · Sat 9am–2pm",
    emergency: false,
    parking: true,
    telehealth: true,
    flagship: false,
  },
  {
    name: "Eastgate Health Hub",
    address: "7 Gateway Plaza, East End",
    city: "East District",
    phone: "+1 800 MED 0007",
    hours: "Mon–Sat 8am–7pm",
    emergency: false,
    parking: false,
    telehealth: true,
    flagship: false,
  },
  {
    name: "Westpark Family Clinic",
    address: "22 Parklands Drive, Westpark",
    city: "West District",
    phone: "+1 800 MED 0022",
    hours: "Mon–Fri 7am–6pm · Sat 8am–3pm",
    emergency: false,
    parking: true,
    telehealth: false,
    flagship: false,
  },
];

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "You can book online via our appointments page, call +1 800 MED CARE, or walk in during clinic hours. Most online bookings are confirmed within 30 minutes.",
  },
  {
    q: "Do you accept walk-in patients?",
    a: "Yes — our Main Medical Centre accepts walk-ins 7 days a week. All other branches accept walk-ins on a space-available basis. We always recommend booking ahead to reduce wait times.",
  },
  {
    q: "Which insurance providers do you accept?",
    a: "We accept NHIF, AAR Healthcare, Jubilee Insurance, Britam, UAP, and most major corporate insurance plans. Self-pay and cash options are also available with transparent pricing.",
  },
  {
    q: "How quickly can I get a same-day appointment?",
    a: "Same-day slots are typically available before 10am. Our care navigators can check live availability across all 12 locations and find the nearest open slot for you.",
  },
  {
    q: "Can I access my medical records online?",
    a: "Yes. All patients have access to a secure Patient Portal where you can view test results, prescriptions, visit summaries, and appointment history at any time.",
  },
  {
    q: "Do you offer telehealth / video consultations?",
    a: "Absolutely. Telehealth is available for most non-emergency consultations. You can book a video appointment through the online portal and connect with your doctor from anywhere.",
  },
];

const subjects = [
  "General Enquiry",
  "Appointment Booking",
  "Medical Records Request",
  "Insurance & Billing",
  "Feedback / Complaint",
  "Partnership / Corporate",
  "Media Enquiry",
  "Other",
];

/* ─── Hook ────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const [vis, setVis] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref: elementRef, vis };
}

/* ─── Page ────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    urgent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const heroSec = useInView(0.1);
  const methodsSec = useInView(0.1);
  const formSec = useInView(0.08);
  const locationSec = useInView(0.08);
  const faqSec = useInView(0.08);

  const set = (field: string, value: string | boolean) =>
    setForm((p) => ({ ...p, [field]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <main className="ct-root">
      {/* ══ HERO ══ */}
      <section className="ct-hero">
        <div className="ct-mesh" />
        <div className="ct-blob cb1" />
        <div className="ct-blob cb2" />

        <div
          ref={heroSec.ref}
          className={`ct-hero-inner ${heroSec.vis ? "ct-reveal" : ""}`}
        >
          <span className="ct-eyebrow">
            <span className="ct-dash" />
            We Are Here
            <span className="ct-dash" />
          </span>
          <h1 className="ct-h1">
            Get in <em>Touch</em>
          </h1>
          <p className="ct-sub">
            Whether you need to book an appointment, ask a clinical question, or
            find your nearest clinic — our team is ready to help, 7 days a week.
          </p>

          {/* Emergency strip */}
          <div className="ct-emergency">
            <div className="ct-em-pulse" />
            <Ambulance size={20} />
            <div>
              <p className="ct-em-title">Medical Emergency?</p>
              <p className="ct-em-sub">
                Our Main Centre Emergency Department is open 24 hours, 7 days a
                week.
              </p>
            </div>
            <a href="tel:911" className="ct-em-btn">
              Call 911
            </a>
          </div>
        </div>

        <div className="ct-cut" />
      </section>

      {/* ══ CONTACT METHODS ══ */}
      <section className="ct-methods-section">
        <div
          //  ref={methodsSec.ref}
          className={`ct-container ${methodsSec.vis ? "ct-reveal" : ""}`}
        >
          <div className="ct-methods-grid">
            {contactMethods.map((m, i) => {
              const Icon = m.icon;
              return (
                <a
                  key={m.label}
                  href={m.href}
                  className="ct-method-card"
                  style={
                    {
                      "--mc": m.color,
                      "--mbg": m.bg,
                      "--mbd": m.border,
                      "--mdi": `${i * 0.08}s`,
                    } as React.CSSProperties
                  }
                >
                  <div className="cm-icon-wrap">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div className="cm-text">
                    <p className="cm-label">{m.label}</p>
                    <p className="cm-value">{m.value}</p>
                    <p className="cm-sub">{m.sub}</p>
                  </div>
                  <span className="cm-cta">
                    {m.cta} <ArrowRight size={13} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FORM + INFO ══ */}
      <section className="ct-form-section">
        <div
          //  ref={formSec.ref}
          className={`ct-container ct-form-grid ${formSec.vis ? "ct-reveal" : ""}`}
        >
          {/* ── LEFT: Contact Form ── */}
          <div className="ct-form-panel">
            <div className="ct-panel-header">
              <span className="ct-section-eye">Send a Message</span>
              <h2 className="ct-section-h2">We Read Every Message</h2>
              <p className="ct-section-p">
                Fill in the form and a member of our team will get back to you
                within 2 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="ct-success">
                <div className="ct-success-icon">
                  <CheckCircle size={48} strokeWidth={1.5} />
                </div>
                <h3 className="ct-success-title">Message Received!</h3>
                <p className="ct-success-body">
                  Thank you, <strong>{form.name}</strong>. We have received your
                  message and will respond to <strong>{form.email}</strong>{" "}
                  within 2 hours.
                </p>
                <button
                  className="ct-success-reset"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                      urgent: false,
                    });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                {/* urgent toggle */}
                <label
                  className={`ct-urgent-toggle ${form.urgent ? "ct-urgent-on" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={form.urgent}
                    onChange={(e) => set("urgent", e.target.checked)}
                    style={{ display: "none" }}
                  />
                  <AlertCircle size={15} />
                  <span>
                    Mark as urgent — someone will contact you within 30 minutes
                  </span>
                  <div
                    className={`ct-toggle-dot ${form.urgent ? "ct-toggle-dot-on" : ""}`}
                  />
                </label>

                <div className="ct-form-row">
                  <div className="ct-field">
                    <label className="ct-label">
                      Full Name <span className="ct-req">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Johnson"
                      value={form.name}
                      onChange={(e) => {
                        set("name", e.target.value);
                        setErrors((p) => ({ ...p, name: "" }));
                      }}
                      className={`ct-input ${errors.name ? "ct-input-err" : ""}`}
                    />
                    {errors.name && (
                      <p className="ct-err-msg">
                        <AlertCircle size={11} /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">
                      Email Address <span className="ct-req">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => {
                        set("email", e.target.value);
                        setErrors((p) => ({ ...p, email: "" }));
                      }}
                      className={`ct-input ${errors.email ? "ct-input-err" : ""}`}
                    />
                    {errors.email && (
                      <p className="ct-err-msg">
                        <AlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="ct-form-row">
                  <div className="ct-field">
                    <label className="ct-label">
                      Phone Number <span className="ct-opt">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="ct-input"
                    />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">
                      Subject <span className="ct-req">*</span>
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => {
                        set("subject", e.target.value);
                        setErrors((p) => ({ ...p, subject: "" }));
                      }}
                      className={`ct-input ct-select ${errors.subject ? "ct-input-err" : ""}`}
                    >
                      <option value="">Select a subject…</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="ct-err-msg">
                        <AlertCircle size={11} /> {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div className="ct-field">
                  <label className="ct-label">
                    Your Message <span className="ct-req">*</span>
                  </label>
                  <textarea
                    placeholder="Tell us what you need — the more detail you provide, the better we can help…"
                    rows={5}
                    value={form.message}
                    onChange={(e) => {
                      set("message", e.target.value);
                      setErrors((p) => ({ ...p, message: "" }));
                    }}
                    className={`ct-input ct-textarea ${errors.message ? "ct-input-err" : ""}`}
                  />
                  <div className="ct-char-count">
                    {form.message.length} / 1000
                  </div>
                  {errors.message && (
                    <p className="ct-err-msg">
                      <AlertCircle size={11} /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="ct-submit-btn"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <span className="ct-spinner" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send Message
                    </>
                  )}
                </button>

                <p className="ct-privacy-note">
                  <Shield size={12} /> Your information is encrypted and never
                  shared with third parties.
                </p>
              </form>
            )}
          </div>

          {/* ── RIGHT: Info panel ── */}
          <div className="ct-info-panel">
            {/* Direct contacts */}
            <div className="ct-info-card ct-info-dark">
              <h3 className="ct-info-h3 ct-info-h3-light">Direct Contacts</h3>
              <div className="ct-direct-list">
                {[
                  {
                    icon: Phone,
                    label: "Main Line",
                    val: "+1 800 MED CARE",
                    href: "tel:+18006332273",
                  },
                  {
                    icon: Phone,
                    label: "Emergency",
                    val: "+1 800 MED 911",
                    href: "tel:+18006332273",
                  },
                  {
                    icon: Mail,
                    label: "General",
                    val: "hello@Jidenna Medical Center.com",
                    href: "mailto:hello@Jidenna Medical Center.com",
                  },
                  {
                    icon: Mail,
                    label: "Appointments",
                    val: "book@Jidenna Medical Center.com",
                    href: "mailto:book@Jidenna Medical Center.com",
                  },
                  {
                    icon: Mail,
                    label: "Billing",
                    val: "billing@Jidenna Medical Center.com",
                    href: "mailto:billing@Jidenna Medical Center.com",
                  },
                  {
                    icon: Globe,
                    label: "Portal",
                    val: "portal.Jidenna Medical Center.com",
                    href: "/portal",
                  },
                ].map((d) => {
                  const Icon = d.icon;
                  return (
                    <a key={d.label} href={d.href} className="ct-direct-row">
                      <div className="ct-direct-icon">
                        <Icon size={13} />
                      </div>
                      <div>
                        <p className="ct-direct-label">{d.label}</p>
                        <p className="ct-direct-val">{d.val}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Hours */}
            <div className="ct-info-card">
              <h3 className="ct-info-h3">
                <Clock size={15} className="ct-info-icon" /> Opening Hours
              </h3>
              <div className="ct-hours-list">
                {[
                  { day: "Monday – Friday", hours: "7:00 AM – 8:00 PM" },
                  { day: "Saturday", hours: "8:00 AM – 6:00 PM" },
                  { day: "Sunday", hours: "9:00 AM – 5:00 PM" },
                  { day: "Public Holidays", hours: "9:00 AM – 2:00 PM" },
                  {
                    day: "Emergency Dept",
                    hours: "24 Hours · 7 Days",
                    highlight: true,
                  },
                ].map((h) => (
                  <div
                    key={h.day}
                    className={`ct-hours-row ${h.highlight ? "ct-hours-hl" : ""}`}
                  >
                    <span className="ct-hours-day">{h.day}</span>
                    <span className="ct-hours-time">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response times */}
            <div className="ct-info-card ct-response-card">
              <h3 className="ct-info-h3">
                <HeadphonesIcon size={15} className="ct-info-icon" /> Response
                Times
              </h3>
              {[
                { channel: "Urgent calls", time: "< 5 min", bar: 95 },
                { channel: "Phone (general)", time: "< 3 min", bar: 85 },
                { channel: "Live chat", time: "< 2 min", bar: 98 },
                { channel: "Email", time: "< 2 hrs", bar: 70 },
                { channel: "Contact form", time: "< 2 hrs", bar: 70 },
              ].map((r) => (
                <div key={r.channel} className="ct-resp-row">
                  <div className="ct-resp-top">
                    <span className="ct-resp-channel">{r.channel}</span>
                    <span className="ct-resp-time">{r.time}</span>
                  </div>
                  <div className="ct-resp-bar-bg">
                    <div
                      className="ct-resp-bar-fill"
                      style={{ "--rw": `${r.bar}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ LOCATIONS ══ */}
      <section className="ct-locations-section">
        <div
          // ref={locationSec.ref}
          className={`ct-container ${locationSec.vis ? "ct-reveal" : ""}`}
        >
          <div className="ct-section-header">
            <span className="ct-section-eye">Find Us</span>
            <h2 className="ct-section-h2-dark">Our Clinic Locations</h2>
            <p className="ct-section-p-dark">
              12 clinics across the city — find the one closest to you.
            </p>
          </div>

          {/* Location tabs */}
          <div className="ct-loc-tabs">
            {locations.map((l, i) => (
              <button
                key={l.name}
                className={`ct-loc-tab ${activeTab === i ? "ct-loc-tab-active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {l.flagship && <span className="ct-flagship-dot" />}
                {l.city}
              </button>
            ))}
          </div>

          {/* Active location card */}
          <div className="ct-loc-card">
            <div className="ct-loc-map-placeholder">
              <MapPin size={40} strokeWidth={1} />
              <p>{locations[activeTab].name}</p>
              {locations[activeTab].flagship && (
                <span className="ct-flagship-badge">Main Centre</span>
              )}
            </div>
            <div className="ct-loc-info">
              <div className="ct-loc-header-row">
                <div>
                  <h3 className="ct-loc-name">{locations[activeTab].name}</h3>
                  <p className="ct-loc-city">{locations[activeTab].city}</p>
                </div>
                {locations[activeTab].flagship && (
                  <span className="ct-flagship-tag">🏥 Flagship</span>
                )}
              </div>

              <div className="ct-loc-details">
                <div className="ct-loc-detail-row">
                  <MapPin size={15} className="ct-loc-detail-icon" />
                  <span>{locations[activeTab].address}</span>
                </div>
                <div className="ct-loc-detail-row">
                  <Phone size={15} className="ct-loc-detail-icon" />
                  <a
                    href={`tel:${locations[activeTab].phone}`}
                    className="ct-loc-phone"
                  >
                    {locations[activeTab].phone}
                  </a>
                </div>
                <div className="ct-loc-detail-row">
                  <Clock size={15} className="ct-loc-detail-icon" />
                  <span>{locations[activeTab].hours}</span>
                </div>
              </div>

              <div className="ct-loc-amenities">
                <span
                  className={`ct-amenity ${locations[activeTab].emergency ? "ct-am-on" : "ct-am-off"}`}
                >
                  <Ambulance size={13} />
                  {locations[activeTab].emergency
                    ? "Emergency 24/7"
                    : "No Emergency"}
                </span>
                <span
                  className={`ct-amenity ${locations[activeTab].parking ? "ct-am-on" : "ct-am-off"}`}
                >
                  <Car size={13} />
                  {locations[activeTab].parking ? "Free Parking" : "No Parking"}
                </span>
                <span
                  className={`ct-amenity ${locations[activeTab].telehealth ? "ct-am-on" : "ct-am-off"}`}
                >
                  <Wifi size={13} />
                  {locations[activeTab].telehealth
                    ? "Telehealth"
                    : "No Telehealth"}
                </span>
              </div>

              <div className="ct-loc-actions">
                <Link href="/appointment" className="ct-loc-book">
                  <Calendar size={14} /> Book at This Location
                </Link>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(locations[activeTab].address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-loc-dir"
                >
                  <MapPin size={14} /> Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="ct-faq-section">
        <div
          // ref={faqSec.ref}
          className={`ct-container ${faqSec.vis ? "ct-reveal" : ""}`}
        >
          <div className="ct-section-header">
            <span className="ct-section-eye ct-eye-light">
              Common Questions
            </span>
            <h2 className="ct-section-h2 ct-h2-light">Frequently Asked</h2>
            <p className="ct-section-p ct-p-light">
              Can&apos;t find what you&apos;re looking for? Use the contact form
              above or call us directly.
            </p>
          </div>

          <div className="ct-faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`ct-faq-item ${openFaq === i ? "ct-faq-open" : ""}`}
              >
                <button
                  className="ct-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`ct-faq-chevron ${openFaq === i ? "ct-chev-open" : ""}`}
                  />
                </button>
                <div
                  className={`ct-faq-a-wrap ${openFaq === i ? "ct-faq-a-open" : ""}`}
                >
                  <p className="ct-faq-a">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ct-faq-footer">
            <p className="ct-faq-footer-text">Still have questions?</p>
            <Link href="#form" className="ct-faq-footer-btn">
              <MessageSquare size={14} /> Send Us a Message
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STYLES ══ */}
      <style>{`
        .ct-root {
          --teal:   #0d9488;
          --teal-d: #0f766e;
          --teal-l: #f0fdfa;
          --navy:   #0f2b4b;
          --navy-m: #1e4a7a;
          --slate:  #64748b;
          --border: #e2e8f0;
          --white:  #ffffff;
          --off:    #f8fafc;
          --err:    #ef4444;
          --ff-s:   'Georgia','Charter',serif;
          --ff-u:   'Trebuchet MS','Tahoma',sans-serif;
          overflow-x: hidden;
        }

        .ct-container { max-width:1200px; margin:0 auto; }

        /* animations */
        .ct-reveal { animation: ctFadeUp 0.75s ease forwards; }
        @keyframes ctFadeUp { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:none;} }

        /* ── HERO ── */
        .ct-hero {
          position:relative; overflow:hidden;
          background:linear-gradient(145deg,#0f2b4b 0%,#1e4a7a 55%,#0d5a73 100%);
          padding:6rem 1.5rem 9rem; text-align:center;
        }
        .ct-mesh {
          position:absolute;inset:0;
          background-image:radial-gradient(circle at 20% 30%,#5eead415 0%,transparent 45%),
                           radial-gradient(circle at 80% 70%,#0ea5e912 0%,transparent 45%);
        }
        .ct-blob { position:absolute;border-radius:50%;filter:blur(100px);opacity:0.22;pointer-events:none; }
        .cb1 { width:450px;height:450px;background:radial-gradient(#5eead4,transparent);top:-160px;right:-80px; }
        .cb2 { width:320px;height:320px;background:radial-gradient(#7dd3fc,transparent);bottom:-60px;left:-50px; }

        .ct-hero-inner { position:relative;z-index:2;max-width:740px;margin:0 auto;opacity:0;transform:translateY(28px); }

        .ct-eyebrow {
          display:inline-flex;align-items:center;gap:0.6rem;
          font-family:var(--ff-u);font-size:0.7rem;font-weight:700;
          letter-spacing:0.14em;text-transform:uppercase;color:#5eead4;
          margin-bottom:1rem;
        }
        .ct-dash { display:inline-block;width:26px;height:2px;background:#5eead4;border-radius:2px; }
        .ct-h1 {
          font-family:var(--ff-s);font-size:clamp(2.8rem,6vw,4.5rem);
          font-weight:900;color:#fff;line-height:1.08;letter-spacing:-0.03em;margin:0 0 1rem;
        }
        .ct-h1 em { color:#5eead4;font-style:italic; }
        .ct-sub {
          font-family:var(--ff-s);font-size:1rem;color:#94a3b8;
          max-width:580px;margin:0 auto 2.5rem;line-height:1.75;
        }

        /* emergency strip */
        .ct-emergency {
          display:inline-flex;align-items:center;gap:0.85rem;
          background:#ef444418;border:1.5px solid #ef444440;
          border-radius:1rem;padding:1rem 1.5rem;
          flex-wrap:wrap;justify-content:center;
        }
        .ct-em-pulse {
          width:10px;height:10px;border-radius:50%;background:#ef4444;flex-shrink:0;
          animation:emPulse 1.6s ease-in-out infinite;
        }
        @keyframes emPulse{0%,100%{box-shadow:0 0 0 0 #ef444455;}50%{box-shadow:0 0 0 7px #ef444400;}}
        .ct-emergency svg { color:#f87171;flex-shrink:0; }
        .ct-em-title { font-family:var(--ff-u);font-size:0.82rem;font-weight:800;color:#fff;margin:0 0 0.1rem; }
        .ct-em-sub   { font-family:var(--ff-u);font-size:0.68rem;color:#94a3b8;margin:0; }
        .ct-em-btn {
          font-family:var(--ff-u);font-size:0.78rem;font-weight:800;
          background:#ef4444;color:#fff;border-radius:0.6rem;
          padding:0.45rem 1rem;text-decoration:none;
          white-space:nowrap;transition:background 0.2s;
        }
        .ct-em-btn:hover { background:#dc2626; }

        .ct-cut { position:absolute;bottom:-1px;left:0;right:0;height:70px;background:var(--off);clip-path:polygon(0 100%,100% 100%,100% 0); }

        /* ── METHODS ── */
        .ct-methods-section { background:var(--off);padding:2.5rem 1.5rem 0; }
        .ct-methods-grid {
          display:grid;grid-template-columns:repeat(4,1fr);gap:1.1rem;
        }
        @media(max-width:900px){.ct-methods-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:480px){.ct-methods-grid{grid-template-columns:1fr;}}

        .ct-method-card {
          background:var(--mbg);border:1.5px solid var(--mbd);
          border-radius:1.25rem;padding:1.5rem 1.25rem;
          display:flex;flex-direction:column;gap:0.5rem;
          text-decoration:none;
          animation:ctFadeUp 0.55s ease var(--mdi) both;
          transition:transform 0.22s,box-shadow 0.22s;
        }
        .ct-method-card:hover { transform:translateY(-4px);box-shadow:0 12px 36px color-mix(in srgb,var(--mc) 15%,transparent); }
        .ct-method-card:hover .cm-icon-wrap { background:var(--mc);color:#fff; }
        .cm-icon-wrap {
          width:48px;height:48px;border-radius:0.85rem;
          background:var(--white);border:1.5px solid var(--mbd);
          display:grid;place-items:center;color:var(--mc);
          transition:all 0.22s;
        }
        .cm-label { font-family:var(--ff-u);font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--mc);margin:0; }
        .cm-value { font-family:var(--ff-s);font-size:0.95rem;font-weight:800;color:var(--navy);margin:0; }
        .cm-sub   { font-family:var(--ff-u);font-size:0.68rem;color:var(--slate);margin:0; }
        .cm-cta   {
          display:inline-flex;align-items:center;gap:0.3rem;
          font-family:var(--ff-u);font-size:0.72rem;font-weight:700;
          color:var(--mc);margin-top:0.4rem;transition:gap 0.2s;
        }
        .ct-method-card:hover .cm-cta { gap:0.55rem; }

        /* ── FORM SECTION ── */
        .ct-form-section { background:var(--off);padding:3rem 1.5rem; }
        .ct-form-grid {
          display:grid;grid-template-columns:1fr 360px;gap:2.5rem;align-items:start;
        }
        @media(max-width:1024px){.ct-form-grid{grid-template-columns:1fr;}}

        .ct-panel-header { margin-bottom:2rem; }
        .ct-section-eye {
          display:inline-block;
          font-family:var(--ff-u);font-size:0.68rem;font-weight:700;
          letter-spacing:0.14em;text-transform:uppercase;color:var(--teal);
          margin-bottom:0.5rem;
        }
        .ct-section-h2 {
          font-family:var(--ff-s);font-size:clamp(1.6rem,3vw,2.4rem);
          font-weight:800;color:var(--navy);line-height:1.15;letter-spacing:-0.02em;margin:0 0 0.6rem;
        }
        .ct-section-p { font-family:var(--ff-s);font-size:0.9rem;color:var(--slate);line-height:1.7;margin:0; }

        /* form */
        .ct-form { display:flex;flex-direction:column;gap:1.1rem; }
        .ct-form-row { display:grid;grid-template-columns:1fr 1fr;gap:1.1rem; }
        @media(max-width:600px){.ct-form-row{grid-template-columns:1fr;}}

        .ct-urgent-toggle {
          display:flex;align-items:center;gap:0.6rem;
          background:#fff7ed;border:1.5px solid #fed7aa;border-radius:0.75rem;
          padding:0.65rem 0.9rem;cursor:pointer;transition:all 0.2s;
          font-family:var(--ff-u);font-size:0.75rem;font-weight:600;color:#c2410c;
        }
        .ct-urgent-toggle svg { color:#f97316;flex-shrink:0; }
        .ct-urgent-on { background:#fff1e6;border-color:#f97316; }
        .ct-toggle-dot {
          margin-left:auto;width:34px;height:18px;background:#e2e8f0;border-radius:99px;
          position:relative;transition:background 0.2s;flex-shrink:0;
        }
        .ct-toggle-dot::after {
          content:'';position:absolute;top:2px;left:2px;
          width:14px;height:14px;background:#fff;border-radius:50%;
          transition:transform 0.2s;
        }
        .ct-toggle-dot-on { background:#f97316; }
        .ct-toggle-dot-on::after { transform:translateX(16px); }

        .ct-field { display:flex;flex-direction:column;gap:0.4rem; }
        .ct-label {
          font-family:var(--ff-u);font-size:0.72rem;font-weight:700;
          letter-spacing:0.04em;text-transform:uppercase;color:var(--navy);
        }
        .ct-req { color:var(--err); }
        .ct-opt { font-weight:400;color:var(--slate);text-transform:none;letter-spacing:0; }
        .ct-input {
          padding:0.72rem 0.9rem;
          background:var(--white);border:1.5px solid var(--border);border-radius:0.7rem;
          font-family:var(--ff-u);font-size:0.85rem;color:var(--navy);outline:none;
          transition:border-color 0.2s,box-shadow 0.2s;
          width:100%;box-sizing:border-box;
        }
        .ct-input:focus { border-color:var(--teal);box-shadow:0 0 0 3px #0d948818; }
        .ct-input-err  { border-color:var(--err); }
        .ct-input-err:focus { box-shadow:0 0 0 3px #ef444418; }
        .ct-select { appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 0.9rem center; }
        .ct-textarea { resize:vertical;min-height:130px; }
        .ct-char-count { font-family:var(--ff-u);font-size:0.62rem;color:var(--slate);text-align:right;margin-top:-0.2rem; }
        .ct-err-msg {
          display:flex;align-items:center;gap:0.3rem;
          font-family:var(--ff-u);font-size:0.65rem;color:var(--err);margin:0;
        }

        .ct-submit-btn {
          display:flex;align-items:center;justify-content:center;gap:0.5rem;
          font-family:var(--ff-u);font-size:0.9rem;font-weight:700;color:#fff;
          background:linear-gradient(135deg,var(--teal),#0ea5e9);
          border:none;padding:0.85rem;border-radius:0.85rem;cursor:pointer;
          box-shadow:0 6px 20px #0d948838;transition:transform 0.2s,box-shadow 0.2s,opacity 0.2s;
        }
        .ct-submit-btn:hover:not(:disabled) { transform:translateY(-2px);box-shadow:0 10px 30px #0d948858; }
        .ct-submit-btn:disabled { opacity:0.7;cursor:not-allowed; }
        .ct-spinner {
          width:16px;height:16px;border-radius:50%;
          border:2px solid #ffffff50;border-top-color:#fff;
          animation:spin 0.7s linear infinite;
        }
        @keyframes spin{to{transform:rotate(360deg);}}
        .ct-privacy-note {
          display:flex;align-items:center;justify-content:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.65rem;color:var(--slate);margin:0;
        }
        .ct-privacy-note svg { color:var(--teal); }

        /* success */
        .ct-success {
          display:flex;flex-direction:column;align-items:center;
          text-align:center;padding:3rem 1.5rem;gap:1.1rem;
        }
        .ct-success-icon { color:var(--teal);animation:popIn 0.5s ease; }
        @keyframes popIn{from{transform:scale(0.5);opacity:0;}to{transform:scale(1);opacity:1;}}
        .ct-success-title { font-family:var(--ff-s);font-size:1.7rem;font-weight:800;color:var(--navy);margin:0; }
        .ct-success-body  { font-family:var(--ff-u);font-size:0.88rem;color:var(--slate);line-height:1.65;max-width:400px;margin:0; }
        .ct-success-reset {
          font-family:var(--ff-u);font-size:0.82rem;font-weight:700;
          color:var(--teal);background:var(--teal-l);
          border:1.5px solid #99f6e4;border-radius:0.7rem;
          padding:0.6rem 1.4rem;cursor:pointer;transition:all 0.2s;
        }
        .ct-success-reset:hover { background:#d1fae5; }

        /* ── INFO PANEL ── */
        .ct-info-panel { display:flex;flex-direction:column;gap:1.1rem; }
        .ct-info-card {
          background:var(--white);border:1.5px solid var(--border);
          border-radius:1.25rem;padding:1.5rem;
        }
        .ct-info-dark {
          background:linear-gradient(135deg,var(--navy),var(--navy-m));
          border-color:#1e3a5f;
        }
        .ct-info-h3 {
          display:flex;align-items:center;gap:0.4rem;
          font-family:var(--ff-s);font-size:0.95rem;font-weight:800;color:var(--navy);margin:0 0 1rem;
        }
        .ct-info-h3-light { color:#fff; }
        .ct-info-icon { color:var(--teal); }

        /* direct contacts */
        .ct-direct-list { display:flex;flex-direction:column;gap:0.5rem; }
        .ct-direct-row {
          display:flex;align-items:center;gap:0.6rem;
          padding:0.55rem 0.5rem;border-radius:0.6rem;
          text-decoration:none;transition:background 0.18s;
        }
        .ct-direct-row:hover { background:#ffffff0f; }
        .ct-direct-icon {
          width:28px;height:28px;border-radius:0.5rem;flex-shrink:0;
          background:#5eead415;border:1px solid #5eead430;
          display:grid;place-items:center;color:#5eead4;
        }
        .ct-direct-label { font-family:var(--ff-u);font-size:0.6rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.07em;margin:0 0 0.1rem; }
        .ct-direct-val   { font-family:var(--ff-u);font-size:0.75rem;font-weight:600;color:#fff;margin:0; }

        /* hours */
        .ct-hours-list { display:flex;flex-direction:column;gap:0; }
        .ct-hours-row {
          display:flex;justify-content:space-between;align-items:center;
          padding:0.55rem 0;border-bottom:1px solid var(--border);
        }
        .ct-hours-row:last-child { border-bottom:none; }
        .ct-hours-hl { background:var(--teal-l);border-radius:0.5rem;padding:0.55rem 0.6rem;border:none;margin:0 -0.1rem; }
        .ct-hours-day  { font-family:var(--ff-u);font-size:0.75rem;font-weight:600;color:var(--navy); }
        .ct-hours-time { font-family:var(--ff-u);font-size:0.72rem;color:var(--slate); }
        .ct-hours-hl .ct-hours-day  { color:var(--teal-d); }
        .ct-hours-hl .ct-hours-time { color:var(--teal);font-weight:700; }

        /* response times */
        .ct-resp-row { margin-bottom:0.85rem; }
        .ct-resp-row:last-child { margin-bottom:0; }
        .ct-resp-top { display:flex;justify-content:space-between;margin-bottom:0.35rem; }
        .ct-resp-channel { font-family:var(--ff-u);font-size:0.72rem;font-weight:600;color:var(--navy); }
        .ct-resp-time    { font-family:var(--ff-u);font-size:0.68rem;font-weight:700;color:var(--teal); }
        .ct-resp-bar-bg {
          height:6px;background:var(--border);border-radius:99px;overflow:hidden;
        }
        .ct-resp-bar-fill {
          height:100%;width:var(--rw);border-radius:99px;
          background:linear-gradient(90deg,var(--teal),#0ea5e9);
          animation:barGrow 0.8s ease forwards;transform-origin:left;
        }
        @keyframes barGrow{from{transform:scaleX(0);}to{transform:scaleX(1);}}

        /* ── LOCATIONS ── */
        .ct-locations-section { background:var(--off);padding:5rem 1.5rem; }
        .ct-section-header { text-align:center;margin-bottom:2.5rem; }
        .ct-section-h2-dark { font-family:var(--ff-s);font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:800;color:var(--navy);letter-spacing:-0.02em;margin:0 0 0.5rem; }
        .ct-section-p-dark  { font-family:var(--ff-s);font-size:0.9rem;color:var(--slate);margin:0; }

        .ct-loc-tabs {
          display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;margin-bottom:1.75rem;
        }
        .ct-loc-tab {
          display:inline-flex;align-items:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.78rem;font-weight:600;color:var(--slate);
          padding:0.5rem 1.1rem;border-radius:99px;
          border:1.5px solid var(--border);background:var(--white);cursor:pointer;
          transition:all 0.2s;
        }
        .ct-loc-tab:hover { border-color:var(--teal);color:var(--teal-d);background:var(--teal-l); }
        .ct-loc-tab-active { background:var(--teal);color:#fff;border-color:var(--teal); }
        .ct-flagship-dot {
          width:7px;height:7px;background:#f59e0b;border-radius:50%;flex-shrink:0;
        }

        .ct-loc-card {
          display:grid;grid-template-columns:1fr 1fr;
          border-radius:1.5rem;overflow:hidden;border:1.5px solid var(--border);
          background:var(--white);
          animation:ctFadeUp 0.4s ease;
        }
        @media(max-width:768px){.ct-loc-card{grid-template-columns:1fr;}}

        .ct-loc-map-placeholder {
          background:linear-gradient(135deg,var(--navy),var(--navy-m));
          min-height:280px;display:flex;flex-direction:column;
          align-items:center;justify-content:center;gap:1rem;
          color:#5eead450;padding:2rem;text-align:center;
        }
        .ct-loc-map-placeholder svg { color:#5eead430; }
        .ct-loc-map-placeholder p  { font-family:var(--ff-s);font-size:1rem;color:#5eead4;margin:0; }
        .ct-flagship-badge {
          font-family:var(--ff-u);font-size:0.65rem;font-weight:700;
          background:#f59e0b20;color:#f59e0b;border:1px solid #f59e0b40;
          border-radius:99px;padding:0.22rem 0.7rem;
        }

        .ct-loc-info { padding:2rem; }
        .ct-loc-header-row { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;gap:0.5rem; }
        .ct-loc-name { font-family:var(--ff-s);font-size:1.2rem;font-weight:800;color:var(--navy);margin:0 0 0.2rem; }
        .ct-loc-city { font-family:var(--ff-u);font-size:0.72rem;font-weight:600;color:var(--teal);margin:0;text-transform:uppercase;letter-spacing:0.06em; }
        .ct-flagship-tag {
          font-family:var(--ff-u);font-size:0.65rem;font-weight:700;
          background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;
          border-radius:99px;padding:0.22rem 0.65rem;white-space:nowrap;
        }

        .ct-loc-details { display:flex;flex-direction:column;gap:0.6rem;margin-bottom:1.25rem; }
        .ct-loc-detail-row {
          display:flex;align-items:flex-start;gap:0.55rem;
          font-family:var(--ff-u);font-size:0.78rem;color:var(--slate);
        }
        .ct-loc-detail-icon { color:var(--teal);flex-shrink:0;margin-top:2px; }
        .ct-loc-phone { color:var(--teal);font-weight:700;text-decoration:none; }
        .ct-loc-phone:hover { text-decoration:underline; }

        .ct-loc-amenities { display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.5rem; }
        .ct-amenity {
          display:inline-flex;align-items:center;gap:0.3rem;
          font-family:var(--ff-u);font-size:0.65rem;font-weight:700;
          padding:0.25rem 0.65rem;border-radius:99px;
        }
        .ct-am-on  { background:var(--teal-l);color:var(--teal-d);border:1px solid #99f6e4; }
        .ct-am-off { background:#f1f5f9;color:#94a3b8;border:1px solid var(--border); }

        .ct-loc-actions { display:flex;gap:0.75rem;flex-wrap:wrap; }
        .ct-loc-book {
          display:inline-flex;align-items:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.8rem;font-weight:700;color:#fff;
          background:linear-gradient(135deg,var(--teal),#0ea5e9);
          padding:0.6rem 1.25rem;border-radius:0.7rem;text-decoration:none;
          box-shadow:0 4px 14px #0d948830;transition:transform 0.2s,box-shadow 0.2s;
        }
        .ct-loc-book:hover { transform:translateY(-2px);box-shadow:0 7px 20px #0d948848; }
        .ct-loc-dir {
          display:inline-flex;align-items:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.8rem;font-weight:600;color:var(--navy);
          background:var(--white);border:1.5px solid var(--border);
          padding:0.6rem 1.25rem;border-radius:0.7rem;text-decoration:none;
          transition:all 0.2s;
        }
        .ct-loc-dir:hover { border-color:var(--teal);color:var(--teal-d);background:var(--teal-l); }

        /* ── FAQ ── */
        .ct-faq-section {
          background:linear-gradient(160deg,var(--navy) 0%,var(--navy-m) 100%);
          padding:5rem 1.5rem;
        }
        .ct-eye-light  { color:#5eead4; }
        .ct-h2-light   { color:#fff; }
        .ct-p-light    { color:#94a3b8; }

        .ct-faq-list { max-width:780px;margin:0 auto 2.5rem;display:flex;flex-direction:column;gap:0.6rem; }

        .ct-faq-item {
          background:#ffffff0c;backdrop-filter:blur(8px);
          border:1.5px solid #ffffff15;border-radius:1rem;overflow:hidden;
          transition:border-color 0.2s;
        }
        .ct-faq-open { border-color:#5eead440; }
        .ct-faq-q {
          width:100%;display:flex;align-items:center;justify-content:space-between;gap:1rem;
          padding:1.1rem 1.4rem;background:none;border:none;cursor:pointer;text-align:left;
        }
        .ct-faq-q span {
          font-family:var(--ff-s);font-size:0.95rem;font-weight:700;color:#fff;line-height:1.35;
        }
        .ct-faq-open .ct-faq-q span { color:#5eead4; }
        .ct-faq-chevron { color:#94a3b8;flex-shrink:0;transition:transform 0.25s; }
        .ct-chev-open   { transform:rotate(180deg);color:#5eead4; }

        .ct-faq-a-wrap { max-height:0;overflow:hidden;transition:max-height 0.35s ease; }
        .ct-faq-a-open { max-height:300px; }
        .ct-faq-a {
          font-family:var(--ff-s);font-size:0.88rem;color:#94a3b8;
          line-height:1.7;padding:0 1.4rem 1.25rem;margin:0;
        }

        .ct-faq-footer {
          display:flex;align-items:center;justify-content:center;gap:1rem;
          flex-wrap:wrap;
        }
        .ct-faq-footer-text { font-family:var(--ff-u);font-size:0.88rem;color:#94a3b8;margin:0; }
        .ct-faq-footer-btn {
          display:inline-flex;align-items:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.82rem;font-weight:700;color:#fff;
          background:linear-gradient(135deg,var(--teal),#0ea5e9);
          padding:0.65rem 1.4rem;border-radius:0.75rem;text-decoration:none;
          box-shadow:0 4px 14px #0d948838;transition:transform 0.2s,box-shadow 0.2s;
        }
        .ct-faq-footer-btn:hover { transform:translateY(-2px);box-shadow:0 8px 22px #0d948858; }
      `}</style>
    </main>
  );
}
