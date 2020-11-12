import React from 'react';
import {StyleSheet, View, TextInput, TouchableHighlight} from 'react-native';
import {Icon} from '../../../components/Icon';

interface ChatInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit: () => void;
}

export function ChatInput({onSubmit, value, onChangeText}: ChatInputProps) {
  return (
    <View style={styles.input}>
      <TextInput
        placeholder="Send message (250 character limit)"
        selectionColor="#ccc"
        placeholderTextColor="#ccc"
        returnKeyType="send"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        style={styles.textInput}
      />
      <TouchableHighlight
        onPress={onSubmit}
        underlayColor="transparent"
        style={styles.button}>
        <Icon
          name="PaperAirplaneSolid"
          width={24}
          height={24}
          fill="#fff"
          rotation={90}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    marginEnd: 6,
  },
});
