import  isModalVisableSlice  from './../features/isModaleVIsable/isModalVisableSlice';
import leaderBoardArraySlice from "./../features/leaderBoard/leaderBoardSlice";
import isGameActiveSlice from "../features/isGameActive/isGameAvticeSlice";
import scoreSlice from "../features/CurrentScore/currentScoreSlice";
import sequanceArraySlice from "./../features/sequanceArray/sequanceArraySlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    sequanceArray: sequanceArraySlice,
    score: scoreSlice,
    isGameActive: isGameActiveSlice,
    leaderBoardArray: leaderBoardArraySlice,
    isModalVisable: isModalVisableSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
