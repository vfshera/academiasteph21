import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const initialState = { inAdminPanel: false, sidebarPosition: 0 };

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        inPanel: (state) => {
            state.inAdminPanel = true;
        },
        outPanel: (state) => {
            state.inAdminPanel = false;
        },
        setSidebarPosition: (state, action) => {
            state.sidebarPosition = action.payload.pos;
        },
    },
});

export const { inPanel, outPanel, setSidebarPosition } = appSlice.actions;
export const selectAdminPanel = (state) => state;
export default appSlice.reducer;
