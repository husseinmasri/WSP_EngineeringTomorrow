import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Cpu } from "lucide-react";

interface Scene {
  id: string;
  act: string;
  sceneNum: string;
  voiceover: string;
  visual: string;
  why: string;
  image: string;
  sourceType: "AI Generated" | "AI Enhanced";
}

const storyboardData: Scene[] = [
  {
    id: "sc-1",
    act: "ACT I — UNDERSTANDING",
    sceneNum: "SCENE 01",
    voiceover: '"At WSP, engineering begins with understanding."',
    visual: "A senior engineering leader overlooks the city at sunrise, reflecting before the day begins.",
    why: "Opens on insight before action engineering starts with understanding people, place, and what's ahead.",
    image: "/assets/images/storyboard_image2.png",
    sourceType: "AI Generated",
  },
  {
    id: "sc-2",
    act: "ACT I — UNDERSTANDING",
    sceneNum: "SCENE 02",
    voiceover: '"As cities grow and the world continues to change."',
    visual: "A cinematic aerial view reveals a modern city's integrated transit, public space, and evolving infrastructure.",
    why: "Establishes the scale of growth and complexity that engineering must respond to.",
    image: "/assets/images/storyboard_image3.png",
    sourceType: "AI Generated",
  },
  {
    id: "sc-3",
    act: "ACT I — UNDERSTANDING",
    sceneNum: "SCENE 03",
    voiceover: '"The decisions we make today will shape how people live tomorrow."',
    visual: "An engineer studies a bridge scale model, evaluating the design before construction begins.",
    why: "Early design decisions carry long-term consequences; thoughtful planning shapes tomorrow.",
    image: "/assets/images/storyboard_image4.png",
    sourceType: "AI Generated",
  },
  {
    id: "sc-4",
    act: "ACT II — INSIGHT & COLLABORATION",
    sceneNum: "SCENE 04",
    voiceover: '"At WSP, engineering begins with understanding."',
    visual: "An engineer interacts with a Digital Twin, analyzing a virtual city before construction begins.",
    why: "Understanding is built through analysis and visualization exploring scenarios before committing to reality.",
    image: "/assets/images/storyboard_image5.png",
    sourceType: "AI Generated",
  },
  {
    id: "sc-5",
    act: "ACT II — INSIGHT & COLLABORATION",
    sceneNum: "SCENE 05",
    voiceover: '"Bringing together advisory expertise, science, data and technology to see challenges differently."',
    visual: "A multidisciplinary team collaborates around a bridge model, reviewing a digital design on-screen.",
    why: "Shows disciplines converging: technical, scientific, and digital expertise evaluated together.",
    image: "/assets/images/storyboard_image6.png",
    sourceType: "AI Generated",
  },
  {
    id: "sc-6",
    act: "ACT II — INSIGHT & COLLABORATION",
    sceneNum: "SCENE 06",
    voiceover: '"To design resilient infrastructure."',
    visual: "An engineering team reviews a large-scale urban model against a live digital infrastructure simulation.",
    why: "Resilience is designed, not assumed, through collaboration and digital simulation before construction.",
    image: "/assets/images/storyboard_image7.png",
    sourceType: "AI Generated",
  },
  {
    id: "sc-7",
    act: "ACT III — SUSTAINABILITY AND INNOVATION",
    sceneNum: "SCENE 07",
    voiceover: '"Protect natural resources."',
    visual: "A modern energy facility is monitored through intelligent digital overlays tracking environmental performance.",
    why: "Technology in service of stewardship efficiency and environmental monitoring together.",
    image: "/assets/images/storyboard_image8.png",
    sourceType: "AI Enhanced",
  },
  {
    id: "sc-8",
    act: "ACT III — SUSTAINABILITY AND INNOVATION",
    sceneNum: "SCENE 08",
    voiceover: '"Create more sustainable places."',
    visual: "An architect develops a sustainable urban design, weaving green space and nature into the built form.",
    why: "Sustainable places begin at the drawing board: architecture and nature planned as one.",
    image: "/assets/images/storyboard_image9.png",
    sourceType: "AI Generated",
  },
  {
    id: "sc-9",
    act: "ACT III — SUSTAINABILITY AND INNOVATION",
    sceneNum: "SCENE 09",
    voiceover: '"And connect communities through smarter mobility, energy and the built environment."',
    visual: "An aerial highway interchange is overlaid with intelligent digital connections, visualizing a smart network.",
    why: "Makes the invisible visible: the connected intelligence behind safer, smarter transportation.",
    image: "/assets/images/storyboard_image10.png",
    sourceType: "AI Enhanced",
  },
  {
    id: "sc-10",
    act: "ACT IV — IMPACT AND SHAPING THE FUTURE",
    sceneNum: "SCENE 10",
    voiceover: '"Energy and the built environment."',
    visual: "A wind turbine operates with subtle AI-powered energy-flow visualization woven into the frame.",
    why: "Renewable energy shown as integrated infrastructure, not a standalone icon.",
    image: "/assets/images/storyboard_image11.png",
    sourceType: "AI Generated",
  },
  {
    id: "sc-11",
    act: "ACT IV — IMPACT AND SHAPING THE FUTURE",
    sceneNum: "SCENE 11",
    voiceover: '"Because progress is not measured only by what we build, but by the positive impact it creates for people and the planet."',
    visual: "A child walks safely through a vibrant, people-centered community of green space and everyday life.",
    why: "Shifts focus from structures to people the true measure of engineering's success.",
    image: "/assets/images/storyboard_image12.png",
    sourceType: "AI Generated",
  },
  {
    id: "sc-12",
    act: "ACT IV — IMPACT AND SHAPING THE FUTURE",
    sceneNum: "SCENE 12",
    voiceover: '"Turning possibility into lasting progress."',
    visual: "A connected smart city comes to life through subtle digital infrastructure networks at dusk.",
    why: "The closing image: innovation, collaboration, and infrastructure resolved into one skyline.",
    image: "/assets/images/storyboard_image13.png",
    sourceType: "AI Generated",
  },
];

