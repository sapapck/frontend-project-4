import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath } from '../../../routes';
import { soketListener } from './soketListener';

export const channelsApi = createApi({
     reducerPath: 'channels',
     baseQuery: fetchBaseQuery(
        { 
         baseUrl: apiPath,
        prepareHeaders: (headers, { getState }) => {
      // const token = JSON.stringify(localStorage.getItem('token'))
         const token = getState().auth.token
      if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
     }),
        
     endpoints: builder => ({
      
        getChanels: builder.query({
            query: () => 'channels',
        }),
        getmessages: builder.query({
            query: () => 'messages',
            onCacheEntryAdded: soketListener,
        }),
        addMessage: builder.mutation({
          query: (newMessage) => ({
          url: 'messages',
          method: 'POST',
          body: newMessage, // Напр: { body: "привет", id:1, channelId: 1, username: "ivan" }
      }),
   }),
        login: builder.mutation({
          query: (credentials) => ({
          url: 'login',
          method: 'POST',
          body: credentials,
      }),
    }),

     })
})

export const {useGetChanelsQuery, useGetmessagesQuery, useAddMessageMutation, useLoginMutation} = channelsApi;