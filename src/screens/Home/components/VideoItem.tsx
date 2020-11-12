import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import type {Video} from '../../../api/rpan/types';
import {humanNumber} from '../../../utils';

interface VideoItemProps {
  video: Video;
}

export function VideoItem({
  video: {
    unique_watchers: uniqueWatchers,
    post: {title},
    stream: {thumbnail},
  },
}: VideoItemProps) {
  return (
    <TouchableOpacity onPress={() => {}}>
      <ImageBackground style={styles.image} source={{uri: thumbnail}}>
        <View style={styles.header}>
          <View style={styles.views}>
            <Text style={styles.viewsText}>{humanNumber(uniqueWatchers)}</Text>
          </View>
        </View>
        <LinearGradient colors={footerColors} style={styles.footer}>
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const footerColors = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)'];
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 12,
  },
  text: {
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  image: {
    width: Math.min(250, width / 2 - 20),
    height: 250,
    overflow: 'hidden',
    borderRadius: 12,
    marginBottom: 18,
  },
  footer: {
    minHeight: 60,
    justifyContent: 'flex-end',
    padding: 12,
  },
  views: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  viewsText: {
    color: '#fff',
    fontSize: 10,
  },
});
