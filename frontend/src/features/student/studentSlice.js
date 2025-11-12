import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchStudents = createAsyncThunk("/student/all", async () => {
    const response = await fetch("https://rx3-reduxtoolkit-assignment-backend.onrender.com/students", {
        method: "GET"
    });
    const result = await response.json();
    return result;
});

export const addStudentAsync = createAsyncThunk("/students/add", async (data) => {
    const response = await fetch("https://rx3-reduxtoolkit-assignment-backend.onrender.com/students", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
});

export const updateStudentAsync = createAsyncThunk("/students/update", async ({ id, formData }) => {
    const response = await fetch(`https://rx3-reduxtoolkit-assignment-backend.onrender.com/students/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const result = await response.json();
    return result;
});

export const deleteStudentAsync = createAsyncThunk("/students/delete", async (id) => {
    const response = await fetch(`https://rx3-reduxtoolkit-assignment-backend.onrender.com/students/${id}`, {
        method: "DELETE"
    });
    const result = await response.json();
    return result;
})

export const studentsSlice = createSlice({
    name: "student",
    initialState: {
        students: [],
        status: "idle",
        addStatus: "idle",
        updateStatus: "idle",
        deleteStatus: "idle",
        error: null,
        addError: null,
        updateError: null,
        deleteError: null,
        filter: "All",
        sortBy: "name",
    },
    reducers: {
        resetAllStatus: (state) => {
            state.status = "idle";
            state.addStatus = "idle";
            state.updateStatus = "idle";
            state.error = null;
            state.addError = null;
            state.updateError = null;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending, (state) => {
            state.status = "loading"
        });
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.status = "success",
                state.students = action.payload
        });
        builder.addCase(fetchStudents.rejected, (state, action) => {
            state.status = "failed",
                state.students = [],
                state.error = action.error.message;
        });

        // for add the students
        builder.addCase(addStudentAsync.pending, (state) => {
            state.addStatus = "loading";
        });
        builder.addCase(addStudentAsync.fulfilled, (state, action) => {
            state.addStatus = "success";
        });
        builder.addCase(addStudentAsync.rejected, (state, action) => {
            state.addStatus = "failed";
            state.addError = action.error.message;
        });

        // update the students
        builder.addCase(updateStudentAsync.pending, (state) => {
            state.updateStatus = "loading";
        });
        builder.addCase(updateStudentAsync.fulfilled, (state) => {
            state.updateStatus = "success";
        });
        builder.addCase(updateStudentAsync.rejected, (state, action) => {
            state.updateStatus = "failed",
                state.updateError = action.error.message;
        });

        // delete the students
        builder.addCase(deleteStudentAsync.pending, (state) => {
            state.deleteStatus = "loading";
        });
        builder.addCase(deleteStudentAsync.fulfilled, (state) => {
            state.deleteStatus = "success";
        });
        builder.addCase(deleteStudentAsync.rejected, (state, action) => {
            state.deleteStatus = "failed",
                state.deleteError = action.error.message;
        });
    }
});

export const { resetAllStatus, setFilter, setSortBy } = studentsSlice.actions;
export default studentsSlice.reducer;