import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : { value: { userName : "", userId : "", userEmail : "", userRole : "", userPassword : ""}},
    reducers : {
        login: (state, action) => {
            const { id, username, email, role, password } = action.payload;
            state.value = {
                ...state.value,
                userId: id,
                userName: username,
                userEmail: email,
                userRole : role,
                userPassword : password
            };
        },

        logout: (state, action) => {
            state.value = { userName : "", userId : "", userEmail : "", userRole : "", userPassword : ""}
        }

    }
});

export const {login, logout,  setPassword} = userSlice.actions;

export default userSlice.reducer;