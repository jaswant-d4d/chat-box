import React from "react";
import { formatTimeOrDate } from "../../helpers/customDateTime/getTimeDifference";


interface MessageProps {
    message: string,
    user: string,
    classname: string
    createdAt: string
}

const Messages: React.FC<MessageProps> = ({ user, message, classname, createdAt }: MessageProps) => {
    
    if (user === "You") {
        return (
            <div className={`chat chat-end mb-2 ${classname}`}>
                <div className="flex items-end justify-end mb-4">
                    <div className="max-w-xs rounded-lg overflow-hidden shadow-md bg-blue-100 text-slate-800 relative ">
                        <div className="p-4 mb-1">
                            <p className="text-sm min-w-20 max-w-96">{message}</p>
                        </div>
                        <span className="absolute text-xs text-slate-500 bottom-0 left-0 mb-1 ml-2">{formatTimeOrDate(createdAt)}</span>
                    </div>
                    <img src={require("../../assets/images/avatars/2.jpg")} className=" w-10 h-10 rounded-full border-2 border-white ms-2 mb-2" alt={"avatar"} />
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={`chat chat-start mb-2  ${classname}`}>
                <div className="flex items-end justify-start mb-4">
                    <img src={require("../../assets/images/avatars/2.jpg")} className=" w-10 h-10 rounded-full border-2 border-white mr-2 mb-2" alt={"avatar"} />
                    <div className="max-w-xs rounded-lg overflow-hidden shadow-md bg-green-100 text-slate-800 relative">
                        <div className="p-4 mb-1">
                            <p className="text-sm min-w-20 max-w-96">{message}</p>
                        </div>
                        <span className="absolute text-xs text-slate-500 bottom-0 left-0 mb-1 ml-2">{formatTimeOrDate(createdAt)}</span>
                    </div>
                </div>
            </div>
        )
    }
}

Messages.defaultProps = {
    user: '',
    message: '',
    classname: 'left',
}

export default Messages;