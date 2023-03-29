import { createSlice } from "@reduxjs/toolkit";

export const coinSlice = createSlice({
    name:"coin",
    initialState:{
        value: null,
    },
    reducers: {
        changeCoin: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {changeCoin} = coinSlice.actions

export default coinSlice.reducer