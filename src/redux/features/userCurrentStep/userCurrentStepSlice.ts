import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserCurrentStepState {
  value: number
}

const initialState: UserCurrentStepState = {
  value: 0,
}

export const userCurrentStepSlice = createSlice({
  name: 'userCurrentStep',
  initialState,
  reducers: {
 
    updateValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateValue } = userCurrentStepSlice.actions

export default userCurrentStepSlice.reducer