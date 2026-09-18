import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GithubIcon, LinkedinIcon, BriefcaseIcon, GraduationCapIcon } from 'lucide-react';
import avatarFace from './assets/avatar_face_2.png';
import resumePdf from '../Resume_YashRupani.pdf';

/* ═══════════════════════════════════════════════════════════
   REUSABLE COMPONENTS
   ═══════════════════════════════════════════════════════════ */

// ── FadeIn ──
const FadeIn = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as: Tag = 'div',
  ...rest
}) => {
  const MotionTag = motion.create(Tag);
  return (
    <MotionTag
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

// ── Magnet ──
const Magnet = ({ children, padding = 150, strength = 3, activeTransition = 'transform 0.3s ease-out', inactiveTransition = 'transform 0.6s ease-in-out' }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const threshold = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < threshold) {
        setActive(true);
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
        el.style.transition = activeTransition;
      } else if (active) {
        setActive(false);
        el.style.transform = 'translate3d(0,0,0)';
        el.style.transition = inactiveTransition;
      }
    };

    const onMouseLeave = () => {
      setActive(false);
      el.style.transform = 'translate3d(0,0,0)';
      el.style.transition = inactiveTransition;
    };

    window.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [active, padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} style={{ willChange: 'transform', display: 'inline-block' }}>
      {children}
    </div>
  );
};

// ── AnimatedText (char-by-char scroll opacity) ──
const AnimatedText = ({ text, className = '', style = {} }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Split into words + whitespace runs (not individual characters) — keeps the
  // same scroll-reveal effect with far fewer animated nodes for long paragraphs.
  const chars = text.split(/(\s+)/).filter(Boolean);

  return (
    <p ref={ref} className={className} style={{ display: 'block', ...style }}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = (i + 1) / chars.length;
        return (
          <AnimatedChar key={i} char={char} range={[start, end]} progress={scrollYProgress} />
        );
      })}
    </p>
  );
};

const AnimatedChar = ({ char, range, progress }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      <span style={{ opacity: 0.15 }}>{char}</span>
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>{char}</motion.span>
    </span>
  );
};

// ── ContactButton ──
const ContactButton = () => (
  <a
    href="mailto:rupaniyash1818@gmail.com"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 8px 20px rgba(181, 1, 167, 0.5), inset 4px 4px 12px #7721B1',
      outline: '2px solid white',
      outlineOffset: '4px',
      fontFamily: "'Kanit', sans-serif",
      whiteSpace: 'nowrap',
      display: 'inline-block',
    }}
    className="rounded-full text-white font-semibold uppercase tracking-widest px-10 py-4 md:px-12 md:py-5 text-base md:text-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0px_10px_25px_rgba(181,1,167,0.7)]"
  >
    Contact Me
  </a>
);

// ── DownloadResumeButton ──
const DownloadResumeButton = () => (
  <a
    href={resumePdf}
    download="Resume_YashRupani.pdf"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      background: 'transparent',
      border: '2px solid rgba(250, 250, 249, 0.8)',
      fontFamily: "'Kanit', sans-serif",
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 40px',
    }}
    className="rounded-full text-[#FAFAF9] font-semibold uppercase tracking-widest text-base md:text-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[#FAFAF9] hover:text-[#0C0C0C]"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
    Resume
  </a>
);

