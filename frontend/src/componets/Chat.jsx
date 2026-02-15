import Channels from "./Channels";
import Messages from "./Messages";
import { HeaderWithExitButton } from './Head';
import { useGetChanelsQuery, useGetmessagesQuery } from "./slices/api/chatApi";
import Spiner from "./Spiner";
const Chat = () => {
  
  const { isLoading: isChannelsLoading } = useGetChanelsQuery();
  const { isLoading: isMessagesLoading } = useGetmessagesQuery();

  const isLoading = isChannelsLoading || isMessagesLoading;
  const renderContent = () => {
    if (isLoading) {
      return (
        <Spiner/>
      );
    }

    return (
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <Messages />
          </div>
        </div>
      </div>
    );
  };

  return (
    <HeaderWithExitButton>
      {renderContent()}
    </HeaderWithExitButton>
  );
};

export default Chat;