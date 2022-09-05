import { configureStore } from "@reduxjs/toolkit";
import primarySlice from "./components/PrimarySlice";

let store = configureStore({
    reducer: {
        primarySlice:primarySlice
    }
})
export default store