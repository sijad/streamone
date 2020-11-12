import React from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {useVideos} from '../../api';
import {VideoItem} from './components/VideoItem';
import {EasyRouterNavigator} from 'react-native-easy-router';

interface HomeProps {
  navigator: EasyRouterNavigator;
}

export function Home({navigator}: HomeProps) {
  const {data, isLoading, refetch} = useVideos();

  // TODO handle error

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        numColumns={2}
        onRefresh={refetch}
        keyExtractor={(item) => item.post.id}
        renderItem={({item}) => (
          <VideoItem
            onPress={() => {
              navigator.push('Video', {video: item});
            }}
            video={item}
          />
        )}
        refreshing={isLoading}
        columnWrapperStyle={styles.listContainer}
        data={data?.data || []}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContainer: {
    justifyContent: 'space-evenly',
  },
});
