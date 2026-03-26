"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Cardiac Patient",
    department: "Cardiology",
    avatar: "SJ",
    color: "#ef4444",
    rating: 5,
    date: "March 2025",
    content:
      "The care and attention I received was truly exceptional. Dr. Patel took over 40 minutes to walk through my diagnosis, answer every question, and outline a clear treatment path. I left feeling heard and genuinely optimistic.",
    treatment: "Coronary Artery Screening",
    verified: true,
  },
  {
    name: "Michael Chen",
    role: "Orthopedic Patient",
    department: "Orthopedics",
    avatar: "MC",
    color: "#0d9488",
    rating: 5,
    date: "February 2025",
    content:
      "State-of-the-art facilities, professional staff, and a care team that actually remembers your name. My knee surgery recovery was smoother than I imagined — the physiotherapy follow-up program made all the difference.",
    treatment: "ACL Reconstruction & Recovery",
    verified: true,
  },
  {
    name: "Emily Rodriguez",
    role: "Pediatric Parent",
    department: "Pediatrics",
    avatar: "ER",
    color: "#f59e0b",
    rating: 5,
    date: "January 2025",
    content:
      "Best healthcare experience our family has ever had. Booking online took less than 3 minutes, and Dr. Nkosi was incredibly patient with my 6-year-old. The play area in the waiting room was a lovely touch.",
    treatment: "Child Wellness & Immunizations",
    verified: true,
  },
  {
    name: "David Okonkwo",
    role: "Neurology Patient",
    department: "Neurology",
    avatar: "DO",
    color: "#8b5cf6",
    rating: 5,
    date: "December 2024",
    content:
      "After two misdiagnoses elsewhere, this team ran comprehensive imaging and finally identified the root cause of my migraines. I cannot overstate how much this changed my quality of life. Forever grateful.",
    treatment: "Migraine & Neurological Assessment",
    verified: true,
  },
  {
    name: "Aisha Kamara",
    role: "General Medicine Patient",
    department: "General Medicine",
    avatar: "AK",
    color: "#0ea5e9",
    rating: 5,
    date: "November 2024",
    content:
      "I came in for a routine check-up and they caught an early-stage iron deficiency that was draining my energy for months. The lab turnaround was same-day. Proactive, thorough, and genuinely caring staff.",
    treatment: "Annual Health Screening",
    verified: true,
  },
  {
    name: "James Whitfield",
    role: "Emergency Patient",
    department: "Emergency Care",
    avatar: "JW",
    color: "#10b981",
    rating: 5,
    date: "October 2024",
    content:
      "Rushed in at midnight with severe chest pain — the triage team had me assessed within 8 minutes. The transparency of communication during those stressful hours was remarkable. World-class emergency care.",
    treatment: "Emergency Cardiac Triage",
    verified: true,
  },
];

const stats = [
  { value: "98%", label: "Patient Satisfaction", icon: "😊" },
  { value: "15+", label: "Years of Excellence", icon: "🏅" },
  { value: "50k+", label: "Successful Treatments", icon: "💊" },
  { value: "24/7", label: "Round-the-Clock Support", icon: "🕐" },
];

const platforms = [
  { name: "Google Reviews", rating: "4.9", count: "1,240" },
  { name: "Healthgrades", rating: "4.8", count: "870" },
  { name: "Zocdoc", rating: "4.9", count: "530" },
];

