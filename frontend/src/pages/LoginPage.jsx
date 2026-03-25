import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../features/auth/authSlice';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  return (
    <form onSubmit={handleSubmit((values) => dispatch(login(values)))} className="mx-auto max-w-md space-y-3 rounded border bg-white p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <input {...register('email')} placeholder="Email" className="w-full rounded border p-2" />
      <input {...register('password')} type="password" placeholder="Password" className="w-full rounded border p-2" />
      <button className="w-full rounded bg-slate-900 p-2 text-white">Login</button>
      <p className="text-sm">No account? <Link className="text-indigo-600" to="/register">Register</Link></p>
    </form>
  );
};

export default LoginPage;
