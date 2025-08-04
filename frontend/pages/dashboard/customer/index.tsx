import Head from 'next/head';
import { logoutUser } from '../../../utils/logout';

export default function CustomerDashboard() {
  return (
    <>
      <Head>
        <title>Müşteri Paneli | Paketera</title>
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Üst Bar */}
        <header className="bg-blue-800 text-white py-4 shadow">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Paketera Müşteri Paneli</h1>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hoşgeldiniz, Müşteri!</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-white p-6 rounded shadow hover:shadow-md transition cursor-pointer"
              onClick={() => window.location.href = '/dashboard/customer/create-request'}
            >
              <h3 className="text-lg font-medium text-blue-800 mb-2">Yeni Talep Oluştur</h3>
              <p className="text-sm text-gray-600">Yeni ambalaj talebi oluşturmak için tıklayın.</p>
            </div>

            <div
              className="bg-white p-6 rounded shadow hover:shadow-md transition cursor-pointer"
              onClick={() => window.location.href = '/dashboard/customer/requests'}
            >
              <h3 className="text-lg font-medium text-blue-800 mb-2">Talep Geçmişi</h3>
              <p className="text-sm text-gray-600">Geçmiş taleplerinizi ve durumlarını görüntüleyin.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}