import React, {useEffect, useState, useRef} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {ChatMessage} from './ChatMessage';
import {getComments} from '../../../api';
import type {CommentWebSocketPayload, Comment} from '../../../api/rpan/types';

const UNREAD_COMMENTS_THRESHOLD = 100;

interface ChatsProps {
  id: string;
  websocketUrl: string;
}

export function Chats({id, websocketUrl}: ChatsProps) {
  const listRef = useRef<FlatList<Comment> | null>(null);
  const listScrollRef = useRef(0);

  const [comments, setComments] = useState<Comment[]>([]);
  const [unreadComments, setUnreadComments] = useState(0);

  useEffect(() => {
    const _id = id.startsWith('t3_') ? id.substr(3) : id;
    getComments(_id)
      .then((data) => {
        setComments(data[1].data.children.map((d) => d.data));
      })
      .catch(() => {
        // TODO handle error
      });
  }, [id]);

  useEffect(() => {
    const ws = new WebSocket(websocketUrl);

    ws.onmessage = (e) => {
      const {payload, type}: CommentWebSocketPayload = JSON.parse(e.data);
      if (type === 'new_comment') {
        setComments((old) => [payload, ...old]);
        if (listScrollRef.current >= UNREAD_COMMENTS_THRESHOLD) {
          setUnreadComments((old) => ++old);
        }
      }
    };

    return () => ws.close();
  }, [websocketUrl]);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={comments}
        ref={listRef}
        extraData={unreadComments}
        onScroll={(e) => {
          const _y = e.nativeEvent.contentOffset.y;
          listScrollRef.current = _y;
          if (unreadComments > 0 && _y <= UNREAD_COMMENTS_THRESHOLD) {
            setUnreadComments(0);
          }
        }}
        style={styles.list}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) =>
          index + 1 > unreadComments ? <ChatMessage comment={item} /> : null
        }
      />
      {unreadComments > 0 ? (
        <View style={styles.unreadButton}>
          <TouchableOpacity
            onPress={() => {
              listRef.current?.scrollToOffset({animated: true, offset: 0});
            }}>
            <Text
              style={
                styles.unreadButtonText
              }>{`${unreadComments} new comments`}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  list: {
    flex: 1,
  },
  unreadButton: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 20,
  },
  unreadButtonText: {
    borderRadius: 10,
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 10,
    color: '#fff',
  },
});
