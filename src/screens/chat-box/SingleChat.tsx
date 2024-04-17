import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import socketIo from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux-store/store';
import { getUserDetails } from '../../redux-store/actions/auth';
import Messages from '../../components/Messages';
import UserList from './UserList';

interface MessageItem {
    id: string;
    user: string;
    message: string;
}

const SingleChat = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [id, setId] = useState<string | undefined>('');
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const user = useSelector((state: RootState) => state.auth.user);
    const name: string = user ? user.name : '';

    useEffect(() => {
        dispatch(getUserDetails({}));
    }, [dispatch]);

    const ENDPOINT = 'http://localhost:8080';
    const socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    useEffect(() => {
        socket.on('connect', async () => {
            setId(socket.id);
        });

        socket.emit('joined', { user: name });

        socket.on('welcome', (data: MessageItem) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        socket.on('userJoined', (data: MessageItem) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        socket.on('leave', (data: MessageItem) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        socket.on('sendMessage', (data: MessageItem) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        return () => {
            socket.emit('disconnected');
            socket.disconnect();
            socket.off();
        };

    }, []);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message) {
            return false
        }
        socket.emit('message', { message, id });
        setMessage('');
    };

    return (
        <div className='container mx-auto p-10 '>
            <div className='flex h-screen"'>
                <div className='w-1/4 overflow-y-auto'>
                    <UserList />
                </div>
                <div className=' flex-1'>
                    <div className='chat-container '>
                        <div className="chat-header">
                            <Box p={5} bgcolor={"grey"}>
                            </Box>
                        </div>
                        <div className="chat-messages-container overflow-y-auto h-full">
                            {messages.map((item, i) => (
                                <Messages
                                    key={i}
                                    user={item.id === id ? '' : item.user}
                                    message={item.message}
                                    classname={item.id === id ? 'right' : 'left'}
                                />
                            ))}
                        </div>
                        <div className="chat-footer">
                            <form onSubmit={sendMessage}>
                                <div className="input-button-box flex items-center">
                                    <div className='flex w-full'>
                                        <div className="input-box flex-1 ">
                                            <TextField
                                                id="outlined-basic"
                                                label=""
                                                fullWidth
                                                variant="outlined"
                                                name="message"
                                                value={message}
                                                onChange={inputHandler}
                                                sx={{ borderRadius: "unset" }}
                                            />
                                        </div>
                                        <div className="button-box">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                fullWidth
                                                sx={{ borderRadius: "unset", padding: "15px 0px" }}
                                            >
                                                Send
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleChat;
