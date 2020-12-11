import React, {useState, useRef} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {EasyRouterNavigator} from 'react-native-easy-router';
import LinearGradient from 'react-native-linear-gradient';
import RNVideo from 'react-native-video';
import {ChatBox} from './components/ChatBox';

import type {Video as VideoType} from '../../api/rpan/types';

interface VideoProps {
  video: VideoType;
  navigator: EasyRouterNavigator;
}

export function Video({
  video: {
    post: {id, liveCommentsWebsocket},
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
      ) : (
        <SafeAreaView style={styles.uiWrapper}>
          <LinearGradient style={styles.footer} colors={bgColors}>
            <ChatBox id={id} websocketUrl={liveCommentsWebsocket} />
          </LinearGradient>
        </SafeAreaView>
      )}
    </View>
  );
}

const bgColors = ['transparent', 'rgba(0,0,0,0.6)'];
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  video: {
    flex: 1,
    height,
    ...StyleSheet.absoluteFillObject,
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  uiWrapper: {
    flex: 1,
  },
});
