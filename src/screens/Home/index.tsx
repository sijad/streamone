import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import {useVideos} from '../../api';
import {VideoItem} from './components/VideoItem';
import type {Video} from '../../api/rpan/types';

export function Home() {
  const {data, isLoading, refetch} = useVideos();

  // TODO handle error

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        numColumns={2}
        onRefresh={refetch}
        renderItem={renderItem}
        refreshing={isLoading}
        columnWrapperStyle={styles.listContainer}
        data={data?.data || []}
      />
    </SafeAreaView>
  );
}

function renderItem({item}: ListRenderItemInfo<Video>) {
  return <VideoItem video={item} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContainer: {
    justifyContent: 'space-evenly',
  },
});
