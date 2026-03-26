"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  Heart,
  Brain,
  Baby,
  Activity,
  Stethoscope,
  Shield,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Mail,
  Bell,
  Star,
  Users,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────── */

const categories = [
  { label: "All", icon: BookOpen, count: 24, value: "all" },
  { label: "Heart Health", icon: Heart, count: 6, value: "heart" },
  { label: "Neurology", icon: Brain, count: 4, value: "neurology" },
  { label: "Child Health", icon: Baby, count: 5, value: "pediatrics" },
  { label: "Preventive Care", icon: Shield, count: 4, value: "preventive" },
  { label: "Wellness", icon: Activity, count: 5, value: "wellness" },
];

const featured = {
  id: 1,
  category: "heart",
  categoryLabel: "Heart Health",
  tag: "Editor's Pick",
  title: "The Silent Killer: Understanding Hypertension Before It's Too Late",
  excerpt:
    "High blood pressure affects 1 in 3 adults worldwide — yet most have no symptoms. Dr. Amara Patel walks through the warning signs, risk factors, and the simple lifestyle adjustments that can protect your heart for decades to come.",
  author: "Dr. Amara Patel",
  authorRole: "Chief Cardiologist",
  authorInitials: "AP",
  authorColor: "#ef4444",
  date: "March 14, 2025",
  readTime: "8 min read",
  views: "4.2k",
  accent: "#ef4444",
};

const posts = [
  {
    id: 2,
    category: "neurology",
    categoryLabel: "Neurology",
    title: "Migraines vs Headaches: How to Tell the Difference",
    excerpt:
      "Not every headache is a migraine — but knowing the difference could change your treatment entirely. Dr. Okonkwo explains the key diagnostic markers.",
    author: "Dr. Samuel Okonkwo",
    authorInitials: "SO",
    authorColor: "#8b5cf6",
    date: "March 10, 2025",
    readTime: "5 min read",
    views: "2.8k",
    accent: "#8b5cf6",
    trending: true,
  },
  {
    id: 3,
    category: "pediatrics",
    categoryLabel: "Child Health",
    title: "Vaccine Schedule 2025: What Every Parent Needs to Know",
    excerpt:
      "Updated immunisation timelines, new additions, and how to navigate catch-up vaccines for children who missed appointments during the pandemic.",
    author: "Dr. Linda Nguyen",
    authorInitials: "LN",
    authorColor: "#f59e0b",
    date: "March 7, 2025",
    readTime: "6 min read",
    views: "3.5k",
    accent: "#f59e0b",
    trending: false,
  },
  {
    id: 4,
    category: "preventive",
    categoryLabel: "Preventive Care",
    title: "Annual Health Screenings You Should Never Skip After 40",
    excerpt:
      "A comprehensive guide to the tests, scans, and checks that catch serious conditions early — when treatment is most effective and least disruptive.",
    author: "Dr. James Whitfield",
    authorInitials: "JW",
    authorColor: "#10b981",
    date: "March 3, 2025",
    readTime: "7 min read",
    views: "5.1k",
    accent: "#10b981",
    trending: true,
  },
  {
    id: 5,
    category: "wellness",
    categoryLabel: "Wellness",
    title: "Sleep Architecture: Why 8 Hours Isn't Always Enough",
    excerpt:
      "The quality of your sleep matters more than the quantity. We break down sleep cycles, the role of deep sleep, and evidence-based habits to improve your rest.",
    author: "Dr. Priya Sharma",
    authorInitials: "PS",
    authorColor: "#0ea5e9",
    date: "Feb 27, 2025",
    readTime: "6 min read",
    views: "2.2k",
    accent: "#0ea5e9",
    trending: false,
  },
  {
    id: 6,
    category: "heart",
    categoryLabel: "Heart Health",
    title: "Cholesterol Decoded: HDL, LDL and What Your Numbers Mean",
    excerpt:
      "Your lipid panel results can be confusing. Here is a plain-language breakdown of what each number means and when to act on it.",
    author: "Dr. Amara Patel",
    authorInitials: "AP",
    authorColor: "#ef4444",
    date: "Feb 21, 2025",
    readTime: "5 min read",
    views: "3.9k",
    accent: "#ef4444",
    trending: false,
  },
  {
    id: 7,
    category: "wellness",
    categoryLabel: "Wellness",
    title:
      "The Anti-Inflammatory Diet: A Doctor's Guide to Eating for Longevity",
    excerpt:
      "Chronic inflammation underlies most modern diseases. Dr. Whitfield shares the foods, habits, and evidence behind an anti-inflammatory lifestyle.",
    author: "Dr. James Whitfield",
    authorInitials: "JW",
    authorColor: "#10b981",
    date: "Feb 15, 2025",
    readTime: "9 min read",
    views: "6.3k",
    accent: "#10b981",
    trending: true,
  },
  {
    id: 8,
    category: "pediatrics",
    categoryLabel: "Child Health",
    title: "Screen Time and Children's Eye Health: What the Research Says",
    excerpt:
      "With children averaging 7+ hours of screen time daily, ophthalmologists are seeing a sharp rise in myopia. Here is what parents can do now.",
    author: "Dr. Priya Sharma",
    authorInitials: "PS",
    authorColor: "#0ea5e9",
    date: "Feb 10, 2025",
    readTime: "5 min read",
    views: "2.9k",
    accent: "#0ea5e9",
    trending: false,
  },
  {
    id: 9,
    category: "preventive",
    categoryLabel: "Preventive Care",
    title: "Understanding Your Blood Pressure Reading at Home",
    excerpt:
      "Home monitors are increasingly accurate — but technique matters. A step-by-step guide to getting reliable readings and when to call your doctor.",
    author: "Dr. Amara Patel",
    authorInitials: "AP",
    authorColor: "#ef4444",
    date: "Feb 5, 2025",
    readTime: "4 min read",
    views: "1.8k",
    accent: "#ef4444",
    trending: false,
  },
];

