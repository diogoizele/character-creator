import { createSlice } from "@reduxjs/toolkit";
import { Character } from "models";

const initialState = new Character();

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    addCharacter(state, action: { payload: Character }) {
      console.log(state, action);
      return state;
    },
  },
});

export const characterActions = characterSlice.actions;

export default characterSlice.reducer;
