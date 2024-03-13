import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState } from "../types/chat"

const initialState: ChatState = {
    messages: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<string>) {
            state.messages.push(action.payload);
        },
    },
    extraReducers(builder) {

    },
})

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer