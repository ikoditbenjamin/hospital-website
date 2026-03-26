"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Shield,
  Users,
  Award,
  Clock,
  Star,
  CheckCircle,
  Globe,
  Microscope,
  Brain,
  Baby,
  Bone,
  Eye,
  Activity,
  Stethoscope,
  Phone,
  Calendar,
  Quote,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────── */

const milestones = [
  {
    year: "2009",
    title: "Founded",
    desc: "Jiddena medical opened its first clinic in the city centre with 8 physicians and a vision to redefine accessible healthcare.",
  },
  {
    year: "2013",
    title: "Expanded",
    desc: "Grew to 4 locations across the metro area, adding specialist departments in cardiology and pediatrics.",
  },
  {
    year: "2017",
    title: "Accredited",
    desc: "Achieved Joint Commission International (JCI) Gold Seal accreditation — the highest global standard for clinical excellence.",
  },
  {
    year: "2020",
    title: "Telehealth Launch",
    desc: "Launched a full virtual care platform, serving over 8,000 remote consultations in the first year alone.",
  },
  {
    year: "2024",
    title: "Today",
    desc: "12 facilities, 65+ specialists, and 33,000+ patients served annually. Ranked #1 Regional Hospital for patient satisfaction.",
  },
];

const values = [
  {
    icon: Heart,
    label: "Compassion",
    desc: "Every patient is treated as family. Empathy guides every decision we make.",
  },
  {
    icon: Shield,
    label: "Integrity",
    desc: "Transparent, honest care with no hidden agendas — your trust is our foundation.",
  },
  {
    icon: Microscope,
    label: "Innovation",
    desc: "Constantly evolving with the latest diagnostics, techniques, and technologies.",
  },
  {
    icon: Globe,
    label: "Accessibility",
    desc: "World-class healthcare shouldn't be a privilege. We work to make it reachable for all.",
  },
  {
    icon: Award,
    label: "Excellence",
    desc: "Board-certified specialists committed to evidence-based, best-in-class outcomes.",
  },
  {
    icon: Users,
    label: "Teamwork",
    desc: "Multidisciplinary collaboration ensures every patient gets the full picture of care.",
  },
];

const doctors = [
  {
    name: "Dr. Amara Patel",
    specialty: "Chief Cardiologist",
    dept: "Cardiology",
    exp: "22 yrs",
    edu: "Harvard Medical School",
    color: "#ef4444",
    icon: Heart,
    awards: ["AHA Fellow", "Best Cardiologist 2023"],
    quote: "Medicine is not just science — it is the art of listening.",
    initials: "AP",
  },
  {
    name: "Dr. Samuel Okonkwo",
    specialty: "Neurosurgery Director",
    dept: "Neurology",
    exp: "18 yrs",
    edu: "Johns Hopkins University",
    color: "#8b5cf6",
    icon: Brain,
    awards: ["CNS Fellow", "Top Surgeon 2022"],
    quote: "Every brain is a universe. I approach each patient that way.",
    initials: "SO",
  },
  {
    name: "Dr. Linda Nguyen",
    specialty: "Head of Pediatrics",
    dept: "Pediatrics",
    exp: "15 yrs",
    edu: "Stanford School of Medicine",
    color: "#f59e0b",
    icon: Baby,
    awards: ["AAP Member", "Patient's Choice Award"],
    quote:
      "Children deserve more than treatment — they deserve joy in healing.",
    initials: "LN",
  },
  {
    name: "Dr. Marcus Fernandez",
    specialty: "Senior Orthopedic Surgeon",
    dept: "Orthopedics",
    exp: "20 yrs",
    edu: "Mayo Clinic College of Medicine",
    color: "#0d9488",
    icon: Bone,
    awards: ["AAOS Fellow", "Top Ortho 2023"],
    quote: "Restoring movement restores life. That drives me every day.",
    initials: "MF",
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Ophthalmology Specialist",
    dept: "Ophthalmology",
    exp: "12 yrs",
    edu: "University of Pennsylvania",
    color: "#0ea5e9",
    icon: Eye,
    awards: ["AAO Diplomat", "Innovation Award 2022"],
    quote: "Helping someone see clearly again — there's no greater reward.",
    initials: "PS",
  },
  {
    name: "Dr. James Whitfield",
    specialty: "General Medicine Lead",
    dept: "General Medicine",
    exp: "17 yrs",
    edu: "University of Edinburgh",
    color: "#10b981",
    icon: Activity,
    awards: ["RCGP Fellow", "Community Health Award"],
    quote: "Prevention is the most powerful medicine I can offer a patient.",
    initials: "JW",
  },
];

