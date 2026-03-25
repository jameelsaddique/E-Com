import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../features/orders/orderSlice';
import { clearCart } from '../features/cart/cartSlice';

const CheckoutPage = () => {
  const { register, handleSubmit } = useForm();
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const itemsPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 8;
    const taxPrice = itemsPrice * 0.08;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    dispatch(
      createOrder({
        items: items.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        })),
        shippingAddress: values,
        paymentMethod: 'COD',
        pricing: { itemsPrice, shippingPrice, taxPrice, totalPrice }
      })
    );
    dispatch(clearCart());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-3 rounded border bg-white p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      {['fullName', 'phone', 'address', 'city', 'postalCode', 'country'].map((field) => (
        <input
          key={field}
          {...register(field, { required: true })}
          placeholder={field}
          className="w-full rounded border p-2"
        />
      ))}
      <button className="w-full rounded bg-indigo-600 p-2 text-white">Place Order</button>
    </form>
  );
};

export default CheckoutPage;
