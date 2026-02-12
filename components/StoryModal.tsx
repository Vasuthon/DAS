
import React, { useEffect, useState, useCallback } from 'react';
import { Story } from '../types';

interface StoryModalProps {
  story: Story;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          handleClose();
          return 100;
        }
        return prev + 0.8; // Roughly 5 seconds total duration
      });
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/98 flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Background Dimming Layer */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      {/* Story Card Container */}
      <div className="relative w-full max-w-[420px] h-full md:h-[90vh] bg-[#121212] md:rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] z-10 flex flex-col border border-white/5 animate-in fade-in zoom-in duration-300">
        
        {/* Progress Bars */}
        <div className="absolute top-4 left-0 right-0 px-3 flex space-x-1.5 z-40">
          <div className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-75 ease-linear" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Header Overlay */}
        <div className="absolute top-8 left-0 right-0 px-4 py-2 flex items-center justify-between z-40">
          <div className="flex items-center">
            <div className="p-[1.5px] rounded-full story-ring mr-3 shadow-lg">
              <div className="p-[1px] bg-black rounded-full">
                <img src={story.avatar} className="w-8 h-8 rounded-full border border-black" alt={story.username} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm shadow-sm text-white drop-shadow-md">{story.username}</span>
              <span className="text-[10px] text-white/70 drop-shadow-sm font-medium">สตอรี่ของ Takl Takl</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-white drop-shadow-lg hover:bg-white/10 p-2 rounded-full transition-colors"><i className="fa-solid fa-ellipsis-vertical"></i></button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleClose(); }} 
              className="text-white drop-shadow-lg text-3xl hover:bg-white/10 p-1 px-2 rounded-full transition-all"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Story Content Area */}
        <div className="flex-1 w-full relative group bg-black overflow-hidden">
          <img 
            src={story.contentUrl} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            alt="Story content" 
          />
          
          {/* Nav Hotspots */}
          <div className="absolute inset-y-0 left-0 w-1/4 cursor-pointer z-30 group/nav" onClick={() => setProgress(0)}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity"></div>
          </div>
          <div className="absolute inset-y-0 right-0 w-1/4 cursor-pointer z-30 group/nav" onClick={handleClose}>
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity"></div>
          </div>

          {story.isLive && (
            <div className="absolute top-24 left-4 z-40 bg-[#ff0050] text-[10px] font-bold px-2.5 py-1 rounded-sm flex items-center gap-1.5 border border-white/10 shadow-xl">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></span>
              ถ่ายทอดสด
            </div>
          )}
        </div>

        {/* Reply Interaction Bar */}
        <div className="p-5 pb-8 md:pb-5 bg-black/90 backdrop-blur-md flex items-center space-x-4 z-40 border-t border-white/5">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder={`ส่งข้อความถึง ${story.username}...`} 
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-full px-5 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-white/30 transition-all outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <button className="text-2xl text-white hover:scale-110 active:scale-90 transition-all"><i className="fa-regular fa-heart"></i></button>
          <button className="text-2xl text-white hover:scale-110 active:scale-90 transition-all"><i className="fa-regular fa-paper-plane"></i></button>
        </div>
      </div>

      {/* Desktop Helper UI */}
      <div className="hidden lg:contents">
        <button 
          onClick={handleClose}
          className="absolute right-12 top-12 text-5xl text-white/50 hover:text-white transition-all z-[110] active:scale-95"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <button className="absolute left-[calc(50%-340px)] top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[110] border border-white/10">
          <i className="fa-solid fa-chevron-left text-xl"></i>
        </button>
        <button className="absolute right-[calc(50%-340px)] top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[110] border border-white/10">
          <i className="fa-solid fa-chevron-right text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
