import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
    wins: []
};

export const winsSlice = createSlice({
    name: "wins",
    initialState,
    reducers: {
        initialWins: (state) => {
            state.wins = JSON.parse(localStorage.getItem('wins'));
        }
    }
});

export const { initialWins } = winsSlice.actions;

export const winsList = (state) => state.wins.wins;


export default winsSlice.reducer;