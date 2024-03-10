import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface OtpState {}

interface OtpGeneratePayload {
    email: string;
}

interface OtpVerifyPayload {
    emailVerify: string;
    otp: string;
}

const initialState: OtpState = {}

export const otpGenerate = createAsyncThunk(
    "otp/generate",
    async ({ email }: OtpGeneratePayload, { rejectWithValue }) => {
        try {
            const res = await axios.post("/api/otp/generate", {
                email
            });

            if (res.status === 201) {
                return "Otp generate success";
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const otpVerify = createAsyncThunk(
    "otp/verify",
    async ({ emailVerify, otp }: OtpVerifyPayload, { rejectWithValue }) => {
        try {
            const res = await axios.post("/api/otp/verify", {
                userEmail: emailVerify,
                otp
            });

            if (res.status === 200) {
                return "Otp is valid";
            }
        } catch (error: any) {
            if (error.response.data.message === "Email or otp is not valid") {
                return rejectWithValue("Email or otp is not valid");
            } else if (error.response.data.message === "Otp has expire") {
                return rejectWithValue("Otp has expire");
            }

            return rejectWithValue(error.response.data.message);
        }
    }
);

export const otpSlice = createSlice({
    name: "otp",
    initialState,
    reducers: {}
});

export default otpSlice.reducer;