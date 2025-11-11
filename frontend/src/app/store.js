import { configureStore } from "@reduxjs/toolkit";
import { studentsSlice } from "../features/student/studentSlice";

export const store = configureStore({
    reducer: {
        students: studentsSlice.reducer
    }
});