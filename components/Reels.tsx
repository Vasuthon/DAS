
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_REELS } from '../data';
import { Reel } from '../types';

const ReelItem: React.FC<{ reel: Reel }> = ({ reel }) => {
  const [isLiked, setIsLiked] = useState(reel.isLiked);
  const [likesCount, setLikesCount] = useState(reel.likes);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black flex justify-center snap-start overflow-hidden">
      {/* Video element */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="h-full w-full md:w-auto md:max-w-[450px] object-cover md:rounded-lg"
        loop
        muted={isMuted}
        playsInline
        onClick={() => {
          if (videoRef.current?.paused) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        }}
      />

      {/* Play/Pause Overlay Icon */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <i className="fa-solid fa-play text-white/50 text-6xl"></i>
        </div>
      )}

      {/* Mute toggle icon overlay on click position roughly top right of video area */}
      <div className="absolute top-4 right-[calc(50%-200px)] md:right-[calc(50%-200px)] z-20">
         <button onClick={toggleMute} className="text-white bg-black/20 p-2 rounded-full backdrop-blur-sm">
            <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
         </button>
      </div>

      {/* Right Side Icons (Likes, Comments, Share, Save) */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6 z-10 md:right-[calc(50%-250px)]">
        <div className="flex flex-col items-center group cursor-pointer" onClick={handleLike}>
          <i className={`${isLiked ? 'fa-solid text-red-500 scale-125' : 'fa-regular text-white'} fa-heart text-2xl transition-all duration-300 drop-shadow-lg`}></i>
          <span className="text-white text-xs font-medium mt-1 drop-shadow-md">{likesCount}</span>
        </div>
        
        <div className="flex flex-col items-center cursor-pointer">
          <i className="fa-regular fa-comment text-white text-2xl drop-shadow-lg"></i>
          <span className="text-white text-xs font-medium mt-1 drop-shadow-md">{reel.commentsCount}</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer">
          <i className="fa-regular fa-paper-plane text-white text-2xl drop-shadow-lg"></i>
        </div>

        <div className="flex flex-col items-center cursor-pointer">
          <i className="fa-regular fa-bookmark text-white text-2xl drop-shadow-lg"></i>
        </div>

        <div className="flex flex-col items-center cursor-pointer">
          <i className="fa-solid fa-ellipsis text-white text-xl drop-shadow-lg"></i>
        </div>

        {/* Music Thumbnail Spinning Disk */}
        <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-white animate-spin-slow shadow-lg">
            <img src={reel.avatar} className="w-full h-full object-cover" alt="audio" />
        </div>
      </div>

      {/* Bottom Information (Username, Caption, Music) */}
      <div className="absolute left-4 bottom-8 right-16 flex flex-col space-y-3 z-10 md:left-[calc(50%-210px)] max-w-[380px]">
        <div className="flex items-center space-x-3">
          <img src={reel.avatar} className="w-8 h-8 rounded-full border border-white/20" alt={reel.username} />
          <span className="text-white font-bold text-sm drop-shadow-md">{reel.username}</span>
          <button className="border border-white/50 text-white text-[12px] font-bold px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">
            Follow
          </button>
        </div>
        
        <p className="text-white text-[14px] leading-snug drop-shadow-md line-clamp-2">
          {reel.caption}
        </p>

        <div className="flex items-center text-white text-xs bg-black/20 w-fit px-3 py-1 rounded-full backdrop-blur-md">
          <i className="fa-solid fa-music mr-2 text-[10px]"></i>
          <div className="overflow-hidden whitespace-nowrap">
            <span className="inline-block animate-marquee">{reel.musicAuthor} · {reel.musicName}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

const Reels: React.FC = () => {
  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
      {MOCK_REELS.map(reel => (
        <ReelItem key={reel.id} reel={reel} />
      ))}
    </div>
  );
};

export default Reels;