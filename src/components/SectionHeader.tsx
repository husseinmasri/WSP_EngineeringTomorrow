import React from "react";

interface SectionHeaderProps {
  num: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  num,
  title,
  subtitle,
  id,
}) => {
  return (
    <div id={id} className="relative z-10 mb-16 pt-24 border-t border-white/5 select-none">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="font-editorial text-wsp-red text-lg md:text-xl font-bold tracking-widest">
            // {num}
          </span>
          <h2 className="font-editorial text-4xl md:text-6xl font-black tracking-tight uppercase text-white">
            {title}
          </h2>
        </div>
        {subtitle && (
          <span className="font-editorial text-xs md:text-sm tracking-wider uppercase text-text-muted font-semibold">
            {subtitle}
          </span>
        )}
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-wsp-red/50 via-white/5 to-transparent mt-6" />
    </div>
  );
};
