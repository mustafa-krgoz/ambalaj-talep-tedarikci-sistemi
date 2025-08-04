import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '../components/common/Button';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await axios.post('http://localhost:3000/auth/register', {
        fullName,
        email,
        password,
        role,
      });

      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kayıt işlemi başarısız.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Kayıt Ol | Paketera</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-3">Paketera</h2>
          <p className="text-base text-center text-gray-600 mb-6">
            Ambalaj Talep ve Tedarikçi Bildirim Sistemine Katılın
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol Seçimi</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="customer">Müşteri</option>
                <option value="supplier">Tedarikçi</option>
              </select>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
            </Button>
          </form>

          <div className="mt-6 text-sm text-center">
            <span className="text-gray-600">Zaten hesabınız var mı? </span>
            <Link href="/login" className="text-blue-700 font-semibold hover:underline">
              Giriş Yap
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-6 text-center">
            © {new Date().getFullYear()} Paketera. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </>
  );
}