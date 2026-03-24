import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../features/orders/orderSlice';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">My Orders</h1>
      <div className="space-y-3">
        {list.map((order) => (
          <article key={order._id} className="rounded border bg-white p-4">
            <p className="font-semibold">Order #{order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ${order.totalPrice?.toFixed(2)}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
