import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  const chars = text.split('');

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

/* ═══════════════════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const navLinks = ['About', 'Skills', 'Projects', 'Contact'];
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
          <FadeIn delay={0.35} y={20}>
            <p
              className="font-light uppercase tracking-wide leading-snug text-left max-w-[200px] sm:max-w-[300px] md:max-w-[400px]"
              style={{
                color: '#D7E2EA',
                fontSize: 'clamp(0.75rem, 1.4vw, 1.2rem)',
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              a data engineer driven by crafting striking and scalable pipelines
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-end sm:items-center">
              <DownloadResumeButton />
              <ContactButton />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   2. MARQUEE SECTION
   ═══════════════════════════════════════════════════════════ */
const MARQUEE_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const MarqueeSection = () => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(200);

  const row1 = MARQUEE_IMAGES.slice(0, 11);
  const row2 = MARQUEE_IMAGES.slice(11);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const newOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ImageTile = ({ src }) => (
    <div className="shrink-0 rounded-2xl overflow-hidden" style={{ width: 420, height: 270 }}>
      <img
        src={src}
        alt="showcase"
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      {/* Row 1 — moves right */}
      <div
        className="flex gap-3 mb-3"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
        }}
      >
        {[...row1, ...row1, ...row1].map((src, i) => (
          <ImageTile key={`r1-${i}`} src={src} />
        ))}
      </div>

      {/* Row 2 — moves left */}
      <div
        className="flex gap-3"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
        }}
      >
        {[...row2, ...row2, ...row2].map((src, i) => (
          <ImageTile key={`r2-${i}`} src={src} />
        ))}
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
   3.5 EXPERIENCE SECTION
   ═══════════════════════════════════════════════════════════ */
