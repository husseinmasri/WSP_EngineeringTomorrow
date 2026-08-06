import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export const CustomVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  // IntersectionObserver to pause video based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Pause when off-screen
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, []);

  // Update controls fade-out timer
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Playback failed:", e));
    }
    resetControlsTimeout();
  };

  const handleMuteUnmute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
    resetControlsTimeout();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);
    if (video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
    setProgress(pos * 100);
    resetControlsTimeout();
  };

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
    resetControlsTimeout();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden border border-white/10 bg-black aspect-video group cursor-none"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      style={{ cursor: showControls ? "default" : "none" }}
    >
      <video
        ref={videoRef}
        src="/WSP Engineering Tomorrow Hussein Masri.mp4"
        poster="/assets/images/video_poster.png"
        className="w-full h-full object-cover"
        muted={isMuted}
        playsInline
        onClick={handlePlayPause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Glassmorphic Play/Pause Center Indicator on Click */}
      {!isPlaying && (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 m-auto w-20 h-20 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md hover:scale-110 hover:border-wsp-red/50 hover:text-wsp-red transition-all duration-300 z-20 cursor-pointer shadow-lg shadow-black/50"
        >
          <Play fill="currentColor" className="ml-1" size={32} />
        </button>
      )}

      {/* Top Banner overlay (visual approach indicator) */}
      <div className="absolute top-4 left-6 pointer-events-none font-editorial text-[10px] tracking-[0.2em] text-white/50 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/5 uppercase rounded-full">
        WSP Creative Lab Film
      </div>

      {/* Custom Bottom Control Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-4 transition-opacity duration-500 z-20 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress Bar */}
        <div
          className="w-full h-1 bg-white/20 hover:h-2 rounded-full cursor-pointer transition-all relative overflow-hidden"
          onClick={handleProgressClick}
        >
          <div
            className="absolute top-0 left-0 h-full bg-wsp-red"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Buttons / Controls */}
        <div className="flex items-center justify-between text-white text-xs md:text-sm font-editorial">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePlayPause}
              className="hover:text-wsp-red transition-colors cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={handleMuteUnmute}
              className="hover:text-wsp-red transition-colors cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <div className="text-white/60 tracking-wider">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-widest text-white/40 uppercase hidden sm:inline">
              60-Second WSP Promotional Film
            </span>
            <button
              onClick={handleFullscreen}
              className="hover:text-wsp-red transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
