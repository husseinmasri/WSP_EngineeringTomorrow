import React, { useState } from "react";
import { PenTool, Image, Sparkles, Film, Video, Calendar, DollarSign, BarChart2, ChevronRight } from "lucide-react";

interface Stage {
  num: string;
  name: string;
  tools: string[];
  desc: string;
  icon: React.ReactNode;
}

const stagesData: Stage[] = [
  {
    num: "01",
    name: "Ideation & Concept",
    tools: ["ChatGPT", "Claude"],
    desc: "Concept development, script structuring, prompt engineering.",
    icon: <PenTool size={16} />,
  },
  {
    num: "02",
    name: "Image Generation",
    tools: ["Midjourney", "Adobe Firefly", "Flux", "Nano Banana Pro"],
    desc: "Concept stills and key visual references for each scene.",
    icon: <Image size={16} />,
  },
  {
    num: "03",
    name: "Image Enhancement",
    tools: ["Magnific"],
    desc: "Upscaling and detail refinement before animation.",
    icon: <Sparkles size={16} />,
  },
  {
    num: "04",
    name: "Video Generation",
    tools: ["Kling", "Sora", "Higgsfield", "Google Flow", "Google Labs"],
    desc: "Image-to-video animation, camera movement, motion.",
    icon: <Video size={16} />,
  },
  {
    num: "05",
    name: "Post-Production",
    tools: ["Adobe Premiere Pro", "After Effects", "Photoshop", "Illustrator"],
    desc: "Editing, compositing, color grading, sound, final assembly.",
    icon: <Film size={16} />,
  },
];

const timelineData = [
  {
    day: "DAY 1",
    title: "Concept & Pre-Visualization",
    items: [
      "Script & concept (ChatGPT, Claude)",
      "Storyboard development and act breakdown",
      "Image generation & selection (Midjourney, Firefly, Flux, Nano Banana Pro)",
      "Upscaling and detail refinement (Magnific)",
    ],
  },
  {
    day: "DAY 2",
    title: "Video Generation",
    items: [
      "Image-to-video animation and iteration across scenes (Kling, Sora, Higgsfield, Google Flow, Google Labs)",
      "Camera movement, speed control and take selection",
    ],
  },
  {
    day: "DAY 3",
    title: "Post-Production & Documentation",
    items: [
      "Edit, motion graphics, color grade, sound (Premiere Pro, After Effects, Photoshop)",
      "Final QA and validation against creative rationale",
      "Workflow & Lab documentation assembly",
    ],
  },
];

const costData = [
  { tool: "ChatGPT Plus", cost: "$20/mo" },
  { tool: "Claude Pro", cost: "$20/mo" },
  { tool: "Midjourney (Basic)", cost: "$10/mo" },
  { tool: "Adobe Firefly", cost: "$10/mo" },
  { tool: "Kling AI (Standard)", cost: "$10/mo" },
  { tool: "Higgsfield", cost: "~$20/mo" },
  { tool: "Magnific", cost: "~$15/mo" },
  { tool: "Google AI Pro (Flow / Labs)", cost: "$20/mo" },
  { tool: "Adobe Creative Cloud", cost: "$60/mo" },
];

