"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const stats = [
  { value: "20+", label: "Hours Served",     icon: "🕐" },
  { value: "65+",  label: "Specialists",       icon: "👨‍⚕️" },
  { value: "100k+", label: "Patients Treated",  icon: "❤️" },
  { value: "98%",  label: "Satisfaction Rate", icon: "⭐" },
];

const features = [
  { icon: "🩺", title: "Preventive Care",    desc: "Annual check-ups, screenings & early detection programs" },
  { icon: "🏥", title: "Emergency Services", desc: "24/7 urgent care with rapid response teams" },
  { icon: "💊", title: "Pharmacy & Labs",    desc: "On-site diagnostics, imaging & prescription services" },
  { icon: "🧠", title: "Mental Wellness",    desc: "Counseling, therapy & psychiatric support programs" },
];

const specialties = [
  "Cardiology", "Pediatrics",  "Oncology",
  "Neurology",  "Orthopedics", "Dermatology",
];

export function Hero() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mounted,       setMounted]       = useState(false);

  // FIX A — NodeJS.Timeout → ReturnType<typeof setInterval> (works in both Node & browser)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // FIX B — useLayoutEffect for synchronous mount flag (no React 19 error)
  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // setInterval callback is async — useEffect is fine here
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveFeature((p) => (p + 1) % features.length);
    }, 2800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="hero-root">
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      {/* FIX C — nav-pill was inline-flex with margin:auto which doesn't centre;
                  wrapping it in a flex container fixes centring */}
      <div className="nav-pill-wrap">
        <div className="nav-pill">
          <span className="pulse-dot" />
          Emergency line open — <strong>+1 800 MED CARE</strong>
        </div>
      </div>

      {/* ══ MAIN GRID ══ */}
      <div className="hero-grid">

        {/* Left */}
        <div className={`hero-left ${mounted ? "fade-in" : ""}`}>
          <div className="badge">
            <span className="badge-icon">🏆</span>
            Ranked #1 Medical Clinic · 2026
          </div>

          <h1 className="hero-heading">
            Your Health,{" "}
            <span className="heading-accent">
              Our
              <svg className="underline-svg" viewBox="0 0 260 18" fill="none" aria-hidden="true">
                <path
                  d="M2 14 C60 4 200 4 258 14"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Priority
          </h1>

          <p className="hero-sub">
            Comprehensive, compassionate care from board-certified specialists.
            From routine check-ups to complex procedures — we are with you at
            every step of your journey to wellness.
          </p>

          <div className="chips-row">
            {specialties.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>

          <div className="cta-row">
            {/* FIX D — was <button>, can't navigate; use <Link> */}
            <Link href="/appointment" className="btn-primary">
              <span>Book an Appointment</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <button type="button" className="btn-ghost">
              <span className="play-icon" aria-hidden="true">▶</span>
              Watch Our Story
            </button>
          </div>

          <div className="stats-row">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <span className="stat-icon">{s.icon}</span>
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className={`hero-right ${mounted ? "fade-in-right" : ""}`}>
          <div className="img-wrapper">
            {/* FIX E — position:absolute+inset:0 breaks Next.js fill;
                        must be position:relative with explicit width+height */}
            <div className="img-frame">
              <Image
                src="/hero-medical.jpg"
                alt="Healthcare professionals caring for a patient"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="hero-img"
                priority
              />
              <div className="img-overlay" />
            </div>

            <div className="float-card card-avail">
              <div className="avail-dot" />
              <div>
                <p className="card-title">Doctors Available</p>
                <p className="card-sub">Next slot in 12 min</p>
              </div>
            </div>

            <div className="float-card card-rating">
              <div className="stars">★★★★★</div>
              <p className="card-title">4.9 / 5.0</p>
              <p className="card-sub">1,200+ reviews</p>
            </div>

            <div className="float-card card-feature">
              <span className="feature-icon">{features[activeFeature].icon}</span>
              <div>
                <p className="card-title">{features[activeFeature].title}</p>
                <p className="card-sub">{features[activeFeature].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature strip */}
      <div className="feature-strip">
        {features.map((f, i) => (
          <button
            key={f.title}
            type="button"
            className={`feature-item ${activeFeature === i ? "active" : ""}`}
            onClick={() => setActiveFeature(i)}
            aria-pressed={activeFeature === i}
          >
            <span className="fi-icon">{f.icon}</span>
            <div>
              <p className="fi-title">{f.title}</p>
              <p className="fi-desc">{f.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        .hero-root {
          --teal:   #0d9488;
          --teal-d: #0f766e;
          --teal-l: #ccfbf1;
          --sky:    #0ea5e9;
          --navy:   #0f2b4b;
          --slate:  #475569;
          --white:  #ffffff;
          --card-bg:#ffffffee;
          --radius: 1.25rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, #f0fdfa 0%, #e0f2fe 60%, #f8fafc 100%);
          padding: 0 1.5rem;
          min-height: 100vh;
        }

        .bg-blob { position:absolute;border-radius:50%;filter:blur(80px);opacity:0.35;pointer-events:none; }
        .blob-1  { width:600px;height:600px;background:radial-gradient(circle,#5eead4,transparent);top:-200px;right:-100px; }
        .blob-2  { width:400px;height:400px;background:radial-gradient(circle,#7dd3fc,transparent);bottom:0;left:-80px; }
        .blob-3  { width:300px;height:300px;background:radial-gradient(circle,#a7f3d0,transparent);top:40%;left:38%; }

        /* FIX C — wrapper centres the pill */
        .nav-pill-wrap {
          display: flex;
          justify-content: center;
          padding-top: 1.5rem;
          position: relative;
          z-index: 2;
        }
        .nav-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--navy);
          color: #fff;
          font-size: 0.78rem;
          letter-spacing: 0.02em;
          padding: 0.45rem 1.2rem;
          border-radius: 99px;
        }

        /* FIX F — renamed from 'pulse' → 'dotPulse' to avoid keyframe name collision
                   with any global .pulse used by other components */
        .pulse-dot {
          width: 8px; height: 8px;
          background: #4ade80;
          border-radius: 50%;
          flex-shrink: 0;
          animation: dotPulse 1.8s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 0 0 #4ade8066; }
          50%      { box-shadow: 0 0 0 6px #4ade8000; }
        }

        .hero-grid {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          padding: 4rem 0 3rem;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; padding: 2.5rem 0 2rem; }
          .hero-right { order: -1; }
        }

        .hero-left, .hero-right { opacity: 0; }
        .fade-in       { animation: fadeUp   0.8s 0.1s ease forwards; }
        .fade-in-right { animation: fadeLeft 0.8s 0.3s ease forwards; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:none;} }
        @keyframes fadeLeft { from{opacity:0;transform:translateX(28px);} to{opacity:1;transform:none;} }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--teal-l);
          color: var(--teal-d);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 0.35rem 0.9rem;
          border-radius: 99px;
          border: 1px solid #5eead480;
          margin-bottom: 1.4rem;
        }

        .hero-heading {
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          color: var(--navy);
          line-height: 1.12;
          margin: 0 0 1.2rem;
          letter-spacing: -0.02em;
        }
        .heading-accent { color:var(--teal);position:relative;display:inline-block; }
        .underline-svg  { position:absolute;bottom:-6px;left:0;width:100%;height:18px;color:var(--teal);overflow:visible; }

        .hero-sub { color:var(--slate);font-size:1.08rem;line-height:1.75;max-width:480px;margin:0 0 1.5rem; }

        .chips-row { display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.8rem; }
        .chip {
          background:var(--white);border:1px solid #cbd5e1;color:var(--slate);
          font-size:0.72rem;font-weight:600;letter-spacing:0.05em;
          padding:0.28rem 0.75rem;border-radius:99px;transition:all 0.2s;cursor:default;
        }
        .chip:hover { background:var(--teal-l);border-color:var(--teal);color:var(--teal-d); }

        .cta-row { display:flex;align-items:center;gap:1.2rem;flex-wrap:wrap;margin-bottom:2.5rem; }

        /* FIX D — btn-primary is now a <Link> so needs text-decoration:none */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, var(--teal), var(--sky));
          color: #fff;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          padding: 0.85rem 2rem;
          border: none;
          border-radius: var(--radius);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 8px 30px #0d948844;
        }
        .btn-primary:hover { transform:translateY(-2px);box-shadow:0 14px 40px #0d948866; }

        .btn-ghost {
          display:inline-flex;align-items:center;gap:0.6rem;
          background:transparent;color:var(--navy);font-size:0.88rem;font-weight:600;
          border:2px solid #cbd5e1;padding:0.75rem 1.4rem;
          border-radius:var(--radius);cursor:pointer;transition:all 0.2s;
        }
        .btn-ghost:hover { border-color:var(--teal);color:var(--teal-d);background:var(--teal-l); }
        .play-icon {
          background:var(--teal-l);color:var(--teal);
          width:28px;height:28px;border-radius:50%;
          display:grid;place-items:center;font-size:0.65rem;padding-left:2px;
        }

        .stats-row {
          display:grid;grid-template-columns:repeat(4,1fr);
          gap:0.75rem;padding-top:2rem;border-top:1px solid #e2e8f0;
        }
        @media(max-width:600px){ .stats-row{grid-template-columns:repeat(2,1fr);} }
        .stat-card {
          background:var(--white);border-radius:1rem;padding:0.9rem;
          text-align:center;box-shadow:0 2px 12px #0000000d;transition:transform 0.2s;
        }
        .stat-card:hover { transform:translateY(-3px); }
        .stat-icon  { font-size:1.3rem; }
        .stat-value { font-size:1.5rem;font-weight:800;color:var(--teal-d);margin:0.2rem 0 0; }
        .stat-label { font-size:0.7rem;font-weight:600;color:var(--slate);letter-spacing:0.04em;text-transform:uppercase;margin:0; }

        .img-wrapper { position:relative;height:560px; }
        @media(max-width:900px){ .img-wrapper{height:380px;} }

        /* FIX E — position:relative + width/height:100% required for Next.js fill */
        .img-frame {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 2rem;
          overflow: hidden;
          background: linear-gradient(135deg, #d1fae5, #bae6fd);
          box-shadow: 0 30px 80px #0d948833;
        }
        .hero-img { object-fit:cover; }
        .img-overlay {
          position:absolute;inset:0;
          background:linear-gradient(to top,#0f2b4b55,transparent 60%);
          border-radius:2rem;
          pointer-events:none;
        }

        .float-card {
          position:absolute;background:var(--card-bg);
          backdrop-filter:blur(12px);border:1px solid #e2e8f0;
          border-radius:1rem;padding:0.75rem 1rem;
          box-shadow:0 8px 30px #00000015;
          display:flex;align-items:center;gap:0.6rem;
          animation:floatAnim 4s ease-in-out infinite;
          z-index:3;
        }
        @keyframes floatAnim {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-6px); }
        }
        .card-avail   { top:1.5rem;left:-1.5rem;animation-delay:0s; }
        .card-rating  { top:1.5rem;right:-1rem;flex-direction:column;align-items:center;text-align:center;animation-delay:1.4s; }
        .card-feature { bottom:2rem;left:-1.5rem;max-width:230px;animation-delay:2.6s; }

        /* FIX F cont. — avail-dot also used the name 'pulse'; renamed to avDotPulse */
        .avail-dot {
          width:10px;height:10px;background:#22c55e;
          border-radius:50%;flex-shrink:0;
          animation:avDotPulse 1.8s infinite;
        }
        @keyframes avDotPulse {
          0%,100% { box-shadow:0 0 0 0 #22c55e66; }
          50%      { box-shadow:0 0 0 6px #22c55e00; }
        }

        .stars        { color:#f59e0b;font-size:0.85rem;letter-spacing:1px; }
        .feature-icon { font-size:1.6rem;flex-shrink:0; }
        .card-title   { font-size:0.82rem;font-weight:700;color:var(--navy);margin:0; }
        .card-sub     { font-size:0.7rem;color:var(--slate);margin:0; }

        .feature-strip {
          position:relative;z-index:2;
          max-width:1280px;margin:0 auto 3rem;
          display:grid;grid-template-columns:repeat(4,1fr);gap:0.75rem;
        }
        @media(max-width:700px){ .feature-strip{grid-template-columns:repeat(2,1fr);} }
        .feature-item {
          background:var(--white);border:2px solid transparent;
          border-radius:var(--radius);padding:1.1rem;
          display:flex;align-items:flex-start;gap:0.75rem;
          cursor:pointer;text-align:left;transition:all 0.25s;
          box-shadow:0 2px 10px #00000009;
        }
        .feature-item:hover,
        .feature-item.active { border-color:var(--teal);background:var(--teal-l);box-shadow:0 6px 24px #0d948822; }
        .fi-icon  { font-size:1.5rem;flex-shrink:0;margin-top:2px; }
        .fi-title { font-size:0.85rem;font-weight:700;color:var(--navy);margin:0 0 0.2rem; }
        .fi-desc  { font-size:0.72rem;color:var(--slate);line-height:1.45;margin:0; }
      `}</style>
    </section>
  );
}