import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialValue as service } from "../../app/contexts";
import { AuthProvider } from "../../types/authProvider";
import { User } from "../../types/user";

type AuthState = {
    status: 'loggedIn' | 'loggedOut' | 'loading',
    user?: User,
}

const initialState: AuthState = {
    status: 'loggedOut',
    user: service.login.getLocalUser(),
}

const login = createAsyncThunk('auth/login', async (provider: AuthProvider) => {
    const response = await service.login.loginWith(provider)
    if (response instanceof Error) {
        return 'error'
    } else {
        return response
    }
})

const logout = createAsyncThunk('auth/logout', async () => {
    const response = await service.login.logout()
    if (response instanceof Error) {
        return 'error'
    } else {
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