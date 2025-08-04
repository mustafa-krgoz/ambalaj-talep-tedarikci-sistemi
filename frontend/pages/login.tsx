import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const role = res.data.user.role;
      if (role === 'admin') router.push('/dashboard/admin');
      else if (role === 'customer') router.push('/dashboard/customer');
      else if (role === 'supplier') router.push('/dashboard/supplier');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Paketera | Giriş Yap</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-2">Paketera</h2>
          <p className="text-lg text-center text-gray-600 mb-6">
            Ambalaj Talep ve Tedarikçi Bildirim Sistemi
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                placeholder="ornek@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-white font-semibold text-lg rounded-md transition duration-300 ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>

            <div className="text-right text-sm">
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Şifremi unuttum?
              </Link>
            </div>
          </form>

          <div className="mt-6 text-sm text-center">
            <span className="text-gray-600">Hesabınız yok mu? </span>
            <Link href="/register" className="text-blue-700 font-medium hover:underline">
              Kayıt Ol
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-8 text-center">
            © {new Date().getFullYear()} Paketera. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </>
  );
}