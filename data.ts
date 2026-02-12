
import { Story, Post, Conversation, Reel } from './types';

export const MOCK_STORIES: Story[] = [
  { id: '1', username: 'thecologneguy', avatar: 'https://picsum.photos/150/150?u=1', contentUrl: 'https://picsum.photos/1080/1920?u=10', isLive: true },
  { id: '2', username: 'alex_travels', avatar: 'https://picsum.photos/150/150?u=2', contentUrl: 'https://picsum.photos/1080/1920?u=11' },
  { id: '3', username: 'jane_dev', avatar: 'https://picsum.photos/150/150?u=3', contentUrl: 'https://picsum.photos/1080/1920?u=12' },
  { id: '4', username: 'foodie_gram', avatar: 'https://picsum.photos/150/150?u=4', contentUrl: 'https://picsum.photos/1080/1920?u=13' },
  { id: '5', username: 'coding_daily', avatar: 'https://picsum.photos/150/150?u=5', contentUrl: 'https://picsum.photos/1080/1920?u=14' },
  { id: '6', username: 'music_vibes', avatar: 'https://picsum.photos/150/150?u=6', contentUrl: 'https://picsum.photos/1080/1920?u=15' },
];

export const MOCK_REELS: Reel[] = [
  {
    id: 'r1',
    username: 'chalermchaiph',
    avatar: 'https://i.pravatar.cc/150?u=gym1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-hard-in-the-gym-23425-large.mp4',
    caption: 'เส้นทางสู่ 180โล Bench press Ep.15 PR ใหม่โว้ยยยขออีก1เด็ด ... more',
    likes: 665,
    commentsCount: 38,
    musicName: 'Original audio',
    musicAuthor: 'chalermchaiph',
    isLiked: false,
    isFollowed: false
  },
  {
    id: 'r2',
    username: 'fitness_king',
    avatar: 'https://i.pravatar.cc/150?u=gym2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-man-exercising-in-the-gym-23423-large.mp4',
    caption: 'Leg day motivation! Don\'t skip it. 🦵🔥 #fitness #motivation',
    likes: 1205,
    commentsCount: 56,
    musicName: 'No Pain No Gain',
    musicAuthor: 'Workout Music',
    isLiked: true,
    isFollowed: true
  },
  {
    id: 'r3',
    username: 'aesthetic_lifter',
    avatar: 'https://i.pravatar.cc/150?u=gym3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-strong-man-training-in-the-gym-23421-large.mp4',
    caption: 'Focus on the goal. Stay consistent. 🏆',
    likes: 842,
    commentsCount: 22,
    musicName: 'Hardstyle Mix',
    musicAuthor: 'DJ Gym',
    isLiked: false,
    isFollowed: false
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    username: 'mivofficial.co',
    avatar: 'https://picsum.photos/150/150?u=miv',
    imageUrl: 'https://picsum.photos/800/800?u=p1',
    caption: 'วันนี้อากาศดีมากเลย ออกมาถ่ายรูปเล่นสักหน่อย! 📸 #กรุงเทพ #ถ่ายรูป',
    likes: 5142,
    timeAgo: '3 ชม.',
    isLiked: false,
    comments: [
      { id: 'c1', username: 'มาร์ติน', text: 'รูปสวยมากครับ!', timeAgo: '2 ชม.' }
    ]
  },
  {
    id: 'p2',
    username: 'tech_crunch',
    avatar: 'https://picsum.photos/150/150?u=tc',
    imageUrl: 'https://picsum.photos/800/800?u=p2',
    caption: 'อนาคตของ AI กำลังสดใสกว่าที่เคย รอติดตามอัปเดตโมเดลใหม่ๆ เร็วๆ นี้!',
    likes: 12500,
    timeAgo: '12 ชม.',
    isLiked: true,
    comments: []
  },
  {
    id: 'p3',
    username: 'nature_wild',
    avatar: 'https://picsum.photos/150/150?u=wild',
    imageUrl: 'https://picsum.photos/800/800?u=p3',
    caption: 'ความลับของขุนเขาที่รอการค้นพบ 🏔️ #เที่ยวเขา #ธรรมชาติ',
    likes: 890,
    timeAgo: '1 วัน',
    isLiked: false,
    comments: []
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    username: 'มาร์ติน',
    avatar: 'https://picsum.photos/150/150?u=Mxrtin',
    lastMessage: 'เฮ้! พรุ่งนี้เรายังเจอกันอยู่ไหม?',
    messages: [
      { id: 'm1', text: 'เฮ้!', sender: 'them', timestamp: '10:00 AM' },
      { id: 'm2', text: 'พรุ่งนี้เรายังเจอกันอยู่ไหม?', sender: 'them', timestamp: '10:01 AM' }
    ]
  },
  {
    id: 'c2',
    username: 'ออกัส อัญชิสา',
    avatar: 'https://picsum.photos/150/150?u=August',
    lastMessage: 'อันนั้นดูเจ๋งมากเลย!',
    messages: [
      { id: 'm3', text: 'ลองดูนี่สิ!', sender: 'me', timestamp: '11:00 AM' },
      { id: 'm4', text: 'อันนั้นดูเจ๋งมากเลย!', sender: 'them', timestamp: '11:05 AM' }
    ]
  },
  {
    id: 'c3',
    username: 'เนโกะ_🐱🌻',
    avatar: 'https://picsum.photos/150/150?u=Neko',
    lastMessage: 'ส่งรูปภาพแล้ว',
    messages: []
  }
];