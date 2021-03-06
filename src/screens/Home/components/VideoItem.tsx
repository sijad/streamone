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
import {Icon} from '../../../components/Icon';

interface VideoItemProps {
  onPress: () => void;
  video: Video;
}

export function VideoItem({
  video: {
    continuous_watchers,
    post: {title},
    stream: {thumbnail},
  },
  onPress,
}: VideoItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground style={styles.image} source={{uri: thumbnail}}>
        <View style={styles.header}>
          <View style={styles.views}>
            <Icon name="Eye" width={14} height={14} stroke="#fff" />
            <Text style={styles.viewsText}>
              {humanNumber(continuous_watchers)}
            </Text>
          </View>
        </View>
        <LinearGradient colors={footerColors} style={styles.footer}>
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const footerColors = ['transparent', 'rgba(0,0,0,0.6)'];
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  viewsText: {
    marginLeft: 4,
    color: '#fff',
    fontSize: 10,
  },
});
