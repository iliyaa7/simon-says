import { createSlice  } from '@reduxjs/toolkit'

export interface currentScoreState {
  value: number
}

const initialState: currentScoreState = {
  value: 0,
}

export const currentScoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
 
    updateCurrentScore: (state) => {
      state.value +=  1
    },
    resetCurrentScore: (state) => {
        state.value = 0
      },
  },
})

// Action creators are generated for each case reducer function
export const { updateCurrentScore, resetCurrentScore } = currentScoreSlice.actions

export default currentScoreSlice.reducer