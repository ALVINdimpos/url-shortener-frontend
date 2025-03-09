import { IUser } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';
import store from 'store';

const initialState: {
  usersList: IUser[];
  user?: IUser;
  selectedUser?: IUser;
  token?: string;
  csrfToken?: string;
  userProfile?: IUser;
} = {
  usersList: [],
  user: store.get('user'),
  selectedUser: undefined,
  token: store.get('token'),
  csrfToken: store.get('csrfToken'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      store.set('user', action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      store.set('token', action.payload);
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    setCsrfToken: (state, action) => {
      state.csrfToken = action.payload;
      store.set('csrfToken', action.payload);
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUser, setSelectedUser, setUsersList, setToken, setCsrfToken, setUserProfile } =
  userSlice.actions;

export default userSlice.reducer;
