import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import AlertError from "../../components/sweetAlert/AlertError";
import AlertSuccess from "../../components/sweetAlert/AlertSuccess";
import { LoginResType, userResType } from "../types/auth";
import { RootState } from "../store";


export const handleErrNotify = async (err: any) => {
    let message = "";
    if (err.response.status == "401" && (err.response?.data?.message == "Invalid token" || err.response?.data?.message == "Unauthorized")) {
        message = "Your session has expired. Please log in again."
    } else {
        message = await err.response?.data?.message;
    }
    await AlertError(message)
    return err;
}
export const handleSuccessNotify = async (res: any) => {
    const message = await res.data?.message || "";
    await AlertSuccess(message)
    return;
}

export const signup = createAsyncThunk("signup", async (data: any, thunk) => {
    try {
        const response = await axios.post("/api/auth/register", data);
        await handleSuccessNotify(response)
        return response.data
    }
    catch (err) {
        handleErrNotify(err);
    }
})

export const login = createAsyncThunk("login", async (data: any, thunk) => {
    try {
        const response = await axios.post<LoginResType>("/api/auth/login", data);
        await handleSuccessNotify(response)
        await thunk.dispatch(getUserDetails())
        return response.data
    }
    catch (err) {
        handleErrNotify(err)
    }
})

export const getUserDetails = createAsyncThunk("getUserDetails", async (_, { getState }) => {
    try {
        const token = await (getState() as RootState).auth.token;
        const response = await axios.get<userResType>("/api/auth/user-details", { headers: { Authorization: `Bearer ${token}` } });
        return response.data?.user;
    }
    catch (err) {
        handleErrNotify(err)
    }
})
