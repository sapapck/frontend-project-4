import Channels from "./Channels";
import Messages from "./Messages";
import { HeaderWithExitButton } from './Head';

const Chat = () => {
    
    return (
        <HeaderWithExitButton>
       <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
            <Channels/>
            <Messages/>
        </div>
       </div>
       </div>
        </HeaderWithExitButton>
    );
};

export default Chat;