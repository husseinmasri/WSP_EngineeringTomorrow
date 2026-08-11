import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, ChevronRight, FileText, Cpu, ShieldCheck, Settings, Layers, ArrowDown, ArrowLeft, Sun, Moon } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

interface Act {
  id: string;
  actNum: string;
  title: string;
  phase: string;
  desc: string;
  transition: string;
  src: string;
  planSrc?: string;
  subImages: { label: string; src: string; desc: string }[];
}

const actsData: Act[] = [
  {
    id: "act-1",
    actNum: "ACT I",
    title: "Site to Structure",
    phase: "Phase 1 (Months 0 - 24)",
    desc: "Labelled site model resolves into shell & core — C1-C3 and Front of House (FOH) buildings. Establishes the scale and layout of the development.",
    transition: "Match-cut on shared geometry — the initial site outline resolves directly into the physical concrete foundations and core building structure.",
    src: "./assets/images_final/wsp_site_model.png",
    planSrc: "./assets/images_final/wsp_site_plan.jpg",
    subImages: [
      { label: "Site Model View", src: "./assets/images_final/wsp_site_model.png", desc: "Labeled 3D isometric representation of the site topography and initial building footprint outlines." },
      { label: "Master Site Plan", src: "./assets/images_final/wsp_site_plan.jpg", desc: "Detailed structural site plan outlining structural divisions, access routes, and buffer zones." },
      { label: "Structural Framing", src: "./assets/images_final/slide_3_image_7_Picture_58.jpg", desc: "Initial steel and concrete framing view demonstrating core structural execution." }
    ]
  },
  {
    id: "act-2",
    actNum: "ACT II",
    title: "Structure to System",
    phase: "Phase 2 & 3 (Months 24 - 48)",
    desc: "Resolved masterplan fit-out. Follows the construction progression as the shell transforms into an active facility, tracking the data hall fit-out building by building.",
    transition: "The concrete shell footprint established in Act I becomes the base layout for the mechanical, electrical, and data tray fits in Act II.",
    src: "./assets/images_final/slide_3_image_5_Picture_54.png",
    subImages: [
      { label: "System Plan", src: "./assets/images_final/slide_3_image_5_Picture_54.png", desc: "Data hall technical routing layout showing partition zones and distribution corridors." },
      { label: "M&E Tray Tracing", src: "./assets/images_final/slide_4_image_3_Picture_5.png", desc: "Cable containment systems, overhead busways, and cold aisle containment structures." },
      { label: "Internal Server Pods", src: "./assets/images_final/slide_4_image_2_Picture_11.jpg", desc: "Internal perspective of server cabinet spaces prior to system commissioning." }
    ]
  },
  {
    id: "act-3",
    actNum: "ACT III",
    title: "System to Service",
    phase: "Commissioning & Handover (Months 48 - 72+)",
    desc: "Completed render and testing. The journey concludes with the transition to Ready-for-Service (RFS) operations, shifting from a construction project to an active service provider.",
    transition: "The technical tray systems and servers from Act III integrate seamlessly into the finished architectural render, lighting up to indicate operational status.",
    src: "./assets/images_final/slide_5_image_1_Picture_12.png",
    subImages: [
      { label: "External Render", src: "./assets/images_final/slide_5_image_1_Picture_12.png", desc: "Fully completed data centre external envelope with landscaping and security boundaries." },
      { label: "Operational Hall", src: "./assets/images_final/slide_5_image_2_Picture_8.png", desc: "Active data hall featuring running rack assemblies, status lights, and active cooling feeds." },
      { label: "Technical Sign-Off", src: "./assets/images_final/slide_5_image_3_Image_3.jpg", desc: "Executive presentation render demonstrating ready-for-service compliance." }
    ]
  },
];

const timelineData = [
  {
    phase: "01",
    title: "Phase 1: Shell & Core C1-C3",
    duration: "Months 0 - 24",
    detail: "Initial site excavation, civil engineering works, and structural steel framing for C1, C2, C3, and FOH buildings.",
    approach: "Visualized using labeled 3D site models and isometric plan drawings.",
  },
  {
    phase: "02",
    title: "Phase 2: Shell C4-C5 + Fit-Out C1-C2",
    duration: "Months 24 - 48",
    detail: "Structural envelope completion for C4/C5, and simultaneous mechanical & electrical fit-out of halls C1 and C2.",
    approach: "Animated 3D sequence tracking internal tray layovers and equipment delivery.",
  },
  {
    phase: "03",
    title: "Phase 3: Fit-Out C3-C5 + Commissioning",
    duration: "Months 48 - 72+",
    detail: "Complete data hall fit-outs across C3, C4, C5, followed by rigorous load testing, electrical commissioning, and ultimate handover.",
    approach: "Photorealistic architectural renders showing finished operational state with glowing active server racks.",
  },
];

