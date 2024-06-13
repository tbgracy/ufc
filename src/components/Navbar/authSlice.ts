import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialValue as service } from "../../app/contexts";
import { AuthProvider } from "../../types/authProvider";
import { User } from "../../types/user";
import { AppDispatch } from "../../app/store";
import { fetchEntries } from "../../pages/HomePage/entriesSlice";

type AuthState = {
    status: 'loggedIn' | 'loggedOut' | 'loading',
    user?: User,
}

const initialState: AuthState = {
    status: 'loggedOut',
    user: service.auth.getLocalUser(),
}

const login = createAsyncThunk<
    string,
    AuthProvider,
    { dispatch: AppDispatch }
>('auth/login', async (provider, { dispatch }) => {
    const response = await service.auth.loginWith(provider)
    if (response instanceof Error) {
        return 'error'
    } else {
        dispatch(fetchEntries())
        return response
    }
})

const logout = createAsyncThunk<
    string,
    void,
    { dispatch: AppDispatch }
>('auth/logout', async (_, { dispatch }) => {
    const response = await service.auth.logout()
    if (response instanceof Error) {
        return 'error'
    } else {
        dispatch(fetchEntries())
        return 'success'
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state) => {
                const user = JSON.parse(localStorage.getItem('user')!);
                state.user = user;
                state.status = 'loggedIn'
            })
            .addCase(login.pending, (state) => { state.status = 'loading' })
            .addCase(logout.fulfilled, (state) => {
                state.user = undefined
                state.status = 'loggedOut'
            })
    }
})


export { login, logout };
export default authSlice.reducer;