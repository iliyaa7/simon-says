import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorageService from "../../../services/AsyncStorageService";

export type RowType = {
  name: string;
  score: number;
};

export interface leaderBoardArrayState {
  value: RowType[];
}

const initialState: leaderBoardArrayState = {
  value: [],
};

export const leaderBoardArraySlice = createSlice({
  name: "leaderBoardArray",
  initialState,
  reducers: {
    insertLoadedHighScore: (state, action: PayloadAction<RowType[]>) => {
        const sortedArray = action.payload.sort(function (a, b) {
            return b.score - a.score;
          });
        state.value = sortedArray;
      },
    insertHighScore: (state, action: PayloadAction<RowType>) => {
        
      let arrayToUpdate;
      if (state.value.length >= 10) {
        if (state.value[9].score >= action.payload.score) {
          arrayToUpdate = [...state.value];
        } else {
          state.value[9] = action.payload;
          console.log(state.value)
          arrayToUpdate = [...state.value];
        }
      } else {
        arrayToUpdate = [...state.value, action.payload];
        
      }
      const sortedArray = arrayToUpdate.sort(function (a, b) {
        return b.score - a.score;
      });
      AsyncStorageService.setHighScoreData(sortedArray);
      state.value = sortedArray;
    },
  },
});

export const { insertHighScore, insertLoadedHighScore } = leaderBoardArraySlice.actions;

export default leaderBoardArraySlice.reducer;
