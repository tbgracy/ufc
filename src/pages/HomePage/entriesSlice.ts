import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { initialValue as service } from "../../app/contexts";
import { Entry } from "../../types/entry";
import { RootState } from "../../app/store";

type EntriesState = {
    status: 'initial' | 'loading' | 'succeeded' | 'voting'
    votingStatus: 'voting' | 'idle'
    entries: Entry[]
}

const initialState: EntriesState = {
    status: 'initial',
    votingStatus: 'idle',
    entries: []
}

const fetchEntries = createAsyncThunk('entries/fetchEntries', async () => {
    const response = await service.entry.getWeeksEntries();
    if (response instanceof Error) {
        return 'error'
    } else {
        return response
    }
})

const voteEntry = createAsyncThunk<Entry | string, string, { state: RootState }>(
    'entries/vote',
    async (entryId: string, optionals) => {

        const userId = optionals.getState().auth.user?.id

        if (userId === undefined) {
            console.log('user not defined');
            throw Error()
        }

        const response = await service.entry.vote(userId, entryId)

        if (response instanceof Error) {
            return Error.name
        }

        return response
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
            .addCase(voteEntry.fulfilled, (state, action) => {
                // TODO : Check if error or not
                const entry = action.payload as Entry
                const votedEntry = state.entries.find(e => e.id === entry.id)

                votedEntry!.voteCount = entry.voteCount
                votedEntry!.voted = entry.voted
                state.votingStatus = 'idle'
            })
            .addCase(voteEntry.rejected, (state, action) => {
                console.log(action.payload);
                state.votingStatus = 'idle'
            })
            .addCase(voteEntry.pending, (state) => {
                state.votingStatus = 'voting'
            })
    }
})

export { fetchEntries, voteEntry }

export default entriesSlice.reducer