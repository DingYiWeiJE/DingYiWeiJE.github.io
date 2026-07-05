import { DataTable } from '../../../../../components/visualization/DataTable';
import type { Order } from '../../../../../data/types/dashboard';

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const columns = [
    {
      key: 'id',
      title: '订单号',
      dataIndex: 'id' as keyof Order,
      width: 150
    },
    {
      key: 'customer',
      title: '客户',
      dataIndex: 'customer' as keyof Order,
      width: 100
    },
    {
      key: 'amount',
      title: '金额',
      dataIndex: 'amount' as keyof Order,
      width: 120,
      render: (value: unknown) => {
        const amount = value as number;
        return (
          <span className="font-medium text-green-400">
            ¥{amount.toLocaleString()}
          </span>
        );
      }
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status' as keyof Order,
      width: 100,
      render: (value: unknown) => {
        const status = value as Order['status'];
        const statusConfig = {
          completed: { label: '已完成', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
          processing: { label: '进行中', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
          cancelled: { label: '已取消', color: 'bg-red-500/10 text-red-400 border-red-500/20' }
        };

        const config = statusConfig[status];
        return (
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
            {config.label}
          </span>
        );
      }
    },
    {
      key: 'time',
      title: '时间',
      dataIndex: 'time' as keyof Order,
      render: (value: unknown) => {
        const time = value as string;
        return (
          <span className="text-slate-400">
            {new Date(time).toLocaleString('zh-CN', {
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        );
      }
    }
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={orders}
      rowKey="id"
      pagination={true}
      pageSize={10}
    />
  );
}
