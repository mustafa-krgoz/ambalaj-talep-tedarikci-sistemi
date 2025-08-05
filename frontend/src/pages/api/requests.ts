
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { companyName, productType, quantity, details } = req.body;

    const token = req.headers.authorization || '';

    try {
      const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packaging-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // → frontend'den gelen token'ı proxy ediyoruz
        },
        body: JSON.stringify({ companyName, productType, quantity, details }),
      });

      const data = await backendRes.json();

      if (!backendRes.ok) {
        return res.status(backendRes.status).json({ message: data.message || 'Bir hata oluştu.' });
      }

      return res.status(200).json(data);
    } catch (error: any) {
      console.error('❌ Proxy Hatası:', error.message);
      return res.status(500).json({ message: 'Sunucu hatası' });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).json({ message: `Method ${req.method} not allowed.` });
}