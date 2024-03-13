import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import chatSlice from "./chatSlice"


const rootReducer = combineReducers({
    auth: authSlice,
    chat: chatSlice
})

export default rootReducer 