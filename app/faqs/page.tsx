"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Calendar,
  Phone,
  MessageSquare,
  Shield,
  Clock,
  CreditCard,
  Stethoscope,
  Heart,
  Users,
  Ambulance,
  Globe,
  FileText,
  Star,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Mail,
  Baby,
  Wifi,
  Lock,
} from "lucide-react";

/* ─── Data ────────────────────────────────────────── */

const categories = [
  { id: "all", label: "All Questions", icon: HelpCircle, count: 36 },
  { id: "appointments", label: "Appointments", icon: Calendar, count: 8 },
  { id: "insurance", label: "Insurance & Billing", icon: CreditCard, count: 6 },
  { id: "services", label: "Services & Care", icon: Stethoscope, count: 7 },
  { id: "emergency", label: "Emergency", icon: Ambulance, count: 4 },
  { id: "records", label: "Medical Records", icon: FileText, count: 5 },
  { id: "telehealth", label: "Telehealth", icon: Wifi, count: 4 },
  { id: "general", label: "General", icon: Globe, count: 4 },
];

const faqs = [
  /* ── APPOINTMENTS ── */
  {
    id: "a1",
    cat: "appointments",
    q: "How do I book an appointment?",
    a: "You can book in three ways: online via our Book an Appointment page (fastest), by calling +1 800 MED CARE, or by walking into any of our 12 clinic locations. Online bookings are confirmed within 30 minutes during business hours.",
    popular: true,
  },
  {
    id: "a2",
    cat: "appointments",
    q: "How quickly can I get a same-day appointment?",
    a: "Same-day slots are typically available before 10am at most locations. Our care navigators can check live availability across all 12 clinics in real time. Call or use our online portal to check current availability.",
    popular: true,
  },
  {
    id: "a3",
    cat: "appointments",
    q: "Can I choose which doctor I see?",
    a: "Yes. You can request a specific doctor when booking online or by phone. If your preferred doctor is unavailable, we can suggest colleagues in the same department with the earliest availability. Continuity of care is a priority for us.",
    popular: false,
  },
  {
    id: "a4",
    cat: "appointments",
    q: "What happens if I need to cancel or reschedule?",
    a: "You can cancel or reschedule up to 2 hours before your appointment with no charge. Cancellations within 2 hours may incur a nominal late-cancellation fee depending on your plan. Use the Patient Portal, call us, or email appointments@Jiddena Medical Clinic.com.",
    popular: false,
  },
  {
    id: "a5",
    cat: "appointments",
    q: "How long is a typical consultation?",
    a: "Standard general medicine consultations are 15–20 minutes. Specialist first appointments are typically 30–45 minutes. Procedures and follow-ups vary. When booking, the system will indicate the expected duration for your appointment type.",
    popular: false,
  },
  {
    id: "a6",
    cat: "appointments",
    q: "Do I need a referral to see a specialist?",
    a: "For most specialities at Jiddena Medical Clinic you can book directly without a GP referral. However, some procedures require a clinical referral for insurance purposes. If unsure, our care navigators can advise you when booking.",
    popular: true,
  },
  {
    id: "a7",
    cat: "appointments",
    q: "Can I book appointments for my children or elderly parents?",
    a: "Yes. You can manage appointments for family members through a linked family account on the Patient Portal. Guardians and carers may book and attend appointments on behalf of patients with appropriate authorisation.",
    popular: false,
  },
  {
    id: "a8",
    cat: "appointments",
    q: "What should I bring to my first appointment?",
    a: "Please bring a valid ID, your insurance card or membership number, a list of any current medications, and any previous medical records or test results relevant to your visit. Arriving 10 minutes early helps with registration.",
    popular: false,
  },

  /* ── INSURANCE & BILLING ── */
  {
    id: "i1",
    cat: "insurance",
    q: "Which insurance providers do you accept?",
    a: "We accept NHIF, AAR Healthcare, Jubilee Insurance, Britam Health, UAP Old Mutual, Madison Insurance, CIC Insurance, and most major corporate schemes. We also accept self-pay and offer transparent cash pricing. Contact our billing team if your insurer isn't listed.",
    popular: true,
  },
  {
    id: "i2",
    cat: "insurance",
    q: "How do I know if my treatment is covered?",
    a: "Contact your insurer directly before your appointment to confirm coverage for the specific service or procedure. Our billing team can also help verify your benefits. We recommend pre-authorisation for elective procedures and specialist referrals.",
    popular: false,
  },
  {
    id: "i3",
    cat: "insurance",
    q: "What payment methods do you accept for self-pay?",
    a: "We accept cash, Visa, Mastercard, M-Pesa, and bank transfers. Payment plans are available for larger treatment costs — speak to our billing team to arrange a structured schedule.",
    popular: false,
  },
  {
    id: "i4",
    cat: "insurance",
    q: "Can I get an itemised bill for my insurance claim?",
    a: "Yes. Itemised invoices and treatment summaries are available through the Patient Portal or by contacting billing@Jiddena Medical Clinic.com. We aim to generate and send billing documentation within 24 hours of your visit.",
    popular: false,
  },
  {
    id: "i5",
    cat: "insurance",
    q: "What is your pricing for uninsured patients?",
    a: "We publish transparent self-pay pricing. A standard GP consultation starts from $40. Specialist consultations vary by department. Lab tests and imaging are priced individually. Download our full fee schedule from the Patient Portal or ask at reception.",
    popular: false,
  },
  {
    id: "i6",
    cat: "insurance",
    q: "Do you offer corporate or family health plans?",
    a: "Yes. We offer corporate wellness packages for businesses of all sizes, as well as family health plans covering unlimited GP visits, discounted specialist access, and annual health screenings. Contact our partnerships team for a custom quote.",
    popular: false,
  },

  /* ── SERVICES & CARE ── */
  {
    id: "s1",
    cat: "services",
    q: "What medical departments do you have?",
    a: "We operate 12 clinical departments: Cardiology, Neurology, Pediatrics, Orthopedics, Ophthalmology, General Medicine, Emergency Care, Diagnostics & Lab, Preventive Health, Family Care, Dermatology, and Mental Wellness. View full details on our Services page.",
    popular: true,
  },
  {
    id: "s2",
    cat: "services",
    q: "Do you offer mental health services?",
    a: "Yes. Our Mental Wellness department provides psychiatry, psychology, CBT, DBT, group therapy, and crisis support. All sessions are strictly confidential. You can book directly without a referral. Same-week appointments are usually available.",
    popular: true,
  },
  {
    id: "s3",
    cat: "services",
    q: "What preventive health programmes do you offer?",
    a: "We offer Executive Health Checks, full-body screening packages, nutritional assessments, health coaching, smoking cessation programmes, and cardiovascular risk profiling. Preventive programmes can be booked individually or as annual packages.",
    popular: false,
  },
  {
    id: "s4",
    cat: "services",
    q: "Do you have a pharmacy on-site?",
    a: "Yes. Our Main Medical Centre and four branch clinics have fully stocked on-site pharmacies. Prescriptions issued by our doctors can be filled immediately after your visit. We also offer home delivery for regular repeat prescriptions.",
    popular: false,
  },
  {
    id: "s5",
    cat: "services",
    q: "Can I get a second opinion on a diagnosis?",
    a: "Absolutely. We actively encourage patients to seek second opinions and can facilitate this within our own specialist team or through external referrals. Simply book a Second Opinion consultation and bring all relevant previous reports and scans.",
    popular: false,
  },
  {
    id: "s6",
    cat: "services",
    q: "Do you offer home visit services?",
    a: "Home visits are available for registered family care patients who are elderly, have mobility limitations, or require post-discharge check-ups. Availability depends on location. Contact your assigned family care coordinator to arrange.",
    popular: false,
  },
  {
    id: "s7",
    cat: "services",
    q: "Are your diagnostic labs accredited?",
    a: "Yes. Our diagnostic laboratory is ISO 15189 accredited and all imaging equipment meets international safety and accuracy standards. We partner with international reference labs for specialised genetic and molecular testing.",
    popular: false,
  },

  /* ── EMERGENCY ── */
  {
    id: "e1",
    cat: "emergency",
    q: "Is your emergency department open 24 hours?",
    a: "Yes. Our Main Medical Centre Emergency Department operates 24 hours a day, 7 days a week, 365 days a year. It is staffed by emergency physicians, trauma surgeons, and critical care nurses at all times.",
    popular: true,
  },
  {
    id: "e2",
    cat: "emergency",
    q: "When should I go to the Emergency Department vs. booking an appointment?",
    a: "Go to Emergency immediately for: chest pain, stroke symptoms, severe breathing difficulties, heavy bleeding, loss of consciousness, serious accidents, or any condition you believe is life-threatening. For non-urgent issues, booking an appointment is faster and more efficient.",
    popular: true,
  },
  {
    id: "e3",
    cat: "emergency",
    q: "Do you have an ambulance service?",
    a: "We work with licensed emergency medical services. Call 911 for a life-threatening emergency. For non-emergency medical transport, contact our main line and our team can coordinate appropriate transport to the clinic.",
    popular: false,
  },
  {
    id: "e4",
    cat: "emergency",
    q: "What is your average emergency triage time?",
    a: "Our triage nurses assess every arriving patient within 8 minutes of arrival. Critically ill patients are seen immediately. Non-critical emergency patients are seen in order of clinical priority. Our average door-to-doctor time is under 25 minutes.",
    popular: false,
  },

  /* ── MEDICAL RECORDS ── */
  {
    id: "r1",
    cat: "records",
    q: "How do I access my medical records?",
    a: "All patients can access their records, test results, prescriptions, and visit summaries through the secure Patient Portal at portal.Jiddena Medical Clinic.com. Records are typically updated within 24 hours of your appointment or test.",
    popular: true,
  },
  {
    id: "r2",
    cat: "records",
    q: "Can I request my records to be sent to another provider?",
    a: "Yes. Submit a Medical Records Transfer Request through the Patient Portal or at any clinic reception. For security, we require written consent and a valid ID. Records are typically transferred within 3–5 business days.",
    popular: false,
  },
  {
    id: "r3",
    cat: "records",
    q: "How long do you retain medical records?",
    a: "We retain adult patient records for a minimum of 10 years. Paediatric records are retained until the patient turns 25 or for 10 years, whichever is longer. You can request deletion of non-essential data in line with applicable privacy laws.",
    popular: false,
  },
  {
    id: "r4",
    cat: "records",
    q: "Is my health information kept confidential?",
    a: "Absolutely. All patient data is protected under HIPAA and applicable local privacy legislation. Your information is never shared with third parties without your explicit written consent, except where required by law.",
    popular: false,
  },
  {
    id: "r5",
    cat: "records",
    q: "Can I correct an error in my medical records?",
    a: "Yes. Contact our Medical Records team via the Patient Portal or in person. You have the right to request amendments to factually incorrect information. A clinician will review and respond within 15 business days.",
    popular: false,
  },

  /* ── TELEHEALTH ── */
  {
    id: "t1",
    cat: "telehealth",
    q: "What is telehealth and how does it work?",
    a: "Telehealth allows you to consult with a doctor via secure video call from any device with a camera and internet connection. Book a Telehealth appointment through the portal, receive a link by email, and connect at your scheduled time. No special software is needed.",
    popular: true,
  },
  {
    id: "t2",
    cat: "telehealth",
    q: "Which services are available via telehealth?",
    a: "Most non-emergency consultations are available via telehealth, including general medicine, mental health, follow-up appointments, medication reviews, and many specialist consultations. Physical examinations, procedures, and emergency care cannot be done remotely.",
    popular: false,
  },
  {
    id: "t3",
    cat: "telehealth",
    q: "Is telehealth covered by insurance?",
    a: "Most major insurers we work with now cover telehealth consultations at the same rate as in-person visits. Check with your insurer to confirm your specific plan. Self-pay telehealth rates are typically lower than in-person appointments.",
    popular: false,
  },
  {
    id: "t4",
    cat: "telehealth",
    q: "Is the telehealth platform secure and private?",
    a: "Yes. Our telehealth platform is end-to-end encrypted and fully HIPAA-compliant. Sessions are never recorded without explicit consent. Your connection is as private as any in-person consultation.",
    popular: false,
  },

  /* ── GENERAL ── */
  {
    id: "g1",
    cat: "general",
    q: "Where are your clinics located?",
    a: "We have 12 clinic locations across the city including our Main Medical Centre (Downtown), Northside Clinic, Eastgate Health Hub, Westpark Family Clinic, and 8 additional branches. Use the location finder on our Contact page for addresses and directions.",
    popular: true,
  },
  {
    id: "g2",
    cat: "general",
    q: "Do you treat international patients?",
    a: "Yes. We welcome international patients and offer dedicated medical tourism services including airport transfers, translation assistance, accommodation recommendations, and complete medical concierge support.",
    popular: false,
  },
  {
    id: "g3",
    cat: "general",
    q: "Are your facilities accessible for people with disabilities?",
    a: "All Jiddena Medical Clinic facilities are fully wheelchair accessible with dedicated parking, ramps, lifts, and accessible restrooms. We offer sign language interpretation by appointment and hearing loops at all reception areas.",
    popular: false,
  },
  {
    id: "g4",
    cat: "general",
    q: "How do I provide feedback about my experience?",
    a: "We welcome all feedback. You can complete a satisfaction survey via the Patient Portal, speak to our Patient Liaison team in clinic, email feedback@Jiddena Medical Clinic.com, or leave a review on Google or Healthgrades. All feedback is reviewed by clinical leadership.",
    popular: false,
  },
];

