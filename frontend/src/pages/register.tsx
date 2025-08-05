import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  useTheme,
  useMediaQuery,
  FormHelperText
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Business as BusinessIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    passwordMatch: false,
    passwordLength: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'acceptTerms' ? checked : value
    }));

    // Şifre validasyonu
    if (name === 'password' || name === 'confirmPassword') {
      setErrors({
        passwordMatch: name === 'confirmPassword' 
          ? value !== formData.password
          : formData.confirmPassword !== value,
        passwordLength: name === 'password' 
          ? value.length > 0 && value.length < 8
          : errors.passwordLength
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Form validasyonu
    if (errors.passwordMatch || errors.passwordLength || !formData.acceptTerms) {
      setIsLoading(false);
      return;
    }

    // Kayıt işlemleri burada
    console.log(formData);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/'); // Başarılı kayıtta ana sayfaya yönlendir
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Paketera | Kayıt Ol</title>
        <meta name="description" content="Paketera'ya kaydolun ve ambalaj tedarikçilerine ulaşın" />
      </Head>

      {/* Navbar (Basitleştirilmiş) */}
      <Box sx={{ backgroundColor: 'white', boxShadow: 1 }}>
        <Container maxWidth="xl">
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2
          }}>
            <Link href="/" passHref>
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Image 
                  src="/icons/paketera.png" 
                  alt="Paketera Logo" 
                  width={140} 
                  height={40} 
                  priority
                />
              </Box>
            </Link>
            <Typography variant="body1" color="text.secondary">
              Zaten hesabınız var mı?{' '}
              <Link href="/login" passHref>
                <Typography 
                  component="span" 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Giriş Yap
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Ana İçerik */}
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mb: 4
        }}>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ alignSelf: 'flex-start', mb: 2 }}
            onClick={() => router.back()}
          >
            Geri Dön
          </Button>
          
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 700,
            mb: 2,
            textAlign: 'center'
          }}>
            Paketera'ya Kayıt Ol
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ 
            textAlign: 'center',
            maxWidth: 400,
            mb: 4
          }}>
            Ambalaj ihtiyaçlarınız için tedarikçi bulma platformuna erişmek için hesap oluşturun
          </Typography>
        </Box>

        {/* Kayıt Formu */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Ad Soyad"
            variant="outlined"
            margin="normal"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="E-posta Adresi"
            variant="outlined"
            margin="normal"
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Şirket Adı (Opsiyonel)"
            variant="outlined"
            margin="normal"
            name="company"
            value={formData.company}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Şifre"
            variant="outlined"
            margin="normal"
            required
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.passwordLength}
            helperText={errors.passwordLength ? "Şifre en az 8 karakter olmalıdır" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Şifre Tekrar"
            variant="outlined"
            margin="normal"
            required
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.passwordMatch}
            helperText={errors.passwordMatch ? "Şifreler eşleşmiyor" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.acceptTerms} 
                onChange={handleChange} 
                name="acceptTerms"
                color="primary"
                required
              />
            }
            label={
              <Typography variant="body2">
                <Link href="/terms" passHref>
                  <Typography 
                    component="span" 
                    sx={{ 
                      color: theme.palette.primary.main,
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Kullanım koşullarını
                  </Typography>
                </Link> kabul ediyorum
              </Typography>
            }
            sx={{ mb: 4 }}
          />
          
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isLoading || errors.passwordMatch || errors.passwordLength || !formData.acceptTerms}
            sx={{
              py: 2,
              fontSize: '1rem',
              fontWeight: 600,
              mb: 3
            }}
          >
            {isLoading ? 'Hesap Oluşturuluyor...' : 'Kayıt Ol'}
          </Button>
          
          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary">
              VEYA
            </Typography>
          </Divider>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            gap: 2,
            mb: 4
          }}>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                py: 1.5,
                borderColor: theme.palette.grey[300],
                color: theme.palette.text.primary,
                fontWeight: 500
              }}
            >
              Google ile Kayıt Ol
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                py: 1.5,
                borderColor: theme.palette.grey[300],
                color: theme.palette.text.primary,
                fontWeight: 500
              }}
            >
              Apple ile Kayıt Ol
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" align="center">
            Zaten hesabınız var mı?{' '}
            <Link href="/login" passHref>
              <Typography 
                component="span" 
                sx={{ 
                  color: theme.palette.primary.main, 
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Giriş Yapın
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Footer (Basitleştirilmiş) */}
      <Box sx={{ 
        backgroundColor: theme.palette.grey[100],
        py: 4,
        mt: 8
      }}>
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Paketera. Tüm hakları saklıdır.
          </Typography>
        </Container>
      </Box>
    </>
  );
}