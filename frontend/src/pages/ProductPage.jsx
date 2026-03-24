import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import api from '../services/api';
import Loader from '../components/common/Loader';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <img src={product.image} alt={product.name} className="w-full rounded-xl" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-slate-600">{product.description}</p>
        <p className="mt-4 text-2xl font-semibold">${product.price}</p>
        <button
          onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}
          className="mt-5 rounded bg-indigo-600 px-4 py-2 text-white"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
