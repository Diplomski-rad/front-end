import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: string | null;
  email: string | null;
  role: string | null;
}

const initialState: UserState = {
  username: null,
  email: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    removeUser: (state) => {
      state.username = null;
      state.email = null;
      state.role = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
