import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Database, 
  Cloud, 
  Server, 
  Code, 
  Cpu,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  MapPin,
  TrendingUp,
  LineChart
} from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top < 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const NavLink = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`text-sm md:text-base font-medium transition-colors duration-300 hover:text-cyan-400 ${
        activeSection === id ? 'text-cyan-400' : 'text-slate-400'
      }`}
    >
      {label}
    </button>
  );

  const MobileNavLink = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className="block w-full text-left py-4 px-6 text-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 border-l-2 border-transparent hover:border-cyan-400 transition-all"
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          scrolled ? 'bg-slate-950/90 backdrop-blur-md border-slate-800 py-4' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold tracking-tighter text-cyan-400 flex items-center gap-2">
            <Terminal className="w-6 h-6 md:w-8 md:h-8" />
            <span>YR<span className="text-slate-500">.dev</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            <NavLink id="home" label="Start" />
            <NavLink id="about" label="About" />
            <NavLink id="experience" label="Experience" />
            <NavLink id="projects" label="Projects" />
            <NavLink id="skills" label="Stack" />
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 rounded-full border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-all text-sm md:text-base font-medium tracking-wide"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute w-full bg-slate-900 border-b border-slate-800 transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
          <MobileNavLink id="home" label="Start" />
          <MobileNavLink id="about" label="About" />
          <MobileNavLink id="experience" label="Experience" />
          <MobileNavLink id="projects" label="Projects" />
          <MobileNavLink id="skills" label="Stack" />
          <MobileNavLink id="contact" label="Contact" />
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-900 text-cyan-400 text-xs md:text-sm font-mono mb-2">
              Hello, World! I am
            </div>
            
            {/* SCALING HEADLINE: Small on phone, Huge on Desktop */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Yash <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Rupani
              </span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl text-slate-400 font-light">
              Software & Data Engineer
            </h2>
            
            <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-lg leading-relaxed">
              I architect scalable ETL pipelines, optimize backend systems, and build robust data infrastructure on AWS & GCP.
              Passionate about turning raw data into actionable insights.
            </p>
            
            <div className="flex gap-4 pt-4">
              <a href="https://github.com/rupaniyash" target="_blank" rel="noreferrer" className="p-3 md:p-4 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 transition-all transform hover:-translate-y-1">
                <Github className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="https://www.linkedin.com/in/yash-rupani-/" target="_blank" rel="noreferrer" className="p-3 md:p-4 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-blue-400 transition-all transform hover:-translate-y-1">
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="mailto:rupaniyash1818@gmail.com" className="p-3 md:p-4 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-red-400 transition-all transform hover:-translate-y-1">
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>

          {/* Code Block - Now Visible on Mobile */}
          <div className="relative mt-12 md:mt-0 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-slate-900 rounded-2xl p-4 md:p-6 border border-slate-800 font-mono text-xs sm:text-sm md:text-base shadow-2xl overflow-hidden">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-3">
                <p className="text-purple-400">class <span className="text-yellow-400">DataEngineer</span>:</p>
                <p className="pl-4 text-slate-400">def <span className="text-blue-400">__init__</span>(self):</p>
                <p className="pl-8 text-slate-500">self.name = <span className="text-green-400">"Yash Rupani"</span></p>
                <p className="pl-8 text-slate-500">self.skills = [<span className="text-green-400">"Python"</span>, <span className="text-green-400">"Spark"</span>, <span className="text-green-400">"AWS"</span>]</p>
                <p className="pl-8 text-slate-500">self.location = <span className="text-green-400">"Corvallis, OR"</span></p>
                <br/>
                <p className="pl-4 text-slate-400">def <span className="text-blue-400">solve_problem</span>(self, data):</p>
                <p className="pl-8 text-slate-500"># Transforming complexity into clarity</p>
                <p className="pl-8 text-purple-400">return <span className="text-slate-300">data.optimize()</span></p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-600">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">About Me</h2>
            <div className="h-px bg-slate-800 flex-grow"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-slate-400 leading-relaxed text-base md:text-lg">
              <p>
                I am a passionate <span className="text-cyan-400 font-medium">Software and Data Engineer</span> based in Corvallis, Oregon. 
                My journey involves designing scalable ETL pipelines and backend architectures that power data-driven decision-making.
              </p>
              <p>
                With a strong foundation in <span className="text-cyan-400 font-medium">Python, SQL, and Distributed Computing</span>, 
                I enjoy tackling complex data challenges—whether it's optimizing search algorithms with RAG or processing 
                streaming sensor data in real-time.
              </p>
              <p>
                When I'm not writing code, I'm likely analyzing data trends or exploring the latest developments in Cloud Computing and AI.
              </p>
              
              <div className="flex items-center gap-2 mt-4 text-slate-300">
                <MapPin className="text-cyan-500" size={20} />
                <span>Corvallis, OR</span>
              </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
                 <GraduationCap className="text-cyan-500" />
                 Education
               </h3>
               
               {/* Education Card 1 */}
               <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-cyan-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg md:text-xl font-medium text-slate-200">Master of Engineering in Computer Science</h4>
                      <p className="text-cyan-400 text-sm md:text-base">Oregon State University</p>
                    </div>
                    <span className="text-xs md:text-sm font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">2023 - 2025</span>
                  </div>
               </div>

               {/* Education Card 2 */}
               <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-cyan-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg md:text-xl font-medium text-slate-200">Bachelor of Technology in Electrical Engineering</h4>
                      <p className="text-cyan-400 text-sm md:text-base">Pandit Deendayal Energy University</p>
                    </div>
                    <span className="text-xs md:text-sm font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">2017 - 2021</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Work Experience</h2>
            <div className="h-px bg-slate-800 flex-grow"></div>
          </div>

          <div className="space-y-12 relative border-l-2 border-slate-800 ml-3 md:ml-6">
            {/* Experience Items */}
            {[
              {
                role: "Intern AI Agent Graph RAG / ML Scientist",
                company: "GrantAide",
                period: "Jul 2025 - Sept 2025",
                description: [
                  "Optimized backend systems using Flask and Firestore, improving performance by 30%.",
                  "Implemented RAG with FAISS vector DBs, boosting search accuracy by 40%.",
                  "Deployed cloud apps on GCP/AWS with 99.9% uptime."
                ]
              },
              {
                role: "Teaching Assistant (Business Analytics)",
                company: "Oregon State University",
                period: "Apr 2025 - Jun 2025",
                description: [
                  "Led Python-based data wrangling for industry projects (Trailblazers, Port of Portland).",
                  "Improved data accuracy by 25% using Pandas/NumPy.",
                  "Coordinated academic-industry partnerships for 15+ students."
                ]
              },
              {
                role: "Sr. Systems Engineer - Data Engineering",
                company: "Infosys",
                period: "Jun 2021 - Jun 2023",
                description: [
                  "Streamlined data quality pipelines, reducing validation time by 35%.",
                  "Designed ETL workflows for user behavior data, improving efficiency by 40%.",
                  "Automated pipeline infrastructure scripts, cutting operational overhead by 30%."
                ]
              }
            ].map((job, index) => (
              <div key={index} className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 group-hover:bg-cyan-500 transition-colors"></div>
                
                <h3 className="text-xl md:text-2xl font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {job.role}
                </h3>
                <div className="flex flex-wrap gap-2 items-center text-sm text-slate-400 mt-2 mb-4">
                  <span className="font-medium text-slate-300 text-sm md:text-base">{job.company}</span>
                  <span>•</span>
                  <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400">{job.period}</span>
                </div>
                <ul className="space-y-3">
                  {job.description.map((point, i) => (
                    <li key={i} className="text-slate-400 text-sm md:text-base leading-relaxed flex gap-3">
                      <span className="text-cyan-500 mt-1.5 min-w-[12px]">▹</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - UPDATED */}
      <section id="projects" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Featured Projects</h2>
            <div className="h-px bg-slate-800 flex-grow"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1: YouTube Data Engineering */}
            <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-800 rounded-lg text-red-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/rupaniyash/youtube-data-engineering-project" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-slate-500 hover:text-slate-300 transform hover:scale-110 transition-transform"
                  >
                    <Github className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-200 mb-3 group-hover:text-red-400 transition-colors">YouTube Data Engineering</h3>
              <p className="text-slate-400 text-sm md:text-base mb-6 leading-relaxed">
                Designed a secure and scalable ETL pipeline to process YouTube trending video data. 
                Leveraged AWS Cloud (S3, Glue, Athena) to ingest structured and semi-structured data, 
                enabling analytics on video categories and engagement metrics.
              </p>
              <div className="flex flex-wrap gap-2">
                {["AWS S3", "AWS Glue", "AWS Athena", "Python", "QuickSight"].map(tag => (
                  <span key={tag} className="text-xs md:text-sm font-mono text-red-300/80 bg-red-950/30 px-3 py-1.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 2: Financial Markets News Sentiment */}
            <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-800 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
                  <LineChart className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/rupaniyash/Financial-Markets-News-Sentiment-Analysis" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-slate-500 hover:text-slate-300 transform hover:scale-110 transition-transform"
                  >
                    <Github className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-200 mb-3 group-hover:text-green-400 transition-colors">Financial News Sentiment Analysis</h3>
              <p className="text-slate-400 text-sm md:text-base mb-6 leading-relaxed">
                Developed an NLP-driven analysis tool to gauge market sentiment from financial news streams. 
                Utilized Python and machine learning libraries to classify news sentiment, providing actionable insights for market trend prediction.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "NLP", "Scikit-learn", "Pandas", "Sentiment Analysis"].map(tag => (
                  <span key={tag} className="text-xs md:text-sm font-mono text-green-300/80 bg-green-950/30 px-3 py-1.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">Technical Arsenal</h2>
            <p className="text-slate-400 text-base md:text-lg">Tools and technologies I use to bring data to life.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Code className="w-5 h-5 md:w-6 md:h-6" />
                <h3 className="font-semibold text-base md:text-lg">Languages</h3>
              </div>
              <div className="flex flex-col gap-2">
                {["Python", "SQL", "Flask", "Shell Scripting"].map(skill => (
                  <div key={skill} className="bg-slate-900 border border-slate-800 p-3 rounded text-sm md:text-base text-slate-300 hover:border-cyan-500/30 transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Server className="w-5 h-5 md:w-6 md:h-6" />
                <h3 className="font-semibold text-base md:text-lg">Big Data</h3>
              </div>
              <div className="flex flex-col gap-2">
                {["Apache Spark", "PySpark", "Kafka", "Airflow", "Hadoop", "Snowflake"].map(skill => (
                  <div key={skill} className="bg-slate-900 border border-slate-800 p-3 rounded text-sm md:text-base text-slate-300 hover:border-blue-500/30 transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Cloud className="w-5 h-5 md:w-6 md:h-6" />
                <h3 className="font-semibold text-base md:text-lg">Cloud & DB</h3>
              </div>
              <div className="flex flex-col gap-2">
                {["AWS (S3, EMR, Lambda)", "GCP (BigQuery)", "PostgreSQL", "MongoDB", "Firestore"].map(skill => (
                  <div key={skill} className="bg-slate-900 border border-slate-800 p-3 rounded text-sm md:text-base text-slate-300 hover:border-purple-500/30 transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Terminal className="w-5 h-5 md:w-6 md:h-6" />
                <h3 className="font-semibold text-base md:text-lg">DevOps & ML</h3>
              </div>
              <div className="flex flex-col gap-2">
                {["Docker", "Git/GitHub", "Pandas & NumPy", "RAG / FAISS", "Tableau"].map(skill => (
                  <div key={skill} className="bg-slate-900 border border-slate-800 p-3 rounded text-sm md:text-base text-slate-300 hover:border-green-500/30 transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">Let's Connect</h2>
          <p className="text-slate-400 mb-10 text-lg md:text-xl leading-relaxed">
            I am actively seeking entry-level opportunities as a Software Engineer or Data Engineer. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <a 
            href="mailto:rupaniyash1818@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1 text-base md:text-lg"
          >
            <Mail className="w-5 h-5 md:w-6 md:h-6" />
            Say Hello
          </a>

          <div className="mt-20 pt-10 border-t border-slate-800 text-slate-500 text-xs md:text-sm">
            <p>Designed & Built by Yash Rupani</p>
            <p className="mt-2">Corvallis, OR • +1 541-250-1204</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;