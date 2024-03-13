// components/ChatDisplay.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-store/store';

const ChatDisplay: React.FC = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};

export default ChatDisplay;
