import styled from 'styled-components';
import { Subscription } from '../api/mock-data';
import { formatDate, formatCurrency } from '../utils/formatters';
import { useDispatch } from 'react-redux';
import { cancelSubscription } from '../store/subscriptionsSlice';

const Card = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
`;

const Detail = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

const CancelButton = styled.button<{ $disabled: boolean }>`
  background-color: ${props => props.$disabled ? '#ccc' : '#ff4d4f'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  font-weight: bold;

  &:hover {
    background-color: ${props => props.$disabled ? '#ccc' : '#ff7875'};
  }
`;

interface Props {
  subscription: Subscription;
}

export const SubscriptionCard = ({ subscription }: Props) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(cancelSubscription(subscription.id));
  };

  const isCancelled = subscription.status === 'cancelled';

  return (
    <Card>
      <Info>
        <Title>{subscription.offerTitle}</Title>
        <Detail>Status: <strong>{subscription.status.toUpperCase()}</strong></Detail>
        <Detail>{formatCurrency(subscription.price, subscription.currency)}</Detail>
        <Detail>Renews on: {formatDate(subscription.nextPaymentDate)}</Detail>
      </Info>
      <CancelButton 
        onClick={handleCancel} 
        disabled={isCancelled} 
        $disabled={isCancelled}
      >
        {isCancelled ? 'Cancelled' : 'Cancel'}
      </CancelButton>
    </Card>
  );
};