import React, {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ChatMessage} from './ChatMessage';
import {useComments} from '../../../api';
import type {
  CommentWebSocketPayload,
  CommentsResponse,
} from '../../../api/rpan/types';
import {useQueryCache} from 'react-query';

interface ChatsProps {
  id: string;
  websocketUrl: string;
}

export function Chats({id, websocketUrl}: ChatsProps) {
  if (id.startsWith('t3_')) {
    id = id.substr(3);
  }

  const queryCache = useQueryCache();
  const {data} = useComments(id);

  const items = data ? data[1].data.children : [];

  useEffect(() => {
    const ws = new WebSocket(websocketUrl);

    ws.onmessage = (e) => {
      const message: CommentWebSocketPayload = JSON.parse(e.data);
      if (message.type === 'new_comment') {
        queryCache.setQueryData<CommentsResponse | undefined>(
          ['comments', id, 'new'],
          (old) => {
            if (!old) {
              return old;
            }
            const newData = {...old[1]};
            newData.data.children = [
              {kind: 't3', data: message.payload},
              ...newData.data.children,
            ];
            console.log(message.payload.body);
            return [old[0], newData] as CommentsResponse;
          },
        );
      }
    };

    return () => ws.close();
  }, [websocketUrl, id, queryCache]);

  return (
    <FlatList
      data={items}
      style={styles.list}
      inverted
      keyExtractor={(item) => item.data.id}
      renderItem={({item}) => <ChatMessage comment={item.data} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
