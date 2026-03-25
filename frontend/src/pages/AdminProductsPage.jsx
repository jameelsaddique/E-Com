import { useEffect, useState } from 'react';
import api from '../services/api';

const emptyForm = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  image: ''
};

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const loadProducts = async () => {
    const { data } = await api.get('/products');
    setProducts(data.products);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();
    await api.post('/products', form);
    setForm(emptyForm);
    loadProducts();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={createProduct} className="space-y-3 rounded border bg-white p-4">
        <h2 className="text-xl font-semibold">Add Product</h2>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            value={form[key]}
            onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
            placeholder={key}
            className="w-full rounded border p-2"
          />
        ))}
        <button className="w-full rounded bg-indigo-600 p-2 text-white">Save Product</button>
      </form>
      <section className="space-y-3">
        {products.map((product) => (
          <article key={product._id} className="flex items-center justify-between rounded border bg-white p-3">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-slate-600">${product.price}</p>
            </div>
            <button onClick={() => deleteProduct(product._id)} className="text-red-500">Delete</button>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AdminProductsPage;
