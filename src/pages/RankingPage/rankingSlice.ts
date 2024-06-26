import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { initialValue as service } from "../../app/contexts";
import { Challenger } from "../../types/challenger"
import { Timeframe } from "../../types/timeframe";

type RankingState = {
    status: 'idle' | 'loading' | 'done'
    timeframe: Timeframe
    challengers: Challenger[]
}

const initialState: RankingState = {
    status: 'idle',
    timeframe: 'weekly',
    challengers: []
}

export const fetchRankedChallengers = createAsyncThunk('ranking/fetchRankedChallengers', async () => {
    const rankedChallengers = await service.ranking.getWeeklyRank()
    return rankedChallengers
})

const rankingSlice = createSlice({
    name: 'ranking',
    initialState,
    reducers: {
        toggleTimeframe(state) {
            state.timeframe = state.timeframe === 'weekly' ? 'all-time' : 'weekly'
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchRankedChallengers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchRankedChallengers.fulfilled, (state, action) => {
                state.challengers = action.payload
                state.status = 'done'
            })
            .addCase(fetchRankedChallengers.rejected, (state, action) => {
                console.log(action);
                state.status = 'done'
            })
    }
})

export const { toggleTimeframe } = rankingSlice.actions

export default rankingSlice.reducer