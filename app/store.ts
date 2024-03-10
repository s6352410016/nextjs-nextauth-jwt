import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/features/user/userSlice";
import otpSlice from "@/features/otp/otpSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        otp: otpSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;