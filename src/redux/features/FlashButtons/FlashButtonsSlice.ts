import { createSlice } from "@reduxjs/toolkit";

export type FlashButtonType = {
  [index: string]: boolean;
};

export interface FlashButtonsState {
  value: FlashButtonType;
}

const initialState: FlashButtonsState = {
  value: {
    isBlueButtonFlash: false,
    isRedButtonFlash: false,
    isGreenButtonFlash: false,
    isYellowButtonFlash: false,
  },
};

export const FlashButtonsSlice = createSlice({
  name: "leaderBoardArray",
  initialState,
  reducers: {
    flasBlueButton: (state) => {
      state.value.isBlueButtonFlash = true;
      setTimeout(() => (state.value.isBlueButtonFlash = false), 350);
    },
    flashGreenButton: (state) => {
      state.value.isGreenButtonFlash = true;
      setTimeout(() => (state.value.isGreenButtonFlash = false), 350);
    },
    flashRedButton: (state) => {
      state.value.isRedButtonFlash = true;
      setTimeout(() => (state.value.isRedButtonFlash = false), 350);
    },
    flasYellowButton: (state) => {
      state.value.isYellowButtonFlash = true;
      setTimeout(() => (state.value.isYellowButtonFlash = false), 350);
    },
  },
});

export const {
  flasBlueButton,
  flasYellowButton,
  flashGreenButton,
  flashRedButton,
} = FlashButtonsSlice.actions;

export default FlashButtonsSlice.reducer;
