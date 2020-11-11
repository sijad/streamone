import ky from 'ky/umd';
import {useQuery} from 'react-query';
import type {VideoResponse, VideosResponse} from './types';

const BASE_URL = 'https://strapi.reddit.com';

export function useVideo(id: string) {
  return useQuery(`video-${id}`, async () =>
    ky.get(`${BASE_URL}/videos/${id}`).json<VideoResponse>(),
  );
}

export function useVideos(subreddit: string | undefined = '') {
  return useQuery(`videos-${subreddit}`, async () =>
    ky
      .get(`${BASE_URL}${subreddit ? `/r/${subreddit}` : ''}/broadcasts`)
      .json<VideosResponse>(),
  );
}
