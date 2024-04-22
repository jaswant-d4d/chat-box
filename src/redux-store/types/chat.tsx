import { Socket } from "socket.io-client"

export interface Message {
    shouldShake?: boolean
    createdAt: string
    message: string
    receiverId: string
    senderId: string
    updatedAt: string
    _id: string
}

export interface ChatState {
    messages: Message[]
    userList: any[]
    conversations: Message[]
    socket: Socket | null
    onlineUsers: any[]
}
