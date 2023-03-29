import { createSlice } from "@reduxjs/toolkit";

export const walletSlice = createSlice({
    name:"wallet",
    initialState:{
        total: null,
    },
    reducers: {
        changeTotal: (state, action) => {
            state.total = action.payload;
        }
    }
});

export const {changeTotal} = walletSlice.actions

export default walletSlice.reducer