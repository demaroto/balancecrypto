import { createSlice } from "@reduxjs/toolkit";

export const cryptoSlice = createSlice({
    name:"cryptos",
    initialState:{
        value: [],
    },
    reducers: {
        changeCryptos: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {changeCryptos} = cryptoSlice.actions

export default cryptoSlice.reducer