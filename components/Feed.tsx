
import React, { useState, useRef } from 'react';
import { MOCK_STORIES, MOCK_POSTS } from '../data';
import { Post, Story, Comment } from '../types';

interface FeedProps {
  onStoryClick: (story: Story) => void;
  viewedStoryIds: Set<string>;
}

const Feed: React.FC<FeedProps> = ({ onStoryClick, viewedStoryIds }) => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [caption, setCaption] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string; type: 'image' | 'video' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      const preview = URL.createObjectURL(file);
      setSelectedFile({ file, preview, type });
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim() && !selectedFile) return;

    const newPost: Post = {
      id: `p${Date.now()}`,
      username: 'vasuthon_',
      avatar: 'https://picsum.photos/150/150?u=me',
      imageUrl: selectedFile?.type === 'image' ? selectedFile.preview : undefined,
      videoUrl: selectedFile?.type === 'video' ? selectedFile.preview : undefined,
      caption: caption,
      likes: 0,
      timeAgo: 'เมื่อครู่',
      isLiked: false,
      comments: []
    };
    setPosts([newPost, ...posts]);
    setCaption('');
    setSelectedFile(null);
  };

  const handleLike = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const currentlyLiked = post.isLiked;
        return {
          ...post,
          isLiked: !currentlyLiked,
          likes: currentlyLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      username: 'vasuthon_',
      text: commentText,
      timeAgo: 'เมื่อครู่'
    };

    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCommentInputChange = (postId: string, value: string) => {
    setCommentInputs(prev => ({ ...prev, [postId]: value }));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center w-full min-h-screen px-4">
      {/* Content Column */}
      <div className="w-full max-w-[470px] pt-8 lg:mr-16">
        
        {/* Story Bar */}
        <div className="flex space-x-4 overflow-x-auto hide-scrollbar mb-8 pb-4 border-b border-[#1a1a1a]">
          {MOCK_STORIES.map((story) => {
            const isViewed = viewedStoryIds.has(story.id);
            return (
              <div 
                key={story.id} 
                className="flex flex-col items-center space-y-1.5 min-w-[72px] cursor-pointer group"
                onClick={() => onStoryClick(story)}
              >
                <div className={`
                  p-[2px] rounded-full relative transition-all duration-300 
                  ${isViewed ? 'bg-gray-800' : 'story-ring'}
                  group-hover:scale-105 active:scale-95
                `}>
                  <div className="bg-black p-[2px] rounded-full">
                    <img 
                      src={story.avatar} 
                      className={`w-14 h-14 rounded-full border-2 border-black transition-opacity ${isViewed ? 'opacity-60' : 'opacity-100'}`} 
                      alt={story.username} 
                    />
                  </div>
                  {story.isLive && !isViewed && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#ff0050] text-[10px] font-bold px-1.5 py-0.5 rounded-sm border-2 border-black shadow-lg">
                      ถ่ายทอดสด
                    </span>
                  )}
                </div>
                <span className={`text-[11px] truncate w-full text-center transition-colors ${isViewed ? 'text-gray-600' : 'text-gray-300'}`}>
                  {story.username}
                </span>
              </div>
            );
          })}
        </div>

        {/* Create Post Form */}
        <div className="mb-10 p-4 border border-[#262626] rounded-xl bg-[#0a0a0a] shadow-sm">
          <form onSubmit={handleCreatePost} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <img src="https://picsum.photos/150/150?u=me" className="w-10 h-10 rounded-full border border-gray-800" alt="me" />
              <textarea 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="คุณกำลังคิดอะไรอยู่?..." 
                className="flex-1 bg-transparent border-none p-0 text-white text-[15px] focus:outline-none placeholder:text-gray-500 h-20 resize-none pt-2"
              ></textarea>
            </div>

            {/* Media Preview */}
            {selectedFile && (
              <div className="relative rounded-lg overflow-hidden border border-[#262626] mt-2">
                {selectedFile.type === 'video' ? (
                  <video src={selectedFile.preview} className="w-full h-auto max-h-60 object-cover" muted autoPlay loop />
                ) : (
                  <img src={selectedFile.preview} className="w-full h-auto max-h-60 object-cover" alt="Preview" />
                )}
                <button 
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="absolute top-2 right-2 bg-black/60 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-[#1a1a1a]">
              <div className="flex space-x-4 text-gray-400">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*,video/*" 
                  className="hidden" 
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:text-blue-500 transition-colors flex items-center gap-1"
                >
                  <i className="fa-solid fa-image text-lg"></i>
                  <span className="text-xs font-medium">รูป/วิดีโอ</span>
                </button>
                <button type="button" className="hover:text-blue-500 transition-colors"><i className="fa-solid fa-location-dot text-lg"></i></button>
                <button type="button" className="hover:text-blue-500 transition-colors"><i className="fa-regular fa-face-smile text-lg"></i></button>
              </div>
              <button 
                type="submit"
                disabled={!caption.trim() && !selectedFile}
                className="bg-white text-black disabled:bg-[#1a1a1a] disabled:text-gray-600 px-5 py-1.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
              >
                โพสต์
              </button>
            </div>
          </form>
        </div>

        {/* Post List */}
        <div className="space-y-12 pb-20">
          {posts.map((post) => (
            <div key={post.id} className="pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border-b border-[#1a1a1a] mb-4 last:border-0">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center text-sm font-bold group cursor-pointer">
                  <div className="p-[1px] rounded-full story-ring mr-3">
                     <div className="p-[1px] bg-black rounded-full">
                        <img src={post.avatar} className="w-8 h-8 rounded-full border border-black" alt={post.username} />
                     </div>
                  </div>
                  <span className="hover:text-gray-400 transition-colors">{post.username}</span>
                  <span className="text-gray-500 ml-2 font-normal">• {post.timeAgo}</span>
                </div>
                <button className="text-white hover:text-gray-400 transition-colors p-2">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-[#1a1a1a] bg-[#050505] shadow-xl group relative">
                {post.videoUrl ? (
                  <div className="relative group/video">
                    <video 
                      src={post.videoUrl} 
                      className="w-full aspect-square object-cover" 
                      loop 
                      muted 
                      playsInline
                      onMouseOver={(e) => e.currentTarget.play()}
                      onMouseOut={(e) => e.currentTarget.pause()}
                      onClick={(e) => e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause()}
                    />
                    <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full pointer-events-none group-hover/video:opacity-0 transition-opacity">
                      <i className="fa-solid fa-clapperboard text-[10px]"></i>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={post.imageUrl} 
                    className="w-full aspect-square object-cover group-hover:scale-[1.01] transition-transform duration-700" 
                    alt="Post content" 
                    loading="lazy"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="py-4 flex justify-between items-center px-1">
                <div className="flex space-x-5 text-2xl">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`transition-all active:scale-150 duration-200 ${post.isLiked ? 'text-red-500' : 'hover:text-gray-400'}`}
                  >
                    <i className={`${post.isLiked ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                  </button>
                  <button className="hover:text-gray-400 transition-colors"><i className="fa-regular fa-comment"></i></button>
                  <button className="hover:text-gray-400 transition-colors"><i className="fa-regular fa-paper-plane"></i></button>
                </div>
                <button className="text-2xl hover:text-gray-400 transition-colors"><i className="fa-regular fa-bookmark"></i></button>
              </div>

              {/* Likes & Caption */}
              <div className="px-1 mb-3">
                <p className="text-sm font-bold mb-1.5">ถูกใจ {post.likes.toLocaleString()} คน</p>
                <p className="text-[14px] leading-relaxed">
                  <span className="font-bold mr-2 hover:underline cursor-pointer">{post.username}</span>
                  {post.caption}
                </p>
              </div>

              {/* Comments Section */}
              <div className="px-1 space-y-2 mb-4">
                {post.comments && post.comments.length > 0 && (
                  <div className="space-y-1.5">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="text-sm">
                        <span className="font-bold mr-2 hover:underline cursor-pointer">{comment.username}</span>
                        <span className="text-gray-200">{comment.text}</span>
                      </div>
                    ))}
                  </div>
                )}
                <button className="text-sm text-gray-500 block hover:text-white transition-colors">ดูความคิดเห็นทั้งหมด</button>
              </div>

              {/* Add Comment Input */}
              <div className="px-1 border-t border-[#1a1a1a] pt-3">
                <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex items-center gap-3">
                  <input 
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                    placeholder="เพิ่มความคิดเห็น..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-gray-500"
                  />
                  {commentInputs[post.id]?.trim() && (
                    <button 
                      type="submit"
                      className="text-blue-500 text-sm font-bold hover:text-white transition-colors"
                    >
                      โพสต์
                    </button>
                  )}
                  <button type="button" className="text-gray-500 hover:text-white transition-colors"><i className="fa-regular fa-face-smile text-sm"></i></button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions Aside */}
      <aside className="w-[320px] pt-12 hidden lg:block sticky top-0 h-fit">
        <div className="flex items-center justify-between mb-8 p-1">
          <div className="flex items-center space-x-4">
            <img src="https://picsum.photos/150/150?u=me" className="w-12 h-12 rounded-full border border-gray-800" alt="Current user" />
            <div>
              <div className="text-sm font-bold">vasuthon_</div>
              <div className="text-sm text-gray-500">วสุธร นุตสติ</div>
            </div>
          </div>
          <button className="text-blue-500 text-xs font-bold hover:text-white transition-colors">สลับบัญชี</button>
        </div>

        <div className="flex justify-between items-center mb-5 px-1">
          <span className="text-gray-400 font-bold text-sm">แนะนำสำหรับคุณ</span>
          <button className="text-white text-xs font-bold hover:text-gray-400 transition-colors">ดูทั้งหมด</button>
        </div>

        <div className="space-y-5 px-1">
          {[
            { name: 'มาร์ติน', sub: 'ติดตามโดย gnuhpmannnnn' },
            { name: 'ออกัส อัญชิสา', sub: 'ติดตามโดย gnuhpmannnnn' },
            { name: 'เนโกะ_🐱🌻', sub: 'ติดตามโดย gnuhpmannnnn' },
            { name: 'เหมียว🐱🌻', sub: 'ติดตามโดย gnuhpmannnnn' },
            { name: 'nouvelle_02', sub: 'ติดตามโดย nop.noparutt' }
          ].map((user) => (
            <div key={user.name} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <img src={`https://picsum.photos/150/150?u=${user.name}`} className="w-9 h-9 rounded-full border border-[#1a1a1a]" alt={user.name} />
                <div className="text-[12px]">
                  <div className="font-bold group-hover:underline cursor-pointer">{user.name}</div>
                  <div className="text-gray-500 truncate w-32">{user.sub}</div>
                </div>
              </div>
              <button className="text-blue-500 text-xs font-bold hover:text-white transition-colors px-2 py-1">ติดตาม</button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-[11px] text-[#737373] space-y-4 px-1 opacity-60">
          <p className="cursor-pointer hover:underline">เกี่ยวกับ • ความช่วยเหลือ • สื่อ • API • งาน • ความเป็นส่วนตัว • ข้อกำหนด • สถานที่ • ภาษา • Meta Verified</p>
          <p className="font-bold tracking-widest uppercase">© 2026 TAKL TAKL FROM META</p>
        </div>
      </aside>
    </div>
  );
};

export default Feed;
