import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiCall } from '@/utils/ApiCall';
import { setAuthTokenToCookies } from '@/utils';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    const response = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/signin`,
      method: 'POST',
      body: credentials,
    });
    if (response.error) {
      return thunkAPI.rejectWithValue(response?.error?.data?.error || 'Login failed');
    }

    setAuthTokenToCookies(response?.data?.token);

    return response.data;
  }
);