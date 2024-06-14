import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../components/Navbar/authSlice';
import entriesReducer from "../pages/HomePage/entriesSlice";
import rankingReducer from "../pages/RankingPage/rankingSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        entries: entriesReducer,
        ranking: rankingReducer,
    }
})

export default store;

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']