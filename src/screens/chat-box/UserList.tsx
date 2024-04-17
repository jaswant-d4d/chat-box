import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { getUserList } from '../../redux-store/actions/auth';


const UserList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(getUserList({}))
    },[])
    return (
        <>
            <div className="bg-slate-400 ">
                <div className="px-4 pt-4">
                    <h2 className="mb-4 text-2xl ">Chats</h2>
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

                <div className="user-list-box">
                    <ul className="list-unstyled chat-list chat-user-list px-4 pt-4">
                        <li className='border-t-2 '>
                            <a href="#">
                                <div className="flex py-4">
                                    <div className="chat-user-img online align-self-center me-3 ms-0">
                                        <img src={require("../../assets/images/avatars/2.jpg")}
                                            className="h-20 w-20 flex-none rounded-full bg-gray-50" alt="" />
                                        <span className="user-status"></span>
                                    </div>

                                    <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="text-truncate font-size-15 mb-1">Patrick
                                            Hendricks</h5>
                                        <p className="chat-user-message text-truncate mb-0">Hey! there
                                            I'm available</p>
                                    </div>
                                    <div className="font-size-11">05 min</div>
                                </div>
                            </a>
                        </li>

                        <li className="unread border-t-2 ">
                            <a href="#">
                                <div className="flex py-4">
                                    <div className="chat-user-img away align-self-center me-3 ms-0">
                                        <img src={require("../../assets/images/avatars/avatar-4.jpg")}
                                            className="h-20 w-20 flex-none rounded-full bg-gray-50" alt="" />
                                        <span className="user-status"></span>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="text-truncate font-size-15 mb-1">Mark Messer</h5>
                                        <p className="chat-user-message text-truncate mb-0"><i
                                            className="ri-image-fill align-middle me-1 ms-0"></i>
                                            Images</p>
                                    </div>
                                    <div className="font-size-11">12 min</div>
                                    <div className="unread-message">
                                        <span className="badge badge-soft-danger rounded-pill">02</span>
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li className='border-t-2 '>
                            <a href="#">
                                <div className="flex py-4">
                                    <div className="chat-user-img align-self-center me-3 ms-0">
                                        <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-50">
                                            <span
                                                className="">
                                                G
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="text-truncate font-size-15 mb-1">General</h5>
                                        <p className="chat-user-message text-truncate mb-0">This theme
                                            is awesome!</p>
                                    </div>
                                    <div className="font-size-11">20 min</div>
                                </div>
                            </a>
                        </li>

                        <li className="active border-t-2">
                            <a href="#">
                                <div className="flex py-4">
                                    <div className="chat-user-img online align-self-center me-3 ms-0">
                                        <img src={require("../../assets/images/avatars/avatar-5.jpg")}
                                            className="h-20 w-20 flex-none rounded-full bg-gray-50" alt="" />
                                        <span className="user-status"></span>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="text-truncate font-size-15 mb-1">Doris Brown</h5>
                                        <p className="chat-user-message text-truncate mb-0">Nice to meet
                                            you</p>
                                    </div>
                                    <div className="font-size-11">10:12 AM</div>
                                </div>
                            </a>
                        </li>

                        <li className="unread border-t-2">
                            <a href="#">
                                <div className="flex py-4">
                                    <div className="chat-user-img align-self-center me-3 ms-0">
                                        <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-50">
                                            <span
                                                className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                D
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="text-truncate font-size-15 mb-1">Designer</h5>
                                        <p className="chat-user-message text-truncate mb-0">Next meeting
                                            tomorrow 10.00AM</p>
                                    </div>
                                    <div className="font-size-11">12:01 PM</div>
                                    <div className="unread-message">
                                        <span className="badge badge-soft-danger rounded-pill">01</span>
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li className='border-t-2'>
                            <a href="#">
                                <div className="flex py-4">
                                    <div className="chat-user-img away align-self-center me-3 ms-0">
                                        <img src={require("../../assets/images/avatars/avatar-8.jpg")}
                                            className="h-20 w-20 flex-none rounded-full bg-gray-50" alt="" />
                                        <span className="user-status"></span>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="text-truncate font-size-15 mb-1">Steve Walker
                                        </h5>
                                        <p className="chat-user-message text-truncate mb-0"><i
                                            className="ri-file-text-fill align-middle me-1 ms-0"></i>
                                            Admin-A.zip</p>
                                    </div>
                                    <div className="font-size-11">03:20 PM</div>
                                </div>
                            </a>
                        </li>

                        <li className="typing border-t-2">
                            <a href="#">
                                <div className="flex py-4">
                                    <div className="chat-user-img align-self-center online me-3 ms-0">
                                        <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-50">
                                            <span
                                                className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                A
                                            </span>
                                        </div>
                                        <span className="user-status"></span>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="text-truncate font-size-15 mb-1">Albert Rodarte
                                        </h5>
                                        <p className="chat-user-message text-truncate mb-0">typing<span
                                            className="animate-typing">
                                            <span className="dot"></span>
                                            <span className="dot"></span>
                                            <span className="dot"></span>
                                        </span></p>
                                    </div>
                                    <div className="font-size-11">04:56 PM</div>
                                </div>
                            </a>
                        </li>

                        <li className='border-t-2'>
                            <a href="#">
                                <div className="flex py-4">
                                    <div className="chat-user-img align-self-center online me-3 ms-0">
                                        <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-50">
                                            <span
                                                className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                M
                                            </span>
                                        </div>
                                        <span className="user-status"></span>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="text-truncate font-size-15 mb-1">Mirta George
                                        </h5>
                                        <p className="chat-user-message text-truncate mb-0">Yeah
                                            everything is fine</p>
                                    </div>
                                    <div className="font-size-11">12/07</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default UserList;
