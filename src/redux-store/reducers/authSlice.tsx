import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserDetails, login } from '../actions/auth';
import { userDetailsType } from '../types/auth';

interface AuthState {
    token: string;
    user: userDetailsType | null;
}

const initialState: AuthState = {
    token: "",
    user: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogout(state, action) {
            state.token = "";
            state.user = null;
        }
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

export const { userLogout } = authSlice.actions
export default authSlice.reducer