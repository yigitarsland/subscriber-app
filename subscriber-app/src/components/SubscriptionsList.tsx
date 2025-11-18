import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../store/store';
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
  const { items, status, error } = useSelector((state: RootState) => state.subscriptions);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getSubscriptions());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
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