const contactOptions = [
  {
    icon: Phone,
    label: "Call Us",
    sub: "+1 800 MED CARE",
    href: "tel:+18006332273",
    color: "#0d9488",
  },
  {
    icon: MessageSquare,
    label: "Live Chat",
    sub: "Available right now",
    href: "#chat",
    color: "#8b5cf6",
  },
  {
    icon: Mail,
    label: "Email",
    sub: "hello@Jiddena Medical Clinic.com",
    href: "mailto:hello@Jiddena Medical Clinic.com",
    color: "#0ea5e9",
  },
  {
    icon: Calendar,
    label: "Book Online",
    sub: "Same-day slots available",
    href: "/appointment",
    color: "#f59e0b",
  },
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
export default function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [showPopular, setShowPopular] = useState(false);

  const heroSec = useInView(0.1);
  const contentSec = useInView(0.08);
  const ctaSec = useInView(0.08);

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "all" || f.cat === activeCategory;
    const matchPopular = !showPopular || f.popular;
    const matchSearch =
      !search ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchPopular && matchSearch;
  });

  const grouped = categories
    .filter((c) => c.id !== "all")
    .reduce<Record<string, typeof faqs>>((acc, c) => {
      const items = filtered.filter((f) => f.cat === c.id);
      if (items.length) acc[c.id] = items;
      return acc;
    }, {});

  const popularFaqs = faqs.filter((f) => f.popular).slice(0, 6);

  return (
    <main className="fq-root">
      {/* ══ HERO ══ */}
      <section className="fq-hero">
        <div className="fq-mesh" />
        <div className="fq-blob fb1" />
        <div className="fq-blob fb2" />

        <div
          ref={heroSec.ref}
          className={`fq-hero-inner ${heroSec.vis ? "fq-reveal" : ""}`}
        >
          <span className="fq-eyebrow">
            <span className="fq-dash" />
            Help Centre
            <span className="fq-dash" />
          </span>
          <h1 className="fq-h1">
            Frequently Asked
            <br />
            <em>Questions</em>
          </h1>
          <p className="fq-sub">
            Quick answers to the questions our patients ask most — from booking
            your first appointment to understanding your medical records.
          </p>

          {/* Live search */}
          <div className="fq-search-wrap">
            <Search size={18} className="fq-search-icon" />
            <input
              type="text"
              placeholder="Search questions, topics or keywords…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveCategory("all");
                setShowPopular(false);
              }}
              className="fq-search-input"
            />
            {search && (
              <button className="fq-search-clear" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          {/* quick stats */}
          <div className="fq-hero-chips">
            {[
              { icon: HelpCircle, label: "36 Answered Questions" },
              { icon: Star, label: "4.9 Patient Satisfaction" },
              { icon: Clock, label: "< 2hr Email Response" },
              { icon: Shield, label: "HIPAA Compliant" },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="fq-chip"
                  style={{ "--fi": `${i * 0.08}s` } as React.CSSProperties}
                >
                  <Icon size={13} /> {c.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="fq-cut" />
      </section>

      {/* ══ POPULAR QUESTIONS STRIP ══ */}
      {!search && (
        <section className="fq-popular-section">
          <div className="fq-container">
            <div className="fq-popular-header">
              <div>
                <p className="fq-pop-label">
                  <Star size={13} /> Most Asked Questions
                </p>
              </div>
              <button
                className={`fq-pop-toggle ${showPopular ? "fq-pop-toggle-on" : ""}`}
                onClick={() => {
                  setShowPopular(!showPopular);
                  setActiveCategory("all");
                }}
              >
                {showPopular ? "Show all questions" : "Show popular only"}
              </button>
            </div>
            <div className="fq-popular-grid">
              {popularFaqs.map((f, i) => {
                const cat = categories.find((c) => c.id === f.cat);
                const Icon = cat?.icon ?? HelpCircle;
                return (
                  <button
                    key={f.id}
                    className="fq-pop-card"
                    style={{ "--pi": `${i * 0.07}s` } as React.CSSProperties}
                    onClick={() => {
                      setOpenId(f.id);
                      setActiveCategory(f.cat);
                      setSearch("");
                      setShowPopular(false);
                    }}
                  >
                    <div className="fqp-icon">
                      <Icon size={14} strokeWidth={1.8} />
                    </div>
                    <p className="fqp-q">{f.q}</p>
                    <ArrowRight size={13} className="fqp-arrow" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ MAIN CONTENT ══ */}
      <section className="fq-body">
        <div
          ref={contentSec.ref}
          className={`fq-container fq-layout ${contentSec.vis ? "fq-reveal" : ""}`}
        >
          {/* ── SIDEBAR ── */}
          <aside className="fq-sidebar">
            <p className="fq-sidebar-label">Browse by Topic</p>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`fq-cat-btn ${activeCategory === cat.id && !search && !showPopular ? "fq-cat-active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSearch("");
                    setShowPopular(false);
                    setOpenId(null);
                  }}
                >
                  <Icon size={15} strokeWidth={1.8} />
                  <span>{cat.label}</span>
                  <span className="fq-cat-count">{cat.count}</span>
                </button>
              );
            })}

            {/* Contact sidebar card */}
            <div className="fq-sb-contact">
              <div className="fq-sb-contact-icon">
                <MessageSquare size={20} strokeWidth={1.5} />
              </div>
              <p className="fq-sb-contact-title">Still have questions?</p>
              <p className="fq-sb-contact-sub">
                Our team replies within 2 hours.
              </p>
              <Link href="/contact" className="fq-sb-contact-btn">
                Contact Us <ArrowRight size={13} />
              </Link>
            </div>
          </aside>

          {/* ── FAQ LIST ── */}
          <div className="fq-list-col">
            {/* result header */}
            <div className="fq-list-header">
              <p className="fq-list-title">
                {search
                  ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`
                  : showPopular
                    ? "Most Asked Questions"
                    : activeCategory === "all"
                      ? "All Questions"
                      : categories.find((c) => c.id === activeCategory)?.label}
              </p>
              {(search || showPopular) && (
                <button
                  className="fq-list-clear"
                  onClick={() => {
                    setSearch("");
                    setShowPopular(false);
                    setActiveCategory("all");
                  }}
                >
                  Clear filter
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="fq-no-results">
                <HelpCircle size={48} strokeWidth={1} />
                <p>No questions match your search.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("all");
                  }}
                >
                  Browse all questions
                </button>
              </div>
            ) : activeCategory === "all" && !search && !showPopular ? (
              /* grouped by category */
              Object.entries(grouped).map(([catId, items]) => {
                const cat = categories.find((c) => c.id === catId);
                const Icon = cat?.icon ?? HelpCircle;
                return (
                  <div key={catId} className="fq-group">
                    <div className="fq-group-header">
                      <div className="fq-group-icon">
                        <Icon size={16} strokeWidth={1.8} />
                      </div>
                      <h2 className="fq-group-title">{cat?.label}</h2>
                      <span className="fq-group-count">{items.length}</span>
                    </div>
                    <div className="fq-accordion">
                      {items.map((f) => (
                        <FaqItem
                          key={f.id}
                          faq={f}
                          isOpen={openId === f.id}
                          onToggle={() =>
                            setOpenId(openId === f.id ? null : f.id)
                          }
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              /* flat list */
              <div className="fq-accordion">
                {filtered.map((f) => (
                  <FaqItem
                    key={f.id}
                    faq={f}
                    isOpen={openId === f.id}
                    onToggle={() => setOpenId(openId === f.id ? null : f.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ CONTACT OPTIONS ══ */}
      <section className="fq-contact-section">
        <div
          ref={ctaSec.ref}
          className={`fq-container ${ctaSec.vis ? "fq-reveal" : ""}`}
        >
          <div className="fq-contact-header">
            <span className="fq-contact-eye fq-eye-light">
              Can't find your answer?
            </span>
            <h2 className="fq-contact-h2">We're Always Here to Help</h2>
            <p className="fq-contact-sub">
              Choose the fastest way to reach our team.
            </p>
          </div>
          <div className="fq-contact-grid">
            {contactOptions.map((o, i) => {
              const Icon = o.icon;
              return (
                <a
                  key={o.label}
                  href={o.href}
                  className="fq-contact-card"
                  style={
                    {
                      "--cc": o.color,
                      "--cdi": `${i * 0.09}s`,
                    } as React.CSSProperties
                  }
                >
                  <div className="fqc-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <p className="fqc-label">{o.label}</p>
                  <p className="fqc-sub">{o.sub}</p>
                  <span className="fqc-arrow">
                    <ArrowRight size={14} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ STYLES ══ */}
      <style>{`
        .fq-root {
          --teal:   #0d9488;
          --teal-d: #0f766e;
          --teal-l: #f0fdfa;
          --navy:   #0f2b4b;
          --navy-m: #1e4a7a;
          --slate:  #64748b;
          --border: #e2e8f0;
          --white:  #ffffff;
          --off:    #f8fafc;
          --ff-s:   'Georgia','Charter',serif;
          --ff-u:   'Trebuchet MS','Tahoma',sans-serif;
          overflow-x: hidden;
        }
        .fq-container { max-width:1200px; margin:0 auto; }
        .fq-reveal    { animation: fqUp 0.75s ease forwards; }
        @keyframes fqUp { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:none;} }

        /* ── HERO ── */
        .fq-hero {
          position:relative;overflow:hidden;
          background:linear-gradient(145deg,#0f2b4b 0%,#1e4a7a 55%,#0a4a5c 100%);
          padding:6rem 1.5rem 9rem;text-align:center;
        }
        .fq-mesh {
          position:absolute;inset:0;
          background-image:radial-gradient(circle at 18% 28%,#5eead415 0%,transparent 45%),
                           radial-gradient(circle at 82% 72%,#0ea5e912 0%,transparent 45%);
        }
        .fq-blob { position:absolute;border-radius:50%;filter:blur(100px);opacity:0.22;pointer-events:none; }
        .fb1 { width:460px;height:460px;background:radial-gradient(#5eead4,transparent);top:-160px;right:-80px; }
        .fb2 { width:320px;height:320px;background:radial-gradient(#7dd3fc,transparent);bottom:-60px;left:-50px; }

        .fq-hero-inner {
          position:relative;z-index:2;max-width:740px;margin:0 auto;
          opacity:0;transform:translateY(28px);
        }
        .fq-eyebrow {
          display:inline-flex;align-items:center;gap:0.6rem;
          font-family:var(--ff-u);font-size:0.7rem;font-weight:700;
          letter-spacing:0.14em;text-transform:uppercase;color:#5eead4;margin-bottom:1rem;
        }
        .fq-dash { display:inline-block;width:26px;height:2px;background:#5eead4;border-radius:2px; }
        .fq-h1 {
          font-family:var(--ff-s);font-size:clamp(2.5rem,6vw,4.2rem);
          font-weight:900;color:#fff;line-height:1.1;letter-spacing:-0.03em;margin:0 0 1rem;
        }
        .fq-h1 em { color:#5eead4;font-style:italic; }
        .fq-sub {
          font-family:var(--ff-s);font-size:1rem;color:#94a3b8;
          max-width:580px;margin:0 auto 2.5rem;line-height:1.75;
        }

        .fq-search-wrap {
          position:relative;max-width:540px;margin:0 auto 2rem;
          display:flex;align-items:center;
        }
        .fq-search-icon { position:absolute;left:1rem;color:#94a3b8;pointer-events:none; }
        .fq-search-input {
          width:100%;padding:0.88rem 2.5rem 0.88rem 3rem;
          background:#ffffff12;backdrop-filter:blur(12px);
          border:1.5px solid #ffffff20;border-radius:0.9rem;
          font-family:var(--ff-u);font-size:0.88rem;color:#fff;outline:none;
          transition:border-color 0.2s,background 0.2s;
        }
        .fq-search-input::placeholder { color:#64748b; }
        .fq-search-input:focus { border-color:#5eead4;background:#ffffff18; }
        .fq-search-clear {
          position:absolute;right:1rem;color:#94a3b8;background:none;border:none;
          cursor:pointer;font-size:0.8rem;transition:color 0.2s;
        }
        .fq-search-clear:hover { color:#fff; }

        .fq-hero-chips {
          display:flex;flex-wrap:wrap;gap:0.6rem;justify-content:center;
        }
        .fq-chip {
          display:inline-flex;align-items:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.68rem;font-weight:600;
          color:#94a3b8;background:#ffffff0e;border:1px solid #ffffff18;
          border-radius:99px;padding:0.35rem 0.85rem;
          animation:fqUp 0.5s ease var(--fi) both;
        }
        .fq-chip svg { color:#5eead4; }
        .fq-cut { position:absolute;bottom:-1px;left:0;right:0;height:70px;background:var(--off);clip-path:polygon(0 100%,100% 100%,100% 0); }

        /* ── POPULAR SECTION ── */
        .fq-popular-section { background:var(--off);padding:2.5rem 1.5rem 0; }
        .fq-popular-header {
          display:flex;align-items:center;justify-content:space-between;
          margin-bottom:1.25rem;flex-wrap:wrap;gap:0.75rem;
        }
        .fq-pop-label {
          display:inline-flex;align-items:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.72rem;font-weight:700;
          letter-spacing:0.08em;text-transform:uppercase;color:var(--slate);margin:0;
        }
        .fq-pop-label svg { color:#f59e0b; }
        .fq-pop-toggle {
          font-family:var(--ff-u);font-size:0.74rem;font-weight:700;
          color:var(--teal);background:var(--teal-l);
          border:1.5px solid #99f6e4;border-radius:99px;
          padding:0.35rem 0.9rem;cursor:pointer;transition:all 0.2s;
        }
        .fq-pop-toggle:hover { background:#ccfbf1; }
        .fq-pop-toggle-on { background:var(--teal);color:#fff;border-color:var(--teal); }

        .fq-popular-grid {
          display:grid;grid-template-columns:repeat(3,1fr);gap:0.85rem;
        }
        @media(max-width:900px){.fq-popular-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:540px){.fq-popular-grid{grid-template-columns:1fr;}}

        .fq-pop-card {
          background:var(--white);border:1.5px solid var(--border);
          border-radius:1rem;padding:1rem 1rem 1rem 1rem;
          display:flex;align-items:center;gap:0.75rem;
          cursor:pointer;text-align:left;
          animation:fqUp 0.5s ease var(--pi) both;
          transition:all 0.2s;
        }
        .fq-pop-card:hover { border-color:var(--teal);background:var(--teal-l);box-shadow:0 6px 22px #0d948814; }
        .fq-pop-card:hover .fqp-icon { background:var(--teal);color:#fff;border-color:var(--teal); }
        .fq-pop-card:hover .fqp-arrow { color:var(--teal);transform:translateX(3px); }
        .fqp-icon {
          width:34px;height:34px;border-radius:0.6rem;flex-shrink:0;
          background:var(--teal-l);border:1.5px solid #99f6e4;
          display:grid;place-items:center;color:var(--teal);
          transition:all 0.2s;
        }
        .fqp-q {
          font-family:var(--ff-u);font-size:0.76rem;font-weight:600;
          color:var(--navy);line-height:1.4;margin:0;flex:1;
        }
        .fqp-arrow { color:var(--border);flex-shrink:0;transition:all 0.2s; }

        /* ── BODY LAYOUT ── */
        .fq-body { background:var(--off);padding:2.5rem 1.5rem 5rem; }
        .fq-layout {
          display:grid;grid-template-columns:260px 1fr;gap:2.5rem;align-items:start;
        }
        @media(max-width:900px){.fq-layout{grid-template-columns:1fr;}}

        /* ── SIDEBAR ── */
        .fq-sidebar {
          position:sticky;top:110px;
          display:flex;flex-direction:column;gap:0.3rem;
        }
        @media(max-width:900px){.fq-sidebar{position:static;}}
        .fq-sidebar-label {
          font-family:var(--ff-u);font-size:0.65rem;font-weight:700;
          letter-spacing:0.1em;text-transform:uppercase;color:var(--slate);
          margin:0 0 0.6rem 0.5rem;
        }
        .fq-cat-btn {
          display:flex;align-items:center;gap:0.6rem;
          font-family:var(--ff-u);font-size:0.78rem;font-weight:600;color:var(--slate);
          background:none;border:none;padding:0.6rem 0.85rem;border-radius:0.65rem;
          cursor:pointer;transition:all 0.18s;text-align:left;
        }
        .fq-cat-btn svg { color:var(--teal);flex-shrink:0; }
        .fq-cat-btn:hover { background:var(--white);color:var(--navy); }
        .fq-cat-active  { background:var(--white);color:var(--teal-d);font-weight:700;box-shadow:0 2px 10px #0000000a; }
        .fq-cat-count {
          margin-left:auto;font-family:var(--ff-u);font-size:0.62rem;font-weight:700;
          color:var(--slate);background:var(--border);border-radius:99px;
          padding:0.1rem 0.45rem;
        }
        .fq-cat-active .fq-cat-count { background:var(--teal-l);color:var(--teal-d); }

        /* sidebar contact card */
        .fq-sb-contact {
          background:linear-gradient(135deg,var(--navy),var(--navy-m));
          border-radius:1.1rem;padding:1.4rem;margin-top:1.25rem;text-align:center;
        }
        .fq-sb-contact-icon {
          width:40px;height:40px;border-radius:0.7rem;
          background:#5eead415;border:1px solid #5eead430;
          display:grid;place-items:center;color:#5eead4;margin:0 auto 0.7rem;
        }
        .fq-sb-contact-title { font-family:var(--ff-s);font-size:0.9rem;font-weight:800;color:#fff;margin:0 0 0.3rem; }
        .fq-sb-contact-sub   { font-family:var(--ff-u);font-size:0.7rem;color:#94a3b8;margin:0 0 1rem; }
        .fq-sb-contact-btn {
          display:inline-flex;align-items:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.78rem;font-weight:700;color:#fff;
          background:linear-gradient(135deg,var(--teal),#0ea5e9);
          padding:0.55rem 1.1rem;border-radius:0.65rem;text-decoration:none;
          box-shadow:0 4px 14px #0d948830;transition:transform 0.2s;
        }
        .fq-sb-contact-btn:hover { transform:translateY(-1px); }

        /* ── LIST COLUMN ── */
        .fq-list-header {
          display:flex;align-items:center;justify-content:space-between;
          margin-bottom:1.5rem;flex-wrap:wrap;gap:0.5rem;
        }
        .fq-list-title {
          font-family:var(--ff-s);font-size:1.05rem;font-weight:700;color:var(--navy);margin:0;
        }
        .fq-list-clear {
          font-family:var(--ff-u);font-size:0.72rem;font-weight:600;
          color:var(--teal);background:none;border:none;cursor:pointer;text-decoration:underline;
        }

        /* no results */
        .fq-no-results {
          display:flex;flex-direction:column;align-items:center;gap:1rem;
          padding:4rem 2rem;text-align:center;
          background:var(--white);border-radius:1.25rem;border:1.5px solid var(--border);
        }
        .fq-no-results svg { color:#cbd5e1; }
        .fq-no-results p { font-family:var(--ff-s);font-size:0.95rem;color:var(--slate);margin:0; }
        .fq-no-results button {
          font-family:var(--ff-u);font-size:0.8rem;font-weight:700;
          color:var(--teal);background:var(--teal-l);border:1.5px solid #99f6e4;
          padding:0.5rem 1.2rem;border-radius:99px;cursor:pointer;
        }

        /* ── GROUPS ── */
        .fq-group { margin-bottom:2.5rem; }
        .fq-group-header {
          display:flex;align-items:center;gap:0.65rem;margin-bottom:0.85rem;
        }
        .fq-group-icon {
          width:36px;height:36px;border-radius:0.6rem;flex-shrink:0;
          background:var(--teal-l);border:1.5px solid #99f6e4;
          display:grid;place-items:center;color:var(--teal);
        }
        .fq-group-title {
          font-family:var(--ff-s);font-size:1.05rem;font-weight:800;color:var(--navy);margin:0;
        }
        .fq-group-count {
          font-family:var(--ff-u);font-size:0.65rem;font-weight:700;
          background:var(--border);color:var(--slate);border-radius:99px;
          padding:0.12rem 0.5rem;
        }

        /* ── ACCORDION ── */
        .fq-accordion { display:flex;flex-direction:column;gap:0.5rem; }
      `}</style>
    </main>
  );
}

/* ─── FAQ Item Component ─────────────────────────── */
function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const cat = [
    { id: "appointments", color: "#0d9488" },
    { id: "insurance", color: "#0ea5e9" },
    { id: "services", color: "#8b5cf6" },
    { id: "emergency", color: "#ef4444" },
    { id: "records", color: "#f59e0b" },
    { id: "telehealth", color: "#10b981" },
    { id: "general", color: "#6366f1" },
  ].find((c) => c.id === faq.cat);

  const color = cat?.color ?? "#0d9488";

  return (
    <div className="fqi-wrap" style={{ "--fc": color } as React.CSSProperties}>
      <button
        className={`fqi-q ${isOpen ? "fqi-q-open" : ""}`}
        onClick={onToggle}
      >
        <div className="fqi-left">
          {faq.popular && <span className="fqi-popular">★</span>}
          <span className="fqi-q-text">{faq.q}</span>
        </div>
        <ChevronDown
          size={17}
          className={`fqi-chev ${isOpen ? "fqi-chev-open" : ""}`}
        />
      </button>
      <div className={`fqi-a-wrap ${isOpen ? "fqi-a-open" : ""}`}>
        <div className="fqi-a-inner">
          <CheckCircle size={15} className="fqi-check" />
          <p className="fqi-a">{faq.a}</p>
        </div>
        <div className="fqi-footer">
          <span>Was this helpful?</span>
          <button className="fqi-helpful">👍 Yes</button>
          <button className="fqi-helpful">👎 No</button>
        </div>
      </div>

      <style>{`
        .fqi-wrap {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .fqi-wrap:hover { border-color: color-mix(in srgb, var(--fc) 40%, #e2e8f0); }

        .fqi-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.1rem 1.35rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.18s;
        }
        .fqi-q:hover { background: #f8fafc; }
        .fqi-q-open  { background: color-mix(in srgb, var(--fc) 5%, white); }

        .fqi-left {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          flex: 1;
        }
        .fqi-popular {
          color: #f59e0b;
          font-size: 0.75rem;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .fqi-q-text {
          font-family: 'Georgia','Charter',serif;
          font-size: 0.92rem;
          font-weight: 700;
          color: #0f2b4b;
          line-height: 1.4;
        }
        .fqi-q-open .fqi-q-text { color: var(--fc); }

        .fqi-chev {
          color: #94a3b8;
          flex-shrink: 0;
          transition: transform 0.25s;
        }
        .fqi-chev-open {
          transform: rotate(180deg);
          color: var(--fc);
        }

        .fqi-a-wrap {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.38s ease;
        }
        .fqi-a-open { max-height: 400px; }

        .fqi-a-inner {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0 1.35rem 1.1rem;
          border-top: 1px solid #e2e8f0;
          padding-top: 1.1rem;
        }
        .fqi-check { color: var(--fc); flex-shrink: 0; margin-top: 2px; }
        .fqi-a {
          font-family: 'Georgia','Charter',serif;
          font-size: 0.86rem;
          color: #475569;
          line-height: 1.75;
          margin: 0;
        }

        .fqi-footer {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1.35rem;
          border-top: 1px solid #f1f5f9;
          background: #f8fafc;
          font-family: 'Trebuchet MS','Tahoma',sans-serif;
          font-size: 0.68rem;
          color: #94a3b8;
        }
        .fqi-helpful {
          background: none;
          border: 1px solid #e2e8f0;
          border-radius: 99px;
          padding: 0.18rem 0.6rem;
          font-size: 0.65rem;
          cursor: pointer;
          transition: all 0.18s;
        }
        .fqi-helpful:hover { background: #fff; border-color: var(--fc); color: var(--fc); }
      `}</style>
    </div>
  );
}
