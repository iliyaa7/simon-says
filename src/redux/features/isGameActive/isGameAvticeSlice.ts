import { createSlice } from '@reduxjs/toolkit'

export interface isGameActiveState {
  value: boolean
}

const initialState: isGameActiveState = {
  value: false
}

export const isGameActiveSlice = createSlice({
  name: 'isGameActive',
  initialState,
  reducers: {
 
    startGame: (state) => {
      state.value = true
    },
    stopGame: (state) => {
        state.value = false
      },
  },
})

// Action creators are generated for each case reducer function
export const { startGame, stopGame } = isGameActiveSlice.actions

export default isGameActiveSlice.reducer