const milestones = [
  { month: "Month 01", name: "GC Mobilised", status: "COMMENCED", desc: "General Contractor on site. Heavy excavators mobilized for mass ground grading and soil stabilization.", active: true },
  { month: "Month 22", name: "Power On", status: "ENERGIZED", desc: "Substation building structural completion. Primary transformer connection established with the national grid.", active: true },
  { month: "Month 38", name: "C1/C2 RFS", status: "COMMISSIONED", desc: "Halls C1 & C2 systems integration completed. Critical client IT load handovers commence under active loads.", active: true },
  { month: "Month 72", name: "Final Handover", status: "OPERATIONAL", desc: "All 5 halls fully completed and certified. Full facility transitioned to WSP operational security team.", active: true },
];

export const DataCentreCaseStudy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeActIdx, setActiveActIdx] = useState(0);
  const [activeSubImgIdx, setActiveSubImgIdx] = useState(0);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);
  const [isAutoPlayingTimeline, setIsAutoPlayingTimeline] = useState(true);
  const [powerOnEffect, setPowerOnEffect] = useState(false);

  // Twin Video States
  const [activeVideoIdx, setActiveVideoIdx] = useState(0); // 0: Structure to System, 1: System to Service
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showDataOverlay, setShowDataOverlay] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentAct = actsData[activeActIdx];

  // Auto-playing Timeline steps (cycles every 5 seconds)
  useEffect(() => {
    if (!isAutoPlayingTimeline) return;
    const interval = setInterval(() => {
      setActiveTimelineIdx((prev) => (prev + 1) % timelineData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlayingTimeline]);

  // Video State Reset on video change
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.load();
      if (!isMuted) {
        videoRef.current.muted = false;
      }
    }
  }, [activeVideoIdx]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play()
      .then(() => setIsPlaying(true));
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
    setProgress(percentage * 100);
  };

  const handleTimelineClick = (idx: number) => {
    setActiveTimelineIdx(idx);
    setIsAutoPlayingTimeline(false); // Stop autoplay on manual interaction
  };

  return (
    <div className="relative min-h-screen text-white bg-black font-sans selection:bg-wsp-red/30 overflow-x-hidden">
      
      {/* Moving Technical Grid Background */}
      <div className="absolute inset-0 bg-[#060607] bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(227,27,35,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(227,27,35,0.008)_1px,transparent_1px)] bg-[size:96px_96px] pointer-events-none z-0 animate-[grid-pan_30s_linear_infinite]" />

      {/* Floating Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-black/75 border border-white/10 hover:border-wsp-red text-white/80 hover:text-white rounded-lg backdrop-blur-md transition-all shadow-lg hover:shadow-wsp-red/10 cursor-pointer text-xs uppercase tracking-widest font-mono"
        >
          <ArrowLeft size={12} />
          Back to Hub
        </button>
      </div>

      {/* Hero Header */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 z-10 border-b border-white/5 bg-[#030304]/80">
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060607] to-transparent pointer-events-none" />
        
        {/* Technical crosshairs */}
        <div className="absolute top-12 left-6 md:left-12 w-6 h-6 border-t border-l border-white/10 pointer-events-none" />
        <div className="absolute top-12 right-6 md:right-12 w-6 h-6 border-t border-r border-white/10 pointer-events-none" />
        <div className="absolute bottom-12 left-6 md:left-12 w-6 h-6 border-b border-l border-white/10 pointer-events-none" />
        <div className="absolute bottom-12 right-6 md:right-12 w-6 h-6 border-b border-r border-white/10 pointer-events-none" />

        <div className="flex flex-col gap-6 max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-wsp-red/10 border border-wsp-red/25 text-wsp-red rounded-full text-[10px] font-mono tracking-[0.2em] uppercase mx-auto">
            <Cpu size={12} className="animate-pulse" />
            WSP Final Assessment Case Study
          </div>
          
          <h1 className="font-editorial text-4xl md:text-7xl font-black tracking-tight text-white uppercase leading-none select-none">
            From Programme <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-wsp-red">To Narrative</span>
          </h1>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-wsp-red to-transparent mx-auto my-2" />

          <p className="font-editorial text-sm md:text-lg tracking-[0.2em] uppercase text-white/70 max-w-3xl mx-auto leading-relaxed">
            A Visual Sequencing Strategy for a Large-Scale Data Centre Development
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-4 text-[10px] font-mono tracking-widest text-white/40 uppercase">
            <span>Client: WSP</span>
            <span className="hidden sm:inline">•</span>
            <span>Author: Hussein Masri</span>
            <span className="hidden sm:inline">•</span>
            <span>Role: AI-First Multimedia Designer</span>
          </div>
        </div>

        <div className="absolute bottom-8 animate-bounce text-white/20 hover:text-wsp-red transition-colors cursor-pointer" onClick={() => document.getElementById("theatre")?.scrollIntoView({ behavior: "smooth" })}>
          <ArrowDown size={18} />
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-32 flex flex-col gap-24 md:gap-32 relative z-10">

        {/* ==================================================== */}
        {/* SECTION 01 — VISUAL NARRATIVE & SLIDESHOW */}
        {/* ==================================================== */}
        <section id="theatre" className="scroll-mt-24">
          <SectionHeader
            num="01"
            title="Visual Narrative & Sequencing"
            subtitle="Anchoring a 60-Second Executive Journey to Real Project Assets"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
            
            {/* Left: Act Selector & Description (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 md:p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-xl">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-[9px] text-wsp-red tracking-widest uppercase font-bold">// SEQUENCE STRUCTURE</span>
                
                {/* Act Tabs */}
                <div className="flex flex-col gap-3">
                  {actsData.map((act, idx) => (
                    <button
                      key={act.id}
                      onClick={() => setActiveActIdx(idx)}
                      className={`w-full p-4 border rounded-lg text-left transition-all duration-300 cursor-pointer ${
                        idx === activeActIdx 
                          ? "border-wsp-red bg-wsp-red/5 text-white" 
                          : "border-white/5 hover:border-white/10 text-white/40 hover:text-white/80"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[10px] tracking-wider font-black">{act.actNum}</span>
                        <span className="font-mono text-[9px] opacity-60 font-semibold">{act.phase.split(" ")[0]}</span>
                      </div>
                      <h4 className="font-editorial text-sm font-bold uppercase tracking-wider mt-1">{act.title}</h4>
                    </button>
                  ))}
                </div>

                <div className="h-px bg-white/5 my-2" />

                {/* Details of Selected Act */}
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest font-bold">Strategic Phase</span>
                    <span className="text-xs text-wsp-red font-semibold uppercase">{currentAct.phase}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest font-bold">Executive Summary</span>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed">{currentAct.desc}</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest font-bold">Geometric Transition</span>
                    <p className="text-xs text-text-muted leading-relaxed italic">
                      "{currentAct.transition}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Asset viewer / Slideshow Mode (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <div className="flex flex-col gap-4">
                
                {/* Selected Image viewport */}
                <div className="w-full aspect-video relative rounded-xl overflow-hidden border border-white/10 bg-black group select-none shadow-2xl">
                  
                  {/* Corner Tech Brackets */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25 z-10 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25 z-10 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25 z-10 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25 z-10 pointer-events-none" />

                  {/* Renders / Plans */}
                  <img
                    src={currentAct.subImages[activeSubImgIdx].src}
                    alt={currentAct.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      activeActIdx === 2 && powerOnEffect ? "brightness-125 saturate-120 hue-rotate-15" : ""
                    }`}
                  />

                  {/* Interactive "Power On" toggle for Act III */}
                  {activeActIdx === 2 && (
                    <div className="absolute top-4 right-4 z-20">
                      <button
                        onClick={() => setPowerOnEffect(!powerOnEffect)}
                        className={`px-3 py-1.5 rounded-lg border font-mono text-[8px] md:text-[9px] tracking-widest flex items-center gap-1.5 transition-all cursor-pointer shadow-lg ${
                          powerOnEffect 
                            ? "bg-[#00B050]/20 border-[#00B050] text-[#00B050] shadow-[#00B050]/25" 
                            : "bg-black/85 border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        {powerOnEffect ? <Sun size={10} className="animate-spin" /> : <Moon size={10} />}
                        {powerOnEffect ? "POWER STATUS: ONLINE" : "SIMULATE POWER ON"}
                      </button>
                    </div>
                  )}

                  {/* Metadata summary overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-0.5 pointer-events-none">
                    <span className="font-mono text-[8px] text-wsp-red font-black tracking-widest">
                      ASSET DETAILS // {currentAct.subImages[activeSubImgIdx].label.toUpperCase()}
                    </span>
                    <p className="text-[9px] md:text-[10px] text-white/80 max-w-xl">
                      {currentAct.subImages[activeSubImgIdx].desc}
                    </p>
                  </div>
                </div>

                {/* Thumbnail Selector Strip */}
                <div className="grid grid-cols-3 gap-2 md:grid-cols-3 md:gap-4">
                  {currentAct.subImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSubImgIdx(idx)}
                      className={`p-2 border rounded-lg text-left transition-all duration-300 cursor-pointer flex flex-col gap-1.5 ${
                        idx === activeSubImgIdx 
                          ? "border-wsp-red bg-wsp-red/5" 
                          : "border-white/5 hover:border-white/10 bg-black/40"
                      }`}
                    >
                      <span className="font-mono text-[7px] md:text-[8px] tracking-wider text-white/40 block truncate">0{idx + 1} / {img.label}</span>
                      <div className="w-full aspect-[21/9] rounded overflow-hidden relative">
                        <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                      </div>
                    </button>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ==================================================== */}
        {/* NEW SECTION — LIVE MOTION PROCESS (VIDEOS SECTION) */}
        {/* ==================================================== */}
        <section id="motion-videos" className="scroll-mt-24">
          <SectionHeader
            num="02"
            title="Live Motion Process"
            subtitle="Motion Simulations Demonstrating Phase Transitions"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
            
            {/* Left: Video select bar (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col gap-4 p-5 md:p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-xl justify-between">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] text-wsp-red tracking-widest uppercase font-bold">// MOTION CAPTURE STREAMS</span>
                
                <div className="flex flex-col gap-3">
                  {[
                    { id: 0, title: "Structure to System", phase: "Act II (Phase 2-3)", desc: "Internal equipment tray, cooling, and mechanical systems tracing." },
                    { id: 1, title: "System to Service", phase: "Act III (Commissioning)", desc: "Final photorealistic operational data hall testing sequences." }
                  ].map((vid) => (
                    <button
                      key={vid.id}
                      onClick={() => setActiveVideoIdx(vid.id)}
                      className={`p-4 border rounded-lg text-left transition-all duration-300 cursor-pointer flex flex-col gap-1 ${
                        vid.id === activeVideoIdx 
                          ? "border-wsp-red bg-wsp-red/5 text-white" 
                          : "border-white/5 hover:border-white/10 text-white/40 hover:text-white/80"
                      }`}
                    >
                      <div className="flex justify-between items-center font-mono text-[8px] text-white/40">
                        <span>STREAM_0{vid.id + 1}</span>
                        <span className="text-wsp-red">{vid.phase}</span>
                      </div>
                      <h4 className="font-editorial text-sm font-bold uppercase tracking-wider">{vid.title}</h4>
                      <p className="text-[10px] text-text-muted mt-1 leading-normal">{vid.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 font-mono text-[8px] text-white/30 uppercase flex flex-col gap-1">
                <span>ENCODER: KLING AI + PREMIERE</span>
                <span>STATUS: STABLE STREAMING</span>
              </div>
            </div>

            {/* Right: Premium Video Player Viewport (8 Columns) */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="w-full aspect-video relative rounded-xl overflow-hidden border border-white/10 bg-black group shadow-2xl">
                <video
                  ref={videoRef}
                  src={activeVideoIdx === 0 ? "./Structure to System.mp4" : "./System to Service.mp4"}
                  className="w-full h-full object-cover"
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleEnded}
                  onClick={handlePlayPause}
                />

                {/* Laser Scanner HUD overlay */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-10 ${showDataOverlay ? "opacity-100" : "opacity-0"}`}>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(227,27,35,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(227,27,35,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  <div className="absolute inset-x-0 h-[1.5px] bg-wsp-red/70 shadow-[0_0_8px_rgba(227,27,35,0.8)] top-0 animate-[scan_3s_linear_infinite]" />
                  <div className="absolute bottom-16 left-4 bg-black/85 px-2.5 py-1.5 border border-wsp-red/30 rounded font-mono text-[8px] text-wsp-red tracking-widest flex flex-col gap-0.5">
                    <span>ACTIVE_STREAM: TRACKING</span>
                    <span>RESOLUTION: 1080P PRO</span>
                    <span>FRAME_RENDER: STABLE</span>
                  </div>
                </div>

                {/* Custom Video Player Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/90 to-black/0 px-4 flex items-center justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                  <button
                    onClick={handlePlayPause}
                    className="p-2 bg-white/10 hover:bg-wsp-red text-white hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>

                  <div 
                    onClick={handleProgressBarClick}
                    className="flex-1 mx-4 h-1.5 bg-white/20 hover:bg-white/30 rounded-full overflow-hidden cursor-pointer relative"
                  >
                    <div 
                      className="h-full bg-wsp-red rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowDataOverlay(!showDataOverlay)}
                      className={`p-2 border rounded-lg font-mono text-[8px] tracking-wider transition-colors cursor-pointer ${
                        showDataOverlay ? "bg-wsp-red border-wsp-red text-white" : "border-white/10 hover:border-wsp-red text-white/70"
                      }`}
                    >
                      <Cpu size={12} className="inline mr-1" />
                      DATA SCANNER
                    </button>
                    
                    <button
                      onClick={handleRestart}
                      className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw size={14} />
                    </button>

                    <button
                      onClick={handleMuteToggle}
                      className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                </div>

                {/* Big Center Play Indicator Overlay */}
                {!isPlaying && (
                  <div 
                    onClick={handlePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/45 transition-colors cursor-pointer z-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-black/80 border border-white/20 hover:border-wsp-red text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all">
                      <Play size={20} className="translate-x-0.5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================== */}
        {/* SECTION 03 — 78-MONTH SEQUENCE PROGRAMME TIMELINE */}
        {/* ==================================================== */}
        <section id="timeline" className="scroll-mt-24">
          <SectionHeader
            num="03"
            title="78-Month Delivery Timeline"
            subtitle="Integrating Complex Programme Schedule with Visual Milestones"
          />

          <div className="flex flex-col gap-10 mt-12 select-none">
            
            {/* Timeline Stepper bar (Auto-loops every 5s unless clicked) */}
            <div className="relative flex justify-between items-center max-w-4xl mx-auto w-full before:absolute before:left-0 before:right-0 before:top-1/2 before:-translate-y-1/2 before:h-0.5 before:bg-white/5">
              
              {/* Dynamic filled line */}
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-wsp-red transition-all duration-500"
                style={{ width: `${(activeTimelineIdx / (timelineData.length - 1)) * 100}%` }}
              />

              {timelineData.map((item, idx) => (
                <button
                  key={item.phase}
                  onClick={() => handleTimelineClick(idx)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-black z-10 transition-all border-2 cursor-pointer ${
                    idx === activeTimelineIdx 
                      ? "bg-black border-wsp-red text-wsp-red shadow-[0_0_15px_rgba(227,27,35,0.4)] scale-110" 
                      : idx < activeTimelineIdx
                        ? "bg-black border-wsp-red/50 text-wsp-red/70 hover:border-wsp-red"
                        : "bg-black border-white/10 text-white/30 hover:border-white/30"
                  }`}
                  title="Click to pause autoplay and view step"
                >
                  {item.phase}
                </button>
              ))}
            </div>

            {/* Stepper info card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start max-w-4xl mx-auto w-full p-6 md:p-8 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-xl relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-wsp-red/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="md:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-wsp-red font-black">PHASE {timelineData[activeTimelineIdx].phase}</span>
                  <span className="text-white/40 font-mono text-xs">•</span>
                  <span className="text-white/60 font-mono text-xs uppercase tracking-wider">{timelineData[activeTimelineIdx].duration}</span>
                  {isAutoPlayingTimeline && (
                    <span className="text-[8px] font-mono bg-white/5 text-white/35 px-1.5 py-0.5 rounded tracking-widest uppercase animate-pulse ml-auto sm:ml-0">
                      Auto-playing
                    </span>
                  )}
                </div>
                
                <h4 className="font-editorial text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                  {timelineData[activeTimelineIdx].title}
                </h4>
                
                <p className="text-xs md:text-sm leading-relaxed text-text-muted">
                  {timelineData[activeTimelineIdx].detail}
                </p>
              </div>

              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 flex flex-col gap-2">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest font-bold">Visual Communication Method</span>
                <p className="text-xs text-white/80 leading-relaxed italic">
                  "{timelineData[activeTimelineIdx].approach}"
                </p>
              </div>
            </div>

            <div className="h-px bg-white/5 max-w-4xl mx-auto w-full my-4" />

            {/* REDESIGNED MILESTONES ROADMAP (Month 1 to Month 72 Route) */}
            <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
              <span className="font-mono text-[9px] text-wsp-red tracking-widest uppercase font-bold text-center sm:text-left">// 78-MONTH SCHEDULING MILESTONES ROUTE</span>
              
              {/* Vertical / Horizontal Route Gauge */}
              <div className="relative flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between w-full pl-6 md:pl-0 border-l border-white/5 md:border-l-0 md:border-t md:border-white/5 pt-0 md:pt-8 mt-4">
                
                {/* Horizontal line marker (Desktop only) */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-wsp-red/40 via-wsp-red to-[#00B050] hidden md:block" />

                {milestones.map((m, idx) => (
                  <div key={idx} className="relative flex flex-col gap-2 md:w-[22%] group select-none">
                    
                    {/* Node Dot marker */}
                    <div className="absolute -left-[30px] md:left-0 top-1.5 md:-top-[38px] w-4 h-4 rounded-full bg-black border-2 border-wsp-red flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-1.5 h-1.5 rounded-full bg-wsp-red group-hover:bg-white transition-colors" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-wsp-red font-black">{m.month}</span>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                        {m.status}
                      </span>
                    </div>

                    <h5 className="font-editorial text-xs font-black uppercase tracking-wider text-white group-hover:text-wsp-red transition-colors">
                      {m.name}
                    </h5>

                    <p className="text-[10px] text-text-muted leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================== */}
        {/* SECTION 04 — CONTENT DEVELOPMENT METHODOLOGY */}
        {/* ==================================================== */}
        <section id="methodology" className="scroll-mt-24">
          <SectionHeader
            num="04"
            title="Content Development Methodology"
            subtitle="The Five-Step Pipeline: From Complex Source Data to Executive Clarity"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
            {[
              {
                num: "01",
                step: "Source Audit",
                summary: "Catalogue inputs & flag gaps.",
                detail: "Examine site plans, programme timelines, and layouts to catalogue every input. Gaps are flagged before any creative decision is made.",
              },
              {
                num: "02",
                step: "Info Triage",
                summary: "Filter executive essentials.",
                detail: "Filter information to separate what an executive audience must retain from heavy, low-level technical layouts.",
              },
              {
                num: "03",
                step: "Visual Treatment",
                summary: "Define visual styles.",
                detail: "Assign a clear treatment plan per stage (e.g. isometric line drawings, animated internals, or photorealistic renderings).",
              },
              {
                num: "04",
                step: "Exec Translation",
                summary: "Simplify technical jargon.",
                detail: "Translate engineering and scheduling terms to business outcomes (e.g., 'RIBA Stage 4 sign-off' becomes 'Design Finalised').",
              },
              {
                num: "05",
                step: "Accuracy Verification",
                summary: "Verify against program.",
                detail: "Establish a single source of truth and acquire technical lead validation before final rendering and production.",
              },
            ].map((step) => (
              <div 
                key={step.num}
                className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg hover:border-wsp-red/30 transition-all flex flex-col justify-between gap-6 group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-mono text-xs text-wsp-red font-black">{step.num}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-wsp-red transition-all" />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h4 className="font-editorial text-sm font-bold uppercase tracking-wider text-white group-hover:text-wsp-red transition-colors">
                      {step.step}
                    </h4>
                    <span className="text-[10px] text-white/50 font-mono tracking-wide">
                      {step.summary}
                    </span>
                  </div>

                  <p className="text-[11px] leading-relaxed text-text-muted">
                    {step.detail}
                  </p>
                </div>

                <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                  ST_PIPELINE // SEC
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================== */}
        {/* SECTION 05 — AI WORKFLOW & SCALABILITY */}
        {/* ==================================================== */}
        <section id="workflow" className="scroll-mt-24">
          <SectionHeader
            num="05"
            title="AI Workflow & Scalability"
            subtitle="Repeatable Delivery Systems Anchored to Real Project Assets"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
            
            {/* Left: Mapped AI Tools Dashboard (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col gap-6 p-5 md:p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-xl">
              <h3 className="font-editorial text-sm font-bold tracking-widest text-white uppercase border-b border-white/5 pb-3">
                AI Pipeline: Mapped Tools by Production Stage
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  {
                    stage: "Ideation & Scripting",
                    desc: "Script structure, prompt generation, content summaries.",
                    logos: [
                      {
                        name: "ChatGPT",
                        color: "#10a37f",
                        svg: (
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 16 16">
                            <path d="M13.6,5.3C13.2,3.3,11.5,1.9,9.5,1.9c-0.8,0-1.6,0.3-2.2,0.8C6.7,2.2,5.9,1.9,5.1,1.9C3.1,1.9,1.4,3.3,1,5.3 C0.6,5.7,0.3,6.3,0.3,7c0,0.7,0.3,1.3,0.8,1.7C0.7,10.7,2.4,12.1,4.4,12.1c0.8,0,1.6-0.3,2.2-0.8c0.6,0.5,1.4,0.8,2.2,0.8 c2,0,3.7-1.4,4.1-3.4c0.5-0.4,0.8-1,0.8-1.7C13.7,6.3,13.4,5.7,13.6,5.3z" />
                          </svg>
                        )
                      },
                      {
                        name: "Claude",
                        color: "#d97706",
                        svg: (
                          <svg className="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3L7.5 7.5M12 3l4.5 4.5M7.5 12h9M12 21l-4.5-4.5M12 21l4.5-4.5" />
                          </svg>
                        )
                      }
                    ]
                  },
                  {
                    stage: "Asset Generation (Stills)",
                    desc: "Creating structural backgrounds and textures from design references.",
                    logos: [
                      {
                        name: "Midjourney",
                        color: "#3b82f6",
                        svg: (
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.66 0 3 1.34 3 3v1.71c.7-.29 1.48-.46 2.3-.46.34 0 .67.04 1 .1v3.29c-.6-.4-1.3-.63-2.1-.63H17.9z" />
                          </svg>
                        )
                      },
                      {
                        name: "Adobe Firefly",
                        color: "#eab308",
                        customBadge: "Fy"
                      },
                      {
                        name: "Flux",
                        color: "#a855f7",
                        customBadge: "Fx"
                      }
                    ]
                  },
                  {
                    stage: "Video Generation (Motion)",
                    desc: "Animating site models and construction flows building by building.",
                    logos: [
                      {
                        name: "Kling AI",
                        color: "#ef4444",
                        customBadge: "Kl"
                      },
                      {
                        name: "Higgsfield",
                        color: "#ec4899",
                        customBadge: "Hi"
                      },
                      {
                        name: "Google Flow",
                        color: "#0f9d58",
                        svg: (
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.811 0-8.682-3.628-8.682-8.514S7.43 1.486 12.24 1.486c2.43 0 4.31.84 5.67 2.057l3.09-3.086C18.99.782 15.93 0 12.24 0 5.48 0 0 5.4 0 12s5.48 12 12.24 12c6.82 0 11.53-4.629 11.53-11.486 0-.771-.09-1.457-.26-2.229h-11.27z" />
                          </svg>
                        )
                      }
                    ]
                  },
                  {
                    stage: "Post-Production (Assembly)",
                    desc: "Color grading, compositing CAD trajectories, timeline metadata overlays.",
                    logos: [
                      { name: "After Effects", color: "#a488e5", customBadge: "Ae" },
                      { name: "Premiere Pro", color: "#38a2e5", customBadge: "Pr" },
                      { name: "Photoshop", color: "#48bafc", customBadge: "Ps" },
                      { name: "Illustrator", color: "#fc8f18", customBadge: "Ai" }
                    ]
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 border border-white/5 bg-black/40 rounded-lg hover:border-white/10 transition-colors">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-white">{item.stage}</h4>
                      <p className="text-[10px] text-text-muted leading-normal mb-2">
                        {item.desc}
                      </p>
                      
                      {/* Platform Logo icons */}
                      <div className="flex flex-wrap gap-2.5">
                        {item.logos.map((logo) => (
                          <div 
                            key={logo.name}
                            className="flex items-center gap-2 px-2.5 py-1.5 bg-black border border-white/10 rounded-md select-none hover:border-wsp-red/40 hover:shadow-[0_0_8px_rgba(227,27,35,0.05)] transition-all"
                            title={logo.name}
                          >
                            {logo.svg ? (
                              <div style={{ color: logo.color }} className="w-5 h-5 flex items-center justify-center">
                                {logo.svg}
                              </div>
                            ) : (
                              // Custom styled Adobe / CC Monogram Badge
                              <div 
                                className="w-5 h-5 rounded font-mono text-[9px] font-black flex items-center justify-center border select-none uppercase"
                                style={{ 
                                  backgroundColor: `rgba(${parseInt(logo.color.slice(1,3),16)}, ${parseInt(logo.color.slice(3,5),16)}, ${parseInt(logo.color.slice(5,7),16)}, 0.15)`,
                                  borderColor: logo.color,
                                  color: logo.color
                                }}
                              >
                                {logo.customBadge}
                              </div>
                            )}
                            <span className="text-[10px] font-mono text-white/70 font-semibold">{logo.name}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Scalability & Governance (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6 p-5 md:p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-xl">
              <h3 className="font-editorial text-sm font-bold tracking-widest text-white uppercase border-b border-white/5 pb-3">
                Standardisation & Governance
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  {
                    title: "Prompt Referencing",
                    desc: "All AI image generation is anchored directly to real renders and layouts via image-to-image referencing, preventing geometrical hallucination.",
                    icon: <Layers size={14} className="text-[#00B050]" />,
                  },
                  {
                    title: "Factual Accuracy QA",
                    desc: "AI frames are audited slide-by-slide against structural drawings and schedules (building counts, phase progression) before technical sign-off.",
                    icon: <ShieldCheck size={14} className="text-[#00B050]" />,
                  },
                  {
                    title: "Scale Story Template",
                    desc: "A reusable act template (Site → Structure → System → Service) allowing rapid layout swaps for new projects, cutting production times by 70%.",
                    icon: <Settings size={14} className="text-[#00B050]" />,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-3.5 border border-white/5 bg-black/20 rounded-lg">
                    <div className="p-1.5 bg-black border border-white/10 rounded-md shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-editorial text-[11px] font-bold uppercase tracking-wider text-white">{item.title}</h4>
                      <p className="text-[10px] text-text-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================== */}
        {/* SECTION 06 — CASE STUDY DOWNLOADS */}
        {/* ==================================================== */}
        <section id="downloads" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-12 select-none border-t border-white/5 pt-16">
            <span className="font-editorial text-wsp-red text-lg md:text-xl font-bold tracking-widest">
              // REPOSITORY
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl font-black tracking-tight uppercase text-white">
              Project Downloads
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
            
            {/* PDF Report card */}
            <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg flex flex-col justify-between gap-6 hover:border-wsp-red/30 transition-all group">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 border border-white/10 group-hover:border-wsp-red/50 text-white/70 group-hover:text-wsp-red rounded transition-all">
                  <FileText size={20} />
                </div>
                <span className="text-[10px] font-editorial text-white/40 tracking-wider uppercase font-bold">
                  PDF Report
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-editorial text-sm font-bold tracking-wider text-white uppercase group-hover:text-wsp-red transition-colors">
                  Visual Strategy PDF
                </h4>
                <p className="text-[10px] text-text-muted">
                  Executive visual communication proposal document for data centers
                </p>
              </div>
              <a
                href="./PDF/WSP_Final_Assessment.pdf"
                download="WSP_Final_Assessment.pdf"
                className="flex items-center justify-between text-xs font-editorial text-white/80 group-hover:text-wsp-red transition-colors border-t border-white/5 pt-4 cursor-pointer"
              >
                <span>Download PDF</span>
                <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Twin Video 1 */}
            <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg flex flex-col justify-between gap-6 hover:border-wsp-red/30 transition-all group">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 border border-white/10 group-hover:border-wsp-red/50 text-white/70 group-hover:text-wsp-red rounded transition-all">
                  <Play size={20} />
                </div>
                <span className="text-[10px] font-editorial text-white/40 tracking-wider uppercase font-bold">
                  MP4 Footage
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-editorial text-sm font-bold tracking-wider text-white uppercase group-hover:text-wsp-red transition-colors">
                  Structure to System
                </h4>
                <p className="text-[10px] text-text-muted">
                  Phase 2 sequence: internal data hall systems and trays installation
                </p>
              </div>
              <a
                href="./Structure to System.mp4"
                download="Structure to System.mp4"
                className="flex items-center justify-between text-xs font-editorial text-white/80 group-hover:text-wsp-red transition-colors border-t border-white/5 pt-4 cursor-pointer"
              >
                <span>Download MP4</span>
                <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Twin Video 2 */}
            <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg flex flex-col justify-between gap-6 hover:border-wsp-red/30 transition-all group">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 border border-white/10 group-hover:border-wsp-red/50 text-white/70 group-hover:text-wsp-red rounded transition-all">
                  <Play size={20} />
                </div>
                <span className="text-[10px] font-editorial text-white/40 tracking-wider uppercase font-bold">
                  MP4 Footage
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-editorial text-sm font-bold tracking-wider text-white uppercase group-hover:text-wsp-red transition-colors">
                  System to Service
                </h4>
                <p className="text-[10px] text-text-muted">
                  Phase 3 sequence: finished operational state and active servers
                </p>
              </div>
              <a
                href="./System to Service.mp4"
                download="System to Service.mp4"
                className="flex items-center justify-between text-xs font-editorial text-white/80 group-hover:text-wsp-red transition-colors border-t border-white/5 pt-4 cursor-pointer"
              >
                <span>Download MP4</span>
                <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#050506] py-16 px-6 relative z-10 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-editorial text-lg font-black tracking-widest text-white uppercase">
              From Programme to Narrative
            </h3>
            <p className="font-editorial text-xs tracking-wider text-white/50 uppercase">
              Visual sequencing strategy for large-scale data centres
            </p>
            <p className="text-[10px] text-white/30 font-medium">
              Prepared for WSP Final Assessment selection stage.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 md:text-right font-editorial text-xs font-bold tracking-widest uppercase">
            <span className="text-white/40">Presented by</span>
            <span className="text-white">Hussein Masri</span>
          </div>
        </div>
      </footer>

      {/* Slide & Grid pan animations */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes grid-pan {
          0% { background-position: 0px 0px; }
          100% { background-position: 96px 96px; }
        }
      `}</style>

    </div>
  );
};
