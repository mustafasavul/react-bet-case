import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/cart";

interface CartState {
  items: CartItem[];
  stake: number;
}

const initialState: CartState = {
  items: [],
  stake: 50,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.items.findIndex(
        i => i.matchId === action.payload.matchId
      );

      if (existingIndex !== -1) {
        state.items[existingIndex] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ matchId: string; oddId: string }>) => {
      state.items = state.items.filter(
        (i) => !(i.matchId === action.payload.matchId && i.oddId === action.payload.oddId)
      );
    },
    setStake: (state, action: PayloadAction<number>) => {
      const value = action.payload;
      if (value >= 1 && value <= 20000) {
        state.stake = value;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.stake = 1;
    },
  },
});

export const { addToCart, removeFromCart, setStake, clearCart } = cartSlice.actions;

export default cartSlice.reducer;