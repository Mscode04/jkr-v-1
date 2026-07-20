import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import heroImg from "@/assets/hero.jpg";
import jkrLogo from "@/assets/jkr-logo.png";
import aboutImg from "@/assets/about-img.png";
import missionImg from "@/assets/mission.jpg";
import t1 from "@/assets/tarining-1.jpg";
import t2 from "@/assets/tarining-2.jpg";
import t3 from "@/assets/tarining-3.jpg";
import t4 from "@/assets/tarining-4.jpg";
import t5 from "@/assets/tarining-5.jpg";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";







import { Logo } from "@/components/Logo";


export const Route = createFileRoute("/")(
{
  component: Index,
});

/* ─── DATA ─── */

const NAV = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Programs", href: "#programs" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "https://wa.me/917907035081" },
];

const STATS = [
  { n: "1000+", l: "Professionals Trained" },
  { n: "7+", l: "Years of Experience" },
  { n: "25+", l: "Businesses Served" },
  { n: "10+", l: "Industries Covered" },
];

const EXPERTISE = [
  { k: "01", t: "Sales Excellence", d: "Sales psychology, premium selling, objection handling, closing techniques, buying behavior, negotiation." },
  { k: "02", t: "Leadership & Teams", d: "Team management, manager development, leadership communication, performance coaching, accountability systems." },
  { k: "03", t: "Business Growth", d: "Business mentoring, sales automation, marketing strategy, customer journey design, revenue frameworks." },
  { k: "04", t: "Personal Development", d: "Productivity, communication mastery, NLP-based coaching, mindset development, personal effectiveness." },
];

const CERTS = [
  { t: "Certified Master Skill Trainer", by: "National Institute for Training and Educational Research (NaITER)" },
  { t: "Certified Sales Automation Strategist", by: "Calzol Academy — mentored by Praveen Calvin" },
  { t: "NLP Certified Practitioner", by: "Ceed International" },
];

const GAPS = [
  "Weak sales conversations",
  "Poor customer psychology",
  "Ineffective leadership",
  "Inconsistent sales systems",
  "Lack of accountability",
  "Communication gaps",
];

const STEPS = [
  { n: "01", t: "Diagnose", d: "Understand the business challenge and find the real performance gap." },
  { n: "02", t: "Design", d: "Build training customized to the organization's actual goals." },
  { n: "03", t: "Deliver", d: "Run interactive, practical, psychology-driven sessions." },
  { n: "04", t: "Develop", d: "Hand over tools, systems, and action plans that last." },
  { n: "05", t: "Drive Results", d: "Track implementation and support real performance growth." },
];

const PROGRAMS = [
  "Corporate Sales Training",
  "Leadership & Manager Development",
  "Team Performance Enhancement",
  "Objection Handling Masterclass",
  "Sales Psychology Workshop",
  "Sales Automation Strategy",
  "Business Mentoring",
  "Productivity & Performance Coaching",
  "Communication & Soft Skills",
  "Business Growth Consulting",
];

const INDUSTRIES = [
  "Education", "Healthcare", "HR & Recruitment", "Business Consulting",
  "Technology", "Marketing Agencies", "Retail", "Manufacturing",
  "Service Businesses", "Startups & SMEs",
];

const CLIENTS = [
  "Havells", "DOPA", "Zahra Tours & Travels", "VTrust Eye Hospital", "iTees Eye Hospital",
  "Standard", "Chanakya", "ASH Academy", "Cloud Hub", "Adrex Media School",
  "Met-Leaf", 
  "De Beacon", "Peak Escape", "Covo Architecture", "iQCTS Academy", "Timson",
  "Berry & Co.", "Eduslot", "Spaces Eco Clean", 
  "Hiline",
];

const WHY = [
  "Practical, real-world business experience",
  "Customized training, not generic slides",
  "Psychology-driven sales methodology",
  "Actionable frameworks & implementation tools",
  "High-engagement workshops",
  "Focus on measurable business outcomes",
  "Continuous post-training support",
];






/* ─── REVEAL ─── */

function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


/* ─── MAIN ─── */

