import { useEffect, useRef } from 'react';
import { useGetmessagesQuery } from './slices/api/chatApi';
import MessageForm from './MessageForm';

const Messages = () => {
  const { data: messages = [], isLoading } = useGetmessagesQuery();
  const vnode = useRef(null);
  console.log(`Рендер. Загрузка: ${isLoading}, Сообщений: ${messages.length}`);

  const {username} = JSON.parse(localStorage.getItem('userId')); 

  useEffect(() => {
    vnode.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


   if (isLoading) {
  return (
    /* Обязательно добавляем те же классы колонок, что и у основного чата! */
    <div className="col p-0 h-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
      <span className="ms-3">Загрузка сообщений...</span>
    </div>
  );
}


  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># general</b></p>
          <span className="text-muted">{messages.length} сообщений</span>
        </div>
        
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map((m) => (
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