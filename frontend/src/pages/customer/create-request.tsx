import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Stack,
  MenuItem,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Navbar ve Footer importları
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const customTheme = {
  primary: '#1a365d',
  secondary: '#4c51bf',
  darkBlue: '#2c5282',
};

interface ProductType {
  id: string;
  name: string;
}

const CreateRequestPage = () => {
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const [formData, setFormData] = useState({
    productTypeId: '',
    quantity: '',
    preferredSupplier: '',
    additionalDetails: '',
  });

  const [loading, setLoading] = useState(false);

  // ✅ Ürün tiplerini backend'den çek
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await fetch(`${API_BASE}/product-type`);
        const data = await response.json();
        setProductTypes(data);
      } catch (err) {
        toast.error('Ürün tipleri yüklenemedi');
      }
    };
    fetchProductTypes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const customerId = localStorage.getItem('userId');

      if (!token || !customerId) {
        toast.error('Giriş yapmanız gerekiyor.');
        setLoading(false);
        return;
      }

      const payload = {
        customerId,
        items: [
          {
            productTypeId: formData.productTypeId,
            quantity: parseInt(formData.quantity),
          },
        ],
        preferredSupplier: formData.preferredSupplier || null,
        additionalDetails: formData.additionalDetails || null,
      };

      const response = await fetch(`${API_BASE}/packaging-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Bir hata oluştu.');
      }

      toast.success('✅ Talebiniz başarıyla gönderildi!');
      setTimeout(() => router.push('/'), 2000);
    } catch (err: any) {
      toast.error(err.message || 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ambalaj Talebi Oluştur | Paketera</title>
      </Head>

      <ToastContainer position="top-right" />

      <Navbar /> {/* ✅ Navbar eklendi */}

      <Box sx={{ py: 8, backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 5 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Ambalaj Talebi Oluştur
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={4}>
              Ürün bilgilerini girin, tedarikçiler size ulaşsın.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={3}>
                <TextField
                  select
                  label="Ürün Tipi"
                  name="productTypeId"
                  fullWidth
                  required
                  value={formData.productTypeId}
                  onChange={handleChange}
                >
                  {productTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Adet / Miktar"
                  name="quantity"
                  type="number"
                  fullWidth
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                />

                <TextField
                  label="Tercih Ettiğiniz Firma (opsiyonel)"
                  name="preferredSupplier"
                  fullWidth
                  value={formData.preferredSupplier}
                  onChange={handleChange}
                />

                <TextField
                  label="Ek Açıklama"
                  name="additionalDetails"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.additionalDetails}
                  onChange={handleChange}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    backgroundColor: customTheme.primary,
                    '&:hover': { backgroundColor: customTheme.darkBlue },
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Talep Gönder'
                  )}
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Footer /> {/* ✅ Footer eklendi */}
    </>
  );
};

export default CreateRequestPage;