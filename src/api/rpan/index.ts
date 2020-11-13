import {useQuery} from 'react-query';
import type {VideoResponse, VideosResponse} from './types';
import {version} from '../../../package.json';

const STR_BASE_URL = 'https://strapi.reddit.com';

async function getJSON(url: string) {
  return fetch(url, {
    headers: {
      'user-agent': `streamone/${version}`,
    },
    keepalive: true,
  }).then((res) => res.json());
}

export function useVideo(id: string) {
  return useQuery<VideoResponse>(['video', id], async () =>
    getJSON(`${STR_BASE_URL}/videos/${id}`),
  );
}

export function useVideos(subreddit: string | undefined = undefined) {
  // TODO figure it out how broadcasts paginations works
  // and use useInfiniteQuery instead
  return useQuery<VideosResponse>(['videos', subreddit], async () =>
    getJSON(`${STR_BASE_URL}${subreddit ? `/r/${subreddit}` : ''}/broadcasts`),
  );
}
