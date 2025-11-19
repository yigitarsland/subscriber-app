import { describe, it, expect } from 'vitest'; 
// 2. Remove import '@testing-library/jest-dom'; (it is in setupTests.ts now)
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import subscriptionsReducer from '../store/subscriptionsSlice';
import { SubscriptionsList } from './SubscriptionsList';

// Helper to render with Redux
const renderWithRedux = (component: any) => {
  const store = configureStore({
    reducer: { subscriptions: subscriptionsReducer }
  });
  return render(<Provider store={store}>{component}</Provider>);
};

describe('SubscriptionsList', () => {
  it('shows loading state initially', () => {
    renderWithRedux(<SubscriptionsList />);
    // 3. expect is now available globally
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

  // To test async success states in Vitest, we would usually 
  // mock the API module or use a longer timeout/waitFor.
