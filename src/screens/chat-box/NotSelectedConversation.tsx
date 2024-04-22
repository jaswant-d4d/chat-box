import { useSelector } from "react-redux";
import { RootState } from "../../redux-store/store";


const NotSelectedConversation: React.FC = () => {

    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <>
            <section>
                <div className="not-selected-conversation">
                    <div className="text-center">
                        <h2 className="mb-4"> Welcome 👋 {user?.name} </h2>
                        <h4>Select a chat to start messaging</h4>
                    </div>
                </div>
            </section>
        </>
    )
}
export default NotSelectedConversation