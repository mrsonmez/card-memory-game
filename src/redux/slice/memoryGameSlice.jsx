import { createSlice } from "@reduxjs/toolkit";
import items from "../../components/data/items.json";
const memoryGameSlice = createSlice({
  name: "memory",
  initialState: {
    cards: items,
    completedItems: [],
    points: 200,
    holder: null,
  },
  reducers: {
    openCard: (state, action) => {
      let clone = [...state.cards];
      let findIndex = clone.findIndex((item) => item.id === action.payload);
      clone[findIndex].opened = !clone[findIndex].opened;
      state.cards = clone;
    },
    arrayShuffer: (state) => {
      let clone = [...state.cards];
      let currentIndex = clone.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [clone[currentIndex], clone[randomIndex]] = [
          clone[randomIndex],
          clone[currentIndex],
        ];
      }
      state.cards = clone;
    },
    holderChanger: (state, action) => {
      state.holder = action.payload;
    },
    cardCompleter: (state, action) => {
      const clone = [...state.cards];
      const { choiceOne, choiceTwo } = action.payload;
      let firstIndex = clone.findIndex((item) => item.id == choiceOne.id);
      let secondIndex = clone.findIndex((item) => item.id == choiceTwo.id);
      clone[firstIndex].completed = true;
      clone[secondIndex].completed = true;
      state.cards = clone;
    },
    closeCard: (state, action) => {
      let clone = [...state.cards];
      const { choiceOne, choiceTwo } = action.payload;
      let firstIndex = clone.findIndex((item) => item.id == choiceOne.id);
      let secondIndex = clone.findIndex((item) => item.id == choiceTwo.id);
      clone[firstIndex].opened = false;
      clone[secondIndex].opened = false;
      state.cards = clone;
    },
    addPoint: (state) => {
      state.points += 50;
    },
    removePoint: (state) => {
      state.points -= 10;
    },
    resetGame: (state) => {
      state.cards = items;
      state.points = 200;
    },
  },
});
export const {
  openCard,
  arrayShuffer,
  holderChanger,
  cardCompleter,
  closeCard,
  addPoint,
  removePoint,
  resetGame,
} = memoryGameSlice.actions;
export default memoryGameSlice.reducer;
