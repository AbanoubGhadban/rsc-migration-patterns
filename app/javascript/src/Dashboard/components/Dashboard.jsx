// Pattern 4: Async Server Components with Suspense
//
// Each section (Stats, RevenueChart, RecentOrders) is an async Server Component
// wrapped in its own <Suspense> boundary. They fetch data independently and
// stream HTML to the browser as each completes — the user sees content
// progressively rather than waiting for the slowest query.

import React, { Suspense } from 'react';

async function getStats() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return {
    revenue: '$127,450',
    users: '2,847',
    orders: '1,234',
    conversionRate: '3.2%',
  };
}

async function getRevenueData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    values: [85000, 92000, 108000, 115000, 121000, 127450],
  };
}

async function getRecentOrders() {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return [
    { id: 'ORD-001', customer: 'Alice Johnson', amount: '$299.99', status: 'Shipped', date: '2026-02-21' },
    { id: 'ORD-002', customer: 'Bob Smith', amount: '$149.50', status: 'Processing', date: '2026-02-21' },
    { id: 'ORD-003', customer: 'Charlie Brown', amount: '$89.99', status: 'Delivered', date: '2026-02-20' },
    { id: 'ORD-004', customer: 'Diana Prince', amount: '$449.00', status: 'Shipped', date: '2026-02-20' },
    { id: 'ORD-005', customer: 'Eve Wilson', amount: '$67.25', status: 'Processing', date: '2026-02-19' },
  ];
}

function StatsSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{
          background: '#f0f0f0',
          borderRadius: 8,
          padding: 20,
          height: 80,
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div style={{
      background: '#f0f0f0',
      borderRadius: 8,
      padding: 20,
      height: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#999',
    }}>
      Loading chart...
    </div>
  );
}

function TableSkeleton() {
  return (
    <div style={{ borderRadius: 8, overflow: 'hidden' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{
          background: '#f0f0f0',
          height: 48,
          marginBottom: 2,
        }} />
      ))}
    </div>
  );
}

async function Stats() {
  const stats = await getStats();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      {[
        { label: 'Revenue', value: stats.revenue, color: '#2e7d32' },
        { label: 'Users', value: stats.users, color: '#1565c0' },
        { label: 'Orders', value: stats.orders, color: '#e65100' },
        { label: 'Conv. Rate', value: stats.conversionRate, color: '#6a1b9a' },
      ].map((stat) => (
        <div key={stat.label} style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 20,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.85em', color: '#666', marginBottom: 4 }}>{stat.label}</div>
          <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

async function RevenueChart() {
  const data = await getRevenueData();
  const max = Math.max(...data.values);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      padding: 20,
    }}>
      <h3 style={{ margin: '0 0 16px' }}>Revenue Trend</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 150 }}>
        {data.months.map((month, i) => (
          <div key={month} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              background: '#42a5f5',
              borderRadius: '4px 4px 0 0',
              height: `${(data.values[i] / max) * 130}px`,
              transition: 'height 0.3s',
            }} />
            <div style={{ fontSize: '0.8em', marginTop: 4, color: '#666' }}>{month}</div>
            <div style={{ fontSize: '0.7em', color: '#999' }}>${(data.values[i] / 1000).toFixed(0)}k</div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function RecentOrders() {
  const orders = await getRecentOrders();

  const statusColors = {
    Shipped: '#1565c0',
    Processing: '#e65100',
    Delivered: '#2e7d32',
  };

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      overflow: 'hidden',
    }}>
      <h3 style={{ margin: 0, padding: '16px 20px', borderBottom: '1px solid #e0e0e0' }}>
        Recent Orders
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#fafafa' }}>
            <th style={{ padding: '10px 20px', textAlign: 'left' }}>Order</th>
            <th style={{ padding: '10px 20px', textAlign: 'left' }}>Customer</th>
            <th style={{ padding: '10px 20px', textAlign: 'right' }}>Amount</th>
            <th style={{ padding: '10px 20px', textAlign: 'center' }}>Status</th>
            <th style={{ padding: '10px 20px', textAlign: 'right' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderTop: '1px solid #f0f0f0' }}>
              <td style={{ padding: '10px 20px', fontFamily: 'monospace' }}>{order.id}</td>
              <td style={{ padding: '10px 20px' }}>{order.customer}</td>
              <td style={{ padding: '10px 20px', textAlign: 'right', fontWeight: 'bold' }}>{order.amount}</td>
              <td style={{ padding: '10px 20px', textAlign: 'center' }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontSize: '0.8em',
                  color: '#fff',
                  background: statusColors[order.status] || '#666',
                }}>
                  {order.status}
                </span>
              </td>
              <td style={{ padding: '10px 20px', textAlign: 'right', color: '#666' }}>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Dashboard = () => {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <div style={{
        background: '#f3e5f5',
        border: '1px solid #ce93d8',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: '0.85em',
      }}>
        <strong>Pattern 4: Async Server Components with Suspense</strong> — Each section below
        is an independent async Server Component wrapped in its own Suspense boundary.
        They fetch data in parallel and stream to the browser as each completes.
        Stats loads first (~200ms), Orders next (~350ms), Chart last (~500ms).
      </div>

      <h1>Dashboard</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Suspense fallback={<StatsSkeleton />}>
          <Stats />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<TableSkeleton />}>
          <RecentOrders />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
