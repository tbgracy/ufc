import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { initialValue as service } from "../../app/contexts";
import { Entry } from "../../types/entry";

type EntriesState = {
    status: 'initial' | 'loading' | 'succeeded'
    entries: Entry[]
}

const initialState: EntriesState = {
    status: 'initial',
    entries: []
}

const fetchEntries = createAsyncThunk('entries/fetchEntries', async () => {
    const response = await service.entry.getWeeksEntries();
    console.log(response);

    if (response instanceof Error) {
        return 'error'
    } else {
        return response
    }
})

const entriesSlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchEntries.pending, (state) => { state.status = 'loading' })
            .addCase(fetchEntries.fulfilled, (state, action) => {
                if (action.payload instanceof Error) {
                    console.log(action.payload);
                    state.status = 'succeeded'
                } else {
                    state.status = 'succeeded'
                    state.entries = action.payload as Entry[]
                }
            })
    }
})

export { fetchEntries }

export default entriesSlice.reducer