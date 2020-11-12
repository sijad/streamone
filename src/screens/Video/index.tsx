import React, {useState, useRef} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import RNVideo from 'react-native-video';
import type {Video as VideoType} from '../../api/rpan/types';
import {EasyRouterNavigator} from 'react-native-easy-router';

interface VideoProps {
  video: VideoType;
  navigator: EasyRouterNavigator;
}

export function Video({
  video: {
    broadcast_time,
    stream: {hls_url, thumbnail},
  },
}: VideoProps) {
  const [isLoading, setLoading] = useState(true);
  const playerRef = useRef<RNVideo | null>(null);

  return (
    <View style={styles.screen}>
      <RNVideo
        poster={thumbnail}
        seek={broadcast_time}
        onLoad={() => {
          setLoading(false);
        }}
        ref={playerRef}
        posterResizeMode="cover"
        resizeMode="cover"
        style={styles.video}
        source={{uri: hls_url}}
      />
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});
