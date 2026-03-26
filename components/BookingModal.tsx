"use client";

import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────── */
type Step = 0 | 1 | 2 | 3;

interface FormData {
  // Step 1 — personal
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  // Step 2 — appointment
  department: string;
  visitType: string;
  date: string;
  time: string;
  notes: string;
}

/* ─── Data ─────────────────────────────────────── */
const departments = [
  { value: "cardiology", label: "Cardiology", emoji: "❤️" },
  { value: "neurology", label: "Neurology", emoji: "🧠" },
  { value: "pediatrics", label: "Pediatrics", emoji: "👶" },
  { value: "general", label: "General Medicine", emoji: "🩺" },
  { value: "orthopedics", label: "Orthopedics", emoji: "🦴" },
  { value: "ophthalmology", label: "Ophthalmology", emoji: "👁️" },
  { value: "dermatology", label: "Dermatology", emoji: "✨" },
  { value: "mental", label: "Mental Wellness", emoji: "🌿" },
  { value: "emergency", label: "Emergency", emoji: "🚑" },
];

const timeSlots = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

const visitTypes = [
  { value: "in-person", label: "In-Person", icon: "🏥" },
  { value: "telehealth", label: "Telehealth", icon: "💻" },
  { value: "home", label: "Home Visit", icon: "🏠" },
];

const EMPTY: FormData = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  department: "",
  visitType: "in-person",
  date: "",
  time: "",
  notes: "",
};

const STEPS = ["Your Info", "Appointment", "Review"];

/* ─── BookingModal ─────────────────────────────── */
interface Props {
  open: boolean;
  onClose: () => void;
}

