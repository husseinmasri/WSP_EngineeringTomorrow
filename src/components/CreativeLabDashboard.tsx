import React, { useState } from "react";
import { Briefcase, Users, Shield, BookOpen, Cpu, Settings, CalendarRange, Landmark } from "lucide-react";

export const CreativeLabDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"services" | "ops" | "gov" | "roadmap">("services");

  const services = [
    {
      title: "Bids & Proposals",
      desc: "Concept visuals that make technical submissions visually competitive",
      icon: <Briefcase className="text-wsp-red" size={20} />,
    },
    {
      title: "Client Presentations",
      desc: "Visual narratives that turn engineering ideas into client-ready story",
      icon: <Users className="text-wsp-red" size={20} />,
    },
    {
      title: "Project Visualization",
      desc: "Concept-to-reality renders before ground is broken",
      icon: <Cpu className="text-wsp-red" size={20} />,
    },
    {
      title: "Leadership & Internal Comms",
      desc: "Campaign visuals and internal brand storytelling",
      icon: <BookOpen className="text-wsp-red" size={20} />,
    },
  ];

  const opsModel = [
    {
      num: "01",
      title: "Central Hub",
      desc: "2-3 specialists + regional 'AI Champions' across business units",
    },
    {
      num: "02",
      title: "Standard Intake Form",
      desc: "Objective, audience, deadline, sensitivity - one shared queue",
    },
    {
      num: "03",
      title: "SLA-Backed Turnaround",
      desc: "24-hr acknowledgment, 3-5 day first draft; fast-track lane for bids",
    },
  ];

  const govItems = [
    {
      title: "Brand Alignment",
      desc: "Mandatory brand-team review before external use",
    },
    {
      title: "Library Control",
      desc: "Approved prompt & template library keeps output on-brand",
    },
    {
      title: "Release Structure",
      desc: "Two-tier sign-off: client-facing vs. internal content",
    },
  ];

  const roadmapData = [
    {
      phase: "PILOT",
      time: "0-3 MO",
      desc: "One business unit, 2-3 flagship bids/campaigns; validate quality & turnaround",
    },
    {
      phase: "SCALE",
      time: "3-6 MO",
      desc: "Open intake company-wide; publish template library and SLA",
    },
    {
      phase: "EMBED",
      time: "6-12 MO",
      desc: "Standard step in bid & campaign workflows; quarterly cost/impact review",
    },
  ];

  return (
    <div className="relative w-full flex flex-col gap-12 z-10">
      
      {/* Introduction */}
      <div className="max-w-3xl border-l-2 border-wsp-red pl-6 py-2">
        <p className="font-editorial text-sm md:text-base leading-relaxed text-white/90 italic">
          "One shared engine turning any team's brief into brand-safe, presentation-ready visuals — in days, not weeks, with no added headcount."
        </p>
      </div>

      {/* Tab Selector Header (Premium design) */}
      <div className="flex border-b border-white/5 font-editorial overflow-x-auto whitespace-nowrap scrollbar-none select-none">
        <button
          onClick={() => setActiveTab("services")}
          className={`px-6 py-3 border-b-2 text-xs md:text-sm tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer ${
            activeTab === "services"
              ? "border-wsp-red text-wsp-red"
              : "border-transparent text-white/40 hover:text-white"
          }`}
        >
          Services Offered
        </button>
        <button
          onClick={() => setActiveTab("ops")}
          className={`px-6 py-3 border-b-2 text-xs md:text-sm tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer ${
            activeTab === "ops"
              ? "border-wsp-red text-wsp-red"
              : "border-transparent text-white/40 hover:text-white"
          }`}
        >
          Operating Model
        </button>
        <button
          onClick={() => setActiveTab("gov")}
          className={`px-6 py-3 border-b-2 text-xs md:text-sm tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer ${
            activeTab === "gov"
              ? "border-wsp-red text-wsp-red"
              : "border-transparent text-white/40 hover:text-white"
          }`}
        >
          Quality & Governance
        </button>
        <button
          onClick={() => setActiveTab("roadmap")}
          className={`px-6 py-3 border-b-2 text-xs md:text-sm tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer ${
            activeTab === "roadmap"
              ? "border-wsp-red text-wsp-red"
              : "border-transparent text-white/40 hover:text-white"
          }`}
        >
          Rollout Roadmap
        </button>
      </div>

      {/* Tab Panel content */}
      <div className="min-h-[300px]">
        {/* Tab 1: Services */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-sm rounded-lg flex gap-4 items-start hover:border-wsp-red/20 transition-all duration-300 group"
              >
                <div className="p-3 bg-black/60 border border-white/10 group-hover:border-wsp-red/30 rounded-lg group-hover:bg-wsp-red/5 transition-all">
                  {s.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-editorial text-sm font-bold tracking-wide uppercase text-white group-hover:text-wsp-red transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Operating Model */}
        {activeTab === "ops" && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative before:hidden md:before:block before:absolute before:left-[10%] before:right-[10%] before:top-[40px] before:h-[1px] before:bg-white/5 before:z-0">
              {opsModel.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-sm rounded-lg flex flex-col items-center text-center gap-3 relative z-10 hover:border-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-black border border-white/10 text-wsp-red flex items-center justify-center font-editorial text-xs font-black shadow-lg">
                    {item.num}
                  </div>
                  <h4 className="font-editorial text-xs font-bold tracking-widest uppercase text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Why it pays off Banner */}
            <div className="p-6 border border-wsp-red/20 bg-wsp-red/5 backdrop-blur-md rounded-lg flex flex-col gap-2 mt-4 relative overflow-hidden">
              <span className="font-editorial text-[9px] tracking-[0.25em] text-wsp-red font-black uppercase">
                Why It Pays Off
              </span>
              <p className="text-xs leading-relaxed text-white/95">
                Bids move faster with in-house visuals instead of agency turnaround; leadership content ships without ad-hoc freelance spend; every asset stays on-brand by design, not by luck.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Governance */}
        {activeTab === "gov" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Rules (Left) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={14} className="text-wsp-red" />
                <span className="font-editorial text-[10px] tracking-widest text-white/40 uppercase font-bold">
                  Quality & Brand Governance
                </span>
              </div>
              
              <div className="flex flex-col gap-4">
                {govItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 border border-white/5 bg-[#080809]/40 backdrop-blur-sm rounded-lg flex gap-4 items-center"
                  >
                    <span className="font-editorial text-wsp-red/50 text-sm font-black tracking-widest">
                      [0{idx + 1}]
                    </span>
                    <div className="flex flex-col gap-1">
                      <h5 className="font-editorial text-xs font-bold tracking-wide uppercase text-white">
                        {item.title}
                      </h5>
                      <p className="text-xs text-text-muted">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Tools (Right) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings size={14} className="text-wsp-red" />
                <span className="font-editorial text-[10px] tracking-widest text-white/40 uppercase font-bold">
                  Approved AI Stack
                </span>
              </div>
              
              <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-sm rounded-lg flex flex-col gap-4">
                <div className="flex justify-between items-start text-xs font-editorial border-b border-white/5 pb-2">
                  <span className="text-white/40 uppercase font-bold">Category</span>
                  <span className="text-white/40 uppercase font-bold">Tools</span>
                </div>
                
                <div className="flex justify-between items-center text-xs font-editorial">
                  <span className="text-text-muted">Ideation & Scripting</span>
                  <span className="text-white font-bold">ChatGPT, Claude</span>
                </div>
                <div className="flex justify-between items-center text-xs font-editorial">
                  <span className="text-text-muted">Image Generation</span>
                  <span className="text-white font-bold">Midjourney, Firefly, Higgsfield</span>
                </div>
                <div className="flex justify-between items-center text-xs font-editorial">
                  <span className="text-text-muted">Video Generation</span>
                  <span className="text-white font-bold">Kling, Google Flow, Higgsfield</span>
                </div>
                <div className="flex justify-between items-center text-xs font-editorial">
                  <span className="text-text-muted">Post-Production</span>
                  <span className="text-white font-bold">Adobe Creative Cloud</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Rollout Roadmap */}
        {activeTab === "roadmap" && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <CalendarRange size={14} className="text-wsp-red" />
              <span className="font-editorial text-[10px] tracking-widest text-white/40 uppercase font-bold">
                Integration Strategy Phases
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadmapData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-sm rounded-lg flex flex-col gap-4 relative overflow-hidden group hover:border-wsp-red/20 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-wsp-red/5 rounded-full blur-2xl group-hover:bg-wsp-red/10 transition-colors" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-editorial text-wsp-red text-base font-black tracking-widest">
                      {item.phase}
                    </span>
                    <span className="font-editorial text-[10px] tracking-widest text-white/40 uppercase font-bold">
                      {item.time}
                    </span>
                  </div>
                  
                  <p className="text-xs text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cost Tracking & Financial Reporting (Dashboard style) */}
      <div className="p-8 border border-white/5 bg-[#060607]/40 backdrop-blur-md rounded-lg relative overflow-hidden mt-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6">
          <Landmark size={18} className="text-wsp-red" />
          <h4 className="font-editorial text-lg font-bold tracking-widest text-white uppercase">
            Cost Tracking & Financial Control
          </h4>
        </div>
        
        <p className="text-xs md:text-sm leading-relaxed text-text-muted">
          A shared subscription pool replaces per-designer licenses. Every request is logged against the project, tool, and time spent, rolling into a monthly dashboard: cost per asset, spend by business unit, and comparison against equivalent agency rates, reviewed with finance quarterly.
        </p>
      </div>

    </div>
  );
};
