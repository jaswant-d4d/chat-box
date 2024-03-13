import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux-store/reducers/chatSlice';

const ChatForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addMessage(message));
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatForm;
