import { IUrl } from '@/types/url';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  urlsList: IUrl[];
  selectedUrl?: IUrl;
  url?: IUrl;
  createUrlModal: boolean;
  deleteUrlModal: boolean;
} = {
  urlsList: [],
  selectedUrl: undefined,
  url: undefined,
  createUrlModal: false,
  deleteUrlModal: false,
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setUrlsList: (state, action) => {
      state.urlsList = action.payload;
    },
    setSelectedUrl: (state, action) => {
      state.selectedUrl = action.payload;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setCreateUrlModal: (state, action) => {
      state.createUrlModal = action.payload;
    },
    setDeleteUrlModal: (state, action) => {
      state.deleteUrlModal = action.payload;
    },
    setUpdateUrl: (state, action) => {
      state.urlsList = state.urlsList.map((url) => {
        if (url.id === action.payload?.id) {
          return action.payload;
        }
        return url;
      });
    },
  },
});

export const {
  setUrlsList,
  setSelectedUrl,
  setUrl,
  setCreateUrlModal,
  setDeleteUrlModal,
  setUpdateUrl,
} = urlSlice.actions;

export default urlSlice.reducer;
