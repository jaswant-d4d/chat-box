import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserDetails, getUserList, login } from '../actions/auth';
import { userDetailsType, selectedConversationType } from '../types/auth';

interface AuthState {
    token: string;
    user: userDetailsType | null;
    selectedConversation: selectedConversationType

}

const initialState: AuthState = {
    token: "",
    user: null,
    selectedConversation: {
        name: "",
        username: "",
        _id: ""
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogout(state, action) {
            state.token = "";
            state.user = null;
            state.selectedConversation = { name: "", username: "", _id: "" };
        },

        setSelectedConversation(state, action: PayloadAction<selectedConversationType>) {
            state.selectedConversation = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload?.token ?? "";
        })
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.user = action.payload ?? null;
        })

    },

})


export const { userLogout, setSelectedConversation } = authSlice.actions
export default authSlice.reducer