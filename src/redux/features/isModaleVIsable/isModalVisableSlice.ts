import { createSlice } from '@reduxjs/toolkit'

export interface isModalVisableState {
  value: boolean
}

const initialState: isModalVisableState = {
  value: false
}

export const isModalVisableSlice = createSlice({
  name: 'isModalVisable',
  initialState,
  reducers: {
 
    openModal: (state) => {
      state.value = true
    },
    closeModal: (state) => {
        state.value = false
      },
  },
})

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = isModalVisableSlice.actions

export default isModalVisableSlice.reducer