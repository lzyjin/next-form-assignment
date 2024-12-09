import {initialTweetsType} from "@/app/(nav)/(home)/page";

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

export interface TweetListProps {
  initialTweets: initialTweetsType;
  totalCount: number;
}

interface TweetResponseUser {
  username: string;
}

export interface TweetResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  userId: number;
  response: string;
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
  createdAt: Date;
}

export interface ProfileTabsProps {
  username: string;
}