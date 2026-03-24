import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../../services/api';

const user = JSON.parse(localStorage.getItem('user') || 'null');

export const register = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('user', JSON.stringify(data));
    toast.success('Account created');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const login = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    localStorage.setItem('user', JSON.stringify(data));
    toast.success('Welcome back');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user, loading: false, error: null },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
