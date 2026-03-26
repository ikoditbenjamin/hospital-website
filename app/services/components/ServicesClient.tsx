"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Brain,
  Baby,
  Bone,
  Eye,
  Activity,
  Stethoscope,
  Shield,
  FlaskConical,
  Ambulance,
  Users,
  Microscope,
  ArrowRight,
  CheckCircle,
  Calendar,
  Clock,
  Star,
  ChevronDown,
  Search,
  Phone,
  Award,
  Zap,
  Globe,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────── */

const departments = [
  {
    id: "cardiology",
    icon: Heart,
    label: "Cardiology",
    tagline: "Heart & Vascular Care",
    color: "#ef4444",
    bg: "#fff1f2",
    border: "#fecaca",
    desc: "Comprehensive diagnosis and treatment of heart disease, arrhythmias, hypertension, heart failure, and vascular conditions using the most advanced cardiac imaging and interventional technology available.",
    conditions: [
      "Coronary Artery Disease",
      "Heart Failure",
      "Arrhythmia",
      "Hypertension",
      "Valve Disease",
      "Peripheral Artery Disease",
    ],
    procedures: [
      "ECG & Holter Monitoring",
      "Echocardiography",
      "Coronary Angiography",
      "Cardiac Catheterisation",
      "Pacemaker Implantation",
      "Stress Testing",
    ],
    doctors: ["Dr. Amara Patel", "Dr. Nina Osei"],
    waitTime: "Same-day",
    rating: 4.9,
    reviews: 380,
  },
  {
    id: "neurology",
    icon: Brain,
    label: "Neurology",
    tagline: "Brain, Spine & Nervous System",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    desc: "Expert neurological care for conditions affecting the brain, spinal cord, and peripheral nervous system. Our team combines cutting-edge imaging with evidence-based treatment to restore quality of life.",
    conditions: [
      "Stroke & TIA",
      "Epilepsy",
      "Parkinson's Disease",
      "Migraines",
      "Multiple Sclerosis",
      "Dementia",
    ],
    procedures: [
      "MRI & CT Brain Imaging",
      "EEG Monitoring",
      "Lumbar Puncture",
      "Nerve Conduction Studies",
      "Deep Brain Stimulation Referral",
      "Botox for Migraines",
    ],
    doctors: ["Dr. Samuel Okonkwo", "Dr. Riya Mehta"],
    waitTime: "1–2 days",
    rating: 4.8,
    reviews: 240,
  },
  {
    id: "pediatrics",
    icon: Baby,
    label: "Pediatrics",
    tagline: "Child & Adolescent Health",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    desc: "Compassionate, specialist care for newborns, children, and teenagers. From routine immunisations to complex paediatric conditions, our child-friendly environment puts young patients at ease.",
    conditions: [
      "Newborn & Infant Care",
      "Growth & Development",
      "Childhood Infections",
      "Asthma & Allergies",
      "ADHD & Behavioural Health",
      "Adolescent Medicine",
    ],
    procedures: [
      "Immunisation & Vaccines",
      "Developmental Screenings",
      "Allergy Testing",
      "Hearing & Vision Tests",
      "School Health Assessments",
      "Nutrition Counselling",
    ],
    doctors: ["Dr. Linda Nguyen", "Dr. Kwame Asante"],
    waitTime: "Same-day",
    rating: 4.9,
    reviews: 510,
  },
  {
    id: "orthopedics",
    icon: Bone,
    label: "Orthopedics",
    tagline: "Bone, Joint & Sports Medicine",
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
    desc: "Surgical and non-surgical management of musculoskeletal conditions. Our orthopaedic surgeons specialise in joint replacement, fracture care, and sports injury rehabilitation.",
    conditions: [
      "Joint Pain & Arthritis",
      "Sports Injuries",
      "Fractures & Dislocations",
      "Spine Disorders",
      "Ligament & Tendon Tears",
      "Osteoporosis",
    ],
    procedures: [
      "Joint Replacement Surgery",
      "Arthroscopy",
      "Fracture Repair",
      "Physiotherapy & Rehab",
      "PRP Injections",
      "Spinal Decompression",
    ],
    doctors: ["Dr. Marcus Fernandez", "Dr. Lena Braun"],
    waitTime: "2–3 days",
    rating: 4.8,
    reviews: 290,
  },
  {
    id: "ophthalmology",
    icon: Eye,
    label: "Ophthalmology",
    tagline: "Vision & Eye Health",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    border: "#bae6fd",
    desc: "Full-spectrum eye care from routine vision testing to complex surgical interventions. Our ophthalmologists use state-of-the-art technology to protect and restore your sight.",
    conditions: [
      "Cataracts",
      "Glaucoma",
      "Diabetic Retinopathy",
      "Myopia & Hyperopia",
      "Macular Degeneration",
      "Dry Eye Syndrome",
    ],
    procedures: [
      "Comprehensive Eye Exams",
      "LASIK Evaluation",
      "Cataract Surgery",
      "Glaucoma Laser Treatment",
      "Retinal Photocoagulation",
      "Optical Coherence Tomography",
    ],
    doctors: ["Dr. Priya Sharma", "Dr. Yusuf Al-Hassan"],
    waitTime: "Same-day",
    rating: 4.9,
    reviews: 195,
  },
  {
    id: "general",
    icon: Activity,
    label: "General Medicine",
    tagline: "Primary Care & Wellness",
    color: "#10b981",
    bg: "#f0fdf4",
    border: "#a7f3d0",
    desc: "Your first point of contact for all health concerns. Our general practitioners provide preventive care, chronic disease management, travel medicine, and same-day urgent consultations.",
    conditions: [
      "Hypertension & Diabetes",
      "Respiratory Infections",
      "Chronic Disease Management",
      "Travel Medicine",
      "Fatigue & Anaemia",
      "Weight Management",
    ],
    procedures: [
      "Annual Health Screenings",
      "Blood & Urine Tests",
      "ECG",
      "Spirometry",
      "Vaccination Programmes",
      "Occupational Health Checks",
    ],
    doctors: ["Dr. James Whitfield", "Dr. Aisha Kamara"],
    waitTime: "Same-day",
    rating: 4.7,
    reviews: 620,
  },
  {
    id: "emergency",
    icon: Ambulance,
    label: "Emergency Care",
    tagline: "24 / 7 Urgent Treatment",
    color: "#f43f5e",
    bg: "#fff1f2",
    border: "#fecdd3",
    desc: "Our Level-I Emergency Department is staffed around the clock by emergency physicians, trauma surgeons, and critical care nurses equipped to handle any medical emergency.",
    conditions: [
      "Chest Pain & Heart Attack",
      "Stroke Symptoms",
      "Trauma & Fractures",
      "Severe Infections & Sepsis",
      "Breathing Difficulties",
      "Poisoning & Overdose",
    ],
    procedures: [
      "Rapid Triage & Assessment",
      "Resuscitation",
      "Emergency Surgery",
      "IV Medications & Fluids",
      "CT & X-ray Imaging",
      "ICU Admission",
    ],
    doctors: ["Dr. Rachel Torres", "Dr. Hassan Musa"],
    waitTime: "Immediate",
    rating: 4.8,
    reviews: 440,
  },
  {
    id: "diagnostics",
    icon: FlaskConical,
    label: "Diagnostics & Lab",
    tagline: "Imaging, Pathology & Screening",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    desc: "On-site diagnostic services with same-day results for most tests. Our accredited laboratory and medical imaging suite support all clinical departments with rapid, accurate diagnostics.",
    conditions: [
      "Blood Disorders",
      "Cancer Screening",
      "Hormonal Imbalances",
      "Infectious Disease Testing",
      "Genetic Screening",
      "Allergy Profiling",
    ],
    procedures: [
      "Full Blood Count & Panels",
      "MRI & CT Scanning",
      "Ultrasound Imaging",
      "Bone Density (DEXA)",
      "Biopsy & Histopathology",
      "Molecular PCR Testing",
    ],
    doctors: ["Dr. Fatima Iqbal", "Dr. Chen Wei"],
    waitTime: "Same-day results",
    rating: 4.9,
    reviews: 310,
  },
  {
    id: "preventive",
    icon: Shield,
    label: "Preventive Health",
    tagline: "Wellness & Health Optimisation",
    color: "#14b8a6",
    bg: "#f0fdfa",
    border: "#99f6e4",
    desc: "Proactive healthcare programmes designed to detect risk early and keep you at your best. From executive health packages to lifestyle medicine, we help you stay ahead of disease.",
    conditions: [
      "Cardiovascular Risk",
      "Pre-diabetes & Metabolic Syndrome",
      "Obesity & Lifestyle Disease",
      "Mental Health Screening",
      "Cancer Risk Assessment",
      "Bone Health",
    ],
    procedures: [
      "Executive Health Check",
      "Full Body Screening",
      "Nutritional Assessment",
      "Health Coaching",
      "Smoking Cessation",
      "Stress & Sleep Programmes",
    ],
    doctors: ["Dr. James Whitfield", "Dr. Nina Osei"],
    waitTime: "Next day",
    rating: 4.8,
    reviews: 175,
  },
  {
    id: "family",
    icon: Users,
    label: "Family Care",
    tagline: "Whole-Family Health Plans",
    color: "#ec4899",
    bg: "#fdf2f8",
    border: "#f9a8d4",
    desc: "Integrated health plans for every member of your family under one roof. Our family care coordinators ensure continuity of care across all ages, from newborn to elderly.",
    conditions: [
      "Family Health Plans",
      "Geriatric Care",
      "Women's Health",
      "Men's Health",
      "Adolescent Health",
      "Chronic Family Conditions",
    ],
    procedures: [
      "Family Health Assessments",
      "Coordinated Care Plans",
      "Home Visits (selected)",
      "Referral Management",
      "Prescription Management",
      "Mental Health Support",
    ],
    doctors: ["Dr. Linda Nguyen", "Dr. Aisha Kamara"],
    waitTime: "Same-day",
    rating: 4.8,
    reviews: 390,
  },
  {
    id: "dermatology",
    icon: Microscope,
    label: "Dermatology",
    tagline: "Skin, Hair & Nail Health",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    desc: "Medical and cosmetic dermatology for all skin types. From acne management to skin cancer detection, our dermatologists provide personalised, evidence-based skin care.",
    conditions: [
      "Acne & Rosacea",
      "Eczema & Psoriasis",
      "Skin Cancer Screening",
      "Alopecia",
      "Warts & Moles",
      "Pigmentation Disorders",
    ],
    procedures: [
      "Dermoscopy",
      "Skin Biopsy",
      "Mole Mapping",
      "Cryotherapy",
      "Chemical Peels",
      "Phototherapy",
    ],
    doctors: ["Dr. Sophie Nkosi", "Dr. Arjun Patel"],
    waitTime: "2–3 days",
    rating: 4.7,
    reviews: 220,
  },
  {
    id: "mental-health",
    icon: Stethoscope,
    label: "Mental Wellness",
    tagline: "Psychiatry, Therapy & Support",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    desc: "Compassionate mental health services delivered by psychiatrists, psychologists, and licensed counsellors. We treat the whole person — mind, body, and life — with dignity and discretion.",
    conditions: [
      "Depression & Anxiety",
      "PTSD & Trauma",
      "Bipolar Disorder",
      "OCD",
      "Eating Disorders",
      "Addiction & Substance Use",
    ],
    procedures: [
      "Psychiatric Assessment",
      "CBT & DBT Therapy",
      "Medication Management",
      "Group Therapy",
      "Mindfulness Programmes",
      "Crisis Support",
    ],
    doctors: ["Dr. Lena Braun", "Dr. Michael Torres"],
    waitTime: "1–2 days",
    rating: 4.9,
    reviews: 280,
  },
];

