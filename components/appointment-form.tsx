"use client";

import { useState } from "react";
import {
  User, Mail, Phone, Calendar, Clock, Stethoscope,
  FileText, CheckCircle, ChevronRight, MapPin, Shield,
} from "lucide-react";

const services = [
  { value: "cardiology",     label: "Cardiology",        emoji: "❤️" },
  { value: "neurology",      label: "Neurology",         emoji: "🧠" },
  { value: "general",        label: "General Medicine",  emoji: "🩺" },
  { value: "pediatrics",     label: "Pediatrics",        emoji: "👶" },
  { value: "orthopedics",    label: "Orthopedics",       emoji: "🦴" },
  { value: "ophthalmology",  label: "Ophthalmology",     emoji: "👁️" },
  { value: "family",         label: "Family Care",       emoji: "👨‍👩‍👧" },
  { value: "emergency",      label: "Emergency",         emoji: "🚑" },
  { value: "mental",         label: "Mental Wellness",   emoji: "🌿" },
  { value: "dermatology",    label: "Dermatology",       emoji: "✨" },
];

const timeSlots = [
  "08:00 AM","08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM","12:00 PM","01:00 PM","01:30 PM","02:00 PM",
  "02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM",
];

const insurances = ["NHIF","AAR Healthcare","Jubilee Insurance","Britam","UAP","Self-Pay / Cash","Other"];

const steps = ["Personal Info", "Appointment", "Review"];

type FormData = {
  name: string; email: string; phone: string; gender: string;
  dob: string; service: string; doctor: string; date: string;
  time: string; visitType: string; insurance: string; message: string;
};

const empty: FormData = {
  name:"", email:"", phone:"", gender:"", dob:"",
  service:"", doctor:"", date:"", time:"",
  visitType:"in-person", insurance:"", message:"",
};

