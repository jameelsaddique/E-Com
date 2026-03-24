import { createSlice } from '@reduxjs/toolkit';

const saved = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');

const cartSlice = createSlice({
  name: 'cart',
  initialState: saved,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i._id === item._id);
      if (existing) existing.quantity += item.quantity || 1;
      else state.items.push({ ...item, quantity: item.quantity || 1 });
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) item.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
