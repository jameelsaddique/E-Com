import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register as registerUser } from '../features/auth/authSlice';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  return (
    <form onSubmit={handleSubmit((values) => dispatch(registerUser(values)))} className="mx-auto max-w-md space-y-3 rounded border bg-white p-6">
      <h1 className="text-2xl font-bold">Register</h1>
      <input {...register('name')} placeholder="Name" className="w-full rounded border p-2" />
      <input {...register('email')} placeholder="Email" className="w-full rounded border p-2" />
      <input {...register('password')} type="password" placeholder="Password" className="w-full rounded border p-2" />
      <button className="w-full rounded bg-indigo-600 p-2 text-white">Register</button>
      <p className="text-sm">Already have account? <Link className="text-indigo-600" to="/login">Login</Link></p>
    </form>
  );
};

export default RegisterPage;
