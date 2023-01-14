import { configureStore } from "@reduxjs/toolkit";
import reducer from "./LocalStorageRedux";

export default configureStore({
    reducer: {
        reducer: reducer
    }
});