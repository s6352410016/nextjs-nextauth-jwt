import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {}

const initialState: UserState = {}

interface SignUpPayload {
    firstnameSignUp: string;
    lastnameSignUp: string;
    emailVerify: string;
    passwordSignUp: string;
}

interface ResetPassword {
    email: string;
    password: string;
}

export const checkEmailExist = createAsyncThunk(
    "user/checkEmailExist",
    async (email: string, { rejectWithValue }) => {
        try {
            const res = await axios.post("/api/user/checkEmail", {
                email
            });

            return res.data.message;
        } catch (error: any) {
            if (error.response.status === 400) {
                return rejectWithValue("Email is already exist");
            }

            return rejectWithValue(error.response.data.message);
        }
    }
);

export const signUp = createAsyncThunk(
    "user/signup",
    async ({ firstnameSignUp, lastnameSignUp, emailVerify, passwordSignUp }: SignUpPayload, { rejectWithValue }) => {
        try {
            const res = await axios.post("/api/user/signup", {
                firstname: firstnameSignUp,
                lastname: lastnameSignUp,
                email: emailVerify,
                password: passwordSignUp
            });

            if (res.status === 201) {
                return "Signup success";
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const resetPWD = createAsyncThunk(
    "user/reset-password",
    async ({ email, password }: ResetPassword, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch("/api/user/resetPassword", {
                email,
                password
            });

            return data.message;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export default userSlice.reducer;