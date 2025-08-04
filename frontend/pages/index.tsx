import { useRouter } from 'next/router';
import Head from 'next/head';

export default function HomePage() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Paketera</title>
      </Head>

      <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-4">Paketera’ya Hoş Geldiniz</h1>
        <p className="text-lg mb-6 text-center max-w-xl">
          Ambalaj Talep ve Tedarikçi Bildirim Sistemi’ne giriş yaparak taleplerinizi yönetin veya karşılayın.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="bg-white text-blue-900 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Giriş Yap
        </button>
      </div>
    </>
  );
}