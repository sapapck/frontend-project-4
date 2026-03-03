import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useGetmessagesQuery, useGetChanelsQuery } from '../slices/api/chatApi';
import MessageForm from './MessageForm';
import Spiner from './Spiner';

const Messages = () => {
  const {t} = useTranslation()
  const { data: allMessages = [], isLoading } = useGetmessagesQuery();
  const { data: channels =[]} = useGetChanelsQuery();

  const currentChannelId = useSelector((state) => state.ui.currentChannelId);
   const currentChannel = channels.find((c) => c.id === currentChannelId);
  const filteredMessages = allMessages.filter((m) => m.channelId === currentChannelId);

  const vnode = useRef(null);
  //console.log(`Рендер. Загрузка: ${isLoading}, Сообщений: ${allMessages.length}`);

  const {username} = JSON.parse(localStorage.getItem('userId')); 

  useEffect(() => {
    vnode.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);


   if (isLoading) {
  return (
    <Spiner/>
  );
}

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannel?.name || 'general'}</b></p>
          <span className="text-muted"> {t('chat.counter', { count: filteredMessages.length })}</span>
        </div>
        
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {filteredMessages.map((m) => (
            <div key={m.id} className="text-break mb-2">
              <b>{m.username}</b>: {m.body}
            </div>
          ))}
          <div ref={vnode} />
        </div>

        <MessageForm userName={username} />
      </div>
    </div>
  );
};

export default Messages;