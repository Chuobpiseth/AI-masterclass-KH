"use client";

import { useState, useEffect, useRef } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { Play, Pause, Maximize, Settings2 } from "lucide-react";
import type { YouTubeEmbedProps } from "@/types";
import { useAuthStore } from "@/store/auth-store";

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "00:00";
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPiP, setIsPiP] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState("auto");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const { studentName, studentCode } = useAuthStore();

  // PiP Scroll Detection (Bulletproof using capture: true)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || window.innerWidth < 768) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        setIsPiP(true);
      } else {
        setIsPiP(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", handleScroll, { capture: true });
  }, []);

  // Anti-Recording Measures (Focus Loss & Shortcuts)
  useEffect(() => {
    const handleBlur = () => {
      if (player && isPlaying) {
        player.pauseVideo();
        alert("វីដេអូត្រូវបានផ្អាក ដោយសារអ្នកប្តូរផ្ទាំងកម្មវិធី។ (Video paused: Screen recording or focus loss detected)");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" || 
        (e.metaKey && e.shiftKey && e.key === "5") ||
        (e.metaKey && e.altKey && (e.key === "r" || e.key === "R")) || 
        (e.metaKey && e.shiftKey && (e.key === "s" || e.key === "S")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "s" || e.key === "S"))
      ) {
        if (player) player.pauseVideo();
        alert("Screen recording is strictly prohibited. ហាមថតអេក្រង់!");
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [player, isPlaying]);

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event: { target: YouTubePlayer; data: number }) => {
    if (event.data === 1) {
      setIsPlaying(true);
      progressInterval.current = setInterval(async () => {
        const time = await event.target.getCurrentTime();
        setCurrentTime(time);
      }, 1000);
    } else {
      setIsPlaying(false);
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
  };

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player) return;
    const newTime = parseFloat(e.target.value);
    player.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!player) return;
    const rate = parseFloat(e.target.value);
    setPlaybackRate(rate);
    player.setPlaybackRate(rate);
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!player) return;
    const q = e.target.value;
    setQuality(q);
    player.setPlaybackQuality(q);
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err.message);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="my-8" ref={containerRef}>
      {title && !document.fullscreenElement && (
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          🎬 {title}
        </h4>
      )}
      
      <div 
        className={`
          relative overflow-hidden border border-border/50 bg-black shadow-lg transition-all duration-300 flex flex-col group
          ${isPiP 
            ? "fixed bottom-6 right-6 w-80 md:w-96 rounded-xl z-[100] shadow-2xl hover:scale-105" 
            : "w-full rounded-xl"
          }
        `}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          {/* STATIC WATERMARK */}
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="flex flex-col items-center justify-center -rotate-12 select-none">
              <div 
                className="text-white/10 font-bold whitespace-nowrap text-xl lg:text-3xl"
                style={{ textShadow: '0px 0px 8px rgba(0,0,0,0.5)' }}
              >
                AI Masterclass KH by Chuob Piseth
              </div>
            </div>
          </div>

          {/* COMPLETE GLASS SHIELD (BLOCKS ALL CLICKS INCLUDING RIGHT-CLICK) */}
          <div className="absolute inset-0 z-20" onClick={togglePlay} onContextMenu={(e) => e.preventDefault()}></div>

          {/* YOUTUBE LOGO MASK */}
          <div className="absolute bottom-0 right-0 w-[140px] h-[50px] backdrop-blur-md bg-black/20 z-20 pointer-events-none"></div>

          <YouTube
            videoId={videoId}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3
              },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
            className="absolute inset-0 h-full w-full pointer-events-none"
            iframeClassName="w-full h-full"
          />
        </div>

        {/* CUSTOM CONTROLS */}
        <div className={`
          bg-zinc-900 px-4 py-3 flex items-center gap-4 transition-opacity duration-300 flex-wrap
          ${isPiP ? "opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm" : "relative z-50"}
        `}>
          <button 
            onClick={togglePlay}
            className="text-white hover:text-primary transition-colors focus:outline-none"
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
          </button>
          
          <div className="text-zinc-400 text-xs font-mono w-12 text-right">
            {formatTime(currentTime)}
          </div>
          
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-primary min-w-[100px]"
          />
          
          <div className="text-zinc-400 text-xs font-mono w-12">
            {formatTime(duration)}
          </div>

          {/* SPEED AND QUALITY CONTROLS */}
          <div className="flex items-center gap-2 ml-auto">
            <select 
              value={playbackRate} 
              onChange={handleSpeedChange}
              className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded outline-none cursor-pointer border border-zinc-700 hover:border-zinc-500"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x Speed</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>

            <select 
              value={quality} 
              onChange={handleQualityChange}
              className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded outline-none cursor-pointer border border-zinc-700 hover:border-zinc-500"
            >
              <option value="auto">Auto Qual</option>
              <option value="hd1080">1080p</option>
              <option value="hd720">720p</option>
              <option value="large">480p</option>
            </select>

            {!isPiP && (
              <button 
                onClick={toggleFullScreen}
                className="text-white hover:text-primary transition-colors focus:outline-none ml-2"
              >
                <Maximize className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* PiP Close Button */}
        {isPiP && (
          <button 
            onClick={() => setIsPiP(false)}
            className="absolute -top-3 -right-3 z-50 bg-destructive text-destructive-foreground rounded-full p-1.5 shadow-lg hover:scale-110 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>
    </div>
  );
}