export function BookingModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // reset when closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(0);
        setForm(EMPTY);
        setErrors({});
        setSubmitted(false);
        setSending(false);
      }, 350); // after close animation
    }
  }, [open]);

  const set = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = (s: Step): boolean => {
    const e: Partial<FormData> = {};
    if (s === 0) {
      if (!form.name.trim()) e.name = "Required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
        e.email = "Valid email required";
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.gender) e.gender = "Select gender";
    }
    if (s === 1) {
      if (!form.department) e.department = "Select a department";
      if (!form.date) e.date = "Pick a date";
      if (!form.time) e.time = "Pick a time";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step < 2 && validate(step as Step)) setStep((s) => (s + 1) as Step);
  };
  const back = () => setStep((s) => (s - 1) as Step);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(step as Step)) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulate API call
    setSending(false);
    setSubmitted(true);
  };

  const dept = departments.find((d) => d.value === form.department);
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`bm-backdrop ${open ? "bm-backdrop-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Drawer ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book an Appointment"
        className={`bm-drawer ${open ? "bm-drawer-open" : ""}`}
      >
        {/* Header */}
        <div className="bm-head">
          <div className="bm-head-left">
            <div className="bm-head-icon">
              <Calendar size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="bm-head-title">Book an Appointment</p>
              <p className="bm-head-sub">Takes less than 2 minutes</p>
            </div>
          </div>
          <button
            type="button"
            className="bm-close"
            onClick={onClose}
            aria-label="Close booking form"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step indicator */}
        {!submitted && (
          <div className="bm-steps">
            {STEPS.map((s, i) => (
              <div key={s} className="bm-step-item">
                <div
                  className={`bm-step-dot ${i < step ? "bm-dot-done" : i === step ? "bm-dot-active" : ""}`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`bm-step-label ${i === step ? "bm-step-label-active" : ""}`}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={`bm-step-line ${i < step ? "bm-line-done" : ""}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="bm-body">
          {submitted ? (
            /* ── Success ── */
            <div className="bm-success">
              <div className="bm-success-ring">
                <CheckCircle size={44} strokeWidth={1.5} />
              </div>
              <h3 className="bm-success-h">Appointment Requested!</h3>
              <p className="bm-success-p">
                Thank you, <strong>{form.name}</strong>. We&apos;ve received
                your <strong>{dept?.label}</strong> appointment request for{" "}
                <strong>{form.date}</strong> at <strong>{form.time}</strong>. A
                confirmation will be sent to <strong>{form.email}</strong>.
              </p>
              <div className="bm-success-details">
                {[
                  ["Department", `${dept?.emoji} ${dept?.label}`],
                  ["Visit Type", form.visitType],
                  ["Date", form.date],
                  ["Time", form.time],
                ].map(([k, v]) => (
                  <div key={k} className="bm-sd-row">
                    <span className="bm-sd-key">{k}</span>
                    <span className="bm-sd-val">{v}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="bm-btn-primary"
                onClick={onClose}
              >
                Done
              </button>
              <button
                type="button"
                className="bm-btn-text"
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setForm(EMPTY);
                }}
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              {/* ── STEP 0 — Personal Info ── */}
              {step === 0 && (
                <div className="bm-section">
                  <p className="bm-section-title">Tell us about yourself</p>

                  <div className="bm-field">
                    <label className="bm-label">
                      <User size={13} /> Full Name{" "}
                      <span className="bm-req">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Johnson"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={`bm-input ${errors.name ? "bm-input-err" : ""}`}
                    />
                    {errors.name && (
                      <p className="bm-err">
                        <AlertCircle size={11} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="bm-row">
                    <div className="bm-field">
                      <label className="bm-label">
                        <Mail size={13} /> Email{" "}
                        <span className="bm-req">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={`bm-input ${errors.email ? "bm-input-err" : ""}`}
                      />
                      {errors.email && (
                        <p className="bm-err">
                          <AlertCircle size={11} /> {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="bm-field">
                      <label className="bm-label">
                        <Phone size={13} /> Phone{" "}
                        <span className="bm-req">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+256 700 000 000"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className={`bm-input ${errors.phone ? "bm-input-err" : ""}`}
                      />
                      {errors.phone && (
                        <p className="bm-err">
                          <AlertCircle size={11} /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bm-row">
                    <div className="bm-field">
                      <label className="bm-label">
                        <Calendar size={13} /> Date of Birth
                      </label>
                      <input
                        type="date"
                        value={form.dob}
                        onChange={(e) => set("dob", e.target.value)}
                        className="bm-input"
                      />
                    </div>
                    <div className="bm-field">
                      <label className="bm-label">
                        <User size={13} /> Gender{" "}
                        <span className="bm-req">*</span>
                      </label>
                      <div className="bm-radio-row">
                        {["Male", "Female", "Other"].map((g) => (
                          <label
                            key={g}
                            className={`bm-radio ${form.gender === g ? "bm-radio-on" : ""}`}
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={form.gender === g}
                              onChange={() => set("gender", g)}
                            />
                            {g}
                          </label>
                        ))}
                      </div>
                      {errors.gender && (
                        <p className="bm-err">
                          <AlertCircle size={11} /> {errors.gender}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 1 — Appointment ── */}
              {step === 1 && (
                <div className="bm-section">
                  <p className="bm-section-title">Choose your appointment</p>

                  {/* Visit type */}
                  <div className="bm-field">
                    <label className="bm-label">Visit Type</label>
                    <div className="bm-visit-row">
                      {visitTypes.map((v) => (
                        <button
                          key={v.value}
                          type="button"
                          className={`bm-visit-card ${form.visitType === v.value ? "bm-visit-on" : ""}`}
                          onClick={() => set("visitType", v.value)}
                        >
                          <span className="bm-visit-emoji">{v.icon}</span>
                          <span className="bm-visit-label">{v.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Department */}
                  <div className="bm-field">
                    <label className="bm-label">
                      <Stethoscope size={13} /> Department{" "}
                      <span className="bm-req">*</span>
                    </label>
                    <div
                      className={`bm-dept-grid ${errors.department ? "bm-input-err" : ""}`}
                    >
                      {departments.map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          className={`bm-dept-chip ${form.department === d.value ? "bm-dept-chip-on" : ""}`}
                          onClick={() => set("department", d.value)}
                        >
                          <span>{d.emoji}</span> {d.label}
                        </button>
                      ))}
                    </div>
                    {errors.department && (
                      <p className="bm-err">
                        <AlertCircle size={11} /> {errors.department}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <div className="bm-row">
                    <div className="bm-field">
                      <label className="bm-label">
                        <Calendar size={13} /> Preferred Date{" "}
                        <span className="bm-req">*</span>
                      </label>
                      <input
                        type="date"
                        min={today}
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        className={`bm-input ${errors.date ? "bm-input-err" : ""}`}
                      />
                      {errors.date && (
                        <p className="bm-err">
                          <AlertCircle size={11} /> {errors.date}
                        </p>
                      )}
                    </div>

                    {/* Time slots */}
                    <div className="bm-field">
                      <label className="bm-label">
                        <Clock size={13} /> Preferred Time{" "}
                        <span className="bm-req">*</span>
                      </label>
                      <div
                        className={`bm-time-grid ${errors.time ? "bm-input-err" : ""}`}
                      >
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            className={`bm-time-chip ${form.time === t ? "bm-time-on" : ""}`}
                            onClick={() => set("time", t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {errors.time && (
                        <p className="bm-err">
                          <AlertCircle size={11} /> {errors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="bm-field">
                    <label className="bm-label">
                      Notes / Symptoms{" "}
                      <span className="bm-opt">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your symptoms or any concerns…"
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      className="bm-input bm-textarea"
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 2 — Review ── */}
              {step === 2 && (
                <div className="bm-section">
                  <p className="bm-section-title">Review & Confirm</p>
                  <div className="bm-review">
                    {[
                      ["Full Name", form.name],
                      ["Email", form.email],
                      ["Phone", form.phone],
                      ["Gender", form.gender || "—"],
                      ["Date of Birth", form.dob || "—"],
                      ["Visit Type", form.visitType],
                      [
                        "Department",
                        `${dept?.emoji ?? ""} ${dept?.label ?? "—"}`,
                      ],
                      ["Date", form.date],
                      ["Time", form.time],
                    ].map(([k, v]) => (
                      <div key={k} className="bm-review-row">
                        <span className="bm-review-key">{k}</span>
                        <span className="bm-review-val">{v}</span>
                      </div>
                    ))}
                    {form.notes && (
                      <div className="bm-review-row bm-review-full">
                        <span className="bm-review-key">Notes</span>
                        <span className="bm-review-val">{form.notes}</span>
                      </div>
                    )}
                  </div>
                  <div className="bm-notice">
                    <Shield size={13} />
                    Your information is encrypted and only shared with your care
                    team.
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="bm-nav">
                {step > 0 && (
                  <button type="button" className="bm-btn-back" onClick={back}>
                    <ChevronLeft size={15} /> Back
                  </button>
                )}
                {step < 2 ? (
                  <button
                    type="button"
                    className="bm-btn-primary"
                    onClick={next}
                  >
                    Continue <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bm-btn-primary bm-btn-submit"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <span className="bm-spinner" /> Booking…
                      </>
                    ) : (
                      <>
                        <CheckCircle size={15} /> Confirm Booking
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ══ STYLES ══ */}
      <style>{`
        :root {
          --bm-teal:   #0d9488;
          --bm-teal-d: #0f766e;
          --bm-teal-l: #f0fdfa;
          --bm-navy:   #0f2b4b;
          --bm-slate:  #64748b;
          --bm-border: #e2e8f0;
          --bm-white:  #ffffff;
          --bm-off:    #f8fafc;
          --bm-err:    #ef4444;
          --bm-ff-u:   'Trebuchet MS','Tahoma',sans-serif;
          --bm-ff-s:   'Georgia','Charter',serif;
        }

        /* ── Backdrop ── */
        .bm-backdrop {
          position: fixed; inset: 0; z-index: 998;
          background: #0f2b4b80;
          backdrop-filter: blur(4px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .bm-backdrop-open { opacity: 1; pointer-events: auto; }

        /* ── Drawer ── */
        .bm-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 999;
          width: 100%; max-width: 560px;
          background: var(--bm-white);
          box-shadow: -8px 0 60px #0f2b4b22;
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        .bm-drawer-open { transform: translateX(0); }
        @media(max-width:580px){ .bm-drawer{ max-width:100%; } }

        /* ── Header ── */
        .bm-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1.5px solid var(--bm-border);
          background: var(--bm-white);
          flex-shrink: 0;
        }
        .bm-head-left { display: flex; align-items: center; gap: 0.75rem; }
        .bm-head-icon {
          width: 40px; height: 40px; border-radius: 0.7rem;
          background: linear-gradient(135deg, var(--bm-teal), #0ea5e9);
          display: grid; place-items: center; color: #fff;
          box-shadow: 0 4px 12px #0d948838;
        }
        .bm-head-title { font-family:var(--bm-ff-s); font-size:0.95rem; font-weight:800; color:var(--bm-navy); margin:0 0 0.1rem; }
        .bm-head-sub   { font-family:var(--bm-ff-u); font-size:0.65rem; color:var(--bm-slate); margin:0; }
        .bm-close {
          width:34px; height:34px; border-radius:0.5rem;
          background:var(--bm-off); border:1.5px solid var(--bm-border);
          display:grid; place-items:center; color:var(--bm-slate);
          cursor:pointer; transition:all 0.18s;
        }
        .bm-close:hover { background:var(--bm-teal-l); border-color:var(--bm-teal); color:var(--bm-teal-d); }

        /* ── Steps ── */
        .bm-steps {
          display: flex; align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1.5px solid var(--bm-border);
          background: var(--bm-off);
          flex-shrink: 0;
        }
        .bm-step-item { display:flex; align-items:center; gap:0.4rem; flex:1; }
        .bm-step-dot {
          width:28px; height:28px; border-radius:50%; flex-shrink:0;
          display:grid; place-items:center;
          font-family:var(--bm-ff-u); font-size:0.7rem; font-weight:800;
          border:2px solid var(--bm-border);
          background:var(--bm-white); color:var(--bm-slate);
          transition:all 0.25s;
        }
        .bm-dot-active { background:var(--bm-teal); border-color:var(--bm-teal); color:#fff; }
        .bm-dot-done   { background:var(--bm-teal-d); border-color:var(--bm-teal-d); color:#fff; }
        .bm-step-label {
          font-family:var(--bm-ff-u); font-size:0.68rem; font-weight:600;
          color:var(--bm-slate); white-space:nowrap;
        }
        .bm-step-label-active { color:var(--bm-teal-d); font-weight:700; }
        .bm-step-line {
          flex:1; height:2px; background:var(--bm-border);
          border-radius:2px; margin:0 0.4rem;
          transition:background 0.25s;
        }
        .bm-line-done { background:var(--bm-teal); }

        /* ── Body scroll area ── */
        .bm-body {
          flex:1; overflow-y:auto; padding:1.5rem;
          scroll-behavior:smooth;
        }
        .bm-body::-webkit-scrollbar { width:4px; }
        .bm-body::-webkit-scrollbar-track { background:transparent; }
        .bm-body::-webkit-scrollbar-thumb { background:var(--bm-border); border-radius:2px; }

        /* ── Sections ── */
        .bm-section { display:flex; flex-direction:column; gap:1.1rem; }
        .bm-section-title {
          font-family:var(--bm-ff-s); font-size:1rem; font-weight:700;
          color:var(--bm-navy); margin:0 0 0.25rem;
        }

        /* ── Fields ── */
        .bm-field { display:flex; flex-direction:column; gap:0.35rem; }
        .bm-row   { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        @media(max-width:420px){ .bm-row{ grid-template-columns:1fr; } }

        .bm-label {
          display:flex; align-items:center; gap:0.3rem;
          font-family:var(--bm-ff-u); font-size:0.68rem; font-weight:700;
          letter-spacing:0.04em; text-transform:uppercase; color:var(--bm-navy);
        }
        .bm-label svg { color:var(--bm-teal); }
        .bm-req { color:var(--bm-err); }
        .bm-opt { font-weight:400; text-transform:none; color:var(--bm-slate); letter-spacing:0; }

        .bm-input {
          padding:0.68rem 0.9rem;
          border:1.5px solid var(--bm-border); border-radius:0.65rem;
          font-family:var(--bm-ff-u); font-size:0.84rem; color:var(--bm-navy);
          background:var(--bm-white); outline:none; width:100%; box-sizing:border-box;
          transition:border-color 0.18s, box-shadow 0.18s;
        }
        .bm-input:focus { border-color:var(--bm-teal); box-shadow:0 0 0 3px #0d948818; }
        .bm-input-err   { border-color:var(--bm-err) !important; }
        .bm-textarea    { resize:vertical; min-height:80px; }

        .bm-err {
          display:flex; align-items:center; gap:0.3rem;
          font-family:var(--bm-ff-u); font-size:0.63rem; color:var(--bm-err); margin:0;
        }

        /* ── Gender radio ── */
        .bm-radio-row { display:flex; gap:0.5rem; flex-wrap:wrap; }
        .bm-radio {
          display:flex; align-items:center; gap:0.3rem;
          font-family:var(--bm-ff-u); font-size:0.75rem; font-weight:600;
          color:var(--bm-slate); padding:0.4rem 0.85rem;
          border:1.5px solid var(--bm-border); border-radius:99px;
          cursor:pointer; transition:all 0.18s;
        }
        .bm-radio input { display:none; }
        .bm-radio-on { background:var(--bm-teal-l); border-color:var(--bm-teal); color:var(--bm-teal-d); }

        /* ── Visit type ── */
        .bm-visit-row { display:grid; grid-template-columns:repeat(3,1fr); gap:0.6rem; }
        .bm-visit-card {
          background:var(--bm-off); border:1.5px solid var(--bm-border);
          border-radius:0.75rem; padding:0.75rem 0.5rem;
          display:flex; flex-direction:column; align-items:center; gap:0.35rem;
          cursor:pointer; transition:all 0.18s;
        }
        .bm-visit-card:hover { border-color:var(--bm-teal); }
        .bm-visit-on  { background:var(--bm-teal-l); border-color:var(--bm-teal); }
        .bm-visit-emoji { font-size:1.4rem; }
        .bm-visit-label {
          font-family:var(--bm-ff-u); font-size:0.68rem; font-weight:700;
          color:var(--bm-navy); text-align:center;
        }

        /* ── Department chips ── */
        .bm-dept-grid {
          display:flex; flex-wrap:wrap; gap:0.45rem;
          padding:0.6rem; border:1.5px solid var(--bm-border);
          border-radius:0.75rem; background:var(--bm-off);
        }
        .bm-dept-chip {
          display:inline-flex; align-items:center; gap:0.3rem;
          font-family:var(--bm-ff-u); font-size:0.7rem; font-weight:600;
          padding:0.3rem 0.7rem; border:1.5px solid var(--bm-border);
          border-radius:99px; background:var(--bm-white);
          color:var(--bm-slate); cursor:pointer; transition:all 0.18s;
        }
        .bm-dept-chip:hover { border-color:var(--bm-teal); color:var(--bm-teal-d); }
        .bm-dept-chip-on { background:var(--bm-teal); border-color:var(--bm-teal); color:#fff; }

        /* ── Time grid ── */
        .bm-time-grid {
          display:flex; flex-wrap:wrap; gap:0.4rem;
          padding:0.5rem; border:1.5px solid var(--bm-border);
          border-radius:0.75rem; background:var(--bm-off);
          max-height:140px; overflow-y:auto;
        }
        .bm-time-chip {
          font-family:var(--bm-ff-u); font-size:0.68rem; font-weight:600;
          padding:0.28rem 0.6rem; border:1.5px solid var(--bm-border);
          border-radius:0.5rem; background:var(--bm-white);
          color:var(--bm-slate); cursor:pointer; transition:all 0.15s;
        }
        .bm-time-chip:hover { border-color:var(--bm-teal); color:var(--bm-teal-d); }
        .bm-time-on { background:var(--bm-teal); border-color:var(--bm-teal); color:#fff; }

        /* ── Review ── */
        .bm-review {
          display:grid; grid-template-columns:1fr 1fr;
          border:1.5px solid var(--bm-border); border-radius:0.85rem; overflow:hidden;
        }
        @media(max-width:400px){ .bm-review{ grid-template-columns:1fr; } }
        .bm-review-row {
          display:flex; flex-direction:column;
          padding:0.7rem 0.85rem; border-bottom:1px solid var(--bm-border);
        }
        .bm-review-row:last-child   { border-bottom:none; }
        .bm-review-full             { grid-column:1/-1; }
        .bm-review-key {
          font-family:var(--bm-ff-u); font-size:0.6rem; font-weight:700;
          letter-spacing:0.07em; text-transform:uppercase; color:var(--bm-slate);
        }
        .bm-review-val {
          font-family:var(--bm-ff-u); font-size:0.82rem; font-weight:600;
          color:var(--bm-navy); margin-top:0.15rem; text-transform:capitalize;
        }
        .bm-notice {
          display:flex; align-items:center; gap:0.4rem;
          font-family:var(--bm-ff-u); font-size:0.68rem; color:var(--bm-slate);
          background:var(--bm-teal-l); border:1px solid #99f6e4;
          border-radius:0.6rem; padding:0.6rem 0.85rem; margin-top:0.5rem;
        }
        .bm-notice svg { color:var(--bm-teal); flex-shrink:0; }

        /* ── Navigation ── */
        .bm-nav {
          display:flex; justify-content:flex-end; align-items:center; gap:0.75rem;
          padding:1.25rem 1.5rem;
          border-top:1.5px solid var(--bm-border);
          background:var(--bm-white);
          flex-shrink:0;
        }
        .bm-btn-back {
          display:inline-flex; align-items:center; gap:0.3rem;
          font-family:var(--bm-ff-u); font-size:0.82rem; font-weight:600;
          color:var(--bm-slate); background:none;
          border:1.5px solid var(--bm-border); border-radius:0.65rem;
          padding:0.62rem 1.2rem; cursor:pointer; transition:all 0.18s;
        }
        .bm-btn-back:hover { border-color:var(--bm-teal); color:var(--bm-teal-d); background:var(--bm-teal-l); }

        .bm-btn-primary {
          display:inline-flex; align-items:center; gap:0.4rem;
          font-family:var(--bm-ff-u); font-size:0.85rem; font-weight:700;
          color:#fff; background:linear-gradient(135deg,var(--bm-teal),#0ea5e9);
          border:none; padding:0.7rem 1.6rem; border-radius:0.65rem;
          cursor:pointer; box-shadow:0 4px 16px #0d948838;
          transition:transform 0.18s, box-shadow 0.18s;
        }
        .bm-btn-primary:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 7px 22px #0d948858; }
        .bm-btn-primary:disabled { opacity:0.65; cursor:not-allowed; }
        .bm-btn-submit { background:linear-gradient(135deg,#059669,var(--bm-teal)); }

        .bm-spinner {
          width:15px; height:15px; border-radius:50%;
          border:2px solid #ffffff40; border-top-color:#fff;
          animation:bmSpin 0.7s linear infinite;
        }
        @keyframes bmSpin{ to{ transform:rotate(360deg); } }

        /* ── Success ── */
        .bm-success {
          display:flex; flex-direction:column;
          align-items:center; text-align:center; gap:1rem; padding:1rem 0;
        }
        .bm-success-ring {
          width:80px; height:80px; border-radius:50%;
          background:var(--bm-teal-l); border:2px solid #99f6e4;
          display:grid; place-items:center; color:var(--bm-teal);
          animation:bmPop 0.5s ease;
        }
        @keyframes bmPop { from{transform:scale(0.5);opacity:0;} to{transform:scale(1);opacity:1;} }
        .bm-success-h {
          font-family:var(--bm-ff-s); font-size:1.4rem; font-weight:800;
          color:var(--bm-navy); margin:0;
        }
        .bm-success-p {
          font-family:var(--bm-ff-u); font-size:0.82rem; color:var(--bm-slate);
          line-height:1.65; max-width:380px; margin:0;
        }
        .bm-success-details {
          width:100%; border:1.5px solid var(--bm-border);
          border-radius:0.85rem; overflow:hidden; text-align:left;
        }
        .bm-sd-row {
          display:flex; justify-content:space-between; align-items:center;
          padding:0.65rem 0.9rem; border-bottom:1px solid var(--bm-border);
        }
        .bm-sd-row:last-child { border-bottom:none; }
        .bm-sd-key { font-family:var(--bm-ff-u); font-size:0.68rem; color:var(--bm-slate); font-weight:600; }
        .bm-sd-val { font-family:var(--bm-ff-u); font-size:0.8rem; color:var(--bm-navy); font-weight:700; }

        .bm-btn-text {
          font-family:var(--bm-ff-u); font-size:0.75rem; font-weight:600;
          color:var(--bm-teal); background:none; border:none;
          cursor:pointer; text-decoration:underline;
        }
      `}</style>
    </>
  );
}
