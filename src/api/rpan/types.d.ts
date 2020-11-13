export type DataResponse<T> =
  | {status: 'success'; data: T}
  | {status: string; data: string};

export interface Video {
  upvotes: number;
  downvotes: number;
  unique_watchers: number;
  continuous_watchers: number;
  total_continuous_watchers: number;
  chat_disabled: boolean;
  broadcast_time: number;
  estimated_remaining_time: number;
  post: VideoPost;
  share_link: string;
  stream: VideoStream;
}

export interface VideoStream {
  stream_id: string;
  hls_url: string;
  publish_at: number;
  hls_exists_at: number;
  thumbnail: string;
  width: number;
  height: number;
  ended_at?: number | null;
  state: VideoStreamState;
  duration_limit: number;
}

export type VideoStreamState = 'ENDED' | 'IS_LIVE';

export interface VideoPost {
  id: string;
  liveCommentsWebsocket: string;
  permalink: string;
  score: number;
  title: string;
  commentCount: number;
  authorInfo: VideoPostAuthorInfo;
  // awardings: VideoPostAward[];
}

export interface VideoPostAuthorInfo {
  id: string;
  name: string;
}

export interface ApiData<T> {
  kind: string;
  data: T;
}

export interface Comment {
  id: string;
  body: string;
  stickied: boolean;
  author: string;
  author_fullname: string;
  // associated_award: Award;
}

export type VideoResponse = DataResponse<Video>;
export type VideosResponse = DataResponse<Video[]>;
export type CommentsResponse = [
  ApiData<Video>,
  ApiData<{children: ApiData<Comment>[]}>,
];