export const StoryboardSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [animTrigger, setAnimTrigger] = useState(true);

  const triggerTransition = (newIdx: number) => {
    setAnimTrigger(false);
    setTimeout(() => {
      setActiveIdx(newIdx);
      setAnimTrigger(true);
    }, 150);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % storyboardData.length;
    triggerTransition(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + storyboardData.length) % storyboardData.length;
    triggerTransition(prevIdx);
  };

  const currentScene = storyboardData[activeIdx];
  const isGenerated = currentScene.sourceType === "AI Generated";
  const themeColor = isGenerated ? "#EE3327" : "#00B050";

  return (
    <div className="relative w-full flex flex-col gap-8 z-10 select-none">
      
      {/* Legend Information Box */}
      <div className="flex gap-4 items-center justify-start text-[10px] font-mono border-b border-white/5 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EE3327]" />
          <span className="text-white/60 font-semibold">Red Border: AI Generated Image</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00B050]" />
          <span className="text-white/60 font-semibold">Green Border: AI Added / Enhanced Image</span>
        </div>
      </div>

      {/* 1. Theatre Slider Frame - Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-xl p-6 lg:p-8 relative overflow-hidden">
        
        {/* Left Side: Storyboard Image Box (Locked to 16:9 aspect ratio) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div 
            className="w-full aspect-video relative rounded-lg overflow-hidden border-3 bg-black group transition-colors duration-300 select-none"
            style={{ borderColor: themeColor }}
          >
            {/* Main Scene Image - absolute positioning guarantees it never overrides parent height */}
            <img
              src={currentScene.image}
              alt={currentScene.sceneNum}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                animTrigger ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionProperty: "opacity, transform" }}
            />

            {/* AI Blueprint Grid Overlay (Toggleable) */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-10 ${
                showBlueprint ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Blueprint Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:30px_30px]" />
              
              {/* Laser scanning line */}
              <div 
                className="absolute inset-x-0 h-[1.5px] shadow-[0_0_8px_rgba(255,255,255,0.8)] top-0 animate-[scan_3s_linear_infinite]" 
                style={{ backgroundColor: themeColor }}
              />
              
              {/* Technical overlay items */}
              <div 
                className="absolute bottom-4 left-4 bg-black/85 px-3 py-1.5 border rounded text-[8px] font-mono tracking-wider flex flex-col gap-0.5"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                <span>SYS_STATE: TRACKING</span>
                <span>OUTLINE_TYPE: {currentScene.sourceType.toUpperCase()}</span>
                <span>REF_LAT: 52.515° N | REF_LNG: 1.902° W</span>
              </div>

              <div 
                className="absolute top-4 right-4 bg-black/85 px-2 py-1 border rounded text-[8px] font-mono tracking-wider"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                DETECT_LOCK: ON [1.77]
              </div>

              {/* Corner Bracket Graphics */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l" style={{ borderColor: themeColor }} />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r" style={{ borderColor: themeColor }} />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l" style={{ borderColor: themeColor }} />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r" style={{ borderColor: themeColor }} />
            </div>

            {/* Action Overlay: Navigation Arrows directly on Hover */}
            <div className="absolute inset-y-0 inset-x-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="w-10 h-10 rounded-full bg-black/80 border border-white/10 hover:border-wsp-red text-white flex items-center justify-center hover:scale-105 transition-all pointer-events-auto cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="w-10 h-10 rounded-full bg-black/80 border border-white/10 hover:border-wsp-red text-white flex items-center justify-center hover:scale-105 transition-all pointer-events-auto cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Toggle Blueprint Button */}
            <button
              onClick={() => setShowBlueprint(!showBlueprint)}
              className={`absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded border font-mono text-[9px] tracking-wider transition-all duration-300 cursor-pointer ${
                showBlueprint 
                  ? "text-white" 
                  : "bg-black/70 border-white/10 text-white/80 hover:text-white"
              }`}
              style={{ 
                backgroundColor: showBlueprint ? themeColor : undefined,
                borderColor: showBlueprint ? themeColor : undefined
              }}
            >
              <Cpu size={12} className={showBlueprint ? "animate-spin" : ""} />
              {showBlueprint ? "GRID_SCAN: ON" : "TOGGLE DATA OVERLAY"}
            </button>
          </div>
        </div>

        {/* Right Side: Details Card Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 lg:p-2 bg-transparent select-none min-h-[300px]">
          
          <div className={`flex flex-col gap-6 transition-all duration-300 ${
            animTrigger ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}>
            {/* Act Header */}
            <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
              <span className="font-editorial text-wsp-red text-[11px] font-bold tracking-widest uppercase">
                {currentScene.act}
              </span>
              <span 
                className="font-mono text-white/50 text-[10px] tracking-widest font-semibold border-b pb-0.5 transition-colors"
                style={{ borderColor: themeColor }}
              >
                {currentScene.sceneNum}
              </span>
            </div>

            {/* Voiceover */}
            <div className="flex flex-col gap-1.5">
              <span className="font-editorial text-[9px] tracking-[0.2em] text-wsp-red font-bold uppercase">
                Voice-Over Copy
              </span>
              <p className="font-editorial text-base md:text-lg font-bold leading-normal text-white italic">
                {currentScene.voiceover}
              </p>
            </div>

            {/* Visual Description */}
            <div className="flex flex-col gap-1.5">
              <span className="font-editorial text-[9px] tracking-[0.2em] text-white/40 font-bold uppercase">
                Visual Scene Direction
              </span>
              <p className="text-xs leading-relaxed text-white/80">
                {currentScene.visual}
              </p>
            </div>

            {/* Why Rationale */}
            <div className="flex flex-col gap-1.5">
              <span className="font-editorial text-[9px] tracking-[0.2em] text-white/40 font-bold uppercase">
                Strategic Rationale
              </span>
              <p className="text-xs leading-relaxed text-text-muted">
                {currentScene.why}
              </p>
            </div>
          </div>

          {/* Bottom Card Bar: Navigation Controls */}
          <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6 lg:mt-0 font-editorial text-[10px]">
            <div className="flex items-center gap-2">
              <span 
                className="inline-block w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: themeColor }}
              />
              <span className="text-white/80 font-mono tracking-widest uppercase text-[9px]">
                {currentScene.sourceType}
              </span>
            </div>

            {/* In-place manual controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="p-1 border border-white/10 hover:border-wsp-red hover:text-white rounded transition-all cursor-pointer text-white/50"
              >
                <ChevronLeft size={16} />
              </button>
              
              <span className="text-white/60 font-mono tracking-wider">
                {activeIdx + 1} / {storyboardData.length}
              </span>

              <button
                onClick={handleNext}
                className="p-1 border border-white/10 hover:border-wsp-red hover:text-white rounded transition-all cursor-pointer text-white/50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Horizontal Thumbnail Navigation Slider */}
      <div className="flex flex-col gap-3">
        <span className="font-editorial text-[9px] tracking-[0.2em] text-white/40 font-bold uppercase">
          Timeline Jump Navigation (With Border References)
        </span>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none select-none">
          {storyboardData.map((scene, idx) => {
            const isSelfGenerated = scene.sourceType === "AI Generated";
            const thumbnailBorder = isSelfGenerated ? "#EE3327" : "#00B050";
            const isActive = idx === activeIdx;

            return (
              <button
                key={scene.id}
                onClick={() => triggerTransition(idx)}
                className={`flex-none w-24 aspect-video rounded-md overflow-hidden border-2 relative transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "scale-102 ring-1 ring-white/20" 
                    : "opacity-45 hover:opacity-75"
                }`}
                style={{ 
                  borderColor: thumbnailBorder,
                  boxShadow: isActive ? `0 0 10px ${thumbnailBorder}50` : undefined
                }}
              >
                {/* Thumbnail Image uses absolute inset-0 to prevent layout jumps */}
                <div className="absolute inset-0">
                  <img
                    src={scene.image}
                    alt={scene.sceneNum}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-1 right-1.5 font-mono text-[7px] text-white/80 bg-black/60 px-1 rounded">
                  SC {idx + 1}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Production Approach Info Block */}
      <div className="mt-8 p-8 border border-white/5 bg-[#060607]/40 backdrop-blur-md rounded-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-wsp-red/5 rounded-full blur-3xl pointer-events-none" />
        
        <h3 className="font-editorial text-base md:text-lg font-bold tracking-widest text-white uppercase mb-8 pb-4 border-b border-white/5">
          Production Approach & Creative Direction
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-editorial text-[9px] tracking-[0.2em] text-wsp-red font-bold uppercase mb-3">
              Style Code
            </h4>
            <ul className="text-[11px] leading-relaxed text-white/80 flex flex-col gap-2">
              <li>• Cinematic Documentary</li>
              <li>• Human-Centered Storytelling</li>
              <li>• AI-Assisted Production</li>
              <li>• Engineering Visualization</li>
              <li>• Premium Corporate Film</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-editorial text-[9px] tracking-[0.2em] text-white/50 font-bold uppercase mb-3">
              Look & Feel
            </h4>
            <ul className="text-[11px] leading-relaxed text-white/80 flex flex-col gap-2">
              <li>• Warm Natural Color Palette</li>
              <li>• Authentic Human Moments</li>
              <li>• Premium Architecture</li>
              <li>• Subtle AI Visualizations</li>
              <li>• Minimal Motion Graphics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-editorial text-[9px] tracking-[0.2em] text-white/50 font-bold uppercase mb-3">
              AI Production Techniques
            </h4>
            <ul className="text-[11px] leading-relaxed text-white/80 flex flex-col gap-2">
              <li>• AI Image & Video Generation</li>
              <li>• Digital Twin Visualisation</li>
              <li>• Generative Scene Expansion</li>
              <li>• AI Compositing & Cleanup</li>
              <li>• AI-Assisted Colour Matching</li>
              <li>• AI Voiceover</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <h4 className="font-editorial text-[9px] tracking-[0.2em] text-white/40 font-bold uppercase mb-3">
            Creative Direction Rationale
          </h4>
          <p className="text-xs leading-relaxed text-text-muted italic">
            "The creative approach intentionally combines authentic documentary cinematography with AI-enhanced production. Rather than treating AI as a visual spectacle, it is woven throughout production to strengthen storytelling, accelerate content creation, and visualize complex engineering concepts resulting in a cinematic narrative where engineering, science, data, and technology come together to create meaningful impact for people and the planet."
          </p>
        </div>
      </div>

      {/* Scan animation styles injected */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>

    </div>
  );
};
