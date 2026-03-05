import { io } from 'socket.io-client'
import { setCurrentChannelId } from '../uiSlice'
import { chatApi } from './chatApi'

const socket = io()

export const messagesSocketListener = async (
  _,
  { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
) => {
  try {
    await cacheDataLoaded

    socket.on('newMessage', (payload) => {
      updateCachedData((draft) => {
        draft.push(payload)
      })
    })
  } catch (err) {
    console.error('Socket Messages Error:', err)
  }
  await cacheEntryRemoved
  socket.off('newMessage')
}

export const channelsSocketListener = async (
  _,
  { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState, dispatch }
) => {
  try {
    await cacheDataLoaded

    socket.on('newChannel', (payload) => {
      updateCachedData((draft) => {
        draft.push(payload)
      })
    })

    socket.on('removeChannel', (payload) => {
      updateCachedData((draft) => draft.filter((c) => c.id !== payload.id))
      const state = getState()
      const { currentChannelId } = state.ui
      if (currentChannelId === payload.id) {
        dispatch(setCurrentChannelId('1'))
      }
      dispatch(
        chatApi.util.updateQueryData('getmessages', undefined, (draftMessages) =>
          draftMessages.filter((m) => m.channelId !== payload.id)
        )
      )
    })

    socket.on('renameChannel', (payload) => {
      updateCachedData((draft) => {
        const channel = draft.find((c) => c.id === payload.id)
        if (channel) channel.name = payload.name
      })
    })
  } catch (err) {
    console.error('Socket Channels Error:', err)
  }
  await cacheEntryRemoved
  socket.off('newChannel')
  socket.off('removeChannel')
  socket.off('renameChannel')
}
