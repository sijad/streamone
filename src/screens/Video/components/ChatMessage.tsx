import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Markdown from 'react-native-markdown-display';
import type {Comment} from '../../../api/rpan/types';

interface ChatMessageProps {
  comment: Comment;
}

function _ChatMessage({comment: {body}}: ChatMessageProps) {
  return <Markdown style={markdownStyles}>{body || ''}</Markdown>;
}

export const ChatMessage = memo(_ChatMessage);

const markdownStyles = StyleSheet.create({
  body: {
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
});
