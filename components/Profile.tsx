
import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved' | 'tagged'>('posts');

  const profilePosts = [
    { id: 'p1', imageUrl: 'https://picsum.photos/600/600?u=101', isVideo: false },
    { id: 'p2', imageUrl: 'https://picsum.photos/600/600?u=102', isVideo: true },
    { id: 'p3', imageUrl: 'https://picsum.photos/600/600?u=103', isVideo: false },
    { id: 'p4', imageUrl: 'https://picsum.photos/600/600?u=104', isVideo: false },
    { id: 'p5', imageUrl: 'https://picsum.photos/600/600?u=105', isVideo: false },
    { id: 'p6', imageUrl: 'https://picsum.photos/600/600?u=106', isVideo: false },
  ];

  return (
    <div className="max-w-[935px] mx-auto pt-8 px-4">
      {/* Profile Header */}
      <header className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-20 mb-12">
        {/* Avatar */}
        <div className="w-32 h-32 md:w-40 md:h-40 relative group cursor-pointer">
          <div className="w-full h-full rounded-full overflow-hidden border border-[#262626]">
            <img 
              src="https://picsum.photos/300/300?u=me" 
              className="w-full h-full object-cover" 
              alt="Profile" 
            />
          </div>
          {/* Status Indicator from screenshot */}
          <div className="absolute top-0 right-4 bg-[#262626] border border-black rounded-full w-6 h-6 flex items-center justify-center text-[10px]">
            🚫
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col space-y-5">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h2 className="text-xl font-medium">vasuthon_</h2>
            <button className="text-xl">
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
             <span className="font-bold">วสุธร นุตสติ</span>
             <div className="flex space-x-6 py-2">
                <span className="text-sm"><span className="font-bold">3</span> posts</span>
                <span className="text-sm"><span className="font-bold">43</span> followers</span>
                <span className="text-sm"><span className="font-bold">453</span> following</span>
             </div>
             <div className="text-sm flex items-center gap-1">
                <i className="fa-brands fa-threads text-xs"></i>
                <span>vasuthon_</span>
             </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button className="flex-1 md:flex-none bg-[#363636] hover:bg-[#474747] transition-colors text-white font-bold py-1.5 px-6 rounded-lg text-sm">
              Edit profile
            </button>
            <button className="flex-1 md:flex-none bg-[#363636] hover:bg-[#474747] transition-colors text-white font-bold py-1.5 px-6 rounded-lg text-sm">
              View archive
            </button>
          </div>
        </div>
      </header>

      {/* Highlights */}
      <div className="flex space-x-8 mb-12 overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#262626] flex items-center justify-center cursor-pointer hover:bg-[#121212] transition-colors">
            <i className="fa-solid fa-plus text-3xl text-gray-500"></i>
          </div>
          <span className="text-xs font-bold">New</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-[#262626] flex justify-center space-x-12">
        <button 
          onClick={() => setActiveTab('posts')}
          className={`flex items-center space-x-2 py-4 border-t transition-colors text-xs font-bold uppercase tracking-widest ${activeTab === 'posts' ? 'border-white text-white' : 'border-transparent text-gray-500'}`}
        >
          <i className="fa-solid fa-table-cells"></i>
          <span>Posts</span>
        </button>
        <button 
          onClick={() => setActiveTab('reels')}
          className={`flex items-center space-x-2 py-4 border-t transition-colors text-xs font-bold uppercase tracking-widest ${activeTab === 'reels' ? 'border-white text-white' : 'border-transparent text-gray-500'}`}
        >
          <i className="fa-solid fa-clapperboard"></i>
          <span>Reels</span>
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className={`flex items-center space-x-2 py-4 border-t transition-colors text-xs font-bold uppercase tracking-widest ${activeTab === 'saved' ? 'border-white text-white' : 'border-transparent text-gray-500'}`}
        >
          <i className="fa-regular fa-bookmark"></i>
          <span>Saved</span>
        </button>
        <button 
          onClick={() => setActiveTab('tagged')}
          className={`flex items-center space-x-2 py-4 border-t transition-colors text-xs font-bold uppercase tracking-widest ${activeTab === 'tagged' ? 'border-white text-white' : 'border-transparent text-gray-500'}`}
        >
          <i className="fa-solid fa-user-tag"></i>
          <span>Tagged</span>
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4 pb-20">
        {profilePosts.map((post) => (
          <div key={post.id} className="relative aspect-square group cursor-pointer overflow-hidden bg-[#121212]">
            <img 
              src={post.imageUrl} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              alt="Post" 
            />
            {post.isVideo && (
              <div className="absolute top-2 right-2 text-white drop-shadow-lg">
                <i className="fa-solid fa-play"></i>
              </div>
            )}
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-heart"></i>
                <span className="font-bold">{Math.floor(Math.random() * 1000)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-comment"></i>
                <span className="font-bold">{Math.floor(Math.random() * 50)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
