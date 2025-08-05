import { useState } from 'react';
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
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import Image from 'next/image';

const HomePage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');

  const handleLoginRedirect = () => router.push('/login');
  const handleRegisterRedirect = () => router.push('/register');
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const trendingProducts = [
    {
      id: 1,
      name: 'Karton Kutu',
      category: 'Ambalaj',
      rating: 4.9,
      suppliers: 2724,
      image: '/images/cardboard-box.jpg'
    },
    {
      id: 2,
      name: 'Plastik Ambalaj',
      category: 'Poşetler',
      rating: 4.8,
      suppliers: 3657,
      image: '/images/plastic-bags.jpg'
    },
    {
      id: 3,
      name: 'Strafor Paketleme',
      category: 'Koruyucu Malzemeler',
      rating: 4.7,
      suppliers: 8893,
      image: '/images/foam-packaging.jpg'
    },
    {
      id: 4,
      name: 'Özel Ambalaj',
      category: 'Özel Ürünler',
      rating: 4.9,
      suppliers: 3263,
      image: '/images/custom-packaging.jpg'
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

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <>
      <Head>
        <title>Paketera | Profesyonel Ambalaj Tedarik Platformu</title>
        <meta name="description" content="Ambalaj ihtiyaçlarınız için en uygun tedarikçileri bulun" />
      </Head>

      {/* Navbar */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
              <Image 
                src="/icons/paketera.png" 
                alt="Paketera Logo" 
                width={160} 
                height={50} 
                priority
              />
            </Box>

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
                <Button color="inherit">Ana Sayfa</Button>
                <Button color="inherit">Nasıl Çalışır?</Button>
                <Button color="inherit">Tedarikçiler</Button>
                <Button color="inherit">Ürünler</Button>
                <Button color="inherit">İletişim</Button>
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isMobile ? (
                <IconButton color="inherit">
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ mr: 2 }}
                    onClick={handleLoginRedirect}
                  >
                    Giriş Yap
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleRegisterRedirect}
                  >
                    Kayıt Ol
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Box sx={{
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          py: 10,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Container maxWidth="xl">
            <Box sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              gap: 4
            }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  Ambalaj İhtiyacınız, Kapınıza Gelsin
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                  İhtiyacınız olan ambalaj ürünleri için kolayca talep oluşturun, tedarikçiler size ulaşsın.
                </Typography>
                
                <Box sx={{ display: 'flex', maxWidth: 800 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Hangi ambalaj ürününü arıyorsunuz?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                      style: {
                        backgroundColor: 'white',
                        borderRadius: theme.shape.borderRadius
                      }
                    }}
                    sx={{ mr: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={handleSearch}
                    sx={{
                      px: 4,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Ara
                  </Button>
                </Box>
              </Box>
              <Box sx={{
                flex: 1,
                position: 'relative',
                height: 400,
                borderRadius: theme.shape.borderRadius,
                overflow: 'hidden',
                boxShadow: theme.shadows[10]
              }}>
                <Image
                  src="/images/packaging-hero.jpg"
                  alt="Ambalaj Ürünleri"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Categories Section */}
        <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
          <Container maxWidth="xl">
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
              Popüler Ambalaj Kategorileri
            </Typography>
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              justifyContent: 'center'
            }}>
              {productCategories.map((category, index) => (
                <Card key={index} sx={{
                  width: isMobile ? '100%' : '30%',
                  minWidth: 200,
                  maxWidth: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[6]
                  }
                }}>
                  <Typography variant="h3" sx={{ mb: 1 }}>{category.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{category.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatNumber(category.count)} tedarikçi
                  </Typography>
                </Card>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Trending Products */}
        <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
          <Container maxWidth="xl">
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
              Haftanın Trend Ambalaj Ürünleri
            </Typography>
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              justifyContent: 'center'
            }}>
              {trendingProducts.map((product) => (
                <Card key={product.id} sx={{
                  width: isMobile ? '100%' : '45%',
                  minWidth: 280,
                  maxWidth: 350,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[6]
                  }
                }}>
                  <Box sx={{
                    position: 'relative',
                    height: 200
                  }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {product.category}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <StarIcon color="warning" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">
                        {product.rating} ({formatNumber(product.suppliers)} tedarikçi)
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleLoginRedirect}
                      startIcon={<ShoppingCartIcon />}
                    >
                      Teklif Al
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{
          py: 10,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          textAlign: 'center'
        }}>
          <Container maxWidth="md">
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Ambalaj İhtiyaçlarınız İçin Hemen Başlayın
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Binlerce tedarikçi arasından en uygun fiyatlı ve kaliteli ambalaj çözümlerine ulaşın
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleRegisterRedirect}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.1rem'
              }}
            >
              Ücretsiz Kayıt Ol
            </Button>
          </Container>
        </Box>
      </main>

      {/* Footer */}
      <Box component="footer" sx={{
        py: 6,
        backgroundColor: theme.palette.grey[900],
        color: 'white'
      }}>
        <Container maxWidth="xl">
          <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 4,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Box sx={{ mb: 3 }}>
                <Image 
                  src="/icons/paketera-white.png" 
                  alt="Paketera Logo" 
                  width={160} 
                  height={50} 
                />
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Paketera, ambalaj ihtiyaçlarınız için tedarikçi bulma platformudur.
              </Typography>
              <Typography variant="body2">
                © {new Date().getFullYear()} Paketera. Tüm hakları saklıdır.
              </Typography>
            </Box>

            <Stack spacing={1} sx={{ minWidth: 150 }}>
              <Typography variant="h6">Şirket</Typography>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>Hakkımızda</Button>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>Kariyer</Button>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>Blog</Button>
            </Stack>

            <Stack spacing={1} sx={{ minWidth: 150 }}>
              <Typography variant="h6">Kaynaklar</Typography>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>Nasıl Çalışır?</Button>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>SSS</Button>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>İletişim</Button>
            </Stack>

            <Stack spacing={1} sx={{ minWidth: 150 }}>
              <Typography variant="h6">Yasal</Typography>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>Gizlilik</Button>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>Koşullar</Button>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>Çerezler</Button>
            </Stack>

            <Stack spacing={1} sx={{ minWidth: 200 }}>
              <Typography variant="h6">Bize Ulaşın</Typography>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>info@paketera.com</Button>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>+90 212 123 45 67</Button>
              <Button color="inherit" sx={{ justifyContent: 'flex-start' }}>İstanbul, Türkiye</Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;