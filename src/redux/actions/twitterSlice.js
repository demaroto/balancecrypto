import { createSlice } from "@reduxjs/toolkit";

export const twitterSlice = createSlice({
    name:"twitter",
    initialState:{
        value: null,
    },
    reducers: {
        changePage: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {changePage} = twitterSlice.actions

export default twitterSlice.reducer