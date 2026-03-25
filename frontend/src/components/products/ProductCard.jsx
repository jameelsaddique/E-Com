import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm">
      <img src={product.image} alt={product.name} className="h-48 w-full rounded-lg object-cover" />
      <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
      <p className="mt-1 text-sm text-slate-600 line-clamp-2">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xl font-bold">${product.price}</span>
        <button
          onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}
          className="rounded bg-indigo-600 px-3 py-1 text-white"
        >
          Add to cart
        </button>
      </div>
      <Link to={`/products/${product._id}`} className="mt-3 block text-sm text-indigo-600">View details</Link>
    </article>
  );
};

export default ProductCard;
