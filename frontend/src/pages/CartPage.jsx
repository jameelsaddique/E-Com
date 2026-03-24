import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../features/cart/cartSlice';

const CartPage = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <article key={item._id} className="flex items-center gap-4 rounded border bg-white p-4">
            <img src={item.image} alt={item.name} className="h-20 w-20 rounded object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p>${item.price}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  dispatch(updateQuantity({ id: item._id, quantity: Number(e.target.value) }))
                }
                className="mt-2 w-20 rounded border px-2 py-1"
              />
            </div>
            <button onClick={() => dispatch(removeItem(item._id))} className="text-red-500">Remove</button>
          </article>
        ))}
      </section>
      <aside className="rounded border bg-white p-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <p className="mt-3">Subtotal: ${subtotal.toFixed(2)}</p>
        <Link to="/checkout" className="mt-4 inline-block w-full rounded bg-slate-900 p-2 text-center text-white">
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  );
};

export default CartPage;
