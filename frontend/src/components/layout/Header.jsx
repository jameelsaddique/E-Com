import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">E-Com Pro</Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link to="/cart">Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})</Link>
          {user ? (
            <>
              <Link to="/orders">Orders</Link>
              {user.role === 'admin' && <Link to="/admin/products">Admin</Link>}
              <button onClick={onLogout} className="rounded bg-slate-900 px-3 py-1 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
