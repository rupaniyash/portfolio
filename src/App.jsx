import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import avatarFace from './assets/avatar_face_2.png';

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
    href="mailto:rupaniyash@gmail.com"
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
            <ContactButton />
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
   4. SERVICES SECTION
   ═══════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    num: '01',
    name: 'ETL Pipeline Design & Orchestration',
    desc: 'Building end-to-end automated data pipelines using Apache Spark, Kafka, and Airflow — handling both real-time streaming and batch processing at scale across cloud and on-prem environments.',
  },
  {
    num: '02',
    name: 'Cloud Data Architecture (AWS / GCP)',
    desc: 'Architecting scalable data lakes and warehouses on AWS and GCP using services like S3, Glue, EMR, BigQuery, and Redshift — optimized for cost, performance, and reliability.',
  },
  {
    num: '03',
    name: 'AI & RAG Systems / LLM Integration',
    desc: 'Designing AI-driven data pipelines with FAISS vector databases, RAG frameworks, and LLM integrations — enabling semantic search, intelligent retrieval, and generative AI at the data layer.',
  },
  {
    num: '04',
    name: 'Real-time Streaming (Kafka / Spark)',
    desc: 'Building low-latency event-driven architectures with Apache Kafka and Spark Streaming — processing millions of events per second for real-time analytics and operational intelligence.',
  },
  {
    num: '05',
    name: 'Data Modeling & Warehousing',
    desc: 'Designing dimensional and normalized data models in Snowflake, Redshift, and BigQuery — enabling fast, reliable analytics across business domains at terabyte scale.',
  },
  {
    num: '06',
    name: 'Analytics, Dashboards & Visualization',
    desc: 'Translating complex data into clear, actionable insights through dynamic dashboards (Tableau, Looker, Power BI) and automated reporting pipelines built for stakeholder decision-making.',
  },
];

const ServicesSection = () => {
  return (
    <section
      id="skills"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{
          color: '#0C0C0C',
          fontSize: 'clamp(3rem, 12vw, 160px)',
          fontFamily: "'Kanit', sans-serif",
        }}
      >
        Skills
      </h2>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((svc, i) => (
          <FadeIn key={svc.num} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : 'none',
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              {/* Number */}
              <span
                className="font-black shrink-0 leading-none"
                style={{
                  color: '#0C0C0C',
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                {svc.num}
              </span>

              {/* Name + Desc */}
              <div className="flex flex-col gap-2 pt-2">
                <h3
                  className="font-medium uppercase"
                  style={{
                    color: '#0C0C0C',
                    fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {svc.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: '#0C0C0C',
                    opacity: 0.6,
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {svc.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
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
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}