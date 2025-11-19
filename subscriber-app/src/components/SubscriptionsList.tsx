import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import type { RootState, AppDispatch } from '../store/store'; // Added type import
import { getSubscriptions } from '../store/subscriptionsSlice';
import { SubscriptionCard } from './SubscriptionCard';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  font-family: sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  color: #2c3e50;
`;

const Message = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
`;

export const SubscriptionsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Default to empty object if state is undefined to prevent crash
  const { items, status, error } = useSelector((state: RootState) => state.subscriptions || { items: [], status: 'idle', error: null });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getSubscriptions());
    }
  }, [status, dispatch]);

  let content;

  // FIX: Added 'idle' here so it shows Loading immediately instead of waiting for the first render
  if (status === 'loading' || status === 'idle') {
    content = <Message>Loading subscriptions...</Message>;
  } else if (status === 'failed') {
    content = <Message style={{ color: 'red' }}>{error}</Message>;
  } else if (status === 'succeeded') {
    content = items.map((sub) => (
      <SubscriptionCard key={sub.id} subscription={sub} />
    ));
  }

  return (
    <Container>
      <Header>My Subscriptions</Header>
      {content}
    </Container>
  );
};