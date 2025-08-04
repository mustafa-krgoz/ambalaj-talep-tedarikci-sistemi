import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

interface Request {
  id: string;
  product: string;
  quantity: number;
  status: string;
  companyName: string;
  createdAt: string;
}

export default function SupplierRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSupplierRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/requests/supplier', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (err: any) {
        setError('Talepler alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierRequests();
  }, []);

  return (
    <>
      <Head>
        <title>Tedarikçi | Taleplerim</title>
      </Head>

      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">Taleplerim</h1>

          {loading && <p className="text-blue-600">Yükleniyor...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto shadow rounded bg-white">
              <table className="min-w-full">
                <thead className="bg-blue-800 text-white text-left text-sm">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Firma</th>
                    <th className="py-3 px-4">Ürün</th>
                    <th className="py-3 px-4">Adet</th>
                    <th className="py-3 px-4">Durum</th>
                    <th className="py-3 px-4">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, index) => (
                    <tr key={req.id} className="border-b hover:bg-gray-50 text-sm">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{req.companyName}</td>
                      <td className="py-3 px-4">{req.product}</td>
                      <td className="py-3 px-4">{req.quantity}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            req.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : req.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
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
                <p className="text-center py-6 text-gray-500">Hiç talep bulunamadı.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}