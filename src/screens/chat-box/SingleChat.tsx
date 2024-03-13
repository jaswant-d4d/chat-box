import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import socketIo from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux-store/store';
import { getUserDetails } from '../../redux-store/actions/auth';
import Messages from '../../components/Messages';

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
        dispatch(getUserDetails());
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
                <h1>ChatBox</h1>
                <Box
                    height={800}
                    width={1200}
                    my={4}
                    gap={4}
                    sx={{ border: '2px solid grey' }}
                    position={'relative'}
                >
                    <div className="chat-header">
                        <Box p={5} bgcolor={"grey"}>
                        </Box>
                    </div>
                    <div className="chat-messages-container">
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
                            <Box width={1200} borderTop={2} bottom={0} position={'absolute'}>
                                <Box className="input-button-box" display={'flex'} justifyContent={'between'} alignItems={"center"}>
                                    <Box sx={{ width: '90%' }} >
                                        <div className="input-box">
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
                                    </Box>
                                    <Box sx={{ width: '10%' }}>
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
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default SingleChat;
