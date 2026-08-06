import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { Download, ArrowDown, ChevronRight, FileText, Film, Layers, Eye, RefreshCw, Activity, Lightbulb, Workflow, Award, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { BackgroundParticles } from "./components/BackgroundParticles";
import { SectionHeader } from "./components/SectionHeader";
import { CustomVideoPlayer } from "./components/CustomVideoPlayer";
import { StoryboardSection } from "./components/StoryboardSection";
import { ImageGallery } from "./components/ImageGallery";
import { WorkflowTimeline } from "./components/WorkflowTimeline";
import { CreativeLabDashboard } from "./components/CreativeLabDashboard";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [expandedConceptCard, setExpandedConceptCard] = useState<number | null>(0);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Track Scroll for Header Reveal
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Simple active section highlights
      let currentSection = "";
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = key;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { id: "concept", label: "Creative Concept" },
    { id: "film", label: "Brand Film" },
    { id: "storyboard", label: "Storyboard" },
    { id: "images", label: "AI Supporting Images" },
    { id: "workflow", label: "AI Workflow" },
    { id: "lab", label: "AI Creative Lab" },
  ];

  const scrollToId = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen text-white bg-black select-none tech-grid overflow-hidden">
      
      {/* 1. Global Interactive Ambient Particles */}
      <BackgroundParticles />

      {/* 2. Glassmorphic Adaptive Navigation Header */}
      <header
        className={`fixed top-0 inset-x-0 z-40 border-b border-white/5 bg-black/60 backdrop-blur-md transition-all duration-500 ${
          scrollY > 200 ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Global Progress Bar */}
        <div
          className="h-[2px] bg-wsp-red transition-all duration-100 absolute top-0 left-0"
          style={{
            width: `${
              typeof window !== "undefined"
                ? (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                : 0
            }%`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="./assets/images/creative_concept_image1.png" alt="WSP" className="h-4 object-contain" />
            <span className="font-editorial text-xs font-black tracking-[0.25em] text-white/80 hidden sm:inline uppercase">
              ENGINEERING TOMORROW
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className={`font-editorial text-[10px] tracking-widest uppercase transition-all font-bold cursor-pointer ${
                  activeSection === item.id ? "text-wsp-red" : "text-white/50 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollToId("downloads")}
            className="font-editorial text-[9px] tracking-widest uppercase border border-wsp-red/30 px-3 py-1.5 hover:bg-wsp-red/10 text-white rounded transition-all cursor-pointer font-bold"
          >
            Download Center
          </button>
        </div>
      </header>

      {/* 3. Opening Experience / Hero Section */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-6 text-center select-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black pointer-events-none z-0" />
        
        {/* WSP logo intro */}
        <img
          src="./assets/images/creative_concept_image1.png"
          alt="WSP Logo"
          className="h-10 md:h-12 object-contain mb-12 animate-pulse opacity-90 z-10"
        />

        <div className="flex flex-col gap-6 max-w-4xl z-10 relative">
          <h1 className="font-editorial text-5xl md:text-8xl font-black tracking-tight text-white uppercase leading-none select-none">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-wsp-red">Tomorrow</span>
          </h1>
          
          <div className="h-[1px] w-24 bg-wsp-red mx-auto my-2" />

          <p className="font-editorial text-sm md:text-lg tracking-[0.25em] uppercase text-white/60 font-semibold max-w-2xl mx-auto leading-relaxed">
            AI-Assisted Brand Film Concept for WSP
          </p>

          <span className="font-editorial text-xs md:text-sm tracking-[0.3em] uppercase text-white/40 font-medium">
            Hussein Masri
          </span>
        </div>

        {/* Scroll To Explore Indicator */}
        <div
          onClick={() => scrollToId("concept")}
          className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer z-10 hover:text-wsp-red transition-all group"
        >
          <span className="font-editorial text-[9px] tracking-[0.3em] uppercase text-white/40 group-hover:text-wsp-red/80 font-bold transition-all">
            Scroll to explore
          </span>
          <ArrowDown size={14} className="text-white/30 group-hover:text-wsp-red/80 animate-bounce transition-all" />
        </div>
      </section>

      {/* Container for Sections */}
      <main className="w-full flex flex-col relative z-10">

        {/* ==================================================== */}
        {/* SECTION 01 — CREATIVE CONCEPT */}
        {/* ==================================================== */}
        <section
          id="concept"
          ref={(el) => { sectionsRef.current["concept"] = el; }}
          className="w-full py-24 bg-[#080809] border-b border-white/5 scroll-mt-20 relative overflow-hidden"
        >
          {/* Technical Red Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(227,27,35,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(227,27,35,0.012)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              num="01"
              title="Creative Concept"
              subtitle="Where Vision Becomes Infrastructure"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Visual Arc Panel (Left) */}
              <div className="lg:col-span-5 flex flex-col gap-6 p-8 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-wsp-red/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="font-editorial text-xs font-bold tracking-widest text-wsp-red uppercase">
                  The Narrative Journey
                </h3>
                
                {/* Graphic Representation of Arc */}
                <div className="flex flex-col gap-8 relative pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
                  {[
                    { title: "Understanding", active: true },
                    { title: "Insight & Collaboration", active: true },
                    { title: "Sustainability in Action", active: true },
                    { title: "Lasting Impact", active: true },
                  ].map((arc, idx) => (
                    <div key={idx} className="flex gap-4 items-center group">
                      <div className="w-4.5 h-4.5 rounded-full bg-black border border-wsp-red/50 group-hover:border-wsp-red flex items-center justify-center text-[8px] text-wsp-red font-black z-10 transition-colors">
                        {idx + 1}
                      </div>
                      <span className="font-editorial text-xs tracking-wider uppercase text-white/80 group-hover:text-white transition-colors">
                        {arc.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Details (Right) - Interactive Cards */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                
                {[
                  {
                    num: "01",
                    title: "THE IDEA",
                    teaser: "A story of what comes next. Transitioning from planning to impact.",
                    fullText: "Not a company that builds a company that shapes what's next. The film follows a single arc: from an idea on paper to a built reality that changes how people live.",
                    icon: <Lightbulb className="text-wsp-red" size={20} />,
                  },
                  {
                    num: "02",
                    title: "NARRATIVE ARC",
                    teaser: "Four acts grounded in real WSP capabilities building to one final image.",
                    fullText: "Understanding → Insight & Collaboration → Sustainability in Action → Lasting Impact. Four acts, each grounded in a real WSP capability, building toward one closing image.",
                    icon: <Workflow className="text-wsp-red" size={20} />,
                  },
                  {
                    num: "03",
                    title: "CREATIVE RATIONALE",
                    teaser: "Built on WSP's Future Ready® mindset across multiple engineering sectors.",
                    fullText: "Built on WSP's actual positioning, the Future Ready® mindset and its real sectors (transport, energy, water, buildings) are not a generic engineering narrative.",
                    icon: <Award className="text-wsp-red" size={20} />,
                  },
                  {
                    num: "04",
                    title: "VISUAL STYLE & ROLE OF AI",
                    teaser: "Cinematic documentary tone where AI is used to accelerate and visualize ideas.",
                    fullText: "Cinematic documentary tone. AI is used strategically to accelerate production and visualize complex engineering ideas, not as the spectacle itself.",
                    icon: <Sparkles className="text-wsp-red" size={20} />,
                  },
                ].map((card, idx) => {
                  const isExpanded = expandedConceptCard === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setExpandedConceptCard(isExpanded ? null : idx)}
                      className={`p-5 border rounded-lg bg-[#080809]/40 backdrop-blur-sm transition-all duration-300 cursor-pointer select-none ${
                        isExpanded ? "border-wsp-red bg-wsp-red/5" : "border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-black/60 border border-white/5 rounded-lg">
                            {card.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-mono text-[9px] text-wsp-red tracking-widest font-black">
                              CONCEPT // {card.num}
                            </span>
                            <h4 className="font-editorial text-xs font-bold tracking-wider text-white uppercase">
                              {card.title}
                            </h4>
                          </div>
                        </div>
                        
                        <div className="text-white/40">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>

                      <div className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                      }`}>
                        <div className="overflow-hidden">
                          <p className="text-xs md:text-sm text-white/90 leading-relaxed pt-2 border-t border-white/5">
                            {card.fullText}
                          </p>
                        </div>
                      </div>

                      {!isExpanded && (
                        <p className="text-[10px] text-text-muted mt-2 truncate max-w-xl">
                          {card.teaser}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Download button for Creative Concept */}
                <div className="mt-4">
                  <a
                    href="./PDF/WSP Creative Concept.pdf"
                    download="WSP Creative Concept.pdf"
                    className="red-outline-btn"
                  >
                    <Download size={14} className="mr-2" />
                    Download Creative Concept PDF
                  </a>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* SECTION 02 — 60-SECOND PROMOTIONAL FILM */}
        {/* ==================================================== */}
        <section
          id="film"
          ref={(el) => { sectionsRef.current["film"] = el; }}
          className="w-full py-24 bg-[#030304] border-b border-white/5 scroll-mt-20 relative overflow-hidden"
        >
          {/* Cinematic Red Ambient Ambilight Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-wsp-red/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              num="02"
              title="60-Second Promotional Film"
              subtitle="Hussein Masri AI Director"
            />

            <div className="flex flex-col gap-8">
              <CustomVideoPlayer />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
                <div className="flex flex-col gap-1">
                  <span className="font-editorial text-[10px] tracking-widest text-wsp-red font-bold uppercase">
                    Cinematic Centerpiece
                  </span>
                  <p className="text-xs text-text-muted">
                    60-Second WSP Promotional Film — Engineering Tomorrow Concept.
                  </p>
                </div>

                <a
                  href="./WSP Engineering Tomorrow Hussein Masri.mp4"
                  download="WSP Engineering Tomorrow Hussein Masri.mp4"
                  className="red-outline-btn"
                >
                  <Download size={14} className="mr-2" />
                  Download Brand Film
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* SECTION 03 — STORYBOARD / SCENE BREAKDOWN */}
        {/* ==================================================== */}
        <section
          id="storyboard"
          ref={(el) => { sectionsRef.current["storyboard"] = el; }}
          className="w-full py-24 bg-[#060607] border-b border-white/5 scroll-mt-20 relative overflow-hidden"
        >
          {/* Subtle Technical CAD Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              num="03"
              title="Storyboard & Scene Breakdown"
              subtitle="Authentic Narrative Pipeline"
            />

            <div className="flex flex-col gap-8">
              <StoryboardSection />

              <div className="mt-8">
                <a
                  href="./PDF/WSP Storyboard Redesigned.pdf"
                  download="WSP Storyboard Redesigned.pdf"
                  className="red-outline-btn"
                >
                  <Download size={14} className="mr-2" />
                  Download Storyboard PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* SECTION 04 — AI-GENERATED SUPPORTING IMAGES */}
        {/* ==================================================== */}
        <section
          id="images"
          ref={(el) => { sectionsRef.current["images"] = el; }}
          className="w-full py-24 bg-[#09090b] border-b border-white/5 scroll-mt-20 relative overflow-hidden"
        >
          {/* Gallery Diagonal Striped Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.003)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.003)_50%,rgba(255,255,255,0.003)_75%,transparent_75%,transparent)] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              num="04"
              title="AI-Generated Supporting Images"
              subtitle="Creative Development Journey"
            />

            <div className="flex flex-col gap-8">
              <ImageGallery />

              <div className="mt-8">
                <a
                  href="./PDF/WSP AI Generated Images.pdf"
                  download="WSP AI Generated Images.pdf"
                  className="red-outline-btn"
                >
                  <Download size={14} className="mr-2" />
                  Download AI-Generated Supporting Images PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* SECTION 05 — AI WORKFLOW DOCUMENTATION */}
        {/* ==================================================== */}
        <section
          id="workflow"
          ref={(el) => { sectionsRef.current["workflow"] = el; }}
          className="w-full py-24 bg-[#050505] border-b border-white/5 scroll-mt-20 relative overflow-hidden"
        >
          {/* Connected Red Pipeline Dots */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(227,27,35,0.015)_1.5px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              num="05"
              title="AI Workflow & Pipeline"
              subtitle="3-Day Delivery Architecture"
            />

            <div className="flex flex-col gap-8">
              <WorkflowTimeline />

              <div className="mt-8">
                <a
                  href="./PDF/WSP AI Workflow Documentation.pdf"
                  download="WSP AI Workflow Documentation.pdf"
                  className="red-outline-btn"
                >
                  <Download size={14} className="mr-2" />
                  Download AI Workflow Documentation PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* SECTION 06 — AI CREATIVE LAB */}
        {/* ==================================================== */}
        <section
          id="lab"
          ref={(el) => { sectionsRef.current["lab"] = el; }}
          className="w-full py-24 bg-gradient-to-tr from-[#050506] via-[#0d0506] to-[#050506] border-b border-white/5 scroll-mt-20 relative overflow-hidden"
        >
          {/* Top glowing line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-wsp-red/20 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              num="06"
              title="AI Creative Lab"
              subtitle="Operational Governance Model"
            />

            <div className="flex flex-col gap-8">
              <CreativeLabDashboard />

              <div className="mt-8">
                <a
                  href="./PDF/WSP AI Creative Lab.pdf"
                  download="WSP AI Creative Lab.pdf"
                  className="red-outline-btn"
                >
                  <Download size={14} className="mr-2" />
                  Download AI Creative Lab PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* FINAL DOWNLOAD CENTER */}
        {/* ==================================================== */}
        <section
          id="downloads"
          ref={(el) => { sectionsRef.current["downloads"] = el; }}
          className="w-full py-24 bg-gradient-to-b from-[#080809] to-[#040405] scroll-mt-20 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12 select-none">
              <span className="font-editorial text-wsp-red text-lg md:text-xl font-bold tracking-widest">
                // DATA
              </span>
              <h2 className="font-editorial text-4xl md:text-5xl font-black tracking-tight uppercase text-white">
                Project Downloads
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Film download card */}
              <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg flex flex-col justify-between gap-6 hover:border-wsp-red/30 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-wsp-red/5 border border-wsp-red/20 group-hover:border-wsp-red/50 text-wsp-red rounded transition-all">
                    <Film size={20} />
                  </div>
                  <span className="text-[10px] font-editorial text-white/40 tracking-wider uppercase font-bold">
                    MP4 Video
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-editorial text-sm font-bold tracking-wider text-white uppercase group-hover:text-wsp-red transition-colors">
                    WSP Brand Film
                  </h4>
                  <p className="text-[10px] text-text-muted">
                    60-Second high-quality cinematic promotional film concept
                  </p>
                </div>
                <a
                  href="./WSP Engineering Tomorrow Hussein Masri.mp4"
                  download="WSP Engineering Tomorrow Hussein Masri.mp4"
                  className="flex items-center justify-between text-xs font-editorial text-white/80 group-hover:text-wsp-red transition-colors border-t border-white/5 pt-4"
                >
                  <span>Download Film</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Creative Concept download card */}
              <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg flex flex-col justify-between gap-6 hover:border-wsp-red/30 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 border border-white/10 group-hover:border-wsp-red/50 text-white/70 group-hover:text-wsp-red rounded transition-all">
                    <FileText size={20} />
                  </div>
                  <span className="text-[10px] font-editorial text-white/40 tracking-wider uppercase font-bold">
                    PDF Brief
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-editorial text-sm font-bold tracking-wider text-white uppercase group-hover:text-wsp-red transition-colors">
                    Creative Concept
                  </h4>
                  <p className="text-[10px] text-text-muted">
                    Detailed positioning narrative and creative direction document
                  </p>
                </div>
                <a
                  href="./PDF/WSP Creative Concept.pdf"
                  download="WSP Creative Concept.pdf"
                  className="flex items-center justify-between text-xs font-editorial text-white/80 group-hover:text-wsp-red transition-colors border-t border-white/5 pt-4"
                >
                  <span>Download PDF</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Storyboard download card */}
              <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg flex flex-col justify-between gap-6 hover:border-wsp-red/30 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 border border-white/10 group-hover:border-wsp-red/50 text-white/70 group-hover:text-wsp-red rounded transition-all">
                    <Layers size={20} />
                  </div>
                  <span className="text-[10px] font-editorial text-white/40 tracking-wider uppercase font-bold">
                    PDF storyboard
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-editorial text-sm font-bold tracking-wider text-white uppercase group-hover:text-wsp-red transition-colors">
                    Redesigned Storyboard
                  </h4>
                  <p className="text-[10px] text-text-muted">
                    Full 12-scene screenplay, voice-overs and visual cues
                  </p>
                </div>
                <a
                  href="./PDF/WSP Storyboard Redesigned.pdf"
                  download="WSP Storyboard Redesigned.pdf"
                  className="flex items-center justify-between text-xs font-editorial text-white/80 group-hover:text-wsp-red transition-colors border-t border-white/5 pt-4"
                >
                  <span>Download PDF</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* AI Generated Images download card */}
              <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg flex flex-col justify-between gap-6 hover:border-wsp-red/30 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 border border-white/10 group-hover:border-wsp-red/50 text-white/70 group-hover:text-wsp-red rounded transition-all">
                    <Eye size={20} />
                  </div>
                  <span className="text-[10px] font-editorial text-white/40 tracking-wider uppercase font-bold">
                    PDF catalog
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-editorial text-sm font-bold tracking-wider text-white uppercase group-hover:text-wsp-red transition-colors">
                    AI-Generated Images
                  </h4>
                  <p className="text-[10px] text-text-muted">
                    High-res image catalog and prompts used in direction exploration
                  </p>
                </div>
                <a
                  href="./PDF/WSP AI Generated Images.pdf"
                  download="WSP AI Generated Images.pdf"
                  className="flex items-center justify-between text-xs font-editorial text-white/80 group-hover:text-wsp-red transition-colors border-t border-white/5 pt-4"
                >
                  <span>Download PDF</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* AI Workflow download card */}
              <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg flex flex-col justify-between gap-6 hover:border-wsp-red/30 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 border border-white/10 group-hover:border-wsp-red/50 text-white/70 group-hover:text-wsp-red rounded transition-all">
                    <RefreshCw size={20} />
                  </div>
                  <span className="text-[10px] font-editorial text-white/40 tracking-wider uppercase font-bold">
                    PDF Workflow
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-editorial text-sm font-bold tracking-wider text-white uppercase group-hover:text-wsp-red transition-colors">
                    AI Workflow Docs
                  </h4>
                  <p className="text-[10px] text-text-muted">
                    Ecosystem of 15 tools mapped to 5 stages of production
                  </p>
                </div>
                <a
                  href="./PDF/WSP AI Workflow Documentation.pdf"
                  download="WSP AI Workflow Documentation.pdf"
                  className="flex items-center justify-between text-xs font-editorial text-white/80 group-hover:text-wsp-red transition-colors border-t border-white/5 pt-4"
                >
                  <span>Download PDF</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* AI Creative Lab download card */}
              <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg flex flex-col justify-between gap-6 hover:border-wsp-red/30 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 border border-white/10 group-hover:border-wsp-red/50 text-white/70 group-hover:text-wsp-red rounded transition-all">
                    <Activity size={20} />
                  </div>
                  <span className="text-[10px] font-editorial text-white/40 tracking-wider uppercase font-bold">
                    PDF Blueprint
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-editorial text-sm font-bold tracking-wider text-white uppercase group-hover:text-wsp-red transition-colors">
                    AI Creative Lab
                  </h4>
                  <p className="text-[10px] text-text-muted">
                    Strategic governance and business rollout roadmap
                  </p>
                </div>
                <a
                  href="./PDF/WSP AI Creative Lab.pdf"
                  download="WSP AI Creative Lab.pdf"
                  className="flex items-center justify-between text-xs font-editorial text-white/80 group-hover:text-wsp-red transition-colors border-t border-white/5 pt-4"
                >
                  <span>Download PDF</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 4. Minimal Cinematic Footer */}
      <footer className="border-t border-white/5 bg-[#050506] py-16 px-6 relative z-10 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-editorial text-lg font-black tracking-widest text-white uppercase">
              Engineering Tomorrow
            </h3>
            <p className="font-editorial text-xs tracking-wider text-white/50 uppercase">
              AI-Assisted Brand Film Concept for WSP
            </p>
            <p className="text-[10px] text-white/30 font-medium">
              Created as part of the AI-First Multimedia Designer creative assignment.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 md:text-right font-editorial text-xs font-bold tracking-widest uppercase">
            <span className="text-white/40">Presented by</span>
            <span className="text-white">Hussein Masri</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
