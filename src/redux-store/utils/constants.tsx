
const API_AUTH = "/api/auth/";
const API = "/api/";
const GROUP = "group/";

export const API_ENDPOINTS = {
    LOGIN: API_AUTH + "login",
    SIGNUP: API_AUTH + "register",
    USER_DETAILS: API_AUTH + "user-details",
    USER_LIST: API_AUTH + "user-list",
    SEND_MESSAGE: API + "send-message",
    GET_MESSAGES: API + "get-messages",
    
    API_GROUP: API + GROUP,
    CREATE:"create",
    JOIN:  "join",
    MESSAGES:  "messages",
    SEND_MESSAGES:  "send-message",
}
export const WEBSOCKET_URL = 'http://localhost:8080'
