import React from "react";


interface MessageProps {
    message: string,
    user: string,
    classname: string
}

const Messages: React.FC<MessageProps> = ({ user, message, classname }: MessageProps) => {
    if (user) {
        return (
            <div className={`message-box ${classname}`}  >
                {`${user}: ${message}`}
            </div>
        )
    }
    else {


        return (
            <div className={`message-box ${classname}`}>
                {`You: ${message}`}
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