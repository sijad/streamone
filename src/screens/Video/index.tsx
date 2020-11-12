import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
// import {useVideos} from '../../api';
import type {Video as VideoType} from '../../api/rpan/types';
import {EasyRouterNavigator} from 'react-native-easy-router';

interface VideoProps {
  video: VideoType;
  navigator: EasyRouterNavigator;
}

export function Video({video}: VideoProps) {
  // const {data, isLoading, refetch} = useVideos();

  return (
    <SafeAreaView style={styles.screen}>
      <Text>{video.post.id}</Text>
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
