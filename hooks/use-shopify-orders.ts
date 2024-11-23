import { useEffect, useState } from 'react';
import axios from 'axios'
export type Order = {
  id: string;
  customer: {
    name: string;
  };
  createdAt: string;
  status: string;
  total: number;
};

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders'); // Replace with your API endpoint
        const data = response.data;
        const mappedOrders: Order[] = data.orders.orders.map((order: any) => ({
          id: order.id.toString(),
          customer: {
            name: order.customer?.first_name
              ? `${order.customer.first_name} ${order.customer.last_name}`
              : 'Unknown',
          },
          createdAt: order.created_at,
          status: order.financial_status || 'pending',
          total: parseFloat(order.current_total_price || 0),
        }));
        setOrders(mappedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, isLoading };
};