function Index() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false, speed: 1.5 })
  ]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Hero parallax — minimal
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroP = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.35 });
  const heroY = useTransform(heroP, [0, 1], ["0%", "12%"]);
  const heroOpacity = useTransform(heroP, [0, 1], [1, 0.2]);
  const portraitScale = useTransform(heroP, [0, 1], [1, 1.03]);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden relative">

      {/* ━━ NAV ━━ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/[0.06]" : ""
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <a href="#top" className="group flex items-center">
            <Logo className="transition-opacity group-hover:opacity-70" />
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-label text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/917907035081"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta group relative hidden items-center gap-2 rounded-full glass-cta px-5 py-2.5 transition-all duration-300 hover:opacity-85 sm:inline-flex"
            >
              Book a Session
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.06] md:hidden"
              aria-label="Open menu"
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="text-foreground">
                <path d="M1 1h20M1 8h20M1 15h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ━━ MOBILE MENU ━━ */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`mobile-menu-panel ${menuOpen ? "open" : ""}`}>
        <div className="flex h-full flex-col px-8 py-8">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.06]"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-foreground">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="mt-12 flex flex-col gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 rounded-xl px-4 py-4 text-lg text-foreground transition-colors hover:bg-white/[0.04]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <a
              href="https://wa.me/917907035081"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-cta group flex w-full items-center justify-center gap-3 rounded-full glass-cta px-7 py-4 transition-all hover:opacity-85"
            >
              Book a Session
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>


      {/* ━━ HERO ━━ */}
      <section ref={heroRef} id="top" className="relative min-h-screen overflow-hidden pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img src={heroImg} alt="" aria-hidden className="h-full w-full object-cover object-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
        </div>

        <motion.div
          style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1400px] grid-cols-1 items-center gap-8 px-6 pb-32 pt-4 md:px-10 lg:grid-cols-12 lg:gap-16"
        >
          <div className="relative lg:col-span-7">
            <Reveal>
              <p className="text-eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-block h-px w-8 bg-foreground/30" />
                Sales Strategist <span className="text-foreground/20">·</span> Corporate Trainer{" "}
                <span className="text-foreground/20">·</span> Business Mentor
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1
                aria-label="Aflah C P"
                className="text-display pointer-events-none select-none whitespace-nowrap text-[15vw] leading-[0.82] tracking-[-0.05em] text-foreground lg:text-[13vw]"
              >
                AFLAH<span className="text-foreground/30">.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-xl leading-[1.2] text-foreground/85 md:text-2xl">
                Sales isn't about <span className="italic">convincing</span> people.
                It's about <span className="italic">understanding</span> them.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                7+ years turning sales psychology into systems that actually produce results.
                1000+ professionals trained across industries.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/917907035081"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cta group inline-flex items-center gap-3 rounded-full glass-cta px-7 py-4 transition-all duration-300 hover:opacity-85"
                >
                  Book a Training Session
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#expertise"
                  className="text-cta group inline-flex items-center gap-3 rounded-full glass-cta-outline px-7 py-4 transition-all duration-300 hover:bg-white/[0.06]"
                >
                  See My Work
                </a>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-5">
            <motion.div
              style={reduce ? undefined : { scale: portraitScale }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="group relative aspect-[3/4] w-full overflow-hidden will-change-transform"
            >
              <img
                src={jkrLogo}
                alt="JKR Logo"
                width={1200}
                height={1400}
                className="h-full w-full object-contain object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="absolute -bottom-5 -left-5 hidden rounded-xl border border-white/[0.08] bg-[#111111] p-5 md:block"
            >
              <div className="text-display text-4xl text-foreground">1000+</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Professionals trained
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50"
        >
          <span>SCROLL</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </section>






















































      {/* ━━ ABOUT ━━ */}
      <section id="about" className="relative">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
                <img
                  src={aboutImg}
                  alt="Aflah C P portrait"
                  width={1008}
                  height={1200}
                  loading="lazy"
                  className="w-full grayscale"
                />
              </div>
            </div>
            <div className="lg:col-span-7 lg:pt-8">
              <Reveal>
                <p className="text-eyebrow mb-6">About Aflah</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-display text-5xl md:text-6xl lg:text-7xl">
                  A trainer who's <span className="italic">still</span> a student.
                </h2>
              </Reveal>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
                <Reveal delay={0.1}>
                  <p>
                    For the past 7+ years, I've helped organizations, entrepreneurs, sales teams, managers,
                    and professionals sharpen their sales performance, leadership, productivity, and business
                    growth. Not with generic slides. With practical, psychology-driven training.
                  </p>
                </Reveal>
                <Reveal delay={0.14}>
                  <p>
                    My approach blends real business experience with proven sales frameworks, behavioral
                    psychology, NLP, and automation strategy to create outcomes you can actually measure.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <p className="border-l border-foreground/20 pl-6 text-foreground/90 italic">
                    I keep learning because a trainer who stops learning has nothing new to teach.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ━━ TEXT MARQUEE ━━ */}
      <section className="border-y border-white/[0.06] py-7 overflow-hidden">
        <div className="flex whitespace-nowrap marquee">
          {[0, 1].map((i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 pr-12">
              {["Sales Psychology", "Leadership Development", "Business Growth", "NLP Coaching", "Sales Automation", "Team Performance"].map((w) => (
                <span key={w} className="text-display text-3xl italic text-foreground/15">
                  {w} <span className="not-italic text-foreground/8">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>


      {/* ━━ STATS ━━ */}
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05} y={14}>
              <div className={`p-8 text-center md:p-12 ${i < 3 ? "border-r border-white/[0.06]" : ""}`}>
                <div className="text-display text-5xl text-foreground md:text-6xl">{s.n}</div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>


      {/* ━━ EXPERTISE ━━ */}
      <section id="expertise" className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-40">
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-eyebrow mb-6">What I Bring to the Table</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <h2 className="text-display text-5xl md:text-6xl lg:text-7xl">
                Core <span className="italic">Expertise</span>.
              </h2>
            </Reveal>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {EXPERTISE.map((e, i) => (
            <Reveal key={e.t} delay={i * 0.05} y={18}>
              <div className="group relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12] md:p-12">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">{e.k}</span>
                  <span className="text-foreground/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground/60">→</span>
                </div>
                <h3 className="text-display mt-8 text-3xl md:text-4xl">{e.t}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{e.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>


      {/* ━━ CERTIFICATIONS ━━ */}
      <section className="border-y border-white/[0.06] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <p className="text-eyebrow mb-6">Credentials</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-display max-w-3xl text-4xl md:text-5xl lg:text-6xl">
              Certified. Mentored. <span className="italic">Always learning.</span>
            </h2>
          </Reveal>
          <div className="mt-16 space-y-3">
            {CERTS.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.05} y={10}>
                <div className="flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] md:flex-row md:items-center md:justify-between md:p-8">
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    <span className="text-display text-2xl md:text-3xl">{c.t}</span>
                  </div>
                  <span className="pl-12 text-sm text-muted-foreground md:pl-0 md:text-right">{c.by}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
















































































































      {/* ━━ IN ACTION — Gallery (Small) ━━ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <p className="text-eyebrow mb-4">In the Room</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-display max-w-2xl text-4xl md:text-5xl">
                  Where the <span className="italic">work</span> happens.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-sm text-muted-foreground">
                Boardrooms, stages, small teams, big audiences.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {[
              { img: t1, num: "01", type: "WORKSHOP", title: "Sales Framework" },
              { img: t2, num: "02", type: "MENTORING", title: "Business Growth" },
              { img: t3, num: "03", type: "KEYNOTE", title: "Sales Psychology" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={0.05 + i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.06]"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.05] px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] text-foreground/70">
                      <span className="h-1 w-1 rounded-full bg-foreground/50" />{item.num} · {item.type}
                    </span>
                    <h3 className="text-display mt-2 text-xl md:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ━━ PHILOSOPHY ━━ */}
      <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-display text-4xl md:text-5xl lg:text-6xl">
                Every business has <span className="italic">hidden growth</span> sitting inside it.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-8 max-w-xl text-lg text-muted-foreground">
                Most organizations don't lose revenue because of bad products. They lose it because of:
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-12 max-w-lg overflow-hidden rounded-2xl border border-white/[0.06] opacity-80">
                <img src={t5} alt="Strategy Session" loading="lazy" className="aspect-[16/9] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
              {GAPS.map((g, i) => (
                <Reveal key={g} delay={i * 0.03} y={8}>
                  <div className="group flex items-center gap-4 border-b border-white/[0.04] py-4 last:border-b-0">
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    <span className="text-lg transition-colors duration-300 group-hover:text-foreground">{g}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.25}>
              <p className="mt-8 text-lg italic text-foreground/90">
                My training finds these gaps and turns them into measurable performance.
              </p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ━━ APPROACH / STEPS ━━ */}
      <section className="border-y border-white/[0.06] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="mb-20">
            <Reveal>
              <p className="text-eyebrow mb-6">The Process</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-display text-5xl md:text-6xl lg:text-7xl">
                How I <span className="italic">work</span>.
              </h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 md:gap-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05} y={16}>
                <div className="group relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]">
                  <div className="font-mono text-xs text-muted-foreground">{s.n}</div>
                  <h3 className="text-display mt-4 text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ━━ PROGRAMS ━━ */}
      <section id="programs" className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-40">
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-eyebrow mb-6">Programs</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-display text-5xl md:text-6xl lg:text-7xl">
                Built for <span className="italic">outcomes</span>, not attendance.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 hidden lg:block">
            <Reveal delay={0.1}>
              <div className="relative h-[240px] w-full overflow-hidden rounded-2xl border border-white/[0.06] opacity-80">
                <img src={t4} alt="Corporate Training Session" loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105" />
              </div>
            </Reveal>
          </div>
        </div>













        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p} delay={i * 0.025} y={8}>
              <a
                href="#contact"
                className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12] md:p-8"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-display text-2xl md:text-3xl">{p}</span>
                </div>
                <span className="text-foreground/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground/60">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>


      {/* ━━ INDUSTRIES ━━ */}
      <section className="border-y border-white/[0.06] py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <p className="text-eyebrow mb-8">Industries I've Worked With</p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind} delay={i * 0.02} y={6}>
                <span className="inline-block rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm text-foreground/80 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-foreground">
                  {ind}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ━━ CLIENTS ━━ */}
      <section id="clients" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-eyebrow mb-6">Trusted By</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-display text-5xl md:text-6xl lg:text-7xl">
                  Organizations I've <span className="italic">trained</span>.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  From hospitals to eyewear giants, aviation to architecture — teams across {CLIENTS.length}+ organizations have trusted the process.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] py-5" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex touch-pan-y">
                {Array.from({ length: 27 }).map((_, i) => (
                  <div key={`client-${i}`} className="flex shrink-0 basis-[170px] md:basis-[220px] h-24 items-center justify-center p-3 rounded-xl transition-all duration-500 hover:scale-105 ml-8 mr-4 select-none">
                    <img 
                      src={`${import.meta.env.BASE_URL}clients/${i + 1}.png`} 
                      alt={`Client ${i + 1}`} 
                      loading="lazy" 
                      draggable="false"
                      className="max-h-full max-w-full object-contain transition-opacity duration-500" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ━━ WHY ━━ */}
      <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-eyebrow mb-6">The Difference</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-display text-5xl md:text-6xl">
                Why organizations <span className="italic">choose Aflah</span>.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.04] px-6 md:px-8">
              {WHY.map((w, i) => (
                <Reveal key={w} delay={i * 0.03} y={8}>
                  <div className="group flex items-baseline gap-6 py-5">
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg transition-colors duration-300 group-hover:text-foreground md:text-xl">{w}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ━━ MISSION ━━ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={missionImg}
            alt="Aflah C P on stage"
            width={1808}
            height={1008}
            loading="lazy"
            className="h-full w-full object-cover opacity-15"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]" />

        <div className="relative mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48">
          <Reveal>
            <p className="text-eyebrow mb-8">My Mission</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-display max-w-4xl text-4xl md:text-6xl lg:text-7xl">
              To equip individuals, teams, and businesses with the knowledge, systems, and mindset for{" "}
              <span className="italic">sustainable growth</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-16 max-w-3xl rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 md:p-10">
              <p className="text-display text-2xl italic text-foreground/90 md:text-3xl">
                "Transforming people. Strengthening teams. Growing businesses."
              </p>
              <p className="mt-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">— AFLAH C P</p>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ━━ FINAL CTA ━━ */}
      <section id="contact" className="border-t border-white/[0.06] py-32 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <p className="text-eyebrow mb-8">Let's Talk</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-display max-w-5xl text-5xl md:text-7xl lg:text-[7.5rem]">
              Ready to fix what's <span className="italic">actually</span> costing you sales?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-xl text-xl text-muted-foreground">Let's find the gap and close it.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="mailto:hello@aflahcp.com"
                className="text-cta group inline-flex items-center gap-3 rounded-full glass-cta px-8 py-5 transition-all duration-300 hover:opacity-85"
              >
                Book a Consultation
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="https://wa.me/"
                className="text-cta group inline-flex items-center gap-3 rounded-full glass-cta-outline px-8 py-5 transition-all duration-300 hover:bg-white/[0.06]"
              >
                Contact on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ━━ FOOTER ━━ */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-display text-4xl">Aflah C P</div>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Sales Strategist · Corporate Trainer · Business Mentor · Sales & Life Coach
              </p>
            </div>
            <div className="md:col-span-3">
              <p className="text-eyebrow mb-4">Contact</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:hello@aflahcp.com" className="transition-colors duration-300 hover:text-foreground">hello@aflahcp.com</a>
                </li>
                <li>India</li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <p className="text-eyebrow mb-4">Follow</p>
              <ul className="flex flex-wrap gap-4 text-sm">
                {[
                  { name: "Instagram", url: "#" },
                  { name: "LinkedIn", url: "#" },
                  { name: "WhatsApp", url: "#" },
                ].map((s) => (
                  <li key={s.name}>
                    <a href={s.url} className="text-muted-foreground transition-colors duration-300 hover:text-foreground">
                      {s.name} <span className="text-foreground/20">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-2 border-t border-white/[0.06] pt-8 text-xs text-muted-foreground md:flex-row">
            <span>© 2026 Aflah C P. All rights reserved.</span>
            <span className="font-mono tracking-[0.2em] text-foreground/20">TRANSFORMING · STRENGTHENING · GROWING</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
