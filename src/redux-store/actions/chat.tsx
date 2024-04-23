import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import AlertError from "../../components/sweetAlert/AlertError";
import AlertSuccess from "../../components/sweetAlert/AlertSuccess";
import { LoginResType, userResType } from "../types/auth";
import { RootState } from "../store";
import { API_ENDPOINTS } from "../utils/constants";
import { userLogout } from "../reducers/authSlice";


export const handleErrNotify = async (err: any, dispatch: any) => {
    let message = "";
    const { config, response } = err;
    if ((config.url !== API_ENDPOINTS.LOGIN && config.url !== API_ENDPOINTS.SIGNUP) && response?.status === 401 && ["Invalid token", "Unauthorized"].includes(response?.data?.message)) {
        message = "Your session has expired. Please log in again."
        dispatch(userLogout(null))
    } else {
        message = await response?.data?.message;
    }
    await AlertError(message)
    return err;
}

export const handleSuccessNotify = async (res: any) => {
    const message = await res.data?.message || "";
    await AlertSuccess(message)
    return;
}

export const login = createAsyncThunk("login", async (data: any, { dispatch }) => {
    try {
        const response = await axios.post<LoginResType>(API_ENDPOINTS.LOGIN, data);
        await handleSuccessNotify(response)
        return response.data
    }
    catch (err) {
        handleErrNotify(err, dispatch)
    }
})

export const getMessageList = createAsyncThunk("getMessageList", async ({ receiverId }: { receiverId: string }, { getState, dispatch }) => {
    try {
        const token = (await (getState() as RootState).auth.token);
        const response = await axios.get(`${API_ENDPOINTS.GET_MESSAGES}/${receiverId}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data?.conversation;
    }
    catch (err) {
        handleErrNotify(err, dispatch)
    }
})
export const sendMessage = createAsyncThunk("sendMessage", async ({ message, receiverId }: { message: string; receiverId: string }, { getState, dispatch }) => {
    try {
        const token = (await (getState() as RootState).auth.token);
        const response = await axios.post(`${API_ENDPOINTS.SEND_MESSAGE}/${receiverId}`, { message }, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }
    catch (err) {
        handleErrNotify(err, dispatch)
    }
})




/// Group Chat Start ///

export const createGroup = createAsyncThunk("createGroup", async (formData:any, { getState, dispatch }) => {
    try {
        const token = (await (getState() as RootState).auth.token);
        const response = await axios.post(`${API_ENDPOINTS.GROUP_CREATE}`, formData, { headers: { Authorization: `Bearer ${token}` } });
        await handleSuccessNotify(response)
        return response.data;
    }
    catch (err) {
        handleErrNotify(err, dispatch)
    }
})


export const joinGroup = createAsyncThunk("joinGroup", async ({ message, receiverId }: { message: string; receiverId: string }, { getState, dispatch }) => {
    try {
        const token = (await (getState() as RootState).auth.token);
        const response = await axios.post(`${API_ENDPOINTS.GROUP_JOIN}/${receiverId}`, { message }, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }
    catch (err) {
        handleErrNotify(err, dispatch)
    }
})


