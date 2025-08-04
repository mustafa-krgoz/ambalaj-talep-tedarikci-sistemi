import Head from 'next/head';
import { logoutUser } from '../../../utils/logout';

export default function AdminDashboard() {
  return (
    <>
      <Head>
        <title>Admin Paneli | Paketera</title>
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Üst Bar */}
        <header className="bg-blue-800 text-white py-4 shadow">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Paketera Admin Paneli</h1>
            <button
              onClick={logoutUser}
              className="text-sm bg-white text-blue-800 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Çıkış Yap
            </button>
          </div>
        </header>

        {/* İçerik */}
        <main className="max-w-7xl mx-auto py-10 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hoşgeldiniz, Admin!</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Kullanıcılar</h3>
              <p className="text-sm text-gray-600">
                Sisteme kayıtlı tüm kullanıcıları görüntüleyin ve yönetin.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Tedarikçiler</h3>
              <p className="text-sm text-gray-600">
                Tedarikçi profillerini ve bildirim geçmişlerini inceleyin.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Talepler</h3>
              <p className="text-sm text-gray-600">
                Ambalaj taleplerini görüntüleyin, onaylayın veya reddedin.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}