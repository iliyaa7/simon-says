import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface sequanceArrayState {
  value: number[]
}

const initialState: sequanceArrayState = {
  value: [],
}

export const sequanceArraySlice = createSlice({
  name: 'sequanceArray',
  initialState,
  reducers: {
 
    updateArray: (state, action: PayloadAction<number>) => {
      state.value = [...state.value, action.payload]
    },
    resestArray: (state) => {
        state.value = []
      },
  },
})

// Action creators are generated for each case reducer function
export const { updateArray, resestArray } = sequanceArraySlice.actions

export default sequanceArraySlice.reducer