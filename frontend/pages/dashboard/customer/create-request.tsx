import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CreateRequestPage() {
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:3000/requests', {
        productType,
        description,
        date,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccess(true);
      setTimeout(() => router.push('/dashboard/customer'), 2000);
    } catch (err) {
      alert('Talep oluşturulamadı.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Yeni Talep Oluştur | Paketera</title>
      </Head>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Yeni Ambalaj Talebi</h2>

          {success ? (
            <div className="text-green-700 bg-green-100 p-4 rounded text-center mb-4">
              Talebiniz başarıyla oluşturuldu. Yönlendiriliyorsunuz...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Tipi</label>
                <input
                  type="text"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Talep Tarihi</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 text-white font-semibold rounded-md transition duration-300 ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-800 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Talep Oluştur'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}