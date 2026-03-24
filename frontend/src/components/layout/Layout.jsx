import Header from './Header';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <Header />
    <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
  </div>
);

export default Layout;