const getToolIcon = (name: string) => {
  const n = name.toLowerCase();
  
  // 1. ChatGPT (OpenAI spiral logo - high-fidelity SVG)
  if (n.includes("chatgpt")) {
    return (
      <svg className="w-4 h-4 mr-2 text-[#10A37F] fill-current shrink-0" viewBox="0 0 16 16">
        <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.431.18L6.699 4.582a1.01 1.01 0 0 0-.512.879v3.069a.05.05 0 0 1-.05.048c-.23-.003-.456-.046-.673-.127M8 8.163a.84.84 0 1 1 0-1.68.84.84 0 0 1 0 1.68"/>
      </svg>
    );
  }

  // 2. Claude (Anthropic hand design - high-fidelity SVG)
  if (n.includes("claude")) {
    return (
      <svg className="w-4 h-4 mr-2 text-[#D97752] fill-current shrink-0" viewBox="0 0 24 24">
        <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/>
      </svg>
    );
  }

  // 3. Midjourney (stylized sailboat in light blue/cyan)
  if (n.includes("midjourney")) {
    return (
      <svg className="w-4 h-4 mr-2 text-[#60A5FA] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 17.5c-4-1.5-7.5-1.5-10 0-2.5-1.5-6-1.5-10 0M2 13.5c4-1.5 7.5-1.5 10 0 2.5-1.5 6-1.5 10 0M12 3v10M12 7l4 4M12 7l-4 4"/>
      </svg>
    );
  }

  // 4. Adobe Premiere Pro (Square blue box with cyan Pr)
  if (n.includes("premiere")) {
    return (
      <div className="w-4.5 h-4.5 bg-[#181830] border border-[#142646] rounded flex items-center justify-center mr-2 shrink-0 select-none">
        <span className="text-[#38a2e5] font-mono text-[9px] font-black leading-none">Pr</span>
      </div>
    );
  }

  // 5. Adobe After Effects (Square dark purple box with violet Ae)
  if (n.includes("after effects")) {
    return (
      <div className="w-4.5 h-4.5 bg-[#1e1430] border border-[#2a1442] rounded flex items-center justify-center mr-2 shrink-0 select-none">
        <span className="text-[#a488e5] font-mono text-[9px] font-black leading-none">Ae</span>
      </div>
    );
  }

  // 6. Adobe Photoshop (Square dark blue box with cyan Ps)
  if (n.includes("photoshop")) {
    return (
      <div className="w-4.5 h-4.5 bg-[#121a30] border border-[#122846] rounded flex items-center justify-center mr-2 shrink-0 select-none">
        <span className="text-[#48bafc] font-mono text-[9px] font-black leading-none">Ps</span>
      </div>
    );
  }

  // 7. Adobe Illustrator (Square dark brown/black box with orange Ai)
  if (n.includes("illustrator")) {
    return (
      <div className="w-4.5 h-4.5 bg-[#261c10] border border-[#3e2814] rounded flex items-center justify-center mr-2 shrink-0 select-none">
        <span className="text-[#fc8f18] font-mono text-[9px] font-black leading-none">Ai</span>
      </div>
    );
  }

  // 8. Adobe Firefly (Adobe multicolor Fy box)
  if (n.includes("firefly")) {
    return (
      <div className="w-4.5 h-4.5 bg-[#2a1216] border border-[#4a1824] rounded flex items-center justify-center mr-2 shrink-0 select-none">
        <span className="text-[#ff507c] font-mono text-[9px] font-black leading-none">Fy</span>
      </div>
    );
  }

  // 9. Standard Adobe CC generic
  if (n.includes("creative cloud") || n.includes("adobe")) {
    return (
      <svg className="w-4 h-4 mr-2 text-[#FF0000] fill-current shrink-0" viewBox="0 0 24 24">
        <path d="M13.9 2H22v20L13.9 2zm-3.8 0L2 20.3V2h8.1zM12 9.5l4.6 11.2H12.9l-1.3-3.2H8.3l3.7-8z"/>
      </svg>
    );
  }

  // 10. Google G Logo (Multi-color Google representation)
  if (n.includes("google")) {
    return (
      <svg className="w-3.5 h-3.5 mr-2 shrink-0" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    );
  }

  // 11. Magnific (golden sparkles)
  if (n.includes("magnific")) {
    return (
      <svg className="w-4 h-4 mr-2 text-[#F59E0B] fill-current shrink-0" viewBox="0 0 24 24">
        <path d="M12 2l2.4 7.2 7.2 2.4-7.2 2.4-2.4 7.2-2.4-7.2-7.2-2.4 7.2-2.4z"/>
      </svg>
    );
  }

  // 12. Kling / Sora / Higgsfield (AI Video camera)
  if (n.includes("kling") || n.includes("sora") || n.includes("higgsfield")) {
    return (
      <svg className="w-4 h-4 mr-2 text-[#EC4899] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    );
  }

  // 13. Flux
  if (n.includes("flux")) {
    return (
      <svg className="w-4 h-4 mr-2 text-[#A78BFA] fill-current shrink-0" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    );
  }
  
  // 14. Banana
  if (n.includes("banana")) {
    return (
      <svg className="w-4 h-4 mr-2 text-[#FBBF24] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 21c6-1 11-4 13-10s2-10 1-11c-1 1-5 2-10 1S2 3 1 3c1 5 1 11 1 18z"/>
      </svg>
    );
  }

  // Default Sparkle logo for other tools
  return (
    <svg className="w-4 h-4 mr-2 text-white/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L15 15l-5.187.813z"/>
    </svg>
  );
};

export const WorkflowTimeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="relative w-full flex flex-col gap-16 z-10 select-none">
      
      {/* 1. Production Pipeline Stages */}
      <div className="flex flex-col gap-6">
        <span className="font-editorial text-[10px] tracking-[0.2em] text-wsp-red font-bold uppercase">
          Interactive Production Pipeline
        </span>

        {/* Stepper Header */}
        <div className="grid grid-cols-5 border border-white/5 bg-[#080809]/40 backdrop-blur-md rounded-lg overflow-hidden select-none">
          {stagesData.map((stage, idx) => (
            <button
              key={stage.num}
              onClick={() => setActiveStage(idx)}
              className={`flex flex-col items-center justify-center p-4 border-r border-white/5 last:border-0 transition-all duration-300 cursor-pointer ${
                idx === activeStage ? "bg-wsp-red/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className={`p-2 rounded-full mb-2 ${
                idx === activeStage ? "bg-wsp-red text-white" : "bg-white/5 text-white/50"
              }`}>
                {stage.icon}
              </div>
              <span className="font-editorial text-[9px] md:text-[10px] tracking-widest font-bold uppercase hidden md:inline">
                {stage.name}
              </span>
              <span className="font-editorial text-[10px] font-bold md:hidden">
                {stage.num}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Stage Content Panel */}
        <div className="p-8 border border-white/5 bg-[#080809]/50 backdrop-blur-md rounded-lg min-h-[160px] relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-wsp-red/5 rounded-full blur-2xl" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-editorial text-wsp-red text-sm font-black">// STAGE {stagesData[activeStage].num}</span>
              <h4 className="font-editorial text-lg md:text-xl font-bold tracking-wide uppercase text-white">
                {stagesData[activeStage].name}
              </h4>
            </div>
            
            <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-3xl">
              {stagesData[activeStage].desc}
            </p>

            {/* Render tools list with SVG icons */}
            <div className="flex flex-wrap items-center gap-2.5 mt-2">
              <span className="text-[10px] font-editorial text-white/40 uppercase tracking-widest font-bold">
                Tools Used:
              </span>
              {stagesData[activeStage].tools.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center bg-black/60 px-3 py-1.5 border border-white/10 text-[10px] font-editorial uppercase rounded text-white font-medium hover:border-wsp-red/35 transition-colors"
                >
                  {getToolIcon(t)}
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Three Day Timeline & Estimated Costs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Timeline Grid (Left Side) - Tabbed Layout */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-wsp-red" />
            <span className="font-editorial text-[10px] tracking-[0.2em] text-white/40 font-bold uppercase">
              Three-Day Schedule timeline
            </span>
          </div>

          <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-sm rounded-lg flex flex-col gap-6">
            
            {/* Day Selector Tabs */}
            <div className="flex border-b border-white/5 pb-2 gap-4">
              {timelineData.map((day, idx) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(idx)}
                  className={`pb-2 border-b-2 font-editorial text-xs tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer ${
                    idx === activeDay 
                      ? "border-wsp-red text-wsp-red" 
                      : "border-transparent text-white/40 hover:text-white"
                  }`}
                >
                  {day.day}
                </button>
              ))}
            </div>

            {/* Active Day Content */}
            <div className="flex flex-col gap-4 animate-fadeIn">
              <h5 className="font-editorial text-sm font-bold tracking-wide uppercase text-white">
                {timelineData[activeDay].title}
              </h5>
              
              <ul className="text-xs text-text-muted flex flex-col gap-3.5 leading-relaxed">
                {timelineData[activeDay].items.map((item, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <ChevronRight size={14} className="text-wsp-red shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Estimated Costs Dashboard (Right Side) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <DollarSign size={14} className="text-wsp-red" />
            <span className="font-editorial text-[10px] tracking-[0.2em] text-white/40 font-bold uppercase">
              Estimated Tools Monthly Cost
            </span>
          </div>

          <div className="p-6 border border-white/5 bg-[#080809]/40 backdrop-blur-sm rounded-lg flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-2">
              <span className="text-xs font-editorial font-bold text-white uppercase tracking-wider">Tool Subscription</span>
              <span className="text-xs font-editorial font-bold text-white uppercase tracking-wider">Rate</span>
            </div>
            
            <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1">
              {costData.map((item) => (
                <div key={item.tool} className="flex justify-between items-center text-xs font-editorial">
                  <div className="flex items-center">
                    {getToolIcon(item.tool)}
                    <span className="text-text-muted">{item.tool}</span>
                  </div>
                  <span className="text-white font-bold">{item.cost}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 mt-2 flex flex-col gap-3">
              <div className="flex justify-between items-center font-editorial">
                <span className="text-xs font-bold text-wsp-red uppercase tracking-wider">Estimated Monthly Pool</span>
                <span className="text-sm font-black text-white bg-wsp-red/10 px-2 py-0.5 border border-wsp-red/20 rounded">
                  ~$185/mo
                </span>
              </div>
              <p className="text-[10px] text-white/40 leading-normal">
                *$185/mo at full published rates. This reflects one designer holding every listed subscription simultaneously; most were already active tools, and public pricing may vary by region/tier. Actual incremental cost for one assignment is lower.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Scalability within WSP Block */}
      <div className="p-8 border border-white/5 bg-[#060607]/40 backdrop-blur-md rounded-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6">
          <BarChart2 size={18} className="text-wsp-red" />
          <h4 className="font-editorial text-lg font-bold tracking-widest text-white uppercase">
            Scaling this within WSP
          </h4>
        </div>
        
        <p className="text-xs md:text-sm leading-relaxed text-text-muted">
          A shared subscription pool (not per-designer) cuts the effective cost per project well below this figure. Reusable prompt templates and a shot-type library shorten Day 1 significantly on repeat briefs, and the same 3-day pipeline scales to bids, leadership content, and internal campaigns without new tooling.
        </p>
      </div>

    </div>
  );
};
