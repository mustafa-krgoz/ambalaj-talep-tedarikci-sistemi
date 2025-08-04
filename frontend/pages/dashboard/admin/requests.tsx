import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

interface Request {
  id: string;
  customerName: string;
  product: string;
  quantity: number;
  status: string;
  createdAt: string;
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
      } catch (err: any) {
        setError('Talepler alınırken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      <Head>
        <title>Admin | Gelen Talepler</title>
      </Head>

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">Gelen Talepler</h1>

          {isLoading && (
            <div className="text-center text-blue-600 font-medium">Yükleniyor...</div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
          )}

          {!isLoading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Müşteri</th>
                    <th className="py-3 px-4 text-left">Ürün</th>
                    <th className="py-3 px-4 text-left">Adet</th>
                    <th className="py-3 px-4 text-left">Durum</th>
                    <th className="py-3 px-4 text-left">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, index) => (
                    <tr
                      key={req.id}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{req.customerName}</td>
                      <td className="py-3 px-4">{req.product}</td>
                      <td className="py-3 px-4">{req.quantity}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            req.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : req.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(req.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {requests.length === 0 && (
                <div className="text-center text-gray-500 mt-4">
                  Henüz bir talep yok.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}