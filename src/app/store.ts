import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../components/Navbar/authSlice';
import entriesReducer from "../pages/HomePage/entriesSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        entries: entriesReducer,
    }
})

export default store;

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']