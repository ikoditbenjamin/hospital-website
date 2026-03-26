'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Calendar, Phone } from 'lucide-react'
import { BookingModal } from '@/components/BookingModal'

const navLinks = [
  { label: 'Home',     href: '/'         },
  { label: 'About Us', href: '/about'    },
  { label: 'Services', href: '/services' },
  { label: 'Blog',     href: '/blog'     },
  { label: 'FAQs',     href: '/faqs'     },
  { label: 'Contact',  href: '/contact'  },
]

export function Header() {
  const [isOpen,      setIsOpen]      = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    Promise.resolve().then(() => setIsOpen(false))
  }, [pathname])

  return (
    <>
      {/* ── TOP STRIP ── */}
      <div className="hd-strip">
        <div className="hd-strip-inner">
          <span className="hd-strip-item">
            <span className="hd-pulse" />
            Emergency: 24 / 7 Open
          </span>
          <a href="tel:+256700000000" className="hd-strip-item hd-strip-link">
            <Phone size={11} /> +256 700 000 000
          </a>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header className={`hd-root ${scrolled ? 'hd-shadow' : ''}`}>
        <nav className="hd-nav">

          {/* Logo */}
          <Link href="/" className="hd-logo">
            <div className="hd-logo-icon">JC</div>
            <div>
              <span className="hd-logo-name">JC<em>Clinic</em></span>
              <span className="hd-logo-sub">Healthcare Group</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hd-links">
            {navLinks.map(link => {
              const active = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hd-link ${active ? 'hd-link-active' : ''}`}
                >
                  {link.label}
                  <span className="hd-link-bar" />
                </Link>
              )
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hd-ctas">
            <a href="tel:+256700000000" className="hd-btn-ghost">
              <Phone size={14} /> Call Us
            </a>
            {/* ✅ Opens BookingModal */}
            <button
              type="button"
              className="hd-btn-primary"
              onClick={() => setBookingOpen(true)}
            >
              <Calendar size={14} /> Book Now
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="hd-burger"
            onClick={() => setIsOpen(o => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* ── MOBILE MENU ── */}
        <div className={`hd-mobile ${isOpen ? 'hd-mobile-open' : ''}`} aria-hidden={!isOpen}>
          <div className="hd-mobile-inner">

            <div className="hd-mob-alert">
              <span className="hd-mob-alert-dot" />
              <span>Emergency dept open 24 / 7</span>
              <a href="tel:+256700000000" className="hd-mob-alert-call">Call →</a>
            </div>

            <div className="hd-mob-links">
              {navLinks.map(link => {
                const active = pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hd-mob-link ${active ? 'hd-mob-link-active' : ''}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="hd-mob-ctas">
              <a href="tel:+256700000000" className="hd-mob-btn-outline">
                <Phone size={14} /> +256 700 000 000
              </a>
              {/* ✅ Opens BookingModal on mobile too */}
              <button
                type="button"
                className="hd-mob-btn-solid"
                onClick={() => { setIsOpen(false); setBookingOpen(true); }}
              >
                <Calendar size={14} /> Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── BOOKING MODAL ── */}
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* ══ STYLES ══ */}
      <style>{`
        :root {
          --teal:   #0d9488;
          --teal-d: #0f766e;
          --teal-l: #f0fdfa;
          --navy:   #0f2b4b;
          --slate:  #475569;
          --border: #e2e8f0;
          --white:  #ffffff;
          --ff-s:   'Georgia','Charter',serif;
          --ff-u:   'Trebuchet MS','Tahoma',sans-serif;
        }
        .hd-strip{background:var(--navy);height:34px;display:flex;align-items:center;}
        .hd-strip-inner{max-width:1280px;margin:0 auto;padding:0 1.5rem;width:100%;display:flex;align-items:center;justify-content:flex-end;gap:1.5rem;}
        .hd-strip-item{display:inline-flex;align-items:center;gap:0.4rem;font-family:var(--ff-u);font-size:0.67rem;font-weight:600;color:#94a3b8;letter-spacing:0.03em;}
        .hd-strip-link{text-decoration:none;transition:color 0.18s;}
        .hd-strip-link:hover{color:#5eead4;}
        .hd-pulse{width:7px;height:7px;background:#22c55e;border-radius:50%;display:inline-block;animation:hdPulse 1.8s ease-in-out infinite;}
        @keyframes hdPulse{0%,100%{box-shadow:0 0 0 0 #22c55e55;}50%{box-shadow:0 0 0 5px #22c55e00;}}

        .hd-root{position:sticky;top:0;z-index:50;background:rgba(255,255,255,0.97);backdrop-filter:blur(14px);border-bottom:1.5px solid var(--border);transition:box-shadow 0.25s;}
        .hd-shadow{box-shadow:0 4px 24px #0f2b4b14;}
        .hd-nav{max-width:1280px;margin:0 auto;padding:0 1.5rem;height:66px;display:flex;align-items:center;gap:1.5rem;}

        .hd-logo{display:flex;align-items:center;gap:0.65rem;text-decoration:none;flex-shrink:0;}
        .hd-logo-icon{width:40px;height:40px;background:linear-gradient(135deg,var(--teal),#0ea5e9);border-radius:10px;display:grid;place-items:center;font-family:var(--ff-s);font-size:1rem;font-weight:900;color:#fff;box-shadow:0 4px 12px #0d948840;letter-spacing:-0.03em;}
        .hd-logo-name{display:block;font-family:var(--ff-s);font-size:1.2rem;font-weight:800;color:var(--navy);line-height:1;letter-spacing:-0.02em;}
        .hd-logo-name em{color:var(--teal);font-style:normal;}
        .hd-logo-sub{display:block;font-family:var(--ff-u);font-size:0.55rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;margin-top:2px;}

        .hd-links{display:flex;align-items:center;gap:0.1rem;flex:1;justify-content:center;}
        @media(max-width:900px){.hd-links{display:none;}}
        .hd-link{position:relative;display:inline-flex;align-items:center;font-family:var(--ff-u);font-size:0.83rem;font-weight:600;color:var(--slate);padding:0.45rem 0.85rem;border-radius:0.5rem;text-decoration:none;transition:color 0.18s,background 0.18s;}
        .hd-link:hover{color:var(--teal-d);background:var(--teal-l);}
        .hd-link-active{color:var(--teal-d);background:var(--teal-l);}
        .hd-link-bar{position:absolute;bottom:3px;left:0.85rem;right:0.85rem;height:2px;background:var(--teal);border-radius:2px;transform:scaleX(0);transform-origin:left;transition:transform 0.22s ease;}
        .hd-link:hover .hd-link-bar{transform:scaleX(1);}
        .hd-link-active .hd-link-bar{transform:scaleX(1);}

        .hd-ctas{display:flex;align-items:center;gap:0.6rem;flex-shrink:0;}
        @media(max-width:900px){.hd-ctas{display:none;}}
        .hd-btn-ghost{display:inline-flex;align-items:center;gap:0.4rem;font-family:var(--ff-u);font-size:0.8rem;font-weight:600;color:var(--navy);border:1.5px solid var(--border);background:var(--white);padding:0.5rem 1rem;border-radius:0.65rem;text-decoration:none;cursor:pointer;transition:all 0.18s;}
        .hd-btn-ghost:hover{border-color:var(--teal);color:var(--teal-d);background:var(--teal-l);}
        .hd-btn-ghost svg{color:var(--teal);}
        .hd-btn-primary{display:inline-flex;align-items:center;gap:0.4rem;font-family:var(--ff-u);font-size:0.82rem;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--teal),#0ea5e9);padding:0.55rem 1.15rem;border-radius:0.65rem;border:none;cursor:pointer;box-shadow:0 4px 14px #0d948838;transition:transform 0.18s,box-shadow 0.18s;}
        .hd-btn-primary:hover{transform:translateY(-2px);box-shadow:0 7px 20px #0d948858;}

        .hd-burger{display:none;background:none;border:none;color:var(--navy);cursor:pointer;padding:0.4rem;border-radius:0.5rem;transition:background 0.18s;margin-left:auto;}
        .hd-burger:hover{background:var(--teal-l);color:var(--teal-d);}
        @media(max-width:900px){.hd-burger{display:grid;place-items:center;}}

        .hd-mobile{display:none;max-height:0;overflow:hidden;border-top:1.5px solid var(--border);background:var(--white);transition:max-height 0.35s cubic-bezier(0.4,0,0.2,1);}
        @media(max-width:900px){.hd-mobile{display:block;}}
        .hd-mobile-open{max-height:90vh;overflow-y:auto;}
        .hd-mobile-inner{padding:1.1rem 1.25rem 1.75rem;display:flex;flex-direction:column;gap:0.25rem;}

        .hd-mob-alert{display:flex;align-items:center;gap:0.55rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:0.65rem;padding:0.6rem 0.9rem;margin-bottom:0.85rem;font-family:var(--ff-u);font-size:0.72rem;font-weight:600;color:#166534;}
        .hd-mob-alert-dot{width:7px;height:7px;background:#22c55e;border-radius:50%;flex-shrink:0;animation:hdPulse 1.8s ease-in-out infinite;}
        .hd-mob-alert-call{margin-left:auto;color:var(--teal);font-weight:700;text-decoration:none;white-space:nowrap;}

        .hd-mob-links{display:flex;flex-direction:column;gap:0.1rem;margin-bottom:0.85rem;}
        .hd-mob-link{display:flex;align-items:center;font-family:var(--ff-u);font-size:0.9rem;font-weight:600;color:var(--slate);padding:0.75rem 0.9rem;border-radius:0.65rem;text-decoration:none;transition:all 0.18s;}
        .hd-mob-link:hover{background:var(--teal-l);color:var(--teal-d);}
        .hd-mob-link-active{background:var(--teal-l);color:var(--teal-d);font-weight:700;}

        .hd-mob-ctas{display:flex;flex-direction:column;gap:0.6rem;padding-top:1rem;border-top:1.5px solid var(--border);}
        .hd-mob-btn-outline{display:flex;align-items:center;justify-content:center;gap:0.4rem;font-family:var(--ff-u);font-size:0.85rem;font-weight:600;color:var(--navy);border:1.5px solid var(--border);background:var(--white);padding:0.72rem;border-radius:0.75rem;text-decoration:none;transition:all 0.18s;}
        .hd-mob-btn-outline:hover{border-color:var(--teal);color:var(--teal-d);background:var(--teal-l);}
        .hd-mob-btn-outline svg{color:var(--teal);}
        .hd-mob-btn-solid{display:flex;align-items:center;justify-content:center;gap:0.45rem;font-family:var(--ff-u);font-size:0.9rem;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--teal),#0ea5e9);padding:0.8rem;border-radius:0.75rem;border:none;cursor:pointer;box-shadow:0 4px 16px #0d948840;transition:transform 0.18s,box-shadow 0.18s;}
        .hd-mob-btn-solid:hover{transform:translateY(-1px);box-shadow:0 7px 22px #0d948860;}
      `}</style>
    </>
  )
}