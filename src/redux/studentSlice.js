import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '@/db/supabase';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    const { data, error } = await supabase.from('students').select('*');
    if (error) throw error;
    return data;
});

const studentsSlice = createSlice({
    name: 'students',
    initialState: { students: [], loading: false, error: null },
    reducers: {
        updateStudentList: (state, action) => {
            state.students = action.payload; // Replace with the new list
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { updateStudentList } = studentsSlice.actions;

export const subscribeToStudents = () => (dispatch) => {
    const subscription = supabase
        .from('students')
        .on('*', async () => {
            const { data, error } = await supabase.from('students').select('*');
            if (!error) {
                dispatch(updateStudentList(data));
            }
        })
        .subscribe();

    return subscription;
};

export default studentsSlice.reducer;
