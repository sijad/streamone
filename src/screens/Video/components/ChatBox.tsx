import React, {useState} from 'react';
import {ChatInput} from './ChatInput';
import {Chats} from './Chats';

interface ChatBoxProps {
  id: string;
  websocketUrl: string;
}

export function ChatBox({id, websocketUrl}: ChatBoxProps) {
  const [value, setValue] = useState('');
  const handleValueChange = (val: string) => {
    setValue(val);
  };
  return (
    <>
      <Chats websocketUrl={websocketUrl} id={id} />
      <ChatInput
        value={value}
        onChangeText={handleValueChange}
        onSubmit={() => {
          alert('comming soon');
        }}
      />
    </>
  );
}
