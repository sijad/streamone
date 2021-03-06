import React from 'react';
import {SafeAreaView, StyleSheet, FlatList, StatusBar} from 'react-native';
import {useVideos} from '../../api';
import {VideoItem} from './components/VideoItem';
import {EasyRouterNavigator} from 'react-native-easy-router';

interface HomeProps {
  navigator: EasyRouterNavigator;
}

export function Home({navigator}: HomeProps) {
  const {data, isLoading, refetch, isFetching} = useVideos();

  // TODO handle error

  const dataRes = data?.data;
  const items = dataRes && Array.isArray(dataRes) ? dataRes : [];

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
        refreshing={isLoading || isFetching}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        data={items}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-evenly',
  },
  listContainer: {
    paddingTop: StatusBar.currentHeight,
  },
});
