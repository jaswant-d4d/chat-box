import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import io, { Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux-store/store';
import UserList from './UserList';
import { sendGroupMessage, sendMessage } from '../../redux-store/actions/chat';
import NotSelectedConversation from './NotSelectedConversation';
import { sendNewMessage, setOnlineUsers } from '../../redux-store/reducers/chatSlice';
import NotificationSound from "../../assets/sounds/notification.mp3";
import Conversation from '../../components/conversations/Conversation';
import CustomMenu from '../../components/CustomMenu';
import { ArrowBackIosNewOutlined, SendRounded } from '@mui/icons-material';
import { setSelectedConversation } from '../../redux-store/reducers/authSlice';

const SingleChat = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [message, setMessage] = useState<string>('');
    const user = useSelector((state: RootState) => state.auth.user);
    const selectedUser = useSelector((state: RootState) => state.auth.selectedConversation);
    const { onlineUsers } = useSelector((state: RootState) => state.chat);

    useEffect(() => {
        if (!user || !selectedUser._id) return;
        const socket = io('https://chat-backend-omega-mocha.vercel.app', {
        // const socket = io('http://localhost:8080', {
            transports: ['websocket'],
            query: {
                userId: user._id,
                groupId: selectedUser._id
            },
        });

        const handleConnect = () => {
            console.log('connected!');
            socket.emit('greet', { message: 'Hello Mr.Server!' });
        };

        const handleGetOnlineUsers = (users: any) => {
            dispatch(setOnlineUsers(users));
        };

        const handleNewMessage = (newMessage: any) => {
            newMessage.shouldShake = true;
            const sound = new Audio(NotificationSound);
            sound.play();
            console.log(newMessage?.receiverId === user._id && newMessage?.senderId === selectedUser?._id)
            if (newMessage?.receiverId === user._id && newMessage?.senderId === selectedUser?._id) {
                dispatch(sendNewMessage(newMessage));
            }
        };

        // const handleGroupMessage = (message: any) => {
        //     console.log('groupMessage!', message);
        //     setMessages(prevMessages => [...prevMessages, message]);
        // };
        
       


        socket.on('connect', handleConnect);
        socket.on('getOnlineUsers', handleGetOnlineUsers);
        socket.on('newMessage', handleNewMessage);
        // socket.on('groupMessage', handleGroupMessage);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('getOnlineUsers', handleGetOnlineUsers);
            socket.off('newMessage', handleNewMessage);
            // socket.off('groupMessage', handleGroupMessage);
            socket.close();
        };
    }, []);

		

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message) {
            return false;
        }
        if (selectedUser?.isGroup) {
            const formData = { message: message, groupId: selectedUser?._id }
            dispatch(sendGroupMessage(formData));

        } else {
            const formData = { message: message, receiverId: selectedUser?._id }
            dispatch(sendMessage(formData));
        }
        setMessage('');
    };

    const naviagteToback = () => {
        const selectedConversationData = {
            name: "",
            username: "",
            _id: "",
            isGroup: false
        }
        dispatch(setSelectedConversation(selectedConversationData))
    }
    return (
        <div className=' mx-auto '>
            <div className='flex h-screen'>
                <div className={`chat-left-sidebar ${!selectedUser?._id ? "show" : ""}`}>
                    <UserList onlineUsers={onlineUsers} />
                </div>
                <div className={` chat-container ${selectedUser?._id ? "show" : ""}`}>
                    {selectedUser?._id ? (
                        <section className='chat-section'>
                            <div className="chat-header flex  bg-slate-500 justify-between p-6">
                                <div className='text-white flex'>
                                    {selectedUser?._id && (
                                        <ArrowBackIosNewOutlined className='mr-8' onClick={naviagteToback} />
                                    )}
                                    To: <span className='font-bold'>{selectedUser?.name}</span>
                                </div>
                                <div className='text-white'>
                                    <CustomMenu />
                                </div>
                            </div>
                            <Conversation />
                            <div className="chat-footer">
                                <form onSubmit={sendMessageHandler}>
                                    <div className="input-button-box flex items-center">
                                        <div className='flex w-full'>
                                            <div className="input-box flex-1">
                                                <TextField
                                                    className='bg-white'
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
                                                    sx={{ borderRadius: "unset", padding: "15px 30px" }}
                                                >
                                                    Send
                                                    <SendRounded className='ms-2' />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    ) : (<NotSelectedConversation />)}
                </div>
            </div>
        </div>
    );
};

export default SingleChat;
