import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../../services/api';

export const createOrder = createAsyncThunk('orders/create', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/orders', payload);
    toast.success('Order placed successfully');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchMyOrders = createAsyncThunk('orders/myOrders', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/orders/my-orders');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: { list: [], current: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  }
});

export default orderSlice.reducer;
