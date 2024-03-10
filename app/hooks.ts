import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from "@/app/store";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;