export function AppointmentForm() {
  const [step, setStep]         = useState(0);
  const [form, setForm]         = useState<FormData>(empty);
  const [submitted, setSubmit]  = useState(false);
  const [errors, setErrors]     = useState<Partial<FormData>>({});

  const set = (field: keyof FormData, value: string) => {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => ({ ...p, [field]: "" }));
  };

  const validateStep = (s: number) => {
    const e: Partial<FormData> = {};
    if (s === 0) {
      if (!form.name)    e.name    = "Full name is required";
      if (!form.email)   e.email   = "Email is required";
      if (!form.phone)   e.phone   = "Phone is required";
      if (!form.gender)  e.gender  = "Please select gender";
    }
    if (s === 1) {
      if (!form.service) e.service = "Please choose a service";
      if (!form.date)    e.date    = "Pick a date";
      if (!form.time)    e.time    = "Pick a time slot";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      console.log("Appointment submitted:", form);
      setSubmit(true);
    }
  };

  const selectedService = services.find(s => s.value === form.service);

  return (
    <section className="appt-root">
      {/* bg deco */}
      <div className="appt-blob blob1" />
      <div className="appt-blob blob2" />

      <div className="appt-inner">

        {/* ══ LEFT PANEL ══ */}
        <div className="left-panel">
          <div className="left-top">
            <span className="left-eyebrow">Healthcare Portal</span>
            <h2 className="left-title">Book Your<br /><em>Appointment</em></h2>
            <p className="left-sub">
              Secure, hassle-free scheduling with our specialists. Most appointments confirmed within 2 hours.
            </p>
          </div>

          {/* why-us points */}
          <div className="why-list">
            {[
              { icon: "⚡", label: "Fast Confirmation", sub: "Response within 2 hours" },
              { icon: "🔒", label: "Private & Secure",  sub: "Your data stays confidential" },
              { icon: "📋", label: "Digital Records",   sub: "Access your history online" },
              { icon: "🌍", label: "Multiple Locations",sub: "City-wide clinic network" },
            ].map(w => (
              <div key={w.label} className="why-item">
                <span className="why-icon">{w.icon}</span>
                <div>
                  <p className="why-label">{w.label}</p>
                  <p className="why-sub">{w.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* contact strip */}
          <div className="contact-strip">
            <div className="contact-item">
              <Phone size={14} />
              <span>+1 800 MED CARE</span>
            </div>
            <div className="contact-item">
              <MapPin size={14} />
              <span>12 Health Ave, Medical District</span>
            </div>
            <div className="contact-item">
              <Shield size={14} />
              <span>NHIF & 6 insurers accepted</span>
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="right-panel">

          {submitted ? (
            /* ── SUCCESS STATE ── */
            <div className="success-state">
              <div className="success-icon"><CheckCircle size={48} strokeWidth={1.5} /></div>
              <h3 className="success-title">Appointment Requested!</h3>
              <p className="success-body">
                Thank you, <strong>{form.name}</strong>. We have received your request for{" "}
                <strong>{selectedService?.label}</strong> on{" "}
                <strong>{form.date}</strong> at <strong>{form.time}</strong>.
                A confirmation will be sent to <strong>{form.email}</strong>.
              </p>
              <button className="btn-primary" onClick={() => { setSubmit(false); setForm(empty); setStep(0); }}>
                Book Another
              </button>
            </div>
          ) : (
            <>
              {/* ── STEPPER ── */}
              <div className="stepper">
                {steps.map((s, i) => (
                  <div key={s} className="step-item">
                    <div className={`step-dot ${i < step ? "done" : i === step ? "active" : ""}`}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span className={`step-label ${i === step ? "active" : ""}`}>{s}</span>
                    {i < steps.length - 1 && <div className={`step-line ${i < step ? "done" : ""}`} />}
                  </div>
                ))}
              </div>

              <form onSubmit={submit} noValidate>

                {/* ══ STEP 0 — Personal Info ══ */}
                {step === 0 && (
                  <div className="form-step">
                    <p className="step-heading">Tell us about yourself</p>

                    <Field label="Full Name" icon={<User size={15} />} error={errors.name}>
                      <input
                        type="text" placeholder="e.g. John Doe"
                        value={form.name} onChange={e => set("name", e.target.value)}
                        className={`appt-input ${errors.name ? "input-err" : ""}`}
                      />
                    </Field>

                    <div className="two-col">
                      <Field label="Email Address" icon={<Mail size={15} />} error={errors.email}>
                        <input
                          type="email" placeholder="you@example.com"
                          value={form.email} onChange={e => set("email", e.target.value)}
                          className={`appt-input ${errors.email ? "input-err" : ""}`}
                        />
                      </Field>
                      <Field label="Phone Number" icon={<Phone size={15} />} error={errors.phone}>
                        <input
                          type="tel" placeholder="+1 (555) 000-0000"
                          value={form.phone} onChange={e => set("phone", e.target.value)}
                          className={`appt-input ${errors.phone ? "input-err" : ""}`}
                        />
                      </Field>
                    </div>

                    <div className="two-col">
                      <Field label="Date of Birth" icon={<Calendar size={15} />} error={errors.dob}>
                        <input
                          type="date"
                          value={form.dob} onChange={e => set("dob", e.target.value)}
                          className="appt-input"
                        />
                      </Field>
                      <Field label="Gender" icon={<User size={15} />} error={errors.gender}>
                        <div className="radio-row">
                          {["Male","Female","Other"].map(g => (
                            <label key={g} className={`radio-pill ${form.gender === g ? "selected" : ""}`}>
                              <input type="radio" name="gender" value={g}
                                checked={form.gender === g}
                                onChange={() => set("gender", g)} />
                              {g}
                            </label>
                          ))}
                        </div>
                        {errors.gender && <p className="field-err">{errors.gender}</p>}
                      </Field>
                    </div>

                    <Field label="Insurance Provider" icon={<Shield size={15} />}>
                      <select value={form.insurance} onChange={e => set("insurance", e.target.value)} className="appt-input">
                        <option value="">Select insurance (optional)</option>
                        {insurances.map(ins => <option key={ins} value={ins}>{ins}</option>)}
                      </select>
                    </Field>
                  </div>
                )}

                {/* ══ STEP 1 — Appointment Details ══ */}
                {step === 1 && (
                  <div className="form-step">
                    <p className="step-heading">Choose your appointment</p>

                    {/* visit type */}
                    <div className="visit-row">
                      {[
                        { val: "in-person", label: "In-Person Visit", icon: "🏥" },
                        { val: "telehealth", label: "Telehealth / Video", icon: "💻" },
                        { val: "home",       label: "Home Visit",        icon: "🏠" },
                      ].map(v => (
                        <button key={v.val} type="button"
                          className={`visit-card ${form.visitType === v.val ? "active" : ""}`}
                          onClick={() => set("visitType", v.val)}>
                          <span className="visit-emoji">{v.icon}</span>
                          <span className="visit-label">{v.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* service selector */}
                    <div className="field-wrap">
                      <label className="field-label">
                        <Stethoscope size={15} /> Department / Service
                      </label>
                      <div className={`service-grid ${errors.service ? "input-err" : ""}`}>
                        {services.map(s => (
                          <button key={s.value} type="button"
                            className={`svc-chip ${form.service === s.value ? "active" : ""}`}
                            onClick={() => set("service", s.value)}>
                            <span>{s.emoji}</span> {s.label}
                          </button>
                        ))}
                      </div>
                      {errors.service && <p className="field-err">{errors.service}</p>}
                    </div>

                    <div className="two-col">
                      <Field label="Preferred Date" icon={<Calendar size={15} />} error={errors.date}>
                        <input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={form.date} onChange={e => set("date", e.target.value)}
                          className={`appt-input ${errors.date ? "input-err" : ""}`}
                        />
                      </Field>
                      <div className="field-wrap">
                        <label className="field-label"><Clock size={15} /> Preferred Time</label>
                        <div className={`time-grid ${errors.time ? "input-err" : ""}`}>
                          {timeSlots.map(t => (
                            <button key={t} type="button"
                              className={`time-chip ${form.time === t ? "active" : ""}`}
                              onClick={() => set("time", t)}>
                              {t}
                            </button>
                          ))}
                        </div>
                        {errors.time && <p className="field-err">{errors.time}</p>}
                      </div>
                    </div>

                    <Field label="Additional Notes / Symptoms" icon={<FileText size={15} />}>
                      <textarea
                        placeholder="Describe your symptoms, concerns, or anything we should know..."
                        rows={3}
                        value={form.message} onChange={e => set("message", e.target.value)}
                        className="appt-input appt-textarea"
                      />
                    </Field>
                  </div>
                )}

                {/* ══ STEP 2 — Review ══ */}
                {step === 2 && (
                  <div className="form-step">
                    <p className="step-heading">Review & Confirm</p>
                    <div className="review-grid">
                      {[
                        ["Full Name",    form.name],
                        ["Email",        form.email],
                        ["Phone",        form.phone],
                        ["Gender",       form.gender || "—"],
                        ["Date of Birth",form.dob   || "—"],
                        ["Insurance",    form.insurance || "Self-Pay"],
                        ["Visit Type",   form.visitType],
                        ["Department",   selectedService?.label || "—"],
                        ["Date",         form.date],
                        ["Time",         form.time],
                      ].map(([k, v]) => (
                        <div key={k} className="review-row">
                          <span className="review-key">{k}</span>
                          <span className="review-val">{v}</span>
                        </div>
                      ))}
                      {form.message && (
                        <div className="review-row full-span">
                          <span className="review-key">Notes</span>
                          <span className="review-val">{form.message}</span>
                        </div>
                      )}
                    </div>
                    <p className="review-notice">
                      🔒 Your information is encrypted and will only be shared with your care team.
                    </p>
                  </div>
                )}

                {/* ── navigation ── */}
                <div className="form-nav">
                  {step > 0 && (
                    <button type="button" className="btn-back" onClick={back}>
                      ← Back
                    </button>
                  )}
                  {step < 2 ? (
                    <button type="button" className="btn-primary" onClick={next}>
                      Continue <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button type="submit" className="btn-primary btn-submit">
                      ✓ Confirm Appointment
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* ══ STYLES ══ */}
      <style>{`
        .appt-root {
          --teal:   #0d9488;
          --teal-d: #0f766e;
          --teal-l: #f0fdfa;
          --navy:   #0f2b4b;
          --slate:  #64748b;
          --border: #e2e8f0;
          --err:    #ef4444;
          --white:  #ffffff;
          --bg:     #f8fafc;
          --radius: 1rem;
          --ff-serif: 'Georgia','Charter',serif;
          --ff-ui:    'Trebuchet MS','Tahoma',sans-serif;

          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #f0fdfa 0%, #e0f2fe 50%, #f8fafc 100%);
          padding: 5rem 1.5rem;
        }

        .appt-blob {
          position: absolute; border-radius: 50%;
          filter: blur(100px); opacity: 0.3; pointer-events: none;
        }
        .blob1 { width:500px;height:500px; background:radial-gradient(#5eead4,transparent); top:-150px;right:-100px; }
        .blob2 { width:400px;height:400px; background:radial-gradient(#bae6fd,transparent); bottom:-100px;left:-80px; }

        .appt-inner {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media(max-width:900px){ .appt-inner{ grid-template-columns:1fr; } }

        /* ── LEFT PANEL ── */
        .left-panel {
          background: linear-gradient(160deg, var(--navy) 0%, #1e4a7a 100%);
          border-radius: 1.5rem;
          padding: 2.5rem 2rem;
          color: #fff;
          position: sticky;
          top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .left-eyebrow {
          font-family: var(--ff-ui);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #5eead4;
        }
        .left-title {
          font-family: var(--ff-serif);
          font-size: 2.1rem;
          font-weight: 800;
          line-height: 1.15;
          margin: 0.5rem 0 0;
          letter-spacing: -0.02em;
        }
        .left-title em { color: #5eead4; font-style: italic; }
        .left-sub {
          font-family: var(--ff-serif);
          font-size: 0.88rem;
          color: #94a3b8;
          line-height: 1.65;
          margin: 0.75rem 0 0;
        }

        .why-list { display:flex; flex-direction:column; gap:0.9rem; }
        .why-item { display:flex; align-items:flex-start; gap:0.75rem; }
        .why-icon { font-size:1.3rem; flex-shrink:0; margin-top:2px; }
        .why-label { font-family:var(--ff-ui); font-size:0.82rem; font-weight:700; color:#fff; margin:0 0 0.1rem; }
        .why-sub   { font-family:var(--ff-ui); font-size:0.7rem; color:#94a3b8; margin:0; }

        .contact-strip { display:flex; flex-direction:column; gap:0.6rem; border-top:1px solid #1e3a5f; padding-top:1.25rem; }
        .contact-item  { display:flex; align-items:center; gap:0.5rem; font-family:var(--ff-ui); font-size:0.72rem; color:#94a3b8; }
        .contact-item svg { color:#5eead4; flex-shrink:0; }

        /* ── RIGHT PANEL ── */
        .right-panel {
          background: var(--white);
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 8px 40px #0000000d;
          border: 1.5px solid var(--border);
        }
        @media(max-width:600px){ .right-panel{ padding:1.5rem; } }

        /* ── STEPPER ── */
        .stepper {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          gap: 0;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
        }
        .step-dot {
          width: 32px; height: 32px;
          border-radius: 50%;
          display: grid; place-items: center;
          font-family: var(--ff-ui);
          font-size: 0.78rem;
          font-weight: 700;
          flex-shrink: 0;
          border: 2px solid var(--border);
          background: var(--bg);
          color: var(--slate);
          transition: all 0.3s;
        }
        .step-dot.active { background: var(--teal); border-color: var(--teal); color: #fff; }
        .step-dot.done   { background: var(--teal-d); border-color: var(--teal-d); color: #fff; }
        .step-label {
          font-family: var(--ff-ui);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--slate);
          white-space: nowrap;
        }
        .step-label.active { color: var(--teal-d); }
        .step-line {
          flex: 1; height: 2px;
          background: var(--border);
          margin: 0 0.5rem;
          border-radius: 2px;
          transition: background 0.3s;
        }
        .step-line.done { background: var(--teal); }

        /* ── FORM STEP ── */
        .form-step { display:flex; flex-direction:column; gap:1.25rem; }
        .step-heading {
          font-family: var(--ff-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 0.25rem;
        }

        /* ── FIELD ── */
        .field-wrap { display:flex; flex-direction:column; gap:0.4rem; }
        .field-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--ff-ui);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--navy);
        }
        .field-label svg { color: var(--teal); }
        .field-err {
          font-family: var(--ff-ui);
          font-size: 0.68rem;
          color: var(--err);
          margin: 0;
        }

        .appt-input {
          width: 100%;
          padding: 0.7rem 0.9rem;
          border: 1.5px solid var(--border);
          border-radius: 0.7rem;
          font-family: var(--ff-ui);
          font-size: 0.85rem;
          color: var(--navy);
          background: var(--bg);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .appt-input:focus {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px #0d948818;
        }
        .appt-input.input-err { border-color: var(--err); }
        .appt-textarea { resize: none; }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media(max-width:540px){ .two-col{ grid-template-columns:1fr; } }

        /* ── RADIO PILLS ── */
        .radio-row { display:flex; gap:0.5rem; flex-wrap:wrap; }
        .radio-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.9rem;
          border: 1.5px solid var(--border);
          border-radius: 99px;
          font-family: var(--ff-ui);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--slate);
          cursor: pointer;
          transition: all 0.2s;
        }
        .radio-pill input { display:none; }
        .radio-pill.selected { background: var(--teal-l); border-color: var(--teal); color: var(--teal-d); }

        /* ── VISIT TYPE ── */
        .visit-row { display:grid; grid-template-columns:repeat(3,1fr); gap:0.75rem; }
        @media(max-width:480px){ .visit-row{ grid-template-columns:1fr; } }
        .visit-card {
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 0.85rem;
          padding: 0.9rem 0.5rem;
          display: flex; flex-direction: column;
          align-items: center; gap: 0.4rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .visit-card:hover { border-color: var(--teal); }
        .visit-card.active { background: var(--teal-l); border-color: var(--teal); }
        .visit-emoji { font-size:1.5rem; }
        .visit-label { font-family:var(--ff-ui); font-size:0.72rem; font-weight:700; color:var(--navy); text-align:center; }

        /* ── SERVICE GRID ── */
        .service-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0.5rem;
          border: 1.5px solid var(--border);
          border-radius: 0.85rem;
          background: var(--bg);
        }
        .service-grid.input-err { border-color: var(--err); }
        .svc-chip {
          display: flex; align-items: center; gap: 0.35rem;
          font-family: var(--ff-ui); font-size: 0.73rem; font-weight: 600;
          padding: 0.35rem 0.75rem;
          border: 1.5px solid var(--border);
          border-radius: 99px;
          background: var(--white);
          color: var(--slate);
          cursor: pointer;
          transition: all 0.2s;
        }
        .svc-chip:hover { border-color: var(--teal); color: var(--teal-d); }
        .svc-chip.active { background: var(--teal); border-color: var(--teal); color: #fff; }

        /* ── TIME GRID ── */
        .time-grid {
          display: flex; flex-wrap: wrap; gap: 0.4rem;
          padding: 0.5rem;
          border: 1.5px solid var(--border);
          border-radius: 0.85rem;
          background: var(--bg);
          max-height: 160px;
          overflow-y: auto;
        }
        .time-grid.input-err { border-color: var(--err); }
        .time-chip {
          font-family: var(--ff-ui); font-size: 0.7rem; font-weight: 600;
          padding: 0.3rem 0.6rem;
          border: 1.5px solid var(--border);
          border-radius: 0.5rem;
          background: var(--white);
          color: var(--slate);
          cursor: pointer;
          transition: all 0.15s;
        }
        .time-chip:hover  { border-color: var(--teal); color: var(--teal-d); }
        .time-chip.active { background: var(--teal); border-color: var(--teal); color: #fff; }

        /* ── REVIEW ── */
        .review-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
        }
        @media(max-width:480px){ .review-grid{ grid-template-columns:1fr; } }
        .review-row {
          display: flex; flex-direction: column;
          padding: 0.8rem 1rem;
          border-bottom: 1px solid var(--border);
        }
        .review-row:last-child { border-bottom: none; }
        .review-row.full-span { grid-column: 1 / -1; }
        .review-key {
          font-family: var(--ff-ui); font-size: 0.65rem;
          font-weight: 700; letter-spacing: 0.07em;
          text-transform: uppercase; color: var(--slate);
        }
        .review-val {
          font-family: var(--ff-ui); font-size: 0.85rem;
          font-weight: 600; color: var(--navy); margin-top: 0.15rem;
          text-transform: capitalize;
        }
        .review-notice {
          font-family: var(--ff-ui); font-size: 0.73rem;
          color: var(--slate); margin: 1rem 0 0;
          padding: 0.75rem 1rem;
          background: var(--teal-l);
          border-radius: 0.6rem;
          border-left: 3px solid var(--teal);
        }

        /* ── FORM NAV ── */
        .form-nav {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 0.85rem;
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
        .btn-back {
          font-family: var(--ff-ui); font-size: 0.85rem; font-weight: 600;
          color: var(--slate); background: none;
          border: 1.5px solid var(--border);
          padding: 0.7rem 1.4rem;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-back:hover { border-color: var(--teal); color: var(--teal-d); }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: var(--ff-ui); font-size: 0.88rem; font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, var(--teal), #0ea5e9);
          border: none;
          padding: 0.75rem 1.75rem;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 20px #0d948838;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px #0d948858; }
        .btn-submit { background: linear-gradient(135deg, #059669, var(--teal)); }

        /* ── SUCCESS ── */
        .success-state {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 3rem 1rem; gap: 1.25rem;
        }
        .success-icon { color: var(--teal); animation: popIn 0.5s ease; }
        @keyframes popIn { from{ transform:scale(0.5); opacity:0; } to{ transform:scale(1); opacity:1; } }
        .success-title {
          font-family: var(--ff-serif); font-size: 1.8rem;
          font-weight: 800; color: var(--navy); margin: 0;
        }
        .success-body {
          font-family: var(--ff-ui); font-size: 0.9rem;
          color: var(--slate); line-height: 1.65; max-width: 420px; margin: 0;
        }
      `}</style>
    </section>
  );
}

/* ── helper ── */
function Field({ label, icon, error, children }: {
  label: string; icon: React.ReactNode; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="field-wrap">
      <label className="field-label">{icon} {label}</label>
      {children}
      {error && <p className="field-err">{error}</p>}
    </div>
  );
}