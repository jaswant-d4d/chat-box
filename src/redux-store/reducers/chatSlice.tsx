import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, Message } from "../types/chat"
import { getMessageList, sendMessage } from "../actions/chat";
import { getUserList } from "../actions/auth";

const initialState: ChatState = {
    messages: [],
    userList: [],
    conversations: [],
    socket: null,
    onlineUsers: []
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        sendNewMessage(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload);
        },
        setSocket(state, action) {
            state.socket = action.payload;
        },
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload;
        },
        addConversation(state, action) {
            state.conversations.push(action.payload);
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getMessageList.fulfilled, (state, action) => {
            state.messages = action.payload
        })
        builder.addCase(getUserList.fulfilled, (state, action) => {
            state.userList = action.payload;
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            const newMessage = action.payload?.newMessage;
            if (newMessage) {
                if (!state.messages) {
                    state.messages = [];
                }
                state.messages.push(newMessage);
            }
        })
    },
})

export const { sendNewMessage, setSocket, setOnlineUsers, addConversation } = chatSlice.actions;
export default chatSlice.reducer