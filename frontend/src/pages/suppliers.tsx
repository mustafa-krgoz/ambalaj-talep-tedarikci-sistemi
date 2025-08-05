import { useState } from 'react';
import Head from 'next/head';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
  Stack,
  Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  CheckCircle as VerifiedIcon,
  Inventory as InventoryIcon,
  Payments as PaymentsIcon,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const primaryColor = '#1a365d';
const secondaryColor = '#2c5282';

const suppliers = [
  {
    id: 1,
    name: 'Delta Ambalaj',
    location: 'İstanbul, Türkiye',
    rating: 4.8,
    products: ['Karton Kutu', 'Plastik Poşet', 'Kraft Ambalaj', 'Strafor Köpük'],
    yearsActive: 15,
    description: '1998 yılından beri ambalaj sektöründe hizmet veren, ISO 9001 sertifikalı lider üretici.',
    logo: '/images/supplier1.png',
    verified: true,
    minOrder: '₺1.000',
    deliveryTime: '2-5 iş günü',
    productionCapacity: 'Aylık 500.000+ ürün',
    certifications: ['ISO 9001', 'CE', 'FSC']
  },
  {
    id: 2,
    name: 'EkoPak Çözümleri',
    location: 'İzmir, Türkiye',
    rating: 4.5,
    products: ['Eko Poşet', 'Geri Dönüşümlü Kutu', 'Biyobozunur Ambalaj'],
    yearsActive: 8,
    description: 'Çevre dostu ambalaj çözümlerinde uzman, sürdürülebilir üretim yapan firma.',
    logo: '/images/supplier2.png',
    verified: true,
    minOrder: '₺500',
    deliveryTime: '3-7 iş günü',
    productionCapacity: 'Aylık 200.000+ ürün',
    certifications: ['ISO 14001', 'OK Compost']
  },
  {
    id: 3,
    name: 'Plastik Dünyası',
    location: 'Bursa, Türkiye',
    rating: 4.3,
    products: ['Plastik Şişe', 'Plastik Kapak', 'PET Ambalaj'],
    yearsActive: 12,
    description: 'Plastik enjeksiyon ve üfleme kalıp teknolojilerinde uzmanlaşmış üretici.',
    logo: '/images/supplier3.png',
    verified: true,
    minOrder: '₺750',
    deliveryTime: '5-10 iş günü',
    productionCapacity: 'Aylık 350.000+ ürün',
    certifications: ['ISO 9001', 'FDA']
  },
  {
    id: 4,
    name: 'Karton Konsept',
    location: 'Ankara, Türkiye',
    rating: 4.7,
    products: ['Oluklu Mukavva', 'Özel Kesim Kutu', 'Promosyon Ambalaj'],
    yearsActive: 10,
    description: 'Yaratıcı karton ambalaj çözümleri sunan, özel tasarım uzmanı firma.',
    logo: '/images/supplier4.png',
    verified: true,
    minOrder: '₺1.200',
    deliveryTime: '4-8 iş günü',
    productionCapacity: 'Aylık 400.000+ ürün',
    certifications: ['ISO 9001', 'FSC']
  },
  {
    id: 5,
    name: 'Metal Ambalaj Ltd.',
    location: 'Kocaeli, Türkiye',
    rating: 4.6,
    products: ['Teneke Kutu', 'Metal Kapak', 'Özel Metal Ambalaj'],
    yearsActive: 18,
    description: 'Gıda ve endüstriyel metal ambalaj sektöründe deneyimli üretici.',
    logo: '/images/supplier5.png',
    verified: true,
    minOrder: '₺2.000',
    deliveryTime: '7-14 iş günü',
    productionCapacity: 'Aylık 600.000+ ürün',
    certifications: ['ISO 9001', 'ISO 22000']
  }
];

const SuppliersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const visibleSuppliers = filteredSuppliers.slice(currentIndex, currentIndex + (isMobile ? 1 : 3));

  const handleNext = () => {
    setCurrentIndex(prev => (prev + (isMobile ? 1 : 3) >= filteredSuppliers.length ? 0 : prev + (isMobile ? 1 : 3)));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - (isMobile ? 1 : 3) < 0 ? 
      filteredSuppliers.length - (isMobile ? 1 : 3) : 
      prev - (isMobile ? 1 : 3)));
  };

  return (
    <>
      <Head>
        <title>Tedarikçiler | Paketera</title>
        <meta name="description" content="Kaliteli ambalaj tedarikçilerini keşfedin" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <Box sx={{
        backgroundColor: primaryColor,
        color: 'white',
        py: 12,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ 
            fontWeight: 800, 
            mb: 3,
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            position: 'relative',
            zIndex: 1
          }}>
            Güvenilir Tedarikçi Ağımız
          </Typography>
          <Typography variant="h5" sx={{ 
            opacity: 0.95, 
            maxWidth: 800, 
            mx: 'auto',
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            position: 'relative',
            zIndex: 1
          }}>
            Sektörün önde gelen {suppliers.length}+ ambalaj üreticisi ve tedarikçisiyle çalışıyoruz
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Search Section */}
        <Box sx={{ 
          mb: 6, 
          maxWidth: 800, 
          mx: 'auto',
          position: 'relative'
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tedarikçi adı, ürün veya lokasyon ara..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentIndex(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="medium" />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'background.paper',
                borderRadius: 3,
                height: 56,
                boxShadow: theme.shadows[3],
                '&:hover': {
                  boxShadow: theme.shadows[6]
                }
              }
            }}
          />
        </Box>

        {/* Suppliers Slider */}
        <Box sx={{ 
          position: 'relative',
          mb: 8,
          px: isMobile ? 0 : 4
        }}>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': {
                backgroundColor: 'white'
              },
              boxShadow: 3,
              display: filteredSuppliers.length <= (isMobile ? 1 : 3) ? 'none' : 'flex'
            }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>

          <Box sx={{
            display: 'flex',
            gap: 4,
            overflow: 'hidden',
            justifyContent: 'center',
            mx: 'auto',
            width: 'fit-content'
          }}>
            {visibleSuppliers.map((supplier) => (
              <Card key={supplier.id} sx={{
                width: isMobile ? '100%' : 380,
                minHeight: 480,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                border: `1px solid ${theme.palette.divider}`,
                flexShrink: 0,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 10px 25px -5px rgba(0,0,0,0.1), 0 5px 10px -5px ${primaryColor}40`,
                  borderColor: primaryColor
                }
              }}>
                {/* Supplier Header */}
                <Box sx={{ 
                  backgroundColor: primaryColor,
                  color: 'white',
                  p: 3,
                  position: 'relative'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        supplier.verified ? 
                        <VerifiedIcon color="success" fontSize="small" /> : null
                      }
                    >
                      <Avatar
                        src={supplier.logo}
                        alt={supplier.name}
                        sx={{
                          width: 60,
                          height: 60,
                          border: '2px solid white',
                          bgcolor: 'background.paper'
                        }}
                      >
                        <InventoryIcon fontSize="large" />
                      </Avatar>
                    </Badge>
                    <Box sx={{ ml: 3 }}>
                      <Typography variant="h6" fontWeight={700}>
                        {supplier.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <LocationIcon fontSize="small" sx={{ opacity: 0.8 }} />
                        <Typography variant="body2" sx={{ ml: 1, opacity: 0.9 }}>
                          {supplier.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 4
                  }}>
                    <StarIcon sx={{ color: '#ffc107', fontSize: '1.1rem', mr: 0.5 }} />
                    <Typography variant="body2" fontWeight={600}>
                      {supplier.rating}
                    </Typography>
                  </Box>
                </Box>

                {/* Supplier Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {supplier.description}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  {/* Supplier Details */}
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Uzmanlık Alanları:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {supplier.products.map((product, index) => (
                          <Chip
                            key={index}
                            label={product}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(26, 54, 93, 0.1)',
                              color: primaryColor,
                              fontWeight: 500
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          <PaymentsIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Min. Sipariş:
                        </Typography>
                        <Typography variant="body2">
                          {supplier.minOrder}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          <InventoryIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Kapasite:
                        </Typography>
                        <Typography variant="body2">
                          {supplier.productionCapacity}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Sertifikalar:
                      </Typography>
                      <Typography variant="body2">
                        {supplier.certifications.join(', ')}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>

          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': {
                backgroundColor: 'white'
              },
              boxShadow: 3,
              display: filteredSuppliers.length <= (isMobile ? 1 : 3) ? 'none' : 'flex'
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        </Box>

        {/* Stats Section */}
        <Box sx={{ 
          backgroundColor: 'rgba(26, 54, 93, 0.05)',
          borderRadius: 4,
          p: 4,
          mt: 4,
          border: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
            Tedarikçi Ağımızın Gücü
          </Typography>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
            mt: 4
          }}>
            <Box sx={{ textAlign: 'center', minWidth: 150 }}>
              <Typography variant="h3" fontWeight={800} color={primaryColor}>
                {suppliers.length}+
              </Typography>
              <Typography variant="subtitle1">
                Tedarikçi
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', minWidth: 150 }}>
              <Typography variant="h3" fontWeight={800} color={primaryColor}>
                50+
              </Typography>
              <Typography variant="subtitle1">
                Ürün Kategorisi
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', minWidth: 150 }}>
              <Typography variant="h3" fontWeight={800} color={primaryColor}>
                100+
              </Typography>
              <Typography variant="subtitle1">
                Sertifikalar
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', minWidth: 150 }}>
              <Typography variant="h3" fontWeight={800} color={primaryColor}>
                15+
              </Typography>
              <Typography variant="subtitle1">
                Ülke
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default SuppliersPage;