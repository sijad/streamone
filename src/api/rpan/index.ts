import {useQuery} from 'react-query';
import type {VideoResponse, VideosResponse, CommentsResponse} from './types';
import {version} from '../../../package.json';

const STR_BASE_URL = 'https://strapi.reddit.com';
const API_BASE_URL = 'https://api.reddit.com';

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

export function useComments(id: string, sort: 'new' | 'old' = 'new') {
  if (id.startsWith('t3_')) {
    id = id.substr(3);
  }
  return useQuery<CommentsResponse>(['comments', id, sort], async () =>
    getJSON(`${API_BASE_URL}/comments/${id}?sort=${sort}`),
  );
}
