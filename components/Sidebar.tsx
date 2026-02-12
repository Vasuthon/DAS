
import React from 'react';
import { PageType } from '../types';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'feed' as PageType, icon: 'fa-house', label: 'หน้าหลัก' },
    { id: 'explore' as PageType, icon: 'fa-compass', label: 'สำรวจ' },
    { id: 'reels' as PageType, icon: 'fa-clapperboard', label: 'Reels' },
    { id: 'messages' as PageType, icon: 'fa-paper-plane', label: 'ข้อความ', badge: 7 },
    { id: 'create' as PageType, icon: 'fa-square-plus', label: 'สร้าง' },
  ];

  return (
    <nav className="w-16 md:w-64 h-screen border-r border-[#262626] fixed left-0 top-0 p-3 md:p-5 flex flex-col z-40 bg-black transition-all">
      {/* Brand Logo & Name */}
      <div 
        className="mb-12 md:mb-14 px-2 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3" 
        onClick={() => onPageChange('feed')}
      >
        {/* Modern Logo Icon */}
        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#4f46e5] via-[#9333ea] to-[#db2777] rounded-[10px] shadow-lg shadow-indigo-500/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <i className="fa-solid fa-comment-dots text-white text-xl relative z-10"></i>
        </div>
        
        {/* Brand Text */}
        <h1 className="hidden md:block text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 drop-shadow-sm">
          Takl Takl
        </h1>
      </div>

      {/* Nav Items */}
      <div className="flex-grow space-y-2">
        {navItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`
              flex items-center p-3 cursor-pointer rounded-xl transition-all duration-200
              hover:bg-[#1a1a1a] group
              ${currentPage === item.id ? 'bg-[#121212] font-bold' : 'text-gray-300'}
            `}
          >
            <div className="relative w-8 flex justify-center">
              <i className={`fa-solid ${item.icon} text-xl md:text-2xl group-hover:scale-110 transition-transform ${currentPage === item.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}></i>
              {item.badge && (
                <span className="absolute -top-1.5 -right-1.5 md:-right-1 bg-red-600 text-[10px] text-white px-1.5 py-0.5 rounded-full border-2 border-black font-bold animate-pulse">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`ml-4 hidden md:block text-lg transition-colors ${currentPage === item.id ? 'text-white' : 'group-hover:text-white'}`}>
              {item.label}
            </span>
          </div>
        ))}

        {/* Profile Item */}
        <div 
          onClick={() => onPageChange('profile')}
          className={`
            flex items-center p-3 cursor-pointer rounded-xl transition-all duration-200
            hover:bg-[#1a1a1a] group
            ${currentPage === 'profile' ? 'bg-[#121212] font-bold' : 'text-gray-300'}
          `}
        >
          <div className="w-8 flex justify-center">
            <img 
              src="https://picsum.photos/100/100?u=me" 
              className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-all group-hover:scale-110 ${currentPage === 'profile' ? 'border-white' : 'border-gray-700 group-hover:border-gray-500'}`}
              alt="Profile"
            />
          </div>
          <span className={`ml-4 hidden md:block text-lg transition-colors ${currentPage === 'profile' ? 'text-white' : 'group-hover:text-white'}`}>
            โปรไฟล์
          </span>
        </div>
      </div>

      {/* More Link */}
      <div className="mt-auto pt-4 border-t border-[#1a1a1a] md:border-none">
        <div className="sidebar-item flex items-center p-3 cursor-pointer hover:bg-[#1a1a1a] rounded-xl transition-all text-gray-300 group">
          <div className="w-8 flex justify-center">
            <i className="fa-solid fa-bars text-xl md:text-2xl group-hover:text-white transition-colors"></i>
          </div>
          <span className="ml-4 hidden md:block text-lg group-hover:text-white transition-colors">เพิ่มเติม</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