// ── LiveProjectButton ──
const LiveProjectButton = ({ url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full border-2 text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base cursor-pointer transition-colors duration-200 hover:bg-[#D7E2EA]/10"
    style={{
      borderColor: '#D7E2EA',
      fontFamily: "'Kanit', sans-serif",
      padding: '12px 32px',
      whiteSpace: 'nowrap',
      display: 'inline-block',
      lineHeight: '1.5'
    }}
  >
    Live Project
  </a>
);

// ── SocialLinks ──
const socialLinkClassName = 'rounded-full border-2 flex items-center justify-center w-11 h-11 shrink-0 transition-all duration-200 hover:bg-[#D7E2EA]/10 hover:scale-105';
const socialLinkStyle = { borderColor: '#D7E2EA' };

const SocialLinks = () => (
  <div className="flex gap-3">
    <a
      href="https://www.linkedin.com/in/yash-rupani-/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className={socialLinkClassName}
      style={socialLinkStyle}
    >
      <LinkedinIcon size={20} color="#D7E2EA" strokeWidth={1.75} />
    </a>
    <a
      href="https://github.com/rupaniyash"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className={socialLinkClassName}
      style={socialLinkStyle}
    >
      <GithubIcon size={20} color="#D7E2EA" strokeWidth={1.75} />
    </a>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const navLinks = ['About', 'Journey', 'Skills', 'Projects', 'Contact'];
  const headingRef = useRef(null);
  const [headingWidth, setHeadingWidth] = useState(null);

  useEffect(() => {
    const measure = () => {
      if (headingRef.current) {
        setHeadingWidth(headingRef.current.getBoundingClientRect().width);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section
      className="h-screen grid"
      style={{
        background: '#0C0C0C',
        overflow: 'hidden',
        gridTemplateRows: 'auto auto 1fr',
      }}
    >
      {/* Navbar — same width as heading, positioned above everything */}
      <nav
        style={{
          width: headingWidth ?? '100%',
          margin: '0 auto',
          paddingTop: 'clamp(1.5rem, 4vh, 3.5rem)',
          position: 'relative',
          zIndex: 50,
        }}
      >
        <div className="flex justify-between items-center w-full" style={{ paddingBottom: 'clamp(0.5rem, 1.5vh, 1.5rem)' }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
              style={{ color: '#D7E2EA', fontFamily: "'Kanit', sans-serif" }}
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Heading */}
      <FadeIn delay={0.15} y={40} style={{ flexShrink: 0, justifySelf: 'center' }}>
        <h1
          ref={headingRef}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Kanit', sans-serif",
            fontSize: 'clamp(4rem, 17vw, 18vw)',
          }}
        >
          Hi, i&apos;m yash
        </h1>
      </FadeIn>

      {/* Portrait + tagline + button */}
      <div className="flex flex-col items-center justify-end w-full min-h-0" style={{ paddingBottom: 'clamp(1.5rem, 5vh, 4rem)' }}>
        {/* Portrait */}
        <FadeIn delay={0.6} y={30} className="flex justify-center">
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            <img
              src={avatarFace}
              alt="Yash Rupani"
              className="w-[200px] sm:w-[260px] md:w-[320px] lg:w-[380px] object-contain select-none pointer-events-none"
              style={{
                maskImage: 'radial-gradient(circle at center, black 50%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 70%)',
              }}
              draggable={false}
            />
          </Magnet>
        </FadeIn>

        {/* Tagline + Contact button */}
        <div
          className="flex justify-between items-end"
          style={{ width: headingWidth ?? '100%', marginTop: 'clamp(0.5rem, 2vh, 1.5rem)' }}
        >
          <FadeIn delay={0.35} y={20} className="w-full max-w-[270px] sm:max-w-[340px] md:max-w-[480px]">
            <p
              className="font-light uppercase tracking-wide leading-snug text-left"
              style={{
                color: '#D7E2EA',
                fontSize: 'clamp(0.75rem, 1.4vw, 1.2rem)',
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              a software engineer bridging data pipelines and AI-driven systems at scale
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-end sm:items-center">
              <DownloadResumeButton />
              <ContactButton />
              <SocialLinks />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   3. ABOUT SECTION
   ═══════════════════════════════════════════════════════════ */
const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
      style={{ background: '#0C0C0C' }}
    >
      {/* Decorative 3D Images */}
      {/* Top-left moon */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none"
        />
      </FadeIn>

      {/* Bottom-left */}
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none"
        />
      </FadeIn>

      {/* Top-right lego */}
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none"
        />
      </FadeIn>

      {/* Bottom-right */}
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none"
        />
      </FadeIn>

      {/* Center content */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10 text-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)', fontFamily: "'Kanit', sans-serif" }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text="With more than two years of enterprise experience in data engineering, I focus on scalable ETL pipelines, cloud architectures, and AI-driven data systems. I truly enjoy working with organizations that aim to make data-driven decisions and present their best insights. Let's build something incredible together!"
            className="font-medium leading-relaxed max-w-[560px] text-center"
            style={{
              color: '#A3A3A3',
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              fontFamily: "'Kanit', sans-serif",
            }}
          />
          <ContactButton />
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   3.5 JOURNEY SECTION (work + education, merged timeline)
   ═══════════════════════════════════════════════════════════ */
const JOURNEY = [
  {
    type: 'work',
    title: 'Software Engineering Intern',
    org: 'QuickGrants',
    date: 'May 2026 – Present',
    location: 'Remote, USA',
    tagline: 'Turning messy policy PDFs into structured, queryable data.',
  },
  {
    type: 'work',
    title: 'Research Assistant',
    org: 'Oregon State University',
    date: 'Oct 2025 – May 2026',
    location: 'Corvallis, OR, USA',
    tagline: 'Built an alliance-variance metric for AI-mediated conversations, feeding an AMCIS 2026 paper.',
  },
  {
    type: 'education',
    title: 'M.E. in Computer Science',
    org: 'Oregon State University',
    date: 'Sep 2023 – Dec 2025',
    location: 'Corvallis, OR, USA',
    tagline: 'Graduate coursework spanning data engineering, ML, and distributed systems.',
  },
  {
    type: 'work',
    title: 'AI Agent RAG/ML Scientist Intern',
    org: 'GrantAide',
    date: 'Jul 2025 – Sep 2025',
    location: 'Remote, USA',
    tagline: 'Shipped a RAG-based grant discovery system, lifting retrieval accuracy 40%.',
  },
  {
    type: 'work',
    title: 'Senior Systems Engineer',
    org: 'Infosys (Charter Communications)',
    date: 'Jun 2021 – Jun 2023',
    location: 'Maharashtra, India',
    tagline: 'Modernized enterprise data-quality pipelines and automated CI/CD checks.',
  },
  {
    type: 'education',
    title: 'B.Tech in Electrical Engineering',
    org: 'PDEU',
    date: 'Aug 2017 – Jun 2021',
    location: 'Gujarat, India',
    tagline: 'Undergraduate foundation in engineering and systematic problem-solving.',
  },
];

const JourneyCard = ({ entry }) => {
  const Icon = entry.type === 'work' ? BriefcaseIcon : GraduationCapIcon;
  return (
    <div
      className="border-2 flex flex-col gap-2 w-full"
      style={{
        background: '#0C0C0C',
        borderColor: '#D7E2EA',
        borderRadius: 'clamp(16px, 3vw, 32px)',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
      }}
    >
      <div className="flex items-center gap-2">
        <Icon size={16} color="#CA8A04" strokeWidth={1.75} />
        <span className="text-[#CA8A04] font-medium text-xs sm:text-sm tracking-widest uppercase">
          {entry.date}
        </span>
      </div>
      <h3
        className="font-bold text-[#FAFAF9] text-lg sm:text-xl"
        style={{ fontFamily: "'Kanit', sans-serif", letterSpacing: '0.05em' }}
      >
        {entry.title}
      </h3>
      <p
        className="text-[#D7E2EA] opacity-70 text-sm sm:text-base tracking-wide"
        style={{ fontFamily: "'Kanit', sans-serif" }}
      >
        {entry.org} <span className="opacity-50 mx-2">•</span> {entry.location}
      </p>
      <p
        className="text-[#FAFAF9] opacity-80 text-sm sm:text-base leading-relaxed"
        style={{ fontFamily: "'Kanit', sans-serif" }}
      >
        {entry.tagline}
      </p>
    </div>
  );
};

const JourneyRow = ({ entry, index }) => {
  const isLeft = index % 2 === 0;
  return (
    <FadeIn
      delay={0.1}
      y={20}
      x={isLeft ? -40 : 40}
      className="relative flex items-start gap-3 sm:gap-6 md:gap-8 group"
    >
      {/* Dot / connector column — always the middle flex item, so it always
          sits at the true horizontal center of the row (equal flex-1 slots
          on both sides), at every screen width, not just md:+. */}
      <div className="relative flex-shrink-0 flex items-center justify-center mt-2 w-6 sm:w-10 md:w-16 order-2">
        <div className="w-[10px] h-[10px] rounded-full bg-[#CA8A04] relative z-10 transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_15px_#CA8A04]" />
        <div
          className="hidden sm:block absolute top-1/2 -translate-y-1/2 h-[2px] w-4 sm:w-6"
          style={{
            [isLeft ? 'right' : 'left']: '50%',
            background: isLeft
              ? 'linear-gradient(to left, #CA8A04, transparent)'
              : 'linear-gradient(to right, #CA8A04, transparent)',
          }}
        />
      </div>

      {/* Left slot */}
      <div className="flex-1 order-1">
        {isLeft && <JourneyCard entry={entry} />}
      </div>

      {/* Right slot */}
      <div className="flex-1 order-3">
        {!isLeft && <JourneyCard entry={entry} />}
      </div>
    </FadeIn>
  );
};

const JourneySection = () => (
  <section
    id="journey"
    className="py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10"
    style={{ background: '#0C0C0C' }}
  >
    <FadeIn delay={0} y={40}>
      <h2
        className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-24"
        style={{
          color: '#FAFAF9',
          fontSize: 'clamp(3rem, 12vw, 160px)',
          fontFamily: "'Kanit', sans-serif",
        }}
      >
        My Journey
      </h2>
    </FadeIn>

    <div className="max-w-5xl mx-auto relative">
      {/* Timeline line: dead-center of this container at every width */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] opacity-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #CA8A04 5%, #CA8A04 95%, transparent)' }}
      />

      <div className="flex flex-col gap-10 sm:gap-14 md:gap-20">
        {JOURNEY.map((entry, i) => (
          <JourneyRow key={i} entry={entry} index={i} />
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   4. SKILLS SECTION
   ═══════════════════════════════════════════════════════════ */
const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    skills: ['Python', 'SQL', 'Scala', 'Java', 'Bash'],
  },
  {
    label: 'Data Engineering',
    skills: ['Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Flink', 'Spark Streaming'],
  },
  {
    label: 'Cloud Platforms',
    skills: ['AWS', 'GCP', 'Azure', 'S3', 'EMR', 'Glue', 'Lambda', 'Athena', 'Dataflow'],
  },
  {
    label: 'Data Warehousing',
    skills: ['Snowflake', 'BigQuery', 'Redshift', 'PostgreSQL'],
  },
  {
    label: 'Databases',
    skills: ['MongoDB', 'Cassandra', 'MySQL', 'Redis', 'FAISS'],
  },
  {
    label: 'AI / ML',
    skills: ['LangChain', 'RAG', 'Vector DBs', 'LLM Integration', 'Hugging Face'],
  },
  {
    label: 'Visualization',
    skills: ['Tableau', 'Power BI', 'Looker', 'Matplotlib'],
  },
  {
    label: 'DevOps & Tools',
    skills: ['Docker', 'Kubernetes', 'Terraform', 'Git', 'CI/CD'],
  },
];

const ServicesSection = () => {
  // Flatten and distribute skills into 3 rows
  const allSkills = SKILL_CATEGORIES.flatMap(cat => cat.skills);
  const rows = [[], [], []];
  allSkills.forEach((skill, i) => {
    rows[i % 3].push(skill);
  });

  return (
    <section
      id="skills"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-20 sm:py-24 md:py-32 overflow-hidden"
      style={{ background: '#111' }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase text-center mb-16 sm:mb-20 px-5"
          style={{
            color: '#FAFAF9',
            fontSize: 'clamp(3rem, 12vw, 160px)',
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          Skills
        </h2>
      </FadeIn>

      <div
        className="flex flex-col gap-2 sm:gap-4 transform -rotate-2 scale-105"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        {rows.map((row, i) => {
          const isReverse = i % 2 !== 0;
          const duration = 40 + (i * 15); // speeds: 40s, 55s, 70s

          return (
            <div key={i} className="marquee-container relative flex overflow-hidden whitespace-nowrap w-full w-[110vw] -ml-[5vw]">
              <div
                className="marquee-track flex items-center"
                style={{
                  width: 'max-content',
                  animation: `marquee-scroll ${duration}s linear infinite ${isReverse ? 'reverse' : 'normal'}`,
                }}
              >
                {/* Repeat 4 times to ensure it covers wide screens */}
                {[...row, ...row, ...row, ...row].map((skill, idx) => {
                  const isOutline = idx % 2 === 0;
                  return (
                    <div key={`${skill}-${idx}`} className="flex items-center">
                      <span
                        className="uppercase font-black mx-6 sm:mx-10 cursor-default"
                        style={{
                          color: isOutline ? 'transparent' : '#FAFAF9',
                          WebkitTextStroke: isOutline ? '1.5px rgba(250,250,249,0.5)' : 'none',
                          fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                          fontFamily: "'Kanit', sans-serif",
                          lineHeight: '1.2',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#CA8A04';
                          e.currentTarget.style.WebkitTextStroke = 'none';
                          e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                          e.currentTarget.style.textShadow = '0 10px 30px rgba(202,138,4,0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = isOutline ? 'transparent' : '#FAFAF9';
                          e.currentTarget.style.WebkitTextStroke = isOutline ? '1.5px rgba(250,250,249,0.5)' : 'none';
                          e.currentTarget.style.transform = 'scale(1) translateY(0)';
                          e.currentTarget.style.textShadow = 'none';
                        }}
                      >
                        {skill}
                      </span>
                      <span
                        style={{
                          color: '#CA8A04',
                          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                          opacity: 0.5
                        }}
                      >
                        ✦
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


/* ═══════════════════════════════════════════════════════════
   5. PROJECTS SECTION
   ═══════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    num: '01',
    name: 'Crypto Sentinel',
    category: 'Personal',
    desc: 'Real-time crypto market intelligence pipeline built with Kafka, Spark Streaming, and Airflow, processing 1M+ events/day with live anomaly detection and alerting dashboards.',
    link: 'https://crypto-frontend-puce-theta.vercel.app/',
  },
  {
    num: '02',
    name: 'Shop Pulse Analytics',
    category: 'Personal',
    desc: 'End-to-end e-commerce analytics platform using dbt, Redshift, and Tableau, turning raw transactional data into executive-level sales and inventory insights.',
    link: 'https://shop-pulse-frontend.vercel.app/',
  },
  {
    num: '03',
    name: 'YouTube Data Lake',
    category: 'Personal',
    desc: 'Serverless data lake on AWS (S3, Glue, Athena) ingesting YouTube trending data at scale, powering content trend analysis and creator performance dashboards in BigQuery.',
    link: 'https://github.com/rupaniyash/youtube-data-engineering-project',
  },
];

const ProjectCard = ({ project, index }) => {
  const borderRadius = 'clamp(24px, 5vw, 60px)';

  return (
    <FadeIn delay={index * 0.15} y={30} className="flex h-full">
      <div
        className="border-2 flex flex-col flex-1"
        style={{
          background: '#0C0C0C',
          borderColor: '#D7E2EA',
          borderRadius,
          padding: 'clamp(2rem, 5vw, 4rem)',
          overflow: 'hidden'
        }}
      >
        {/* Top Row: Number & Link */}
        <div className="flex flex-wrap justify-between items-start gap-6 mb-10 sm:mb-12">
          <span
            className="font-black leading-none"
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(2rem, 5vw, 70px)',
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            {project.num}
          </span>
          <div className="mt-2 sm:mt-0">
            <LiveProjectButton url={project.link} />
          </div>
        </div>

        {/* Content Row: Name & Description */}
        <div className="flex flex-col flex-1">
          <h3
            className="font-black uppercase leading-tight mb-4 sm:mb-6 break-words"
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            {project.name}
          </h3>
          {project.desc && (
            <p
              className="font-light flex-1 break-words"
              style={{
                color: '#D7E2EA',
                opacity: 0.6,
                fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                fontFamily: "'Kanit', sans-serif",
                lineHeight: '1.6',
              }}
            >
              {project.desc}
            </p>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="-mt-10 sm:-mt-12 md:-mt-14 relative z-10 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)', fontFamily: "'Kanit', sans-serif" }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-[1400px] mx-auto">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} />
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6. CONTACT SECTION
   ═══════════════════════════════════════════════════════════ */
const ContactSection = () => (
  <section
    id="contact"
    className="relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-32 sm:py-40 -mt-10 sm:-mt-12 md:-mt-14 z-20 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"
    style={{
      background: '#121212',
      boxShadow: '0 -20px 50px rgba(0, 0, 0, 0.4)'
    }}
  >
    <FadeIn delay={0} y={40}>
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-6"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)', fontFamily: "'Kanit', sans-serif" }}
      >
        Contact
      </h2>
    </FadeIn>
    <FadeIn delay={0.2} y={20}>
      <p
        className="text-center max-w-lg"
        style={{
          color: '#A3A3A3',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontFamily: "'Kanit', sans-serif",
          marginBottom: '0.5rem'
        }}
      >
        Open to full-time roles, freelance projects, and collaborations. Let’s connect!
      </p>
    </FadeIn>
    <FadeIn delay={0.35} y={20} style={{ marginTop: '1rem', marginBottom: '2rem' }}>
      <ContactButton />
    </FadeIn>
    <FadeIn delay={0.45} y={20}>
      <SocialLinks />
    </FadeIn>
  </section>
);

// ── Footer ──
const Footer = () => (
  <footer
    className="w-full flex flex-col items-center justify-center py-10"
    style={{ background: '#121212', borderTop: '1px solid rgba(255,255,255,0.05)' }}
  >
    <p
      style={{
        color: '#D7E2EA',
        opacity: 0.4,
        fontSize: 'clamp(0.8rem, 1vw, 1rem)',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      © {new Date().getFullYear()} Yash Rupani. All rights reserved.
    </p>
  </footer>
);

/* ═══════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <main style={{ background: '#0C0C0C', overflowX: 'clip', fontFamily: "'Kanit', sans-serif" }}>
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}