const insurers = [
  "NHIF",
  "AAR Healthcare",
  "Jubilee Insurance",
  "Britam Health",
  "UAP Old Mutual",
  "Madison Insurance",
  "CIC Insurance",
  "Self-Pay / Cash",
];

const whyChoose = [
  {
    icon: Award,
    stat: "JCI",
    label: "Gold Accredited",
    desc: "Joint Commission International — the global benchmark for clinical excellence.",
  },
  {
    icon: Clock,
    stat: "<15min",
    label: "Average Wait Time",
    desc: "Smart triage and scheduling means more time healing, less time waiting.",
  },
  {
    icon: Zap,
    stat: "65+",
    label: "Specialists On-Staff",
    desc: "Every doctor is board-certified with 10+ years clinical experience.",
  },
  {
    icon: Globe,
    stat: "12",
    label: "Clinic Locations",
    desc: "Conveniently distributed across the metro area, with telehealth options.",
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
export default function ServicesPage() {
  const [active, setActive] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [openDept, setOpenDept] = useState<string | null>(null);

  const heroSec = useInView(0.1);
  const gridSec = useInView(0.08);
  const whySec = useInView(0.08);
  const insSec = useInView(0.08);
  const ctaSec = useInView(0.08);

  const filtered = departments.filter((d) => {
    const matchFilter = !active || d.id === active;
    const matchSearch =
      !search ||
      d.label.toLowerCase().includes(search.toLowerCase()) ||
      d.tagline.toLowerCase().includes(search.toLowerCase()) ||
      d.conditions.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const selected = active ? departments.find((d) => d.id === active) : null;

  return (
    <main className="sv-root">
      {/* ══ HERO ══ */}
      <section className="sv-hero">
        <div className="sv-mesh" />
        <div className="sv-blob svb1" />
        <div className="sv-blob svb2" />

        <div
          ref={heroSec.ref}
          className={`sv-hero-inner ${heroSec.vis ? "sv-reveal" : ""}`}
        >
          <span className="sv-eyebrow">
            <span className="sv-dash" />
            What We Treat
            <span className="sv-dash" />
          </span>
          <h1 className="sv-h1">
            Every Speciality,
            <br />
            <em>One Trusted Home</em>
          </h1>
          <p className="sv-sub">
            From routine check-ups to complex surgery — our 12 departments and
            65+ specialists cover the full spectrum of medical care under one
            roof.
          </p>

          {/* search */}
          <div className="sv-search-wrap">
            <Search size={18} className="sv-search-icon" />
            <input
              type="text"
              placeholder="Search by department, condition or symptom…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActive(null);
              }}
              className="sv-search-input"
            />
            {search && (
              <button className="sv-search-clear" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          {/* hero stats */}
          <div className="sv-hero-stats">
            {[
              { v: "12", l: "Departments" },
              { v: "65+", l: "Specialists" },
              { v: "50k+", l: "Treated Yearly" },
              { v: "24/7", l: "Emergency Care" },
            ].map((s, i) => (
              <div
                key={s.l}
                className="sv-hstat"
                style={{ "--si": `${i * 0.1}s` } as React.CSSProperties}
              >
                <p className="sv-hstat-v">{s.v}</p>
                <p className="sv-hstat-l">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sv-cut" />
      </section>

      {/* ══ FILTER PILLS ══ */}
      <div className="sv-filter-bar">
        <div className="sv-filter-inner">
          <button
            className={`sv-filter-pill ${!active && !search ? "sv-pill-active" : ""}`}
            onClick={() => {
              setActive(null);
              setSearch("");
            }}
          >
            All Services
          </button>
          {departments.map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                className={`sv-filter-pill ${active === d.id ? "sv-pill-active" : ""}`}
                style={{ "--pc": d.color } as React.CSSProperties}
                onClick={() => {
                  setActive(active === d.id ? null : d.id);
                  setSearch("");
                }}
              >
                <Icon size={13} strokeWidth={1.8} />
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ SELECTED DEPARTMENT SPOTLIGHT ══ */}
      {selected && (
        <section className="sv-spotlight">
          <div className="sv-container">
            <div
              className="sv-spot-card"
              style={
                {
                  "--sc": selected.color,
                  "--sbg": selected.bg,
                  "--sbd": selected.border,
                } as React.CSSProperties
              }
            >
              <div className="sv-spot-header">
                <div className="sv-spot-icon">
                  {<selected.icon size={28} strokeWidth={1.6} />}
                </div>
                <div>
                  <span className="sv-spot-tag">{selected.tagline}</span>
                  <h2 className="sv-spot-title">{selected.label}</h2>
                </div>
                <div className="sv-spot-rating">
                  <Star size={14} className="sv-star" />
                  <strong>{selected.rating}</strong>
                  <span>({selected.reviews} reviews)</span>
                </div>
              </div>

              <p className="sv-spot-desc">{selected.desc}</p>

              <div className="sv-spot-grid">
                <div className="sv-spot-col">
                  <p className="sv-spot-col-label">Conditions We Treat</p>
                  <ul className="sv-spot-list">
                    {selected.conditions.map((c) => (
                      <li key={c}>
                        <CheckCircle size={13} /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sv-spot-col">
                  <p className="sv-spot-col-label">Procedures & Services</p>
                  <ul className="sv-spot-list">
                    {selected.procedures.map((p) => (
                      <li key={p}>
                        <CheckCircle size={13} /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sv-spot-col sv-spot-col-side">
                  <p className="sv-spot-col-label">Lead Doctors</p>
                  {selected.doctors.map((doc) => (
                    <div key={doc} className="sv-spot-doc">
                      <div
                        className="sv-spot-doc-av"
                        style={{ background: selected.color }}
                      >
                        {doc
                          .split(" ")
                          .slice(1)
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span>{doc}</span>
                    </div>
                  ))}

                  <div className="sv-spot-wait">
                    <Clock size={14} />
                    <div>
                      <p className="sv-wait-label">Typical Wait Time</p>
                      <p className="sv-wait-val">{selected.waitTime}</p>
                    </div>
                  </div>

                  <Link href="/appointment" className="sv-spot-book">
                    <Calendar size={14} /> Book This Department
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ DEPARTMENTS GRID ══ */}
      <section className="sv-grid-section">
        <div
          ref={gridSec.ref}
          className={`sv-container ${gridSec.vis ? "sv-reveal" : ""}`}
        >
          {/* result count */}
          <div className="sv-grid-header">
            <p className="sv-grid-count">
              {search
                ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`
                : active
                  ? selected?.label
                  : `All ${departments.length} Departments`}
            </p>
            {(search || active) && (
              <button
                className="sv-clear-btn"
                onClick={() => {
                  setSearch("");
                  setActive(null);
                }}
              >
                View all →
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="sv-no-results">
              <Search size={44} strokeWidth={1} />
              <p>No departments match your search.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActive(null);
                }}
              >
                Browse all services
              </button>
            </div>
          ) : (
            <div className="sv-dept-grid">
              {filtered.map((dept, i) => {
                const Icon = dept.icon;
                const isOpen = openDept === dept.id;
                return (
                  <div
                    key={dept.id}
                    className={`sv-dept-card ${active === dept.id ? "sv-dept-selected" : ""}`}
                    style={
                      {
                        "--dc": dept.color,
                        "--dbg": dept.bg,
                        "--dbd": dept.border,
                        "--di": `${i * 0.05}s`,
                      } as React.CSSProperties
                    }
                  >
                    {/* card top bar */}
                    <div className="sv-card-topbar" />

                    <div className="sv-card-head">
                      <div className="sv-card-icon">
                        <Icon size={22} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="sv-card-tag">{dept.tagline}</p>
                        <h3 className="sv-card-title">{dept.label}</h3>
                      </div>
                      <div className="sv-card-rating">
                        <Star size={11} className="sv-star-sm" />
                        {dept.rating}
                      </div>
                    </div>

                    <p className="sv-card-desc">{dept.desc}</p>

                    {/* wait time pill */}
                    <div className="sv-card-meta">
                      <span className="sv-card-wait">
                        <Clock size={11} /> {dept.waitTime}
                      </span>
                      <span className="sv-card-reviews">
                        {dept.reviews} reviews
                      </span>
                    </div>

                    {/* expandable conditions */}
                    <button
                      className="sv-card-expand"
                      onClick={() => setOpenDept(isOpen ? null : dept.id)}
                    >
                      <span>
                        {isOpen ? "Hide" : "See"} conditions & procedures
                      </span>
                      <ChevronDown
                        size={14}
                        className={`sv-expand-chev ${isOpen ? "sv-chev-open" : ""}`}
                      />
                    </button>

                    <div
                      className={`sv-card-details ${isOpen ? "sv-details-open" : ""}`}
                    >
                      <div className="sv-details-inner">
                        <div className="sv-details-col">
                          <p className="sv-details-label">Conditions</p>
                          {dept.conditions.slice(0, 4).map((c) => (
                            <div key={c} className="sv-details-item">
                              <CheckCircle size={11} /> {c}
                            </div>
                          ))}
                        </div>
                        <div className="sv-details-col">
                          <p className="sv-details-label">Procedures</p>
                          {dept.procedures.slice(0, 4).map((p) => (
                            <div key={p} className="sv-details-item">
                              <CheckCircle size={11} /> {p}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="sv-card-footer">
                      <button
                        className="sv-card-spot-btn"
                        onClick={() =>
                          setActive(active === dept.id ? null : dept.id)
                        }
                      >
                        {active === dept.id ? "Close" : "Full Overview"}
                        <ArrowRight size={13} />
                      </button>
                      <Link href="/appointment" className="sv-card-book">
                        <Calendar size={12} /> Book
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══ WHY Jidenna Medical Center ══ */}
      <section className="sv-why-section">
        <div
          ref={whySec.ref}
          className={`sv-container ${whySec.vis ? "sv-reveal" : ""}`}
        >
          <div className="sv-section-header">
            <span className="sv-section-eye sv-eye-light">Why Choose Us</span>
            <h2 className="sv-section-h2 sv-h2-light">
              The Jidenna Medical Center Standard
            </h2>
            <p className="sv-section-p sv-p-light">
              Four reasons our patients choose us — and keep coming back.
            </p>
          </div>
          <div className="sv-why-grid">
            {whyChoose.map((w, i) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.label}
                  className="sv-why-card"
                  style={{ "--wi": `${i * 0.1}s` } as React.CSSProperties}
                >
                  <div className="sv-why-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <p className="sv-why-stat">{w.stat}</p>
                  <p className="sv-why-label">{w.label}</p>
                  <p className="sv-why-desc">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ INSURERS ══ */}
      <section className="sv-ins-section">
        <div
          ref={insSec.ref}
          className={`sv-container ${insSec.vis ? "sv-reveal" : ""}`}
        >
          <div className="sv-section-header">
            <span className="sv-section-eye">Insurance & Payment</span>
            <h2 className="sv-section-h2">We Work With Your Insurer</h2>
            <p className="sv-section-p">
              We accept all major health insurance providers as well as self-pay
              and corporate billing.
            </p>
          </div>
          <div className="sv-ins-grid">
            {insurers.map((ins) => (
              <div key={ins} className="sv-ins-badge">
                <Shield size={14} />
                {ins}
              </div>
            ))}
          </div>
          <p className="sv-ins-note">
            Not sure if your plan is covered?{" "}
            <Link href="/contact" className="sv-ins-link">
              Contact our billing team →
            </Link>
          </p>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="sv-cta-section">
        <div
          ref={ctaSec.ref}
          className={`sv-container sv-cta-inner ${ctaSec.vis ? "sv-reveal" : ""}`}
        >
          <div className="sv-cta-text">
            <h2 className="sv-cta-h2">Not Sure Which Department You Need?</h2>
            <p className="sv-cta-sub">
              Our care navigators will assess your symptoms and route you to the
              right specialist — free of charge.
            </p>
          </div>
          <div className="sv-cta-btns">
            <Link href="/appointment" className="sv-cta-primary">
              <Calendar size={15} /> Book an Appointment
            </Link>
            <Link href="/contact" className="sv-cta-ghost">
              <Phone size={15} /> Speak to a Navigator
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STYLES ══ */}
      <style>{`
        .sv-root {
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

        .sv-container { max-width:1200px; margin:0 auto; }
        .sv-reveal    { animation: svFadeUp 0.75s ease forwards; }
        @keyframes svFadeUp { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:none;} }

        /* ── HERO ── */
        .sv-hero {
          position:relative;overflow:hidden;
          background:linear-gradient(145deg,#0f2b4b 0%,#1e4a7a 55%,#0a4a5c 100%);
          padding:6rem 1.5rem 9rem;text-align:center;
        }
        .sv-mesh {
          position:absolute;inset:0;
          background-image:radial-gradient(circle at 20% 30%,#5eead415 0%,transparent 45%),
                           radial-gradient(circle at 80% 70%,#0ea5e912 0%,transparent 45%);
        }
        .sv-blob  { position:absolute;border-radius:50%;filter:blur(100px);opacity:0.2;pointer-events:none; }
        .svb1 { width:460px;height:460px;background:radial-gradient(#5eead4,transparent);top:-160px;right:-80px; }
        .svb2 { width:320px;height:320px;background:radial-gradient(#7dd3fc,transparent);bottom:-60px;left:-50px; }

        .sv-hero-inner {
          position:relative;z-index:2;max-width:760px;margin:0 auto;
          opacity:0;transform:translateY(28px);
        }
        .sv-eyebrow {
          display:inline-flex;align-items:center;gap:0.6rem;
          font-family:var(--ff-u);font-size:0.7rem;font-weight:700;
          letter-spacing:0.14em;text-transform:uppercase;color:#5eead4;margin-bottom:1rem;
        }
        .sv-dash { display:inline-block;width:26px;height:2px;background:#5eead4;border-radius:2px; }
        .sv-h1 {
          font-family:var(--ff-s);font-size:clamp(2.5rem,6vw,4.2rem);
          font-weight:900;color:#fff;line-height:1.1;letter-spacing:-0.03em;margin:0 0 1rem;
        }
        .sv-h1 em { color:#5eead4;font-style:italic; }
        .sv-sub {
          font-family:var(--ff-s);font-size:1rem;color:#94a3b8;
          max-width:600px;margin:0 auto 2.5rem;line-height:1.75;
        }

        .sv-search-wrap {
          position:relative;max-width:540px;margin:0 auto 2.5rem;
          display:flex;align-items:center;
        }
        .sv-search-icon  { position:absolute;left:1rem;color:#94a3b8;pointer-events:none; }
        .sv-search-input {
          width:100%;padding:0.88rem 2.5rem 0.88rem 3rem;
          background:#ffffff12;backdrop-filter:blur(12px);
          border:1.5px solid #ffffff20;border-radius:0.9rem;
          font-family:var(--ff-u);font-size:0.88rem;color:#fff;outline:none;
          transition:border-color 0.2s,background 0.2s;
        }
        .sv-search-input::placeholder { color:#64748b; }
        .sv-search-input:focus { border-color:#5eead4;background:#ffffff18; }
        .sv-search-clear {
          position:absolute;right:1rem;color:#94a3b8;background:none;border:none;
          cursor:pointer;font-size:0.8rem;transition:color 0.2s;
        }
        .sv-search-clear:hover { color:#fff; }

        .sv-hero-stats {
          display:inline-grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;
          padding:1.5rem 2.5rem;
          background:#ffffff0e;backdrop-filter:blur(10px);
          border:1px solid #ffffff15;border-radius:1.1rem;
        }
        @media(max-width:520px){.sv-hero-stats{grid-template-columns:repeat(2,1fr);}}
        .sv-hstat { text-align:center;animation:svFadeUp 0.55s ease var(--si) both; }
        .sv-hstat-v { font-family:var(--ff-s);font-size:1.6rem;font-weight:800;color:#5eead4;margin:0 0 0.1rem; }
        .sv-hstat-l { font-family:var(--ff-u);font-size:0.6rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.07em;margin:0; }

        .sv-cut { position:absolute;bottom:-1px;left:0;right:0;height:70px;background:var(--off);clip-path:polygon(0 100%,100% 100%,100% 0); }

        /* ── FILTER BAR ── */
        .sv-filter-bar {
          background:var(--off);border-bottom:1.5px solid var(--border);
          overflow-x:auto;position:sticky;top:68px;z-index:40;
        }
        .sv-filter-inner {
          max-width:1200px;margin:0 auto;padding:0.7rem 1.5rem;
          display:flex;gap:0.4rem;min-width:max-content;
        }
        .sv-filter-pill {
          display:inline-flex;align-items:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.74rem;font-weight:600;color:var(--slate);
          padding:0.45rem 0.95rem;border-radius:99px;
          border:1.5px solid var(--border);background:var(--white);
          cursor:pointer;white-space:nowrap;transition:all 0.2s;
        }
        .sv-filter-pill svg { color:var(--pc, var(--teal)); }
        .sv-filter-pill:hover { border-color:var(--pc,var(--teal));color:var(--pc,var(--teal-d));background:color-mix(in srgb,var(--pc,var(--teal)) 8%,white); }
        .sv-pill-active { background:var(--pc,var(--teal));color:#fff;border-color:var(--pc,var(--teal)); }
        .sv-pill-active svg { color:#fff; }
        .sv-pill-active:hover { background:color-mix(in srgb,var(--pc,var(--teal)) 85%,black); }

        /* ── SPOTLIGHT ── */
        .sv-spotlight { background:var(--off);padding:2rem 1.5rem 0; }
        .sv-spot-card {
          background:var(--sbg);border:1.5px solid var(--sbd);
          border-radius:1.5rem;padding:2.25rem;
          animation:svFadeUp 0.4s ease;
        }
        .sv-spot-header {
          display:flex;align-items:center;gap:1rem;
          flex-wrap:wrap;margin-bottom:1.25rem;
        }
        .sv-spot-icon {
          width:56px;height:56px;border-radius:1rem;flex-shrink:0;
          background:var(--white);border:1.5px solid var(--sbd);
          display:grid;place-items:center;color:var(--sc);
        }
        .sv-spot-tag   { font-family:var(--ff-u);font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--sc);margin:0 0 0.2rem; }
        .sv-spot-title { font-family:var(--ff-s);font-size:1.5rem;font-weight:800;color:var(--navy);margin:0; }
        .sv-spot-rating {
          margin-left:auto;display:flex;align-items:center;gap:0.3rem;
          font-family:var(--ff-u);font-size:0.78rem;color:var(--slate);
        }
        .sv-spot-rating strong { color:var(--navy);font-weight:800; }
        .sv-star { color:#f59e0b;fill:#f59e0b; }

        .sv-spot-desc {
          font-family:var(--ff-s);font-size:0.9rem;color:var(--slate);
          line-height:1.75;margin:0 0 1.5rem;
        }
        .sv-spot-grid {
          display:grid;grid-template-columns:1fr 1fr 240px;gap:1.5rem;
        }
        @media(max-width:900px){.sv-spot-grid{grid-template-columns:1fr 1fr;}}
        @media(max-width:600px){.sv-spot-grid{grid-template-columns:1fr;}}

        .sv-spot-col-label {
          font-family:var(--ff-u);font-size:0.65rem;font-weight:700;
          letter-spacing:0.1em;text-transform:uppercase;color:var(--sc);
          margin:0 0 0.65rem;
        }
        .sv-spot-list {
          list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.45rem;
        }
        .sv-spot-list li {
          display:flex;align-items:center;gap:0.45rem;
          font-family:var(--ff-u);font-size:0.77rem;color:var(--navy);
        }
        .sv-spot-list svg { color:var(--sc);flex-shrink:0; }

        .sv-spot-col-side {
          display:flex;flex-direction:column;gap:0.75rem;
        }
        .sv-spot-doc {
          display:flex;align-items:center;gap:0.55rem;
          font-family:var(--ff-u);font-size:0.75rem;font-weight:600;color:var(--navy);
        }
        .sv-spot-doc-av {
          width:28px;height:28px;border-radius:50%;flex-shrink:0;
          display:grid;place-items:center;
          font-family:var(--ff-u);font-size:0.58rem;font-weight:800;color:#fff;
        }
        .sv-spot-wait {
          display:flex;align-items:center;gap:0.5rem;
          background:var(--white);border:1px solid var(--sbd);
          border-radius:0.65rem;padding:0.6rem 0.8rem;
        }
        .sv-spot-wait svg { color:var(--sc); }
        .sv-wait-label { font-family:var(--ff-u);font-size:0.6rem;color:var(--slate);margin:0 0 0.1rem;text-transform:uppercase;letter-spacing:0.06em; }
        .sv-wait-val   { font-family:var(--ff-u);font-size:0.82rem;font-weight:800;color:var(--navy);margin:0; }

        .sv-spot-book {
          display:flex;align-items:center;justify-content:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.8rem;font-weight:700;color:#fff;
          background:linear-gradient(135deg,var(--sc),color-mix(in srgb,var(--sc) 60%,#0ea5e9));
          padding:0.7rem;border-radius:0.7rem;text-decoration:none;
          box-shadow:0 4px 14px color-mix(in srgb,var(--sc) 30%,transparent);
          transition:transform 0.2s,box-shadow 0.2s;
        }
        .sv-spot-book:hover { transform:translateY(-2px); }

        /* ── DEPARTMENTS GRID ── */
        .sv-grid-section { background:var(--off);padding:2.5rem 1.5rem 5rem; }

        .sv-grid-header {
          display:flex;align-items:center;justify-content:space-between;
          margin-bottom:1.5rem;flex-wrap:wrap;gap:0.5rem;
        }
        .sv-grid-count  { font-family:var(--ff-s);font-size:1.05rem;font-weight:700;color:var(--navy);margin:0; }
        .sv-clear-btn   { font-family:var(--ff-u);font-size:0.75rem;font-weight:600;color:var(--teal);background:none;border:none;cursor:pointer;text-decoration:underline; }

        .sv-no-results {
          display:flex;flex-direction:column;align-items:center;gap:1rem;
          padding:4rem 2rem;text-align:center;
          background:var(--white);border-radius:1.25rem;border:1.5px solid var(--border);
          color:var(--slate);
        }
        .sv-no-results svg { color:#cbd5e1; }
        .sv-no-results p   { font-family:var(--ff-s);font-size:0.95rem;margin:0; }
        .sv-no-results button {
          font-family:var(--ff-u);font-size:0.8rem;font-weight:700;
          color:var(--teal);background:var(--teal-l);border:1.5px solid #99f6e4;
          padding:0.5rem 1.2rem;border-radius:99px;cursor:pointer;
        }

        .sv-dept-grid {
          display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;
        }
        @media(max-width:1024px){.sv-dept-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:580px) {.sv-dept-grid{grid-template-columns:1fr;}}

        .sv-dept-card {
          background:var(--white);border:1.5px solid var(--border);
          border-radius:1.25rem;overflow:hidden;
          display:flex;flex-direction:column;
          animation:svFadeUp 0.5s ease var(--di) both;
          transition:box-shadow 0.25s,border-color 0.25s,transform 0.25s;
          position:relative;
        }
        .sv-dept-card:hover {
          box-shadow:0 12px 40px color-mix(in srgb,var(--dc) 12%,transparent);
          border-color:color-mix(in srgb,var(--dc) 50%,var(--border));
          transform:translateY(-4px);
        }
        .sv-dept-selected {
          border-color:var(--dc);
          box-shadow:0 8px 30px color-mix(in srgb,var(--dc) 18%,transparent);
        }

        .sv-card-topbar {
          height:3px;width:0;
          background:linear-gradient(90deg,var(--dc),color-mix(in srgb,var(--dc) 60%,#0ea5e9));
          transition:width 0.35s ease;
        }
        .sv-dept-card:hover .sv-card-topbar { width:100%; }
        .sv-dept-selected .sv-card-topbar    { width:100%; }

        .sv-card-head {
          display:flex;align-items:center;gap:0.75rem;
          padding:1.4rem 1.4rem 0;
        }
        .sv-card-icon {
          width:46px;height:46px;border-radius:0.75rem;flex-shrink:0;
          background:var(--dbg);border:1.5px solid var(--dbd);
          display:grid;place-items:center;color:var(--dc);
          transition:all 0.22s;
        }
        .sv-dept-card:hover .sv-card-icon { background:var(--dc);color:#fff;border-color:var(--dc); }
        .sv-card-tag   { font-family:var(--ff-u);font-size:0.6rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--dc);margin:0 0 0.15rem; }
        .sv-card-title { font-family:var(--ff-s);font-size:1rem;font-weight:800;color:var(--navy);margin:0; }
        .sv-card-rating {
          margin-left:auto;font-family:var(--ff-u);font-size:0.7rem;font-weight:700;
          color:var(--slate);display:flex;align-items:center;gap:0.25rem;flex-shrink:0;
        }
        .sv-star-sm { color:#f59e0b;fill:#f59e0b; }

        .sv-card-desc {
          font-family:var(--ff-u);font-size:0.75rem;color:var(--slate);
          line-height:1.6;padding:0.85rem 1.4rem 0;margin:0;flex:1;
          display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;
        }

        .sv-card-meta {
          display:flex;align-items:center;justify-content:space-between;
          padding:0.75rem 1.4rem 0;
        }
        .sv-card-wait {
          display:inline-flex;align-items:center;gap:0.3rem;
          font-family:var(--ff-u);font-size:0.65rem;font-weight:700;
          color:var(--teal);background:var(--teal-l);
          border:1px solid #99f6e4;border-radius:99px;padding:0.2rem 0.6rem;
        }
        .sv-card-wait svg { color:var(--teal); }
        .sv-card-reviews { font-family:var(--ff-u);font-size:0.62rem;color:var(--slate); }

        /* expandable */
        .sv-card-expand {
          display:flex;align-items:center;justify-content:space-between;
          padding:0.75rem 1.4rem;background:none;border:none;border-top:1px solid var(--border);
          font-family:var(--ff-u);font-size:0.72rem;font-weight:600;color:var(--dc);
          cursor:pointer;margin-top:0.75rem;transition:background 0.2s;
        }
        .sv-card-expand:hover { background:color-mix(in srgb,var(--dc) 5%,white); }
        .sv-expand-chev { transition:transform 0.25s; }
        .sv-chev-open   { transform:rotate(180deg); }

        .sv-card-details {
          max-height:0;overflow:hidden;transition:max-height 0.35s ease;
        }
        .sv-details-open { max-height:300px; }
        .sv-details-inner {
          display:grid;grid-template-columns:1fr 1fr;gap:1rem;
          padding:0.85rem 1.4rem;background:var(--dbg);
        }
        .sv-details-label {
          font-family:var(--ff-u);font-size:0.6rem;font-weight:700;
          letter-spacing:0.08em;text-transform:uppercase;color:var(--dc);margin:0 0 0.5rem;
        }
        .sv-details-item {
          display:flex;align-items:center;gap:0.35rem;
          font-family:var(--ff-u);font-size:0.68rem;color:var(--navy);
          margin-bottom:0.35rem;
        }
        .sv-details-item svg { color:var(--dc);flex-shrink:0; }

        /* card footer */
        .sv-card-footer {
          display:flex;align-items:center;justify-content:space-between;
          padding:0.85rem 1.4rem;border-top:1px solid var(--border);
        }
        .sv-card-spot-btn {
          display:inline-flex;align-items:center;gap:0.35rem;
          font-family:var(--ff-u);font-size:0.72rem;font-weight:700;
          color:var(--dc);background:none;border:none;cursor:pointer;
          transition:gap 0.2s;
        }
        .sv-card-spot-btn:hover { gap:0.55rem; }
        .sv-card-book {
          display:inline-flex;align-items:center;gap:0.3rem;
          font-family:var(--ff-u);font-size:0.72rem;font-weight:700;color:#fff;
          background:linear-gradient(135deg,var(--teal),#0ea5e9);
          padding:0.38rem 0.85rem;border-radius:0.5rem;
          text-decoration:none;transition:transform 0.2s;
        }
        .sv-card-book:hover { transform:translateY(-1px); }

        /* ── WHY ── */
        .sv-why-section {
          background:linear-gradient(160deg,var(--navy) 0%,var(--navy-m) 100%);
          padding:5rem 1.5rem;
        }
        .sv-section-header { text-align:center;margin-bottom:3rem; }
        .sv-section-eye  {
          display:inline-block;font-family:var(--ff-u);font-size:0.7rem;font-weight:700;
          letter-spacing:0.14em;text-transform:uppercase;color:var(--teal);margin-bottom:0.5rem;
        }
        .sv-eye-light { color:#5eead4; }
        .sv-section-h2 {
          font-family:var(--ff-s);font-size:clamp(1.8rem,3.5vw,2.8rem);
          font-weight:800;color:var(--navy);letter-spacing:-0.02em;margin:0 0 0.5rem;
        }
        .sv-h2-light { color:#fff; }
        .sv-section-p  { font-family:var(--ff-s);font-size:0.9rem;color:var(--slate);max-width:500px;margin:0 auto; }
        .sv-p-light    { color:#94a3b8; }

        .sv-why-grid {
          display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;
        }
        @media(max-width:900px){.sv-why-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:480px){.sv-why-grid{grid-template-columns:1fr;}}

        .sv-why-card {
          background:#ffffff0c;backdrop-filter:blur(8px);
          border:1.5px solid #ffffff15;border-radius:1.25rem;
          padding:1.75rem 1.5rem;text-align:center;
          animation:svFadeUp 0.5s ease var(--wi) both;
          transition:border-color 0.2s,background 0.2s;
        }
        .sv-why-card:hover { background:#ffffff14;border-color:#5eead440; }
        .sv-why-icon {
          width:48px;height:48px;border-radius:0.75rem;
          background:#5eead415;border:1px solid #5eead430;
          display:grid;place-items:center;color:#5eead4;margin:0 auto 0.85rem;
        }
        .sv-why-stat  { font-family:var(--ff-s);font-size:2rem;font-weight:900;color:#5eead4;margin:0 0 0.2rem; }
        .sv-why-label { font-family:var(--ff-u);font-size:0.8rem;font-weight:700;color:#fff;margin:0 0 0.5rem; }
        .sv-why-desc  { font-family:var(--ff-u);font-size:0.72rem;color:#94a3b8;line-height:1.55;margin:0; }

        /* ── INSURANCE ── */
        .sv-ins-section { background:var(--off);padding:5rem 1.5rem; }
        .sv-ins-grid {
          display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:center;margin-bottom:1.5rem;
        }
        .sv-ins-badge {
          display:inline-flex;align-items:center;gap:0.45rem;
          font-family:var(--ff-u);font-size:0.78rem;font-weight:700;
          color:var(--navy);background:var(--white);
          border:1.5px solid var(--border);border-radius:0.75rem;
          padding:0.6rem 1.1rem;
          transition:all 0.2s;
        }
        .sv-ins-badge:hover { border-color:var(--teal);color:var(--teal-d);background:var(--teal-l); }
        .sv-ins-badge svg { color:var(--teal); }
        .sv-ins-note { text-align:center;font-family:var(--ff-u);font-size:0.8rem;color:var(--slate);margin:0; }
        .sv-ins-link { color:var(--teal);font-weight:700;text-decoration:none; }
        .sv-ins-link:hover { text-decoration:underline; }

        /* ── CTA ── */
        .sv-cta-section {
          background:linear-gradient(135deg,var(--teal) 0%,#0ea5e9 100%);
          padding:5rem 1.5rem;
          position:relative;overflow:hidden;
        }
        .sv-cta-section::before {
          content:'';position:absolute;inset:0;
          background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
        }
        .sv-cta-inner {
          display:flex;align-items:center;justify-content:space-between;
          gap:2rem;flex-wrap:wrap;position:relative;
        }
        .sv-cta-h2  { font-family:var(--ff-s);font-size:clamp(1.5rem,3vw,2.1rem);font-weight:800;color:#fff;margin:0 0 0.4rem; }
        .sv-cta-sub { font-family:var(--ff-u);font-size:0.88rem;color:#cffafe;margin:0; }
        .sv-cta-btns { display:flex;gap:0.85rem;flex-wrap:wrap;flex-shrink:0; }
        .sv-cta-primary {
          display:inline-flex;align-items:center;gap:0.45rem;
          font-family:var(--ff-u);font-size:0.88rem;font-weight:700;
          color:var(--teal);background:#fff;
          padding:0.8rem 1.75rem;border-radius:0.85rem;
          text-decoration:none;box-shadow:0 4px 20px #00000020;
          transition:transform 0.2s,box-shadow 0.2s;
        }
        .sv-cta-primary:hover { transform:translateY(-2px);box-shadow:0 8px 28px #00000030; }
        .sv-cta-ghost {
          display:inline-flex;align-items:center;gap:0.45rem;
          font-family:var(--ff-u);font-size:0.88rem;font-weight:700;
          color:#fff;background:transparent;
          border:2px solid #ffffff60;
          padding:0.8rem 1.75rem;border-radius:0.85rem;
          text-decoration:none;transition:all 0.2s;
        }
        .sv-cta-ghost:hover { border-color:#fff;background:#ffffff18; }
      `}</style>
    </main>
  );
}
