import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AdminRole = "super_admin" | "admin" | "editor" | "viewer";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

interface AuthState {
  user: AdminUser | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AdminUser | null>) {
      state.user = action.payload;
      state.hydrated = true;
    },
    clearUser(state) {
      state.user = null;
      state.hydrated = true;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
