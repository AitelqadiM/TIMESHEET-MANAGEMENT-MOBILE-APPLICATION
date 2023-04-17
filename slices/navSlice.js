import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ChosenMonth: null,
};

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers:{
        setChosenMonth: (state,action) => {
            state.ChosenMonth=action.payload;
        },

    }
});
export const {setChosenMonth} = navSlice.actions;

//selectors
export const selectChosenMonth = (state) => state.nav.ChosenMonth;

export default navSlice.reducer;