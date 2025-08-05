// src/pages/login.tsx

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
  useMediaQuery
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Giriş başarısız.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userId', data.user.id);

      toast.success('Giriş başarılı! Hoş geldiniz 👋');
      router.push('/');
    } catch (err: any) {
      toast.error(err.message || 'Giriş sırasında bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Paketera | Giriş Yap</title>
        <meta name="description" content="Paketera hesabınıza giriş yapın" />
      </Head>

      <Box sx={{ backgroundColor: 'white', boxShadow: 1 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
            <Link href="/" passHref>
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Image src="/icons/paketera.png" alt="Paketera Logo" width={140} height={40} priority />
              </Box>
            </Link>
            <Typography variant="body1" color="text.secondary">
              Hesabınız yok mu?{' '}
              <Link href="/register" passHref>
                <Typography component="span" sx={{ color: theme.palette.primary.main, fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  Kayıt Ol
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Button startIcon={<ArrowBackIcon />} sx={{ alignSelf: 'flex-start', mb: 2 }} onClick={() => router.back()}>
            Geri Dön
          </Button>
          <Typography variant="h4" fontWeight={700} mb={2} textAlign="center">
            Paketera'ya Giriş Yap
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth={400} mb={4}>
            Ambalaj ihtiyaçlarınız için tedarikçi bulma platformuna erişmek için giriş yapın
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="E-posta Adresi"
            variant="outlined"
            margin="normal"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            label="Şifre"
            variant="outlined"
            margin="normal"
            required
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <FormControlLabel control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />} label="Beni Hatırla" />
            <Link href="/forgot-password" passHref>
              <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                Şifremi Unuttum?
              </Typography>
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isLoading}
            sx={{ py: 2, fontSize: '1rem', fontWeight: 600, mb: 3 }}
          >
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary">VEYA</Typography>
          </Divider>

          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 4 }}>
            <Button fullWidth variant="outlined" color="inherit" size="large">Google ile Giriş Yap</Button>
            <Button fullWidth variant="outlined" color="inherit" size="large">Apple ile Giriş Yap</Button>
          </Box>

          <Typography variant="body2" color="text.secondary" align="center">
            Hesabınız yok mu?{' '}
            <Link href="/register" passHref>
              <Typography component="span" sx={{ color: theme.palette.primary.main, fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                Kayıt Olun
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Container>

      <Box sx={{ backgroundColor: theme.palette.grey[100], py: 4, mt: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Paketera. Tüm hakları saklıdır.
          </Typography>
        </Container>
      </Box>
    </>
  );
}