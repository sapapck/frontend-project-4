/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    currentChannelId: '1',
    modal: {
      isOpened: false,
      type: null,
      extraData: null,
    },
  },
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    openModal: (state, { payload }) => {
      const { type, extraData = null } = payload;
      state.modal.isOpened = true;
      state.modal.type = type;
      state.modal.extraData = extraData;
    },
    closeModal: (state) => {
      state.modal.isOpened = false;
      state.modal.type = null;
      state.modal.extraData = null;
    },
  },
});

export const { setCurrentChannelId, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
