export interface Subscription {
    id: string;
    offerTitle: string;
    status: 'active' | 'cancelled';
    price: number;
    currency: string;
    nextPaymentDate: string;
  }
  
  export const mockSubscriptions: Subscription[] = [
    {
      id: 'S12345',
      offerTitle: 'Premium Monthly',
      status: 'active',
      price: 12.99,
      currency: 'USD',
      nextPaymentDate: '2025-11-15T10:00:00Z',
    },
    {
      id: 'S67890',
      offerTitle: 'Sports Pass - Annual',
      status: 'active',
      price: 99.99,
      currency: 'USD',
      nextPaymentDate: '2026-08-01T10:00:00Z',
    },
    {
      id: 'S11223',
      offerTitle: 'Family Bundle',
      status: 'active',
      price: 19.99,
      currency: 'USD',
      nextPaymentDate: '2025-12-20T10:00:00Z',
    },
  ];
  
  export const fetchSubscriptions = (): Promise<Subscription[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSubscriptions);
      }, 1000);
    });
  };