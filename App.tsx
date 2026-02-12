
import React, { useState } from 'react';
import { PageType, Story } from './types';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Messenger from './components/Messenger';
import StoryModal from './components/StoryModal';
import Profile from './components/Profile';
import Reels from './components/Reels';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('feed');
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [viewedStoryIds, setViewedStoryIds] = useState<Set<string>>(new Set());

  const handleStoryClick = (story: Story) => {
    setActiveStory(story);
    setViewedStoryIds((prev) => new Set(prev).add(story.id));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'feed':
        return <Feed onStoryClick={handleStoryClick} viewedStoryIds={viewedStoryIds} />;
      case 'messages':
        return <Messenger />;
      case 'profile':
        return <Profile />;
      case 'reels':
        return <Reels />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 pt-20">
            <div className="w-20 h-20 bg-[#121212] rounded-full flex items-center justify-center mb-4">
              <i className="fa-solid fa-screwdriver-wrench text-3xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-white">กำลังพัฒนาฟีเจอร์นี้</h1>
            <p className="mt-2 text-center max-w-xs">เรากำลังพยายามอย่างเต็มที่เพื่อนำฟีเจอร์นี้มาสู่ Takl Takl โปรดติดตามชม!</p>
            <button 
              onClick={() => setCurrentPage('feed')}
              className="mt-6 text-blue-500 font-bold hover:text-white transition-colors"
            >
              กลับหน้าหลัก
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content Area */}
      <main className={`flex-1 ${currentPage === 'reels' ? 'ml-16 md:ml-64 h-screen' : 'ml-16 md:ml-64 transition-all duration-300'}`}>
        <div className={`mx-auto h-full ${currentPage === 'reels' ? 'max-w-none' : 'max-w-6xl'}`}>
          {renderPage()}
        </div>
      </main>

      {/* Full-screen Story Overlay */}
      {activeStory && (
        <StoryModal 
          story={activeStory} 
          onClose={() => setActiveStory(null)} 
        />
      )}
    </div>
  );
};

export default App;