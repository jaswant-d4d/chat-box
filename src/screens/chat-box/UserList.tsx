import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux-store/store';
import { getUserList } from '../../redux-store/actions/auth';
import { setSelectedConversation } from '../../redux-store/reducers/authSlice';
import avatar from "../../assets/images/avatars/2.jpg";
import { selectedConversationType } from '../../redux-store/types/auth';

interface Params {
    onlineUsers: any[]
}

const UserList: React.FC<Params> = ({ onlineUsers }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userList = useSelector((state: RootState) => state.chat.userList)
    const user = useSelector((state: RootState) => state.auth.user)
    const selectedUser = useSelector((state: RootState) => state.auth.selectedConversation)

    useEffect(() => {
        dispatch(getUserList({}))
    }, [])

    const UserSelectHandler = (user: selectedConversationType) => {
        dispatch(setSelectedConversation(user))
    }

    return (
        <>
            <section className='user-list-section'>
                <div className="px-4 pt-4 border-b-2 bg-slate-400">
                    <div className="flex items-center">
                        <div className="chat-user-img mr-2">
                            <img src={avatar} alt="avatar" />
                        </div>
                        <h2 className=" text-2xl text-slate-800 ">
                            {user?.name}</h2>
                    </div>
                    <div className="search-box chat-search-box">
                        <div className="input-group mb-3 rounded-3">
                            <span className="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                                <i className="ri-search-line search-icon font-size-18"></i>
                            </span>
                            <input type="text" className=" bg-gray-100 rounded p-3" placeholder="Search messages or users"
                                aria-label="Search messages or users" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                </div>

                <div className="user-list-box custom-scrollbar bg-slate-200">
                    <ul className="list-unstyled chat-list chat-user-list px-4 pt-4">
                        {userList?.map((user, index) => (
                            <li className={`border-b-2 border-b-white  px-2 hover:bg-slate-400  ${user?._id === selectedUser?._id ? "bg-slate-400" : ""}`} onClick={() => UserSelectHandler(user)} key={index}>
                                <a >
                                    <div className="flex py-4">
                                        <div className={`chat-user-img align-self-center me-3 ms-0 ${onlineUsers?.includes(user?._id) ? "online" : ""} `}>
                                            <img src={require("../../assets/images/avatars/2.jpg")}
                                                className="bg-gray-50" alt="" />
                                            <div className="user-status"></div>
                                        </div>

                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="text-truncate font-size-15 mb-1">{user.name}</h5>
                                            <p className="chat-user-message text-truncate mb-0">Hey! there
                                                I'm available</p>
                                        </div>
                                        <div className="font-size-11">05 min</div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default UserList;