const EXPERIENCE = [
  {
    role: 'Software Engineering Intern',
    company: 'QuickGrants',
    date: 'May 2026 – Present',
    location: 'Remote, USA',
    points: [
      'Engineered an automated rule generation pipeline using OCR and text chunking, processing 100+ page policy documents and reducing manual data extraction time by 80%.',
      'Architected backend parsing workflows to transform unstructured text into structured reports, accelerating the preparation time for technical product demonstrations by 15 hours per week.',
      'Optimized the data extraction accuracy of the parsing tool to 95%, ensuring reliable and formatted outputs for client-facing engineering prototypes.',
    ],
  },
  {
    role: 'Research Assistant – Data Engineering',
    company: 'Oregon State University',
    date: 'May 2026 – Present',
    location: 'OR, USA',
    points: [
      'Engineered an end-to-end autonomous ETL pipeline for unstructured multimedia data, leveraging Python-based preprocessing to eliminate 40% of manual data preparation for Agentic AI workflows.',
      'Refined backend data structures and indexing strategies for AI Agents, slashing retrieval latency by 25% and boosting real-time inference performance.',
      'Developed robust data validation frameworks to ensure 100% data integrity while enabling scalable ingestion of terabyte-scale datasets.',
    ],
  },
  {
    role: 'Sr. Systems Engineer (Data Engineering)',
    company: 'Infosys (Charter Communications)',
    date: 'Jun 2021 – Jun 2023',
    location: 'Maharashtra, India',
    points: [
      'Spearheaded the modernization of enterprise data quality pipelines, automating workflows to eliminate 10+ hours/week of manual intervention.',
      'Designed high-performance ETL workflows using Apache Spark to process large-scale system monitoring data, compressing runtime by 40% per cycle.',
      'Constructed dynamic dashboards from semi-structured logs, replacing manual analysis with automated monitoring solutions.',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'Master of Engineering in Computer Science',
    school: 'Oregon State University, USA',
    date: 'Sep 2023 – Dec 2025',
  },
  {
    degree: 'Bachelor of Technology in Electrical Engineering',
    school: 'PDEU, India',
    date: 'Aug 2017 – Jun 2021',
  },
];

const ExperienceSection = () => {
  return (
    <section
      id="experience"
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
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-4xl mx-auto relative">
        {/* Glowing Timeline Line */}
        <div 
          className="absolute left-[7px] sm:left-[11px] top-0 bottom-0 w-[2px] opacity-20"
          style={{
            background: 'linear-gradient(to bottom, transparent, #CA8A04 5%, #CA8A04 95%, transparent)',
          }}
        />

        <div className="flex flex-col gap-12 sm:gap-20">
          {EXPERIENCE.map((exp, i) => (
            <FadeIn key={i} delay={0.1} y={30}>
              <div className="relative flex gap-6 sm:gap-10 group">
                {/* Timeline Dot Column */}
                <div className="relative w-[16px] sm:w-[24px] flex-shrink-0 flex justify-center mt-2">
                  <div 
                    className="w-[10px] h-[10px] rounded-full bg-[#CA8A04] transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_15px_#CA8A04]"
                  />
                </div>
                
                {/* Content Column */}
                <div className="flex flex-col flex-1 w-full pb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-4">
                    <h3 className="font-bold text-[#FAFAF9] text-xl sm:text-2xl" style={{ fontFamily: "'Kanit', sans-serif", letterSpacing: '0.05em' }}>
                      {exp.role}
                    </h3>
                    <span className="text-[#CA8A04] font-medium text-sm sm:text-base mt-1 sm:mt-0 tracking-widest uppercase">
                      {exp.date}
                    </span>
                  </div>
                  
                  <h4 className="text-[#D7E2EA] opacity-70 text-lg mb-6 tracking-wide" style={{ fontFamily: "'Kanit', sans-serif" }}>
                    {exp.company} <span className="opacity-50 mx-2">•</span> {exp.location}
                  </h4>
                  
                  <ul className="flex flex-col gap-3">
                    {exp.points.map((point, j) => {
                      // Highlight numbers and percentages
                      const highlightedPoint = point.replace(/\b(\d+(?:\.\d+)?%?|\d+\+)\b/g, '<span style="color: #CA8A04; font-weight: 600;">$1</span>');
                      return (
                        <li key={j} className="text-[#FAFAF9] opacity-80 leading-relaxed text-sm sm:text-base flex items-start gap-3">
                          <span className="text-[#CA8A04] mt-1 opacity-50">▹</span>
                          <span dangerouslySetInnerHTML={{ __html: highlightedPoint }} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Education Sub-section */}
        <FadeIn delay={0.2} y={30}>
          <div className="mt-24 sm:mt-32 relative flex gap-6 sm:gap-10 group">
             {/* Education Icon/Dot Column */}
             <div className="relative w-[16px] sm:w-[24px] flex-shrink-0 flex justify-center mt-2">
               <div 
                  className="w-[18px] h-[18px] rounded-full border-2 border-[#CA8A04] bg-[#0C0C0C] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_#CA8A04]"
                >
                  <div className="w-[6px] h-[6px] rounded-full bg-[#CA8A04]" />
                </div>
              </div>
              
              {/* Education Content Column */}
              <div className="flex flex-col flex-1 w-full">
                <h3 className="font-black uppercase text-[#FAFAF9] text-2xl sm:text-3xl mb-8 tracking-widest" style={{ fontFamily: "'Kanit', sans-serif" }}>
                  Education
                </h3>

                <div className="flex flex-col gap-8">
                  {EDUCATION.map((edu, i) => (
                    <div key={i} className="flex flex-col border-l-2 border-[#CA8A04]/20 pl-6">
                      <h4 className="font-bold text-[#FAFAF9] text-lg sm:text-xl" style={{ fontFamily: "'Kanit', sans-serif", letterSpacing: '0.05em' }}>
                        {edu.degree}
                      </h4>
                      <p className="text-[#D7E2EA] opacity-70 text-base mt-1 tracking-wide" style={{ fontFamily: "'Kanit', sans-serif" }}>
                        {edu.school}
                      </p>
                      <span className="text-[#CA8A04] font-medium text-sm mt-2 tracking-widest uppercase opacity-80">
                        {edu.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

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
      <MarqueeSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}