const trendingTopics = [
  "Heart Disease Prevention",
  "Mental Health",
  "Diabetes Management",
  "Cancer Screening",
  "Child Nutrition",
  "Sleep Disorders",
  "Back Pain Relief",
  "Immune Health",
];

const contributors = [
  {
    name: "Dr. Amara Patel",
    dept: "Cardiology",
    posts: 8,
    initials: "AP",
    color: "#ef4444",
  },
  {
    name: "Dr. Samuel Okonkwo",
    dept: "Neurology",
    posts: 5,
    initials: "SO",
    color: "#8b5cf6",
  },
  {
    name: "Dr. Linda Nguyen",
    dept: "Pediatrics",
    posts: 6,
    initials: "LN",
    color: "#f59e0b",
  },
  {
    name: "Dr. James Whitfield",
    dept: "General Medicine",
    posts: 5,
    initials: "JW",
    color: "#10b981",
  },
];

/* ─── ✅ FIXED useInView ─────────────────────────
   React 19 throws "Cannot access refs during render" when useRef + .current
   is used inside a hook that feeds into JSX. The fix is a CALLBACK REF:
   instead of returning a RefObject, return a useState setter as the ref.
   React calls it with the DOM element when it mounts — no .current needed.
─────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const [vis, setVis] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  // useCallback ensures the ref callback is stable across renders
  const ref = useCallback((node: Element | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold },
    );

    obs.observe(element);
    return () => obs.disconnect();
  }, [element, threshold]);

  return { ref, vis };
}

/* ─── Page ──────────────────────────────────────── */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const heroSec = useInView(0.1);
  const gridSec = useInView(0.08);
  const sidebarSec = useInView(0.08);

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const showFeatured =
    (activeCategory === "all" || activeCategory === featured.category) &&
    !searchQuery;

  return (
    <main className="blog-root">
      {/* ══ HERO ══ */}
      <section className="blog-hero">
        <div className="bh-mesh" />
        <div className="bh-blob bl1" />
        <div className="bh-blob bl2" />

        {/* ✅ ref is now a callback fn, not a RefObject — safe in React 19 */}
        <div
          ref={heroSec.ref}
          className={`bh-inner ${heroSec.vis ? "bh-reveal" : ""}`}
        >
          <span className="bh-eyebrow">
            <span className="bh-dash" />
            Health Insights
            <span className="bh-dash" />
          </span>
          <h1 className="bh-title">
            The Jidenna Medical Center
            <br />
            <em>Health Journal</em>
          </h1>
          <p className="bh-sub">
            Evidence-based articles, specialist insights, and practical wellness
            advice — written by our doctors for the patients and families we
            serve.
          </p>

          <div className="bh-search-wrap">
            <Search size={18} className="bh-search-icon" />
            <input
              type="text"
              placeholder="Search articles, topics or doctors…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bh-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="bh-clear"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="bh-stats">
            {[
              { v: "24", l: "Articles" },
              { v: "6", l: "Departments" },
              { v: "18k+", l: "Monthly Readers" },
              { v: "100%", l: "Doctor-Written" },
            ].map((s, i) => (
              <div
                key={s.l}
                className="bhs-item"
                style={{ "--bhi": `${i * 0.1}s` } as React.CSSProperties}
              >
                <p className="bhs-val">{s.v}</p>
                <p className="bhs-lbl">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bh-cut" />
      </section>

      {/* ══ CATEGORY TABS ══ */}
      <div className="cat-bar-wrap">
        <div className="cat-bar">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.value}
                type="button"
                className={`cat-tab ${activeCategory === c.value ? "cat-active" : ""}`}
                onClick={() => setActiveCategory(c.value)}
              >
                <Icon size={14} strokeWidth={1.8} />
                {c.label}
                <span className="cat-count">{c.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ FEATURED POST ══ */}
      {showFeatured && (
        <section className="feat-section">
          <div className="feat-wrap">
            <Link href={`/blog/${featured.id}`} className="feat-card">
              <div
                className="fc-img"
                style={{ "--fa": featured.accent } as React.CSSProperties}
              >
                <div className="fc-overlay" />
                <div className="fc-bg-icon">
                  <Heart size={90} strokeWidth={0.6} />
                </div>
                <span className="fc-badge">⭐ {featured.tag}</span>
                <span className="fc-cat">{featured.categoryLabel}</span>
              </div>
              <div className="fc-body">
                <div className="fc-meta">
                  <span>
                    <Calendar size={12} /> {featured.date}
                  </span>
                  <span>
                    <Clock size={12} /> {featured.readTime}
                  </span>
                  <span>
                    <Users size={12} /> {featured.views} views
                  </span>
                </div>
                <h2 className="fc-title">{featured.title}</h2>
                <p className="fc-excerpt">{featured.excerpt}</p>
                <div className="fc-footer">
                  <div className="fc-author">
                    <div
                      className="fc-avatar"
                      style={{ background: featured.authorColor }}
                    >
                      {featured.authorInitials}
                    </div>
                    <div>
                      <p className="fca-name">{featured.author}</p>
                      <p className="fca-role">{featured.authorRole}</p>
                    </div>
                  </div>
                  <span className="fc-cta">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ══ MAIN GRID + SIDEBAR ══ */}
      <section className="blog-body">
        <div className="blog-layout">
          {/* Posts column */}
          <div ref={gridSec.ref} className="posts-col">
            <div className="results-bar">
              <p className="results-title">
                {searchQuery
                  ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${searchQuery}"`
                  : activeCategory === "all"
                    ? "Latest Articles"
                    : (categories.find((c) => c.value === activeCategory)
                        ?.label ?? "Articles")}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  className="results-clear"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="no-results">
                <BookOpen size={44} strokeWidth={1} />
                <p>No articles match your search.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Browse all articles
                </button>
              </div>
            ) : (
              <div className="posts-grid">
                {filtered.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className={`post-card ${gridSec.vis ? "post-reveal" : ""}`}
                    style={
                      {
                        "--pd": `${i * 0.07}s`,
                        "--pa": post.accent,
                      } as React.CSSProperties
                    }
                  >
                    <div className="pc-img">
                      <div className="pc-bg" />
                      <span className="pc-cat">{post.categoryLabel}</span>
                      {post.trending && (
                        <span className="pc-trend">
                          <TrendingUp size={10} /> Trending
                        </span>
                      )}
                    </div>
                    <div className="pc-body">
                      <div className="pc-meta">
                        <span>
                          <Calendar size={11} /> {post.date}
                        </span>
                        <span>
                          <Clock size={11} /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="pc-title">{post.title}</h3>
                      <p className="pc-excerpt">{post.excerpt}</p>
                      <div className="pc-footer">
                        <div className="pc-author">
                          <div
                            className="pc-avatar"
                            style={{ background: post.authorColor }}
                          >
                            {post.authorInitials}
                          </div>
                          <span className="pc-name">{post.author}</span>
                        </div>
                        <span className="pc-views">{post.views} views</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filtered.length > 0 && !searchQuery && (
              <div className="load-more">
                <button type="button" className="load-more-btn">
                  Load More Articles <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside
            ref={sidebarSec.ref}
            className={`sidebar ${sidebarSec.vis ? "sb-reveal" : ""}`}
          >
            {/* Newsletter */}
            <div className="sb-card sb-dark">
              <div className="sbn-icon">
                <Bell size={20} strokeWidth={1.5} />
              </div>
              <h3 className="sb-h3 sb-h3-light">Stay Informed</h3>
              <p className="sb-p sb-p-light">
                Get the latest health articles and clinic news — no spam, ever.
              </p>
              {subscribed ? (
                <div className="sbn-success">
                  <Star size={14} /> You are subscribed!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="sbn-input"
                  />
                  <button
                    type="button"
                    className="sbn-btn"
                    onClick={() => email.includes("@") && setSubscribed(true)}
                  >
                    Subscribe <Mail size={13} />
                  </button>
                </>
              )}
            </div>

            {/* Trending Topics */}
            <div className="sb-card">
              <h3 className="sb-h3">
                <TrendingUp size={15} className="sb-icon" /> Trending Topics
              </h3>
              <div className="topics">
                {trendingTopics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="topic-tag"
                    onClick={() => setSearchQuery(t.split(" ")[0])}
                  >
                    <Tag size={10} /> {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Contributors */}
            <div className="sb-card">
              <h3 className="sb-h3">
                <Stethoscope size={15} className="sb-icon" /> Our Contributors
              </h3>
              <div className="contrib-list">
                {contributors.map((d) => (
                  <div key={d.name} className="contrib-row">
                    <div className="contrib-av" style={{ background: d.color }}>
                      {d.initials}
                    </div>
                    <div>
                      <p className="contrib-name">{d.name}</p>
                      <p className="contrib-dept">{d.dept}</p>
                    </div>
                    <span className="contrib-count">{d.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book CTA */}
            <div className="sb-card sb-cta-card">
              <div className="sbc-emoji">🩺</div>
              <h3 className="sbc-title">Have health concerns?</h3>
              <p className="sbc-body">
                Our specialists are available for same-day consultations.
              </p>
              <Link href="/appointment" className="sbc-btn">
                Book Now <ArrowRight size={13} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ══ STYLES ══ */}
      <style>{`
        .blog-root {
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

        .blog-hero {
          position:relative;overflow:hidden;
          background:linear-gradient(145deg,#0f2b4b 0%,#1e4a7a 55%,#0a4a5c 100%);
          padding:6rem 1.5rem 9rem;text-align:center;
        }
        .bh-mesh{
          position:absolute;inset:0;
          background-image:radial-gradient(circle at 15% 25%,#5eead415 0%,transparent 45%),
                           radial-gradient(circle at 85% 75%,#0ea5e912 0%,transparent 45%);
        }
        .bh-blob{position:absolute;border-radius:50%;filter:blur(100px);opacity:0.22;pointer-events:none;}
        .bl1{width:480px;height:480px;background:radial-gradient(#5eead4,transparent);top:-180px;right:-80px;}
        .bl2{width:340px;height:340px;background:radial-gradient(#7dd3fc,transparent);bottom:-60px;left:-60px;}

        .bh-inner{position:relative;z-index:2;max-width:780px;margin:0 auto;opacity:0;transform:translateY(28px);}
        .bh-reveal{animation:blogFadeUp 0.75s ease forwards;}
        @keyframes blogFadeUp{to{opacity:1;transform:none;}}

        .bh-eyebrow{
          display:inline-flex;align-items:center;gap:0.6rem;
          font-family:var(--ff-u);font-size:0.7rem;font-weight:700;
          letter-spacing:0.14em;text-transform:uppercase;color:#5eead4;margin-bottom:1.1rem;
        }
        .bh-dash{display:inline-block;width:26px;height:2px;background:#5eead4;border-radius:2px;}
        .bh-title{
          font-family:var(--ff-s);font-size:clamp(2.5rem,6vw,4.2rem);
          font-weight:900;color:#fff;line-height:1.1;letter-spacing:-0.03em;margin:0 0 1.1rem;
        }
        .bh-title em{color:#5eead4;font-style:italic;}
        .bh-sub{font-family:var(--ff-s);font-size:1rem;color:#94a3b8;max-width:600px;margin:0 auto 2.5rem;line-height:1.75;}

        .bh-search-wrap{position:relative;max-width:520px;margin:0 auto 2.5rem;display:flex;align-items:center;}
        .bh-search-icon{position:absolute;left:1rem;color:#94a3b8;pointer-events:none;}
        .bh-search-input{
          width:100%;padding:0.85rem 2.5rem 0.85rem 3rem;
          background:#ffffff12;backdrop-filter:blur(12px);
          border:1.5px solid #ffffff20;border-radius:0.9rem;
          font-family:var(--ff-u);font-size:0.88rem;color:#fff;outline:none;
          transition:border-color 0.2s,background 0.2s;
        }
        .bh-search-input::placeholder{color:#64748b;}
        .bh-search-input:focus{border-color:#5eead4;background:#ffffff18;}
        .bh-clear{position:absolute;right:1rem;color:#94a3b8;background:none;border:none;cursor:pointer;font-size:0.8rem;transition:color 0.2s;}
        .bh-clear:hover{color:#fff;}

        .bh-stats{
          display:inline-grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;
          padding:1.5rem 2.5rem;background:#ffffff0e;backdrop-filter:blur(10px);
          border:1px solid #ffffff15;border-radius:1.1rem;
        }
        @media(max-width:520px){.bh-stats{grid-template-columns:repeat(2,1fr);}}
        .bhs-item{text-align:center;animation:blogFadeUp 0.55s ease var(--bhi) both;}
        .bhs-val{font-family:var(--ff-s);font-size:1.6rem;font-weight:800;color:#5eead4;margin:0 0 0.1rem;}
        .bhs-lbl{font-family:var(--ff-u);font-size:0.6rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.07em;margin:0;}
        .bh-cut{position:absolute;bottom:-1px;left:0;right:0;height:70px;background:var(--off);clip-path:polygon(0 100%,100% 100%,100% 0);}

        .cat-bar-wrap{background:var(--off);border-bottom:1.5px solid var(--border);overflow-x:auto;position:sticky;top:68px;z-index:40;}
        .cat-bar{max-width:1200px;margin:0 auto;padding:0.7rem 1.5rem;display:flex;gap:0.4rem;min-width:max-content;}
        .cat-tab{
          display:inline-flex;align-items:center;gap:0.4rem;
          font-family:var(--ff-u);font-size:0.76rem;font-weight:600;color:var(--slate);
          padding:0.48rem 0.95rem;border-radius:99px;
          border:1.5px solid transparent;background:none;cursor:pointer;white-space:nowrap;transition:all 0.2s;
        }
        .cat-tab:hover{color:var(--teal-d);background:var(--teal-l);border-color:#99f6e4;}
        .cat-active{background:var(--teal);color:#fff;border-color:var(--teal);}
        .cat-active:hover{background:var(--teal-d);}
        .cat-count{font-size:0.6rem;font-weight:700;background:#ffffff30;border-radius:99px;padding:0.1rem 0.45rem;}

        .feat-section{background:var(--off);padding:2.5rem 1.5rem 0;}
        .feat-wrap{max-width:1200px;margin:0 auto;}
        .feat-card{
          display:grid;grid-template-columns:1fr 1fr;border-radius:1.5rem;overflow:hidden;
          border:1.5px solid var(--border);text-decoration:none;background:var(--white);
          transition:box-shadow 0.25s,transform 0.25s;
        }
        .feat-card:hover{box-shadow:0 20px 60px #0f2b4b18;transform:translateY(-4px);}
        @media(max-width:768px){.feat-card{grid-template-columns:1fr;}}
        .fc-img{
          position:relative;min-height:300px;overflow:hidden;
          background:linear-gradient(135deg,color-mix(in srgb,var(--fa) 80%,#0f2b4b),color-mix(in srgb,var(--fa) 35%,#1e4a7a));
          display:flex;align-items:center;justify-content:center;
        }
        .fc-overlay{position:absolute;inset:0;background:linear-gradient(to bottom right,transparent 40%,#0f2b4b40);}
        .fc-bg-icon{color:#ffffff12;position:relative;z-index:1;}
        .fc-badge{position:absolute;top:1.25rem;left:1.25rem;z-index:2;font-family:var(--ff-u);font-size:0.62rem;font-weight:800;letter-spacing:0.08em;background:#f59e0b;color:#fff;padding:0.28rem 0.75rem;border-radius:99px;}
        .fc-cat{position:absolute;bottom:1.25rem;left:1.25rem;z-index:2;font-family:var(--ff-u);font-size:0.65rem;font-weight:700;background:#ffffff20;backdrop-filter:blur(8px);color:#fff;border:1px solid #ffffff25;padding:0.25rem 0.7rem;border-radius:99px;}
        .fc-body{padding:2rem;display:flex;flex-direction:column;justify-content:space-between;gap:0.85rem;}
        .fc-meta{display:flex;flex-wrap:wrap;gap:0.75rem;}
        .fc-meta span{display:inline-flex;align-items:center;gap:0.3rem;font-family:var(--ff-u);font-size:0.68rem;color:var(--slate);}
        .fc-meta svg{color:var(--teal);}
        .fc-title{font-family:var(--ff-s);font-size:clamp(1.2rem,2.2vw,1.6rem);font-weight:800;color:var(--navy);line-height:1.25;margin:0;transition:color 0.2s;}
        .feat-card:hover .fc-title{color:var(--teal-d);}
        .fc-excerpt{font-family:var(--ff-s);font-size:0.86rem;color:var(--slate);line-height:1.7;margin:0;flex:1;}
        .fc-footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;}
        .fc-author{display:flex;align-items:center;gap:0.6rem;}
        .fc-avatar{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;font-family:var(--ff-u);font-size:0.68rem;font-weight:800;color:#fff;}
        .fca-name{font-family:var(--ff-u);font-size:0.78rem;font-weight:700;color:var(--navy);margin:0 0 0.1rem;}
        .fca-role{font-family:var(--ff-u);font-size:0.62rem;color:var(--slate);margin:0;}
        .fc-cta{display:inline-flex;align-items:center;gap:0.4rem;font-family:var(--ff-u);font-size:0.78rem;font-weight:700;color:var(--teal);transition:gap 0.2s;}
        .feat-card:hover .fc-cta{gap:0.7rem;}

        .blog-body{background:var(--off);padding:2.5rem 1.5rem 5rem;}
        .blog-layout{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 320px;gap:2.5rem;align-items:start;}
        @media(max-width:1024px){.blog-layout{grid-template-columns:1fr;}}

        .results-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:0.5rem;}
        .results-title{font-family:var(--ff-s);font-size:1.05rem;font-weight:700;color:var(--navy);margin:0;}
        .results-clear{font-family:var(--ff-u);font-size:0.72rem;font-weight:600;color:var(--teal);background:none;border:none;cursor:pointer;text-decoration:underline;}

        .no-results{display:flex;flex-direction:column;align-items:center;gap:1rem;padding:4rem 2rem;text-align:center;background:var(--white);border-radius:1.25rem;border:1.5px solid var(--border);}
        .no-results svg{color:#cbd5e1;}
        .no-results p{font-family:var(--ff-s);font-size:0.95rem;color:var(--slate);margin:0;}
        .no-results button{font-family:var(--ff-u);font-size:0.8rem;font-weight:700;color:var(--teal);background:var(--teal-l);border:1.5px solid #99f6e4;padding:0.5rem 1.2rem;border-radius:99px;cursor:pointer;}

        .posts-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;}
        @media(max-width:640px){.posts-grid{grid-template-columns:1fr;}}

        .post-card{
          background:var(--white);border:1.5px solid var(--border);border-radius:1.25rem;overflow:hidden;
          text-decoration:none;display:flex;flex-direction:column;
          opacity:0;transform:translateY(22px);
          transition:box-shadow 0.25s,border-color 0.25s,transform 0.25s;
        }
        .post-reveal{animation:blogFadeUp 0.5s ease var(--pd) forwards;}
        .post-card:hover{box-shadow:0 12px 38px #0f2b4b12;border-color:color-mix(in srgb,var(--pa) 55%,var(--border));transform:translateY(-4px);}

        .pc-img{position:relative;height:130px;overflow:hidden;background:linear-gradient(135deg,color-mix(in srgb,var(--pa) 75%,#0f2b4b),color-mix(in srgb,var(--pa) 30%,#1e4a7a));}
        .pc-bg{position:absolute;inset:0;background:radial-gradient(circle at 70% 30%,#ffffff10,transparent 60%);}
        .pc-cat{position:absolute;bottom:0.7rem;left:0.7rem;font-family:var(--ff-u);font-size:0.6rem;font-weight:700;background:#ffffff1a;backdrop-filter:blur(6px);color:#fff;border:1px solid #ffffff20;padding:0.2rem 0.6rem;border-radius:99px;}
        .pc-trend{position:absolute;top:0.7rem;right:0.7rem;display:inline-flex;align-items:center;gap:0.25rem;font-family:var(--ff-u);font-size:0.58rem;font-weight:800;background:#f59e0b;color:#fff;padding:0.2rem 0.55rem;border-radius:99px;}
        .pc-body{padding:1.1rem 1.1rem 1.25rem;display:flex;flex-direction:column;gap:0.55rem;flex:1;}
        .pc-meta{display:flex;gap:0.75rem;}
        .pc-meta span{display:inline-flex;align-items:center;gap:0.28rem;font-family:var(--ff-u);font-size:0.62rem;color:var(--slate);}
        .pc-meta svg{color:var(--teal);}
        .pc-title{font-family:var(--ff-s);font-size:0.92rem;font-weight:800;color:var(--navy);line-height:1.35;margin:0;transition:color 0.2s;}
        .post-card:hover .pc-title{color:color-mix(in srgb,var(--pa) 70%,var(--navy));}
        .pc-excerpt{font-family:var(--ff-u);font-size:0.73rem;color:var(--slate);line-height:1.6;margin:0;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
        .pc-footer{display:flex;align-items:center;justify-content:space-between;padding-top:0.7rem;border-top:1px solid var(--border);margin-top:auto;}
        .pc-author{display:flex;align-items:center;gap:0.45rem;}
        .pc-avatar{width:24px;height:24px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;font-family:var(--ff-u);font-size:0.55rem;font-weight:800;color:#fff;}
        .pc-name{font-family:var(--ff-u);font-size:0.65rem;font-weight:600;color:var(--navy);}
        .pc-views{font-family:var(--ff-u);font-size:0.62rem;color:var(--slate);}

        .load-more{text-align:center;margin-top:2.5rem;}
        .load-more-btn{display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--ff-u);font-size:0.82rem;font-weight:700;color:var(--navy);background:var(--white);border:1.5px solid var(--border);padding:0.75rem 2rem;border-radius:0.85rem;cursor:pointer;transition:all 0.2s;}
        .load-more-btn:hover{border-color:var(--teal);color:var(--teal-d);background:var(--teal-l);}

        .sidebar{display:flex;flex-direction:column;gap:1.25rem;position:sticky;top:120px;opacity:0;transform:translateY(20px);}
        .sb-reveal{animation:blogFadeUp 0.6s 0.2s ease forwards;}
        @media(max-width:1024px){.sidebar{position:static;}}

        .sb-card{background:var(--white);border:1.5px solid var(--border);border-radius:1.25rem;padding:1.4rem;}
        .sb-dark{background:linear-gradient(135deg,var(--navy),var(--navy-m));border-color:#1e3a5f;}
        .sb-h3{display:flex;align-items:center;gap:0.4rem;font-family:var(--ff-s);font-size:0.95rem;font-weight:800;color:var(--navy);margin:0 0 0.85rem;}
        .sb-h3-light{color:#fff;}
        .sb-icon{color:var(--teal);}
        .sb-p{font-family:var(--ff-u);font-size:0.75rem;color:var(--slate);line-height:1.6;margin:0 0 0.85rem;}
        .sb-p-light{color:#94a3b8;}

        .sbn-icon{width:40px;height:40px;border-radius:0.7rem;background:#5eead415;border:1px solid #5eead430;display:grid;place-items:center;color:#5eead4;margin-bottom:0.7rem;}
        .sbn-input{display:block;width:100%;padding:0.6rem 0.85rem;background:#ffffff0f;border:1.5px solid #ffffff18;border-radius:0.6rem;font-family:var(--ff-u);font-size:0.78rem;color:#fff;outline:none;margin-bottom:0.55rem;box-sizing:border-box;transition:border-color 0.2s;}
        .sbn-input::placeholder{color:#475569;}
        .sbn-input:focus{border-color:#5eead4;}
        .sbn-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:0.5rem;font-family:var(--ff-u);font-size:0.8rem;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--teal),#0ea5e9);border:none;padding:0.62rem;border-radius:0.6rem;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;}
        .sbn-btn:hover{transform:translateY(-1px);box-shadow:0 5px 16px #0d948840;}
        .sbn-success{display:flex;align-items:center;gap:0.45rem;font-family:var(--ff-u);font-size:0.75rem;font-weight:700;color:#5eead4;background:#5eead415;border:1px solid #5eead430;border-radius:0.6rem;padding:0.6rem 0.85rem;}

        .topics{display:flex;flex-wrap:wrap;gap:0.45rem;}
        .topic-tag{display:inline-flex;align-items:center;gap:0.28rem;font-family:var(--ff-u);font-size:0.67rem;font-weight:600;color:var(--slate);background:var(--off);border:1.5px solid var(--border);border-radius:99px;padding:0.25rem 0.65rem;cursor:pointer;transition:all 0.18s;}
        .topic-tag:hover{background:var(--teal-l);border-color:var(--teal);color:var(--teal-d);}
        .topic-tag svg{color:var(--teal);}

        .contrib-list{display:flex;flex-direction:column;gap:0.5rem;}
        .contrib-row{display:flex;align-items:center;gap:0.6rem;padding:0.5rem 0.55rem;border-radius:0.6rem;transition:background 0.18s;}
        .contrib-row:hover{background:var(--off);}
        .contrib-av{width:32px;height:32px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;font-family:var(--ff-u);font-size:0.6rem;font-weight:800;color:#fff;opacity:0.88;}
        .contrib-name{font-family:var(--ff-u);font-size:0.72rem;font-weight:700;color:var(--navy);margin:0 0 0.1rem;}
        .contrib-dept{font-family:var(--ff-u);font-size:0.6rem;color:var(--slate);margin:0;}
        .contrib-count{margin-left:auto;font-family:var(--ff-u);font-size:0.62rem;font-weight:700;color:var(--teal);white-space:nowrap;}

        .sb-cta-card{background:linear-gradient(135deg,var(--teal-l),#e0f2fe);border-color:#99f6e4;text-align:center;}
        .sbc-emoji{font-size:1.8rem;margin-bottom:0.4rem;}
        .sbc-title{font-family:var(--ff-s);font-size:0.95rem;font-weight:800;color:var(--navy);margin:0 0 0.35rem;}
        .sbc-body{font-family:var(--ff-u);font-size:0.72rem;color:var(--slate);line-height:1.55;margin:0 0 0.9rem;}
        .sbc-btn{display:inline-flex;align-items:center;gap:0.35rem;font-family:var(--ff-u);font-size:0.78rem;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--teal),#0ea5e9);padding:0.6rem 1.2rem;border-radius:0.65rem;text-decoration:none;box-shadow:0 4px 12px #0d948828;transition:transform 0.2s,box-shadow 0.2s;}
        .sbc-btn:hover{transform:translateY(-2px);box-shadow:0 7px 20px #0d948848;}
      `}</style>
    </main>
  );
}
