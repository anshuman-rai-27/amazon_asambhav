'use client';

import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  Package,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import { useInventory } from "@/hooks/use-inventory";

export default function Home() {
  const { orders } = useOrders();
  const { inventory } = useInventory();

  const stats = {
    totalOrders: orders?.length || 0,
    fulfilledOrders: orders?.filter(order => order.status === 'fulfilled').length || 0,
    pendingOrders: orders?.filter(order => order.status === 'pending').length || 0,
    revenue: orders?.reduce((acc, order) => acc + order.total, 0) || 0,
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <ShoppingCart className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Package className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Fulfilled Orders</p>
              <h3 className="text-2xl font-bold">{stats.fulfilledOrders}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <AlertCircle className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Pending Orders</p>
              <h3 className="text-2xl font-bold">{stats.pendingOrders}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <h3 className="text-2xl font-bold">₹{stats.revenue.toFixed(2)}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <Card className="p-6">
          {orders ? (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Loading recent orders...
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}