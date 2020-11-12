import React, {useState} from 'react';
import {ChatInput} from './ChatInput';

interface ChatBoxProps {
  id: string;
}

export function ChatBox(_props: ChatBoxProps) {
  const [value, setValue] = useState('');
  const handleValueChange = (val: string) => {
    setValue(val);
  };
  return (
    <ChatInput
      value={value}
      onChangeText={handleValueChange}
      onSubmit={() => {
        alert('comming soon');
      }}
    />
  );
}