function useInView(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref: elementRef, visible };
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const [animKey, setAnimKey] = useState(0);

  const { ref: headerRef, visible: headerVis } = useInView(0.2);
  const { ref: statsRef, visible: statsVis } = useInView(0.1);

  const go = (dir: "left" | "right") => {
    setAnimDir(dir);
    setAnimKey((k) => k + 1);
    setActive((a) =>
      dir === "right"
        ? (a + 1) % testimonials.length
        : (a - 1 + testimonials.length) % testimonials.length,
    );
  };

  const t = testimonials[active];

  return (
    <section className="tm-root">
      <div className="tm-blob blob-a" />
      <div className="tm-blob blob-b" />

      <div className="tm-inner">
        {/* ══ HEADER ══ */}
        <div
          ref={headerRef}
          className={`tm-header ${headerVis ? "reveal" : ""}`}
        >
          <span className="tm-eyebrow">
            <span className="ey-line" />
            Patient Stories
            <span className="ey-line" />
          </span>
          <h2 className="tm-title">
            Trusted by <em>Thousands</em>,<br />
            Loved by All
          </h2>
          <p className="tm-sub">
            Real experiences from real patients — unfiltered, verified, and
            heartfelt.
          </p>

          {/* platform badges */}
          <div className="platform-row">
            {platforms.map((p) => (
              <div key={p.name} className="platform-badge">
                <div className="pb-stars">{"★".repeat(5)}</div>
                <div className="pb-rating">
                  {p.rating} <span>({p.count} reviews)</span>
                </div>
                <div className="pb-name">{p.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ FEATURED TESTIMONIAL ══ */}
        <div className="feat-wrap">
          {/* nav arrow left */}
          <button
            className="nav-btn nav-left"
            onClick={() => go("left")}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          <div key={animKey} className={`feat-card anim-${animDir}`}>
            {/* quote mark */}
            <div className="big-quote">
              <Quote size={36} strokeWidth={1.2} />
            </div>

            {/* stars */}
            <div className="feat-stars">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={18} className="star-fill" />
              ))}
              {t.verified && (
                <span className="verified-badge">✓ Verified Patient</span>
              )}
            </div>

            {/* content */}
            <blockquote className="feat-content">
              &quot;{t.content}&quot;
            </blockquote>

            {/* treatment tag */}
            <div className="treatment-tag">🩺 {t.treatment}</div>

            {/* author */}
            <div className="feat-author">
              <div
                className="avatar"
                style={{ "--av-color": t.color } as React.CSSProperties}
              >
                {t.avatar}
              </div>
              <div>
                <p className="author-name">{t.name}</p>
                <p className="author-meta">
                  {t.role} · {t.department}
                </p>
              </div>
              <div className="author-date">{t.date}</div>
            </div>
          </div>

          {/* nav arrow right */}
          <button
            className="nav-btn nav-right"
            onClick={() => go("right")}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ── dot indicators ── */}
        <div className="dots-row">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === active ? "active" : ""}`}
              onClick={() => {
                setAnimDir(i > active ? "right" : "left");
                setAnimKey((k) => k + 1);
                setActive(i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* ══ THUMBNAIL STRIP ══ */}
        <div className="thumb-strip">
          {testimonials.map((tm, i) => (
            <button
              key={i}
              className={`thumb-card ${i === active ? "active" : ""}`}
              onClick={() => {
                setAnimDir(i > active ? "right" : "left");
                setAnimKey((k) => k + 1);
                setActive(i);
              }}
            >
              <div
                className="thumb-avatar"
                style={{ "--av-color": tm.color } as React.CSSProperties}
              >
                {tm.avatar}
              </div>
              <div className="thumb-info">
                <p className="thumb-name">{tm.name}</p>
                <p className="thumb-dept">{tm.department}</p>
              </div>
            </button>
          ))}
        </div>

        {/* ══ STATS ══ */}
        <div ref={statsRef} className="stats-band">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`stat-block ${statsVis ? "stat-reveal" : ""}`}
              style={{ "--sd": `${i * 0.1}s` } as React.CSSProperties}
            >
              <span className="stat-emoji">{s.icon}</span>
              <p className="stat-value">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tm-root {
          --teal:   #0d9488;
          --teal-d: #0f766e;
          --teal-l: #f0fdfa;
          --navy:   #0f2b4b;
          --slate:  #64748b;
          --border: #e2e8f0;
          --white:  #ffffff;
          --gold:   #f59e0b;
          --ff-serif: 'Georgia','Charter',serif;
          --ff-ui:    'Trebuchet MS','Tahoma',sans-serif;

          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #0f2b4b 0%, #1e4a7a 60%, #0f2b4b 100%);
          padding: 5rem 1.5rem;
        }

        .tm-blob {
          position: absolute; border-radius: 50%;
          filter: blur(100px); opacity: 0.18; pointer-events: none;
        }
        .blob-a { width:600px;height:600px; background:radial-gradient(#5eead4,transparent); top:-200px;right:-150px; }
        .blob-b { width:400px;height:400px; background:radial-gradient(#7dd3fc,transparent); bottom:-100px;left:-80px; }

        .tm-inner {
          position: relative; z-index: 2;
          max-width: 1100px; margin: 0 auto;
          display: flex; flex-direction: column; align-items: center; gap: 3rem;
        }

        /* ── header ── */
        .tm-header {
          text-align: center;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .tm-header.reveal { opacity:1; transform:none; }

        .tm-eyebrow {
          display: inline-flex; align-items: center; gap: 0.75rem;
          font-family: var(--ff-ui); font-size: 0.72rem;
          font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #5eead4;
          margin-bottom: 1rem;
        }
        .ey-line { display:inline-block; width:28px; height:2px; background:#5eead4; border-radius:2px; }
        .tm-title {
          font-family: var(--ff-serif); font-size: clamp(2rem,4.5vw,3.2rem);
          font-weight: 800; color: #fff; line-height: 1.15;
          letter-spacing: -0.02em; margin: 0 0 1rem;
        }
        .tm-title em { color:#5eead4; font-style:italic; }
        .tm-sub {
          font-family: var(--ff-serif); font-size:1rem;
          color: #94a3b8; max-width:480px; margin:0 auto 2rem; line-height:1.7;
        }

        /* ── platform badges ── */
        .platform-row { display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; }
        .platform-badge {
          background: #ffffff12; backdrop-filter:blur(8px);
          border: 1px solid #ffffff20;
          border-radius: 0.85rem; padding: 0.75rem 1.1rem;
          text-align: center; min-width:130px;
        }
        .pb-stars { color: var(--gold); font-size:0.8rem; letter-spacing:2px; }
        .pb-rating {
          font-family:var(--ff-ui); font-size:0.85rem;
          font-weight:700; color:#fff; margin:0.2rem 0 0.1rem;
        }
        .pb-rating span { font-size:0.65rem; color:#94a3b8; font-weight:400; }
        .pb-name { font-family:var(--ff-ui); font-size:0.65rem; color:#94a3b8; letter-spacing:0.05em; }

        /* ── featured wrap ── */
        .feat-wrap {
          position: relative;
          width: 100%;
          max-width: 820px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .nav-btn {
          flex-shrink: 0;
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid #ffffff20;
          background: #ffffff0d;
          color: #fff;
          display: grid; place-items: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 2;
        }
        .nav-btn:hover { background:#5eead420; border-color:#5eead4; color:#5eead4; }

        /* ── featured card ── */
        .feat-card {
          flex: 1;
          background: var(--white);
          border-radius: 1.5rem;
          padding: 2.5rem 2.5rem 2rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 80px #00000040;
        }
        @media(max-width:600px){ .feat-card{ padding:1.75rem 1.5rem; } }

        @keyframes slideRight { from{ opacity:0; transform:translateX(40px); } to{ opacity:1; transform:none; } }
        @keyframes slideLeft  { from{ opacity:0; transform:translateX(-40px); } to{ opacity:1; transform:none; } }
        .anim-right { animation: slideRight 0.4s ease forwards; }
        .anim-left  { animation: slideLeft  0.4s ease forwards; }

        .big-quote {
          position: absolute; top: 1.5rem; right: 2rem;
          color: var(--teal-l); opacity: 0.6;
        }
        .feat-stars {
          display: flex; align-items: center; gap: 0.35rem;
          margin-bottom: 1.25rem; flex-wrap: wrap;
        }
        .star-fill { fill: var(--gold); color: var(--gold); }
        .verified-badge {
          font-family: var(--ff-ui); font-size: 0.68rem;
          font-weight: 700; color: var(--teal-d);
          background: var(--teal-l); padding: 0.2rem 0.6rem;
          border-radius: 99px; border: 1px solid #99f6e4;
          margin-left: 0.5rem;
        }

        .feat-content {
          font-family: var(--ff-serif);
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: var(--navy);
          line-height: 1.75;
          margin: 0 0 1.25rem;
          font-style: italic;
        }

        .treatment-tag {
          display: inline-block;
          font-family: var(--ff-ui); font-size: 0.72rem;
          font-weight: 600; color: var(--slate);
          background: #f1f5f9; border: 1px solid var(--border);
          padding: 0.3rem 0.8rem; border-radius: 99px;
          margin-bottom: 1.5rem;
        }

        .feat-author {
          display: flex; align-items: center; gap: 0.85rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }
        .avatar {
          width: 48px; height: 48px; border-radius: 50%;
          background: var(--av-color);
          color: #fff;
          font-family: var(--ff-ui); font-size: 0.85rem; font-weight: 700;
          display: grid; place-items: center;
          flex-shrink: 0;
          opacity: 0.9;
        }
        .author-name {
          font-family: var(--ff-ui); font-size: 0.88rem;
          font-weight: 700; color: var(--navy); margin: 0 0 0.15rem;
        }
        .author-meta {
          font-family: var(--ff-ui); font-size: 0.7rem;
          color: var(--slate); margin: 0;
        }
        .author-date {
          margin-left: auto;
          font-family: var(--ff-ui); font-size: 0.68rem;
          color: var(--slate);
        }

        /* ── dots ── */
        .dots-row { display:flex; gap:0.5rem; }
        .dot {
          width:8px; height:8px; border-radius:99px;
          background: #ffffff30; border:none; cursor:pointer;
          transition: all 0.3s;
        }
        .dot.active { background:#5eead4; width:24px; }

        /* ── thumbnail strip ── */
        .thumb-strip {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          max-width: 820px;
        }
        .thumb-card {
          display: flex; align-items: center; gap: 0.6rem;
          background: #ffffff0d; border: 1.5px solid #ffffff15;
          border-radius: 0.85rem; padding: 0.6rem 1rem;
          cursor: pointer; transition: all 0.2s;
        }
        .thumb-card:hover { background:#ffffff18; border-color:#ffffff30; }
        .thumb-card.active { background:#5eead415; border-color:#5eead4; }
        .thumb-avatar {
          width:32px; height:32px; border-radius:50%;
          background: var(--av-color); color:#fff;
          font-family:var(--ff-ui); font-size:0.7rem; font-weight:700;
          display:grid; place-items:center; flex-shrink:0; opacity:0.85;
        }
        .thumb-name {
          font-family:var(--ff-ui); font-size:0.75rem;
          font-weight:700; color:#fff; margin:0 0 0.1rem;
        }
        .thumb-dept {
          font-family:var(--ff-ui); font-size:0.62rem;
          color:#94a3b8; margin:0;
        }

        /* ── stats band ── */
        .stats-band {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 1rem;
          padding: 2.5rem 2rem;
          background: #ffffff0a;
          backdrop-filter: blur(8px);
          border: 1px solid #ffffff15;
          border-radius: 1.5rem;
        }
        @media(max-width:700px){ .stats-band{ grid-template-columns:repeat(2,1fr); } }

        .stat-block {
          text-align: center;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s ease var(--sd), transform 0.5s ease var(--sd);
        }
        .stat-block.stat-reveal { opacity:1; transform:none; }
        .stat-emoji { font-size:1.6rem; }
        .stat-value {
          font-family: var(--ff-serif);
          font-size: 2.2rem; font-weight: 800;
          color: #5eead4; margin: 0.3rem 0 0.2rem;
          letter-spacing: -0.02em;
        }
        .stat-label {
          font-family: var(--ff-ui); font-size: 0.75rem;
          font-weight: 600; color: #94a3b8;
          text-transform: uppercase; letter-spacing: 0.07em;
        }
      `}</style>
    </section>
  );
}
