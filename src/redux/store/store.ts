import  sequanceArraySlice  from './../features/sequanceArray/sequanceArraySlice';
import { configureStore } from '@reduxjs/toolkit'
import userCurrentStepSlice from '../features/userCurrentStep/userCurrentStepSlice'

export const store = configureStore({
  reducer: {
    userCurrentStep: userCurrentStepSlice,
    sequanceArray: sequanceArraySlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch