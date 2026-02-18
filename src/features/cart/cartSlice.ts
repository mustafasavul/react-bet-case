import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: "string",
  odds: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;