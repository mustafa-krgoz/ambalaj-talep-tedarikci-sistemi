import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada backend'e istek atılabilir
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Şifremi Unuttum | Paketera</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zm6-4h-2v6h2V7zm0 8h-2v2h2v-2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-blue-900">Şifremi Unuttum</h1>
            <p className="text-sm text-gray-600 mt-2">
              E-posta adresinizi girin, size sıfırlama bağlantısı gönderelim.
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm text-center">
              Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta Adresiniz
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="ornek@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
              >
                Gönder
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-blue-700 hover:underline">
              Giriş sayfasına dön
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6 text-center">
            © {new Date().getFullYear()} Paketera. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </>
  );
}