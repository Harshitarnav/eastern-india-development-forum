import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    setSidebarMobileOpen(state, action: PayloadAction<boolean>) {
      state.sidebarMobileOpen = action.payload;
    },
  },
});

export const { toggleSidebarCollapsed, setSidebarCollapsed, setSidebarMobileOpen } =
  uiSlice.actions;
export default uiSlice.reducer;
