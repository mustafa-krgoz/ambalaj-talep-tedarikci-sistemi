// src/pages/index.tsx

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  Star as StarIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  ArrowForward as ArrowForwardIcon,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customTheme = {
  primary: '#1a365d',
  secondary: '#4c51bf',
  lightBlue: '#ebf8ff',
  darkBlue: '#2c5282'
};

const HomePage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');

  const handleLoginRedirect = () => router.push('/login');
  const handleRegisterRedirect = () => router.push('/register');
  const handleRequestRedirect = () => router.push('/customer/create-request');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // ✅ Giriş sonrası başarı mesajı
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('login') === 'success') {
      toast.success('Giriş başarılı! 👋');
    }
  }, []);

  const trendingProducts = [
    {
      id: 1,
      name: 'Karton Poşetler',
      category: 'Poşetler',
      rating: 4.9,
      suppliers: 2724,
      image: '/icons/karton-posetler.png'
    },
    {
      id: 2,
      name: 'Influencer Kutuları',
      category: 'Kutular',
      rating: 4.8,
      suppliers: 3657,
      image: '/icons/influencer-kutulari.png'
    },
    {
      id: 3,
      name: 'Kargo Poşetleri',
      category: 'Poşetler',
      rating: 4.7,
      suppliers: 8893,
      image: '/icons/kargo-posetleri.png'
    },
    {
      id: 4,
      name: 'Özel Ambalaj',
      category: 'Özel Ürünler',
      rating: 4.9,
      suppliers: 3263,
      image: '/icons/ambalaj-urunleri.png'
    },
  ];

  const productCategories = [
    { name: 'Karton Kutular', icon: '📦', count: 1254 },
    { name: 'Plastik Poşetler', icon: '🛍️', count: 876 },
    { name: 'Paketleme Malzemeleri', icon: '📦', count: 543 },
    { name: 'Kullan-at Ürünler', icon: '🗑️', count: 765 },
    { name: 'Ambalaj Bantları', icon: '🎀', count: 432 },
    { name: 'Özel Tasarımlar', icon: '🎨', count: 321 },
  ];

  const formatNumber = (num: number): string =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return (
    <>
      <Head>
        <title>Paketera | Profesyonel Ambalaj Tedarik Platformu</title>
        <meta name="description" content="Ambalaj ihtiyaçlarınız için en uygun tedarikçileri bulun" />
      </Head>

      <ToastContainer />

      {/* === Navbar === */}
      <AppBar position="static" sx={{ backgroundColor: customTheme.primary }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', color: 'white', mr: 4 }}
            >
              Paketera
            </Typography>

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                <Button color="inherit">Ana Sayfa</Button>
                <Button color="inherit">Nasıl Çalışır?</Button>
                <Button color="inherit">Tedarikçiler</Button>
                <Button color="inherit">Ürünler</Button>
                <Button color="inherit">İletişim</Button>
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {isMobile ? (
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <Button variant="outlined" onClick={handleLoginRedirect} sx={{
                  mr: 2, color: 'white', borderColor: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}>
                  Giriş Yap
                </Button>
                <Button variant="contained" onClick={handleRegisterRedirect} sx={{
                  backgroundColor: customTheme.secondary,
                  '&:hover': { backgroundColor: '#5a67d8' }
                }}>
                  Kayıt Ol
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* === Hero === */}
      <Box sx={{ py: 10, px: 2, backgroundColor: customTheme.primary, color: 'white' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Ambalaj İhtiyacınız, Kapınıza Gelsin
          </Typography>
          <Typography variant="h6" gutterBottom>
            İhtiyacınız olan ambalaj ürünleri için kolayca talep oluşturun, tedarikçiler size ulaşsın.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
            <TextField
              fullWidth
              placeholder="Hangi ambalaj ürününü arıyorsunuz?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: { backgroundColor: 'white', borderRadius: 1 }
              }}
            />
            <Button
              onClick={handleSearch}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: customTheme.secondary,
                '&:hover': { backgroundColor: '#5a67d8' },
                px: 4
              }}
            >
              Ara
            </Button>
          </Box>
        </Container>
      </Box>

      {/* === Trend Ürünler === */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
            Haftanın Trend Ambalaj Ürünleri
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', mt: 6 }}>
            {trendingProducts.map(product => (
              <Card key={product.id} sx={{
                width: 280, transition: '0.3s', '&:hover': { boxShadow: 6 }
              }}>
                <Box component="img" src={product.image} alt={product.name} sx={{ height: 180, width: '100%', objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{product.category}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <StarIcon fontSize="small" sx={{ color: '#facc15', mr: 1 }} />
                    <Typography variant="body2">{product.rating} ({formatNumber(product.suppliers)} tedarikçi)</Typography>
                  </Box>
                </CardContent>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleRequestRedirect}
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      backgroundColor: customTheme.primary,
                      '&:hover': { backgroundColor: customTheme.darkBlue }
                    }}
                  >
                    Teklif Al
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* === Kategoriler === */}
      <Box sx={{ py: 8, backgroundColor: '#f7fafc' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
            Popüler Ambalaj Kategorileri
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mt: 6 }}>
            {productCategories.map((category, index) => (
              <Card key={index} sx={{ width: 220, textAlign: 'center', py: 3 }}>
                <Typography variant="h3">{category.icon}</Typography>
                <Typography variant="h6" fontWeight={600}>{category.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatNumber(category.count)} tedarikçi
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* === Footer === */}
      <Box sx={{ py: 6, backgroundColor: customTheme.primary, color: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 6 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight={700}>Paketera</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Paketera, ambalaj ihtiyaçlarınız için tedarikçi bulma platformudur.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <IconButton sx={{ color: 'white' }}><Facebook /></IconButton>
                <IconButton sx={{ color: 'white' }}><Twitter /></IconButton>
                <IconButton sx={{ color: 'white' }}><LinkedIn /></IconButton>
                <IconButton sx={{ color: 'white' }}><Instagram /></IconButton>
              </Box>
              <Typography variant="body2" sx={{ mt: 2 }}>© {new Date().getFullYear()} Paketera</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;