import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import subscriptionsReducer from '../store/subscriptionsSlice';
import { SubscriptionsList } from './SubscriptionsList';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom'; // Added to fix jest-dom import error

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
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
  
  // To test async success states in Vitest, we would usually 
  // mock the API module or use a longer timeout/waitFor.
});