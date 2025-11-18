import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchSubscriptions, Subscription } from '../api/mock-data';

interface SubscriptionsState {
  items: Subscription[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SubscriptionsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching data
export const getSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async () => {
    const response = await fetchSubscriptions();
    return response;
  }
);

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    cancelSubscription: (state, action: PayloadAction<string>) => {
      const subscription = state.items.find(sub => sub.id === action.payload);
      if (subscription) {
        subscription.status = 'cancelled';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getSubscriptions.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to load subscriptions';
      });
  },
});

export const { cancelSubscription } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;