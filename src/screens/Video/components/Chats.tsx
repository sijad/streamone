import React, {useMemo} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
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
      renderItem={({item}) => <Text>{item.data.body}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
