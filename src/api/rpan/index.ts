import {useQuery} from 'react-query';
import type {VideoResponse, VideosResponse} from './types';

const BASE_URL = 'https://strapi.reddit.com';

export function useVideo(id: string) {
  return useQuery<VideoResponse>(`video-${id}`, async () =>
    fetch(`${BASE_URL}/videos/${id}`).then((res) => res.json()),
  );
}

export function useVideos(subreddit: string | undefined = '') {
  // TODO figure it out how broadcasts paginations works
  // and use useInfiniteQuery instead
  return useQuery<VideosResponse>(`videos-${subreddit}`, async () =>
    fetch(
      `${BASE_URL}${subreddit ? `/r/${subreddit}` : ''}/broadcasts`,
    ).then((res) => res.json()),
  );
}
