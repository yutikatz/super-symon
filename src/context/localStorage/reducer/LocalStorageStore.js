import { configureStore } from "@reduxjs/toolkit";
import winsReducer from './WinsReducer';

export default configureStore({
    reducer: {
        wins: winsReducer
    }
});