const whyUs = [
  {
    icon: Award,
    stat: "#1",
    label: "Regional Hospital",
    desc: "Ranked #1 for patient satisfaction in the region for 3 consecutive years by an independent health board.",
  },
  {
    icon: Clock,
    stat: "< 15min",
    label: "Average Wait Time",
    desc: "Our streamlined triage and smart scheduling systems mean you spend less time waiting, more time healing.",
  },
  {
    icon: Stethoscope,
    stat: "65+",
    label: "Board-Certified Doctors",
    desc: "Every specialist on our team holds dual board certification and undergoes 40+ hours of annual CME training.",
  },
  {
    icon: Globe,
    stat: "12",
    label: "Clinic Locations",
    desc: "Conveniently located across the metro area, with extended hours, free parking, and telehealth options.",
  },
  {
    icon: Shield,
    stat: "JCI",
    label: "Gold Accredited",
    desc: "Joint Commission International Gold Seal — the same standard held by leading hospitals worldwide.",
  },
  {
    icon: Heart,
    stat: "98%",
    label: "Patient Satisfaction",
    desc: "Based on 1,200+ independent patient reviews across Google, Healthgrades, and Zocdoc platforms.",
  },
];

/* ─── Hook ──────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

/* ─── Page ──────────────────────────────────────── */
export default function AboutPage() {
  const [activeDoc, setActiveDoc] = useState(0);

  const heroSec = useInView(0.1);
  const aboutSec = useInView(0.1);
  const missionSec = useInView(0.1);
  const timelineSec = useInView(0.1);
  const valuesSec = useInView(0.1);
  const doctorsSec = useInView(0.1);
  const whySec = useInView(0.1);
  const ctaSec = useInView(0.1);

  return (
    <main className="about-root">
      {/* ══════════════════════════════════════════
          HERO — "About Jiddena medical"
      ══════════════════════════════════════════ */}
      <section className="ab-hero">
        {/* bg mesh */}
        <div className="hero-mesh" />
        <div className="hero-blob b1" />
        <div className="hero-blob b2" />

        <div
          ref={heroSec.ref}
          className={`ab-hero-inner ${heroSec.vis ? "fade-up" : "pre-fade"}`}
        >
          <span className="page-eyebrow">
            <span className="ey-dash" />
            Our Story
            <span className="ey-dash" />
          </span>
          <h1 className="hero-h1">
            About <em>Jiddena Medical</em> clinic
          </h1>
          <p className="hero-sub">
            Since 2009, we have been more than a hospital — we are a community
            of healers, innovators, and dedicated professionals united by one
            belief: that every person deserves extraordinary care.
          </p>
          <div className="hero-stats">
            {[
              { v: "15+", l: "Years Serving" },
              { v: "65+", l: "Specialists" },
              { v: "33k+", l: "Patients Helped" },
              { v: "12", l: "Locations" },
            ].map((s, i) => (
              <div
                key={s.l}
                className="hs-block"
                style={{ "--hsd": `${0.15 + i * 0.1}s` } as React.CSSProperties}
              >
                <p className="hs-val">{s.v}</p>
                <p className="hs-lbl">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* diagonal cut */}
        <div className="hero-cut" />
      </section>

      {/* ══════════════════════════════════════════
          WE ARE HERE FOR YOUR HEALTH
      ══════════════════════════════════════════ */}
      <section className="ab-section ab-here">
        <div
          ref={aboutSec.ref}
          className={`ab-container here-grid ${aboutSec.vis ? "fade-up" : "pre-fade"}`}
        >
          {/* left visual */}
          <div className="here-visual">
            <div className="hv-card hv-main">
              <div className="hv-icon-ring">
                <Heart size={40} strokeWidth={1.5} />
              </div>
              <p className="hv-tagline">
                &quot;Your health is our purpose&quot;
              </p>
            </div>
            <div className="hv-card hv-stat-1">
              <CheckCircle size={20} />
              <div>
                <p className="hvc-val">24/7</p>
                <p className="hvc-lbl">Emergency care</p>
              </div>
            </div>
            <div className="hv-card hv-stat-2">
              <Star size={20} />
              <div>
                <p className="hvc-val">4.9 ★</p>
                <p className="hvc-lbl">Patient Rating</p>
              </div>
            </div>
            {/* decorative ring */}
            <div className="hv-ring" />
          </div>

          {/* right content */}
          <div className="here-content">
            <span className="section-eyebrow">We Are Here For You</span>
            <h2 className="section-h2">
              Putting People Before
              <br />
              <em>Everything Else</em>
            </h2>
            <p className="section-body">
              At Jidenna Medical Center, healthcare is never transactional. From
              the moment you walk through our doors — or log into a virtual
              consultation — you enter a space designed entirely around your
              comfort, dignity, and recovery.
            </p>
            <p className="section-body">
              Our multidisciplinary teams collaborate across specialities to
              ensure no detail is missed. Whether you are managing a chronic
              condition, seeking a second opinion, or simply in need of a
              trusted annual check-up, we are here — consistently, reliably, and
              compassionately.
            </p>
            <div className="check-list">
              {[
                "Same-day appointments available",
                "Multilingual care navigators",
                "Integrated electronic health records",
                "NHIF & 6 major insurers accepted",
                "Dedicated patient liaison team",
                "Free follow-up consultations within 30 days",
              ].map((item) => (
                <div key={item} className="check-item">
                  <CheckCircle size={16} className="check-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MISSION & VISION
      ══════════════════════════════════════════ */}
      <section className="ab-section ab-mission">
        <div className="mission-bg-stripe" />

        <div
          ref={missionSec.ref}
          className={`ab-container ${missionSec.vis ? "fade-up" : "pre-fade"}`}
        >
          <div className="section-header">
            <span className="section-eyebrow section-eyebrow-light">
              Our Foundation
            </span>
            <h2 className="section-h2 section-h2-light">
              Mission &amp; Vision
            </h2>
          </div>

          <div className="mv-grid">
            {/* Mission */}
            <div className="mv-card mv-mission">
              <div className="mv-icon-wrap">
                <Heart size={28} strokeWidth={1.6} />
              </div>
              <span className="mv-tag">Our Mission</span>
              <h3 className="mv-title">To Heal, Serve &amp; Empower</h3>
              <p className="mv-body">
                To provide equitable, compassionate, and evidence-based
                healthcare that empowers every individual to live their
                healthiest life — regardless of background, age, or
                circumstance. We exist to eliminate the barrier between people
                and great medicine.
              </p>
              <div className="mv-pillars">
                {[
                  "Patient-first care",
                  "Community health",
                  "Clinical excellence",
                ].map((p) => (
                  <span key={p} className="mv-pill">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="mv-card mv-vision">
              <div className="mv-icon-wrap mv-icon-teal">
                <Globe size={28} strokeWidth={1.6} />
              </div>
              <span className="mv-tag mv-tag-teal">Our Vision</span>
              <h3 className="mv-title">
                The Region&apos;s Most Trusted Healthcare Partner
              </h3>
              <p className="mv-body">
                To be the region&apos;s foremost integrated healthcare system —
                recognised globally for clinical innovation, patient outcomes,
                and inclusive health programmes that set the standard for modern
                medicine. A place where healing and hope are never out of reach.
              </p>
              <div className="mv-pillars">
                {[
                  "Innovation-led",
                  "Globally accredited",
                  "Inclusive access",
                ].map((p) => (
                  <span key={p} className="mv-pill mv-pill-teal">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div
            ref={timelineSec.ref}
            className={`timeline-wrap ${timelineSec.vis ? "fade-up" : "pre-fade"}`}
          >
            <p
              className="section-eyebrow section-eyebrow-light"
              style={{ textAlign: "center", marginBottom: "2rem" }}
            >
              Our Journey
            </p>
            <div className="timeline">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="tl-item"
                  style={{ "--tld": `${i * 0.12}s` } as React.CSSProperties}
                >
                  <div className="tl-dot">
                    <span>{m.year}</span>
                  </div>
                  <div className="tl-card">
                    <p className="tl-title">{m.title}</p>
                    <p className="tl-desc">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          OUR CORE VALUES
      ══════════════════════════════════════════ */}
      <section className="ab-section ab-values">
        <div
          ref={valuesSec.ref}
          className={`ab-container ${valuesSec.vis ? "fade-up" : "pre-fade"}`}
        >
          <div className="section-header">
            <span className="section-eyebrow">What Drives Us</span>
            <h2 className="section-h2">Our Core Values</h2>
            <p className="section-intro">
              Six principles that shape every interaction, every decision, and
              every outcome at Jidenna Medical Center.
            </p>
          </div>

          <div className="values-grid">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.label}
                  className="value-card"
                  style={{ "--vd": `${i * 0.08}s` } as React.CSSProperties}
                >
                  <div className="vc-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="vc-label">{v.label}</h3>
                  <p className="vc-desc">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MEET OUR DOCTORS
      ══════════════════════════════════════════ */}
      <section className="ab-section ab-doctors">
        <div className="doctors-bg" />
        <div
          ref={doctorsSec.ref}
          className={`ab-container ${doctorsSec.vis ? "fade-up" : "pre-fade"}`}
        >
          <div className="section-header">
            <span className="section-eyebrow section-eyebrow-light">
              The Team
            </span>
            <h2 className="section-h2 section-h2-light">Meet Our Doctors</h2>
            <p className="section-intro section-intro-light">
              World-class clinicians. Warm, approachable humans. Meet the
              specialists who make Jidenna Medical Center exceptional.
            </p>
          </div>

          {/* featured active doctor */}
          <div className="doc-feature">
            <div
              className="df-avatar"
              style={
                { "--dc": doctors[activeDoc].color } as React.CSSProperties
              }
            >
              {doctors[activeDoc].initials}
            </div>
            <div className="df-content">
              <div className="df-awards">
                {doctors[activeDoc].awards.map((a) => (
                  <span key={a} className="df-award-pill">
                    <Award size={11} /> {a}
                  </span>
                ))}
              </div>
              <h3 className="df-name">{doctors[activeDoc].name}</h3>
              <p className="df-spec">
                {doctors[activeDoc].specialty} · {doctors[activeDoc].dept}
              </p>
              <div className="df-meta">
                <span>
                  <Clock size={13} /> {doctors[activeDoc].exp} experience
                </span>
                <span>
                  <Award size={13} /> {doctors[activeDoc].edu}
                </span>
              </div>
              <blockquote className="df-quote">
                <Quote size={18} className="dq-icon" />
                {doctors[activeDoc].quote}
              </blockquote>
              <Link href="/appointment" className="df-btn">
                <Calendar size={15} /> Book with{" "}
                {doctors[activeDoc].name.split(" ")[1]}
              </Link>
            </div>
          </div>

          {/* doctor selector strip */}
          <div className="doc-strip">
            {doctors.map((d, i) => {
              return (
                <button
                  key={d.name}
                  className={`doc-chip ${activeDoc === i ? "doc-chip-active" : ""}`}
                  style={{ "--dc": d.color } as React.CSSProperties}
                  onClick={() => setActiveDoc(i)}
                >
                  <div className="dchip-avatar">{d.initials}</div>
                  <div>
                    <p className="dchip-name">
                      {d.name.split(" ").slice(1).join(" ")}
                    </p>
                    <p className="dchip-dept">{d.dept}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section className="ab-section ab-why">
        <div
          ref={whySec.ref}
          className={`ab-container ${whySec.vis ? "fade-up" : "pre-fade"}`}
        >
          <div className="section-header">
            <span className="section-eyebrow">The Difference</span>
            <h2 className="section-h2">
              Why Choose <em>Jidenna Medical Center?</em>
            </h2>
            <p className="section-intro">
              Six reasons thousands of families have made us their trusted
              healthcare home.
            </p>
          </div>

          <div className="why-grid">
            {whyUs.map((w, i) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.label}
                  className="why-card"
                  style={{ "--wd": `${i * 0.08}s` } as React.CSSProperties}
                >
                  <div className="wc-top">
                    <div className="wc-icon">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <p className="wc-stat">{w.stat}</p>
                  </div>
                  <p className="wc-label">{w.label}</p>
                  <p className="wc-desc">{w.desc}</p>
                </div>
              );
            })}
          </div>

          {/* testimonial pull-quote */}
          <div className="why-pullquote">
            <Quote size={32} className="pq-icon" />
            <p className="pq-text">
              I have visited clinics across three continents. Jidenna Medical
              Center is, without question, the most human-centred healthcare
              experience I have ever had.
            </p>
            <p className="pq-author">
              — David O., Neurology Patient · March 2025
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="ab-cta-banner">
        <div
          ref={ctaSec.ref}
          className={`ab-container cta-inner ${ctaSec.vis ? "fade-up" : "pre-fade"}`}
        >
          <div className="cta-text">
            <h2 className="cta-h2">
              Ready to Experience the Jidenna Medical Center Difference?
            </h2>
            <p className="cta-sub">
              Book your first appointment today — same-day slots available.
            </p>
          </div>
          <div className="cta-btns">
            <Link href="/appointment" className="cta-btn-primary">
              <Calendar size={16} /> Book an Appointment
            </Link>
            <Link href="/contact" className="cta-btn-ghost">
              <Phone size={16} /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GLOBAL STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        /* ── Tokens ── */
        .about-root {
          --teal:    #0d9488;
          --teal-d:  #0f766e;
          --teal-l:  #f0fdfa;
          --navy:    #0f2b4b;
          --navy-m:  #1e4a7a;
          --slate:   #64748b;
          --border:  #e2e8f0;
          --white:   #ffffff;
          --off:     #f8fafc;
          --gold:    #f59e0b;
          --ff-s:    'Georgia','Charter',serif;
          --ff-u:    'Trebuchet MS','Tahoma',sans-serif;
          overflow-x: hidden;
        }

        /* ── Shared ── */
        .ab-section  { position:relative; padding:5rem 1.5rem; }
        .ab-container{ max-width:1200px; margin:0 auto; }

        .pre-fade { opacity:0; transform:translateY(30px); }
        .fade-up  { animation: fadeUp 0.75s ease forwards; }
        @keyframes fadeUp { to{ opacity:1; transform:none; } }

        .section-header   { text-align:center; margin-bottom:3.5rem; }
        .section-eyebrow  {
          display:inline-flex; align-items:center; gap:0.6rem;
          font-family:var(--ff-u); font-size:0.72rem; font-weight:700;
          letter-spacing:0.14em; text-transform:uppercase; color:var(--teal);
          margin-bottom:0.85rem;
        }
        .section-eyebrow-light { color:#5eead4; }
        .section-h2 {
          font-family:var(--ff-s); font-size:clamp(2rem,4vw,3rem);
          font-weight:800; color:var(--navy); line-height:1.15;
          letter-spacing:-0.02em; margin:0 0 1rem;
        }
        .section-h2-light { color:#fff; }
        .section-h2 em   { color:var(--teal); font-style:italic; }
        .section-intro   { font-family:var(--ff-s); font-size:1rem; color:var(--slate); max-width:560px; margin:0 auto; line-height:1.75; }
        .section-intro-light { color:#94a3b8; }

        /* ═══════ HERO ════════ */
        .ab-hero {
          position:relative; overflow:hidden;
          background:linear-gradient(145deg,#0f2b4b 0%,#1e4a7a 55%,#0d5a73 100%);
          padding:7rem 1.5rem 9rem;
          text-align:center;
        }
        .hero-mesh {
          position:absolute; inset:0;
          background-image: radial-gradient(circle at 20% 30%, #5eead415 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, #0ea5e915 0%, transparent 50%);
        }
        .hero-blob {
          position:absolute; border-radius:50%;
          filter:blur(90px); opacity:0.25; pointer-events:none;
        }
        .b1{ width:500px;height:500px; background:radial-gradient(#5eead4,transparent); top:-150px;right:-100px; }
        .b2{ width:350px;height:350px; background:radial-gradient(#7dd3fc,transparent); bottom:-80px;left:-60px; }

        .ab-hero-inner { position:relative; z-index:2; max-width:860px; margin:0 auto; }
        .page-eyebrow {
          display:inline-flex; align-items:center; gap:0.6rem;
          font-family:var(--ff-u); font-size:0.72rem; font-weight:700;
          letter-spacing:0.14em; text-transform:uppercase; color:#5eead4;
          margin-bottom:1.25rem;
        }
        .ey-dash{ display:inline-block; width:28px;height:2px; background:#5eead4; border-radius:2px; }

        .hero-h1 {
          font-family:var(--ff-s); font-size:clamp(2.8rem,7vw,5rem);
          font-weight:900; color:#fff; line-height:1.08;
          letter-spacing:-0.03em; margin:0 0 1.25rem;
        }
        .hero-h1 em{ color:#5eead4; font-style:italic; }
        .hero-sub {
          font-family:var(--ff-s); font-size:1.1rem;
          color:#94a3b8; max-width:640px; margin:0 auto 3rem;
          line-height:1.75;
        }
        .hero-stats {
          display:inline-grid; grid-template-columns:repeat(4,1fr);
          gap:1.5rem; padding:2rem 2.5rem;
          background:#ffffff0f; backdrop-filter:blur(12px);
          border:1px solid #ffffff18; border-radius:1.25rem;
        }
        @media(max-width:600px){ .hero-stats{ grid-template-columns:repeat(2,1fr); } }
        .hs-block {
          text-align:center;
          animation: fadeUp 0.6s ease var(--hsd) both;
        }
        .hs-val { font-family:var(--ff-s); font-size:2rem; font-weight:800; color:#5eead4; margin:0 0 0.2rem; }
        .hs-lbl { font-family:var(--ff-u); font-size:0.7rem; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:0.06em; margin:0; }

        .hero-cut {
          position:absolute; bottom:-1px; left:0; right:0; height:80px;
          background:var(--white);
          clip-path:polygon(0 100%,100% 100%,100% 0);
        }

        /* ═══════ HERE FOR YOUR HEALTH ════════ */
        .ab-here { background:var(--white); }
        .here-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:center;
        }
        @media(max-width:900px){ .here-grid{ grid-template-columns:1fr; gap:3rem; } }

        .here-visual {
          position:relative; height:420px;
        }
        .hv-card {
          position:absolute; background:var(--white);
          border:1.5px solid var(--border); border-radius:1.25rem;
          box-shadow:0 8px 30px #0000000e;
          display:flex; align-items:center; gap:0.75rem;
          padding:1rem 1.25rem;
          animation:floatY 5s ease-in-out infinite;
        }
        @keyframes floatY{ 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
        .hv-main {
          top:50%; left:50%; transform:translate(-50%,-50%);
          flex-direction:column; text-align:center;
          padding:2.5rem 2rem;
          animation:floatY 6s ease-in-out infinite;
        }
        .hv-icon-ring {
          width:80px; height:80px; border-radius:50%;
          background:linear-gradient(135deg,#f0fdfa,#cffafe);
          border:2px solid #99f6e4;
          display:grid; place-items:center; color:var(--teal);
          margin-bottom:0.75rem;
        }
        .hv-tagline { font-family:var(--ff-s); font-size:0.88rem; font-style:italic; color:var(--slate); margin:0; }
        .hv-stat-1{ top:10%; left:0; animation-delay:1s; }
        .hv-stat-2{ bottom:12%; right:0; animation-delay:2.5s; }
        .hv-card svg { color:var(--teal); flex-shrink:0; }
        .hvc-val { font-family:var(--ff-s); font-size:1.1rem; font-weight:800; color:var(--navy); margin:0 0 0.1rem; }
        .hvc-lbl { font-family:var(--ff-u); font-size:0.67rem; color:var(--slate); margin:0; }
        .hv-ring {
          position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:300px; height:300px; border-radius:50%;
          border:2px dashed #99f6e440;
          animation:spin 20s linear infinite;
          pointer-events:none;
        }
        @keyframes spin{ to{ transform:translate(-50%,-50%) rotate(360deg); } }

        .here-content .section-eyebrow{ display:block; margin-bottom:0.5rem; }
        .section-body {
          font-family:var(--ff-s); font-size:0.95rem; color:var(--slate);
          line-height:1.8; margin:0 0 1rem;
        }
        .check-list { display:flex; flex-direction:column; gap:0.55rem; margin-top:1.5rem; }
        .check-item {
          display:flex; align-items:center; gap:0.6rem;
          font-family:var(--ff-u); font-size:0.82rem; font-weight:600; color:var(--navy);
        }
        .check-icon{ color:var(--teal); flex-shrink:0; }

        /* ═══════ MISSION & VISION ════════ */
        .ab-mission {
          background:linear-gradient(160deg,var(--navy) 0%,var(--navy-m) 100%);
          overflow:hidden;
        }
        .mission-bg-stripe {
          position:absolute; top:0; left:0; right:0; bottom:0;
          background-image: radial-gradient(circle at 10% 20%, #5eead410 0%,transparent 40%),
                            radial-gradient(circle at 90% 80%, #0ea5e910 0%,transparent 40%);
          pointer-events:none;
        }

        .mv-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:4rem; }
        @media(max-width:768px){ .mv-grid{ grid-template-columns:1fr; } }

        .mv-card {
          background:#ffffff0c; backdrop-filter:blur(10px);
          border:1.5px solid #ffffff18; border-radius:1.5rem;
          padding:2rem 2rem 1.75rem;
        }
        .mv-icon-wrap {
          width:52px; height:52px; border-radius:0.85rem;
          background:linear-gradient(135deg,#ef44441a,#ef444430);
          border:1.5px solid #ef444440;
          display:grid; place-items:center; color:#f87171;
          margin-bottom:1rem;
        }
        .mv-icon-teal {
          background:linear-gradient(135deg,#0d94881a,#0d948830);
          border-color:#0d948840; color:#5eead4;
        }
        .mv-tag {
          display:inline-block;
          font-family:var(--ff-u); font-size:0.68rem; font-weight:700;
          letter-spacing:0.1em; text-transform:uppercase;
          color:#f87171; margin-bottom:0.5rem;
        }
        .mv-tag-teal { color:#5eead4; }
        .mv-title { font-family:var(--ff-s); font-size:1.3rem; font-weight:800; color:#fff; margin:0 0 0.85rem; }
        .mv-body  { font-family:var(--ff-s); font-size:0.88rem; color:#94a3b8; line-height:1.75; margin:0 0 1.25rem; }
        .mv-pillars { display:flex; flex-wrap:wrap; gap:0.5rem; }
        .mv-pill {
          font-family:var(--ff-u); font-size:0.68rem; font-weight:700;
          background:#ef444415; color:#f87171;
          border:1px solid #ef444430; border-radius:99px;
          padding:0.25rem 0.65rem;
        }
        .mv-pill-teal { background:#0d948815; color:#5eead4; border-color:#0d948840; }

        /* timeline */
        .timeline-wrap{ position:relative; }
        .timeline {
          display:flex; flex-direction:column; gap:0;
          position:relative;
          padding-left:2.5rem;
        }
        .timeline::before {
          content:''; position:absolute;
          left:1.1rem; top:0; bottom:0; width:2px;
          background:linear-gradient(to bottom,#5eead440,#0ea5e940,#5eead420);
          border-radius:2px;
        }
        .tl-item {
          display:flex; gap:1.5rem; padding-bottom:2rem;
          animation:fadeUp 0.5s ease var(--tld) both;
        }
        .tl-item:last-child{ padding-bottom:0; }
        .tl-dot {
          width:40px; height:40px; border-radius:50%; flex-shrink:0;
          background:linear-gradient(135deg,var(--teal),#0ea5e9);
          display:grid; place-items:center;
          margin-left:-1.25rem;
          box-shadow:0 0 0 4px #0f2b4b, 0 0 0 6px #5eead430;
        }
        .tl-dot span { font-family:var(--ff-u); font-size:0.62rem; font-weight:800; color:#fff; }
        .tl-card {
          background:#ffffff0c; border:1px solid #ffffff15;
          border-radius:0.85rem; padding:1rem 1.25rem;
          flex:1;
        }
        .tl-title { font-family:var(--ff-u); font-size:0.85rem; font-weight:800; color:#fff; margin:0 0 0.35rem; }
        .tl-desc  { font-family:var(--ff-s); font-size:0.8rem; color:#94a3b8; margin:0; line-height:1.65; }

        /* ═══════ VALUES ════════ */
        .ab-values { background:var(--off); }
        .values-grid {
          display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem;
        }
        @media(max-width:900px){ .values-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:540px){ .values-grid{ grid-template-columns:1fr; } }

        .value-card {
          background:var(--white); border:1.5px solid var(--border);
          border-radius:1.25rem; padding:1.75rem 1.5rem;
          transition:all 0.25s; cursor:default;
          animation:fadeUp 0.5s ease var(--vd) both;
        }
        .value-card:hover {
          border-color:var(--teal);
          box-shadow:0 8px 28px #0d948818;
          transform:translateY(-4px);
        }
        .value-card:hover .vc-icon { background:var(--teal); color:#fff; }
        .vc-icon {
          width:48px; height:48px; border-radius:0.75rem;
          background:var(--teal-l); color:var(--teal);
          display:grid; place-items:center;
          margin-bottom:1rem;
          transition:all 0.25s;
        }
        .vc-label { font-family:var(--ff-s); font-size:1rem; font-weight:800; color:var(--navy); margin:0 0 0.5rem; }
        .vc-desc  { font-family:var(--ff-u); font-size:0.78rem; color:var(--slate); line-height:1.6; margin:0; }

        /* ═══════ DOCTORS ════════ */
        .ab-doctors {
          background:linear-gradient(160deg,var(--navy) 0%,#1a3a5c 100%);
          overflow:hidden;
        }
        .doctors-bg {
          position:absolute; inset:0;
          background-image:radial-gradient(circle at 80% 20%,#5eead410,transparent 50%),
                           radial-gradient(circle at 20% 80%,#0ea5e910,transparent 50%);
        }

        .doc-feature {
          display:flex; align-items:center; gap:3rem;
          background:#ffffff0c; border:1.5px solid #ffffff15;
          border-radius:1.5rem; padding:2.5rem;
          margin-bottom:2rem;
        }
        @media(max-width:768px){ .doc-feature{ flex-direction:column; gap:1.5rem; } }

        .df-avatar {
          width:120px; height:120px; border-radius:50%; flex-shrink:0;
          background:var(--dc);
          display:grid; place-items:center;
          font-family:var(--ff-s); font-size:2.2rem; font-weight:900; color:#fff;
          box-shadow:0 0 0 4px #0f2b4b, 0 0 0 7px color-mix(in srgb,var(--dc) 35%,transparent);
          opacity:0.9;
        }
        .df-awards { display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.75rem; }
        .df-award-pill {
          display:inline-flex; align-items:center; gap:0.3rem;
          font-family:var(--ff-u); font-size:0.62rem; font-weight:700;
          background:#f59e0b18; color:#fbbf24;
          border:1px solid #f59e0b30; border-radius:99px;
          padding:0.2rem 0.6rem;
        }
        .df-name { font-family:var(--ff-s); font-size:1.6rem; font-weight:800; color:#fff; margin:0 0 0.3rem; }
        .df-spec { font-family:var(--ff-u); font-size:0.78rem; font-weight:700; color:#5eead4; margin:0 0 0.75rem; }
        .df-meta {
          display:flex; gap:1.25rem; flex-wrap:wrap; margin-bottom:1rem;
        }
        .df-meta span {
          display:inline-flex; align-items:center; gap:0.4rem;
          font-family:var(--ff-u); font-size:0.72rem; color:#94a3b8;
        }
        .df-meta svg { color:#5eead4; }
        .df-quote {
          font-family:var(--ff-s); font-style:italic; font-size:0.92rem;
          color:#cbd5e1; margin:0 0 1.25rem;
          padding-left:1.25rem; border-left:3px solid #5eead4;
          position:relative;
        }
        .dq-icon { color:#5eead430; margin-right:0.4rem; }
        .df-btn {
          display:inline-flex; align-items:center; gap:0.5rem;
          font-family:var(--ff-u); font-size:0.82rem; font-weight:700; color:#fff;
          background:linear-gradient(135deg,var(--teal),#0ea5e9);
          padding:0.65rem 1.4rem; border-radius:0.7rem;
          text-decoration:none;
          box-shadow:0 4px 16px #0d948840;
          transition:transform 0.2s,box-shadow 0.2s;
        }
        .df-btn:hover{ transform:translateY(-2px); box-shadow:0 8px 24px #0d948860; }

        .doc-strip {
          display:flex; gap:0.75rem; flex-wrap:wrap; justify-content:center;
        }
        .doc-chip {
          display:flex; align-items:center; gap:0.6rem;
          background:#ffffff0d; border:1.5px solid #ffffff15;
          border-radius:0.85rem; padding:0.6rem 1rem;
          cursor:pointer; transition:all 0.2s;
        }
        .doc-chip:hover { background:#ffffff18; border-color:#ffffff25; }
        .doc-chip-active { background:#5eead415; border-color:#5eead4 !important; }
        .dchip-avatar {
          width:34px; height:34px; border-radius:50%;
          background:var(--dc); color:#fff;
          font-family:var(--ff-u); font-size:0.7rem; font-weight:800;
          display:grid; place-items:center; flex-shrink:0; opacity:0.88;
        }
        .dchip-name { font-family:var(--ff-u); font-size:0.75rem; font-weight:700; color:#fff; margin:0 0 0.1rem; }
        .dchip-dept { font-family:var(--ff-u); font-size:0.62rem; color:#94a3b8; margin:0; }

        /* ═══════ WHY US ════════ */
        .ab-why { background:var(--white); }
        .ab-why .section-h2 em{ color:var(--teal); }

        .why-grid {
          display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem;
          margin-bottom:3rem;
        }
        @media(max-width:900px){ .why-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:540px){ .why-grid{ grid-template-columns:1fr; } }

        .why-card {
          background:var(--off); border:1.5px solid var(--border);
          border-radius:1.25rem; padding:1.75rem 1.5rem;
          transition:all 0.25s;
          animation:fadeUp 0.5s ease var(--wd) both;
        }
        .why-card:hover {
          background:var(--white); border-color:var(--teal);
          box-shadow:0 8px 28px #0d948814; transform:translateY(-4px);
        }
        .why-card:hover .wc-icon{ background:var(--teal); color:#fff; }
        .wc-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem; }
        .wc-icon {
          width:44px; height:44px; border-radius:0.7rem;
          background:var(--teal-l); color:var(--teal);
          display:grid; place-items:center;
          transition:all 0.25s;
        }
        .wc-stat {
          font-family:var(--ff-s); font-size:1.6rem; font-weight:900;
          color:var(--teal); margin:0;
        }
        .wc-label { font-family:var(--ff-s); font-size:0.95rem; font-weight:700; color:var(--navy); margin:0 0 0.5rem; }
        .wc-desc  { font-family:var(--ff-u); font-size:0.75rem; color:var(--slate); line-height:1.6; margin:0; }

        .why-pullquote {
          background:linear-gradient(135deg,var(--navy),var(--navy-m));
          border-radius:1.5rem; padding:2.5rem;
          text-align:center; position:relative; overflow:hidden;
        }
        .why-pullquote::before {
          content:''; position:absolute;inset:0;
          background:radial-gradient(circle at 50% 0%,#5eead415,transparent 60%);
        }
        .pq-icon { color:#5eead440; margin-bottom:1rem; }
        .pq-text {
          font-family:var(--ff-s); font-size:1.1rem; font-style:italic;
          color:#fff; max-width:680px; margin:0 auto 1rem; line-height:1.75;
        }
        .pq-author { font-family:var(--ff-u); font-size:0.75rem; color:#94a3b8; margin:0; }

        /* ═══════ CTA BANNER ════════ */
        .ab-cta-banner {
          background:linear-gradient(135deg,var(--teal) 0%,#0ea5e9 100%);
          padding:5rem 1.5rem;
          position:relative; overflow:hidden;
        }
        .ab-cta-banner::before {
          content:''; position:absolute; inset:0;
          background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .cta-inner {
          display:flex; align-items:center; justify-content:space-between;
          gap:2rem; flex-wrap:wrap; position:relative;
        }
        .cta-h2 {
          font-family:var(--ff-s); font-size:clamp(1.5rem,3vw,2.2rem);
          font-weight:800; color:#fff; margin:0 0 0.5rem;
        }
        .cta-sub { font-family:var(--ff-u); font-size:0.9rem; color:#cffafe; margin:0; }
        .cta-btns{ display:flex; gap:0.85rem; flex-wrap:wrap; }
        .cta-btn-primary {
          display:inline-flex; align-items:center; gap:0.45rem;
          font-family:var(--ff-u); font-size:0.88rem; font-weight:700;
          color:var(--teal); background:#fff;
          padding:0.8rem 1.75rem; border-radius:0.85rem;
          text-decoration:none;
          box-shadow:0 4px 20px #00000020;
          transition:transform 0.2s,box-shadow 0.2s;
        }
        .cta-btn-primary:hover{ transform:translateY(-2px); box-shadow:0 8px 28px #00000030; }
        .cta-btn-ghost {
          display:inline-flex; align-items:center; gap:0.45rem;
          font-family:var(--ff-u); font-size:0.88rem; font-weight:700;
          color:#fff; background:transparent;
          border:2px solid #ffffff60;
          padding:0.8rem 1.75rem; border-radius:0.85rem;
          text-decoration:none;
          transition:all 0.2s;
        }
        .cta-btn-ghost:hover{ border-color:#fff; background:#ffffff18; }
      `}</style>
    </main>
  );
}
