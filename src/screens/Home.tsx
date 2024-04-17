import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux-store/reducers/chatSlice';
import ChatDisplay from './ChatDisplay';
import ChatForm from './ChatForm';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const dispatch = useDispatch();

    // const baseurl: string = process.env.REACT_APP_API_BASE_URL || "ws://localhost:8080";

    // useEffect(() => {
    //     const ws = new WebSocket(baseurl);

    //     ws.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         dispatch(addMessage(data.message));
    //     };

    //     return () => {
    //         ws.close();
    //     };
    // }, [dispatch]);


    return (
        <div className="bg-home">
        </div>
    );
}

export default Home;
