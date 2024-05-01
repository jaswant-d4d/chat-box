import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux-store/store';
import Messages from '../../components/messages/Messages';
import { getGroupMessages, getMessageList, sendMessage } from '../../redux-store/actions/chat';
import MessageSkeleton from '../../components/skeletons/MessageSkeleton';

const Conversation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const selectedUser = useSelector((state: RootState) => state.auth.selectedConversation);
    const conversations = useSelector((state: RootState) => state.chat.messages);
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [conversations]);

    const fetchMessages = () => {
        setLoading(true)
        if (selectedUser?._id) {
            dispatch(getMessageList({ receiverId: selectedUser?._id }));
            if(selectedUser?.isGroup){
                dispatch(getGroupMessages({ groupId: selectedUser?._id }));
            }
        }
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        fetchMessages()
    }, [dispatch, selectedUser]);


    return (

        <div className="chat-messages-container custom-scrollbar h-full" >
            {!loading && conversations?.length > 0 ? (
                conversations?.map((item, i) => (
                    <div key={i} ref={i === conversations.length - 1 ? lastMessageRef : null}>
                        <Messages
                            key={i}
                            user={item.senderId === user?._id ? 'You' : item.receiverId}
                            message={item.message}
                            createdAt={item.createdAt}
                            classname={item.senderId === user?._id ? 'right' : 'left'}
                        />
                    </div>
                ))
            ) : loading ? (
                [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
            ) : (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};

export default Conversation;
