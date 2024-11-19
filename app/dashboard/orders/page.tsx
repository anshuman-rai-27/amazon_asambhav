'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOrders } from '@/hooks/use-orders';
import { format } from 'date-fns';

export default function OrdersPage() {
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('all');
  const { orders, isLoading } = useOrders();

  if (isLoading) {
    return <div className="p-8">Loading orders...</div>;
  }

  const filteredOrders = orders?.filter((order) => {
    const matchesFilter = order.customer.name.toLowerCase().includes(filter.toLowerCase()) ||
      order.id.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = status === 'all' || order.status === status;
    return matchesFilter && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <Button>Create New Order</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search orders..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="fulfilled">Fulfilled</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{format(new Date(order.createdAt), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === 'fulfilled' ? 'success' :
                      order.status === 'cancelled' ? 'destructive' :
                      'secondary'
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>₹{order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}