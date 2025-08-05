import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  Pagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  LocalShipping as ShippingIcon,
  Nature as EcoIcon,
  Palette as DesignIcon,
} from '@mui/icons-material';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  detailedDescription: string;
  image: string;
  price: string;
  rating: number;
  features: string[];
  tags: string[];
  category: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Karton Poşetler',
    description: 'Doğa dostu ve şık tasarımlı karton poşetlerimizle markanızı yansıtın.',
    detailedDescription: 'Tamamen geri dönüştürülebilir malzemelerden üretilmiş, yüksek dayanıklılığa sahip karton poşetler. Özel tasarım seçenekleriyle markanızı öne çıkarın.',
    image: '/images/karton-posetler.png',
    price: '₺2,50 - ₺12,00',
    rating: 4.8,
    features: ['Ekolojik', 'Özel Baskılı', 'Çeşitli Boyutlar'],
    tags: ['Eko', 'Premium', 'Modüler'],
    category: ['eco', 'premium']
  },
  {
    id: 2,
    name: 'Influencer Kutuları',
    description: 'Etkileyici tanıtımlar için tasarlanan özel kutular.',
    detailedDescription: 'Sosyal medya fenomenleri ve markalar için özel olarak tasarlanmış, açılış anını unutulmaz kılan influencer kutuları. Kişiselleştirilebilir iç dizayn seçenekleri.',
    image: '/images/influencer-kutulari.png',
    price: '₺8,00 - ₺35,00',
    rating: 4.9,
    features: ['Kişiselleştirilebilir', 'Lüks Dizayn', 'Açılış Etkisi'],
    tags: ['Premium', 'Özel Tasarım', 'Lüks'],
    category: ['premium', 'custom']
  },
  {
    id: 3,
    name: 'Kargo Poşetleri',
    description: 'Dayanıklı ve farklı boyutlarda kargo poşetleri.',
    detailedDescription: 'Yüksek dayanıklılığa sahip, su geçirmez özellikte kargo poşetleri. Çeşitli boyut ve renk seçenekleriyle tüm gönderi ihtiyaçlarınız için ideal çözüm.',
    image: '/images/kargo-posetleri.png',
    price: '₺1,20 - ₺5,50',
    rating: 4.7,
    features: ['Su Geçirmez', 'Çoklu Boyut', 'Yırtılmaz'],
    tags: ['Ekonomik', 'Pratik', 'Dayanıklı'],
    category: ['eco']
  },
  {
    id: 4,
    name: 'Özel Ambalaj Ürünleri',
    description: 'Markanıza özel ambalaj çözümleri ve ürünleri.',
    detailedDescription: 'Tamamen markanıza özel tasarlanmış ambalaj çözümleri. Profesyonel tasarım ekibimizle hayalinizdeki ambalajı üretiyoruz.',
    image: '/images/ambalaj-urunleri.png',
    price: 'Özel Fiyatlandırma',
    rating: 4.9,
    features: ['Tam Özelleştirme', 'Profesyonel Tasarım', 'Marka Kimliği'],
    tags: ['Premium', 'Özel', 'Tasarım'],
    category: ['custom', 'premium']
  },
];

const primaryColor = '#1a365d';

export default function ProductsPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleRequestRedirect = (productId: number) => {
    router.push(`/customer/create-request?product=${productId}`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      product.category.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const categories = [
    { id: 'all', name: 'Tüm Ürünler' },
    { id: 'eco', name: 'Ekolojik Ürünler' },
    { id: 'premium', name: 'Premium Ürünler' },
    { id: 'custom', name: 'Özel Tasarımlar' }
  ];

  return (
    <>
      <Head>
        <title>Ürünler | Paketera</title>
        <meta name="description" content="Ambalaj ürünleri detaylarıyla buradan inceleyin." />
      </Head>

      {/* Hero Section */}
      <Box sx={{
        backgroundColor: primaryColor,
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            Ambalaj Ürünlerimiz
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Markanız için en uygun ambalaj çözümlerini keşfedin
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Search and Filter Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            gap: 3,
            alignItems: 'center',
            mb: 4
          }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: 500,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper'
                }
              }}
            />
            
            <Box sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              {categories.map(category => (
                <Chip
                  key={category.id}
                  label={category.name}
                  clickable
                  color={selectedCategory === category.id ? 'primary' : 'default'}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                  sx={{ 
                    px: 2,
                    fontWeight: selectedCategory === category.id ? 600 : 500,
                    backgroundColor: selectedCategory === category.id ? primaryColor : undefined,
                    '&:hover': {
                      backgroundColor: selectedCategory === category.id ? primaryColor : undefined,
                    }
                  }}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />
        </Box>

        {/* Products Grid */}
        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
          mb: 6
        }}>
          {currentProducts.map((product) => (
            <Card 
              key={product.id} 
              sx={{ 
                width: isMobile ? '100%' : 320,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                },
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <Box sx={{ 
                position: 'relative', 
                height: 220,
                width: '100%'
              }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon color="warning" fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {product.rating}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  {product.tags.map(tag => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      sx={{ mr: 1, mb: 1 }} 
                    />
                  ))}
                </Box>
                
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                  mt: 'auto'
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {product.price}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {product.features.includes('Ekolojik') && <EcoIcon color="success" />}
                    {product.features.includes('Kişiselleştirilebilir') && <DesignIcon color="primary" />}
                    {product.features.includes('Su Geçirmez') && <ShippingIcon color="info" />}
                  </Box>
                </Box>
                
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleRequestRedirect(product.id)}
                  sx={{
                    mt: 1,
                    py: 1.5,
                    fontWeight: 600,
                    backgroundColor: primaryColor,
                    '&:hover': {
                      backgroundColor: '#0d2b4e'
                    }
                  }}
                >
                  Talep Oluştur
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              color="primary"
              size={isMobile ? 'small' : 'medium'}
              sx={{
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: primaryColor
                }
              }}
            />
          </Box>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Aradığınız kriterlere uygun ürün bulunamadı
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              sx={{
                borderColor: primaryColor,
                color: primaryColor,
                '&:hover': {
                  borderColor: primaryColor,
                  backgroundColor: 'rgba(26, 54, 93, 0.04)'
                }
              }}
            >
              Filtreleri Temizle
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}