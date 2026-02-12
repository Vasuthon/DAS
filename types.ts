
export type PageType = 'feed' | 'messages' | 'explore' | 'notifications' | 'profile' | 'reels';

export interface Story {
  id: string;
  username: string;
  avatar: string;
  contentUrl: string;
  isLive?: boolean;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timeAgo: string;
}

export interface Post {
  id: string;
  username: string;
  avatar: string;
  imageUrl?: string;
  videoUrl?: string;
  caption: string;
  likes: number;
  timeAgo: string;
  isLiked?: boolean;
  comments?: Comment[];
}

export interface Reel {
  id: string;
  username: string;
  avatar: string;
  videoUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  musicName: string;
  musicAuthor: string;
  isLiked: boolean;
  isFollowed: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

export interface Conversation {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  messages: Message[];
}