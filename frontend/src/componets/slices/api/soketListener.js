import { io } from 'socket.io-client';

const socket = io();

export const soketListener = async (
  _,
  { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
) => {
  try {
    await cacheDataLoaded; // Ждем, пока придут первые данные по HTTP

    const handleMessage = (payload) => {
      updateCachedData((draft) => {
        draft.push(payload); // Пушим новое сообщение в список кеша
      });
    };

    socket.on('newMessage', handleMessage); //
  } catch(e) {
    console.error(e);
  };

  await cacheEntryRemoved;
  socket.off('newMessage');
};