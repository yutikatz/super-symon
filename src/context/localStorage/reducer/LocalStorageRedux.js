import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "INITIALIZE_WINS",
    initialState: {        
      wins:[]
    },
    reducers: {
        initialWins: ( state) => {
            if(!state.wins.length){
                state.wins=JSON.parse(localStorage.getItem('wins')) ;

            }
        }
    }
});

export const { initialWins } = slice.actions;
export default slice.reducer;