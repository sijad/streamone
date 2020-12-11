import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {formatDate} from '../../../utils';
import type {Comment} from '../../../api/rpan/types';

interface ChatMessageProps {
  comment: Comment;
}

function _ChatMessage({
  comment: {body, author, created_utc, full_date},
}: ChatMessageProps) {
  const date = formatDate(
    created_utc ? created_utc * 1000 : new Date(full_date || '').getTime(),
  );
  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Markdown style={markdownStyles}>{(body || '').trim()}</Markdown>
    </View>
  );
}

export const ChatMessage = memo(_ChatMessage);

const baseTextStyle = {
  color: '#fff',
  textShadowColor: 'rgba(0,0,0,0.1)',
  textShadowOffset: {width: 1, height: 1},
  textShadowRadius: 1,
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    fontWeight: 'bold',
    margin: 0,
    ...baseTextStyle,
  },
  date: {
    ...baseTextStyle,
    marginStart: 5,
    opacity: 0.7,
    fontSize: 12,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    margin: 0,
    padding: 0,
    ...baseTextStyle,
  },
  paragraph: {
    marginTop: 0,
    marginBottom: 0,
  },
});
