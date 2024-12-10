export interface Routes {
  [key: string]: boolean;
}

export interface SuccessMessageProps {
  text: string;
  link?: {
    url: string;
    name: string;
  };
}

export interface ButtonProps {
  text: string;
}

export interface InputProps {
  name: string;
  type: string;
  required: boolean;
  placeholder: string;
  errors?: string[];
}

interface Tweet {
  id: number;
  tweet: string;
  created_at: Date;
  updated_at: Date;
  userId: number;
  likes: {
    created_at: Date;
  }[];
  responses: {
    id: number;
  }[];
  user: {
    username: string;
  };
}

export interface TweetListProps {
  initialTweets: Tweet[];
  totalCount: number;
}

interface TweetResponseUser {
  id: number;
  username: string;
}

export interface TweetResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  response: string;
  userId: number;
  tweetId: number;
  user: TweetResponseUser;
}

export interface TweetResponseListProps {
  tweetId: number;
  userId: number;
  username: string;
  responses: TweetResponse[];
}

export interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export interface SessionContent {
  id?: number;
}

export interface ProfileInfoProps {
  username: string;
  bio: string;
  createdAt: Date;
}

export interface ProfileTabsProps {
  username: string;
}
export interface EditUserInfoProps {
  username: string;
  email: string;
  bio: string | null;
}