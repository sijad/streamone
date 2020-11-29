import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Chats} from './Chats';

interface ChatBoxProps {
  id: string;
  websocketUrl: string;
}
const supportedOrientations: Array<'portrait'> = ['portrait'];

export function ChatBox({id, websocketUrl}: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      hardwareAccelerated={true}
      transparent={true}
      visible={isOpen}
      supportedOrientations={supportedOrientations}
      onRequestClose={() => {
        setIsOpen(false);
      }}>
      <View style={styles.screen}>
        <Chats websocketUrl={websocketUrl} id={id} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
