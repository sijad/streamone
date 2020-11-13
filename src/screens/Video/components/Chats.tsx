import React, {useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ChatMessage} from './ChatMessage';
import {useComments} from '../../../api';

interface ChatBoxProps {
  id: string;
}

export function Chats({id}: ChatBoxProps) {
  const {data} = useComments(id);
  const items = useMemo(() => {
    if (!data) {
      return [];
    }

    return [...data[1].data.children];
  }, [data]);
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
