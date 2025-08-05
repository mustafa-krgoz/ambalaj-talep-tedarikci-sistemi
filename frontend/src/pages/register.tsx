// src/pages/register.tsx

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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
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
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    companyName: '',
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    passwordMatch: false,
    passwordLength: false
  });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'acceptTerms' ? checked : value
    }));

    if (name === 'password' || name === 'confirmPassword') {
      setErrors({
        passwordMatch:
          name === 'confirmPassword'
            ? value !== formData.password
            : formData.confirmPassword !== value,
        passwordLength:
          name === 'password'
            ? value.length > 0 && value.length < 8
            : errors.passwordLength
      });
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (errors.passwordMatch || errors.passwordLength || !formData.acceptTerms) {
      setIsLoading(false);
      toast.error('Lütfen formu eksiksiz ve doğru doldurun.');
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      companyName: formData.role === 'supplier' ? formData.companyName : null
    };

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Kayıt başarısız.');
      }

      toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message || 'Bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Paketera | Kayıt Ol</title>
        <meta name="description" content="Paketera'ya kaydolun ve ambalaj tedarikçilerine ulaşın" />
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
              Zaten hesabınız var mı?{' '}
              <Link href="/login" passHref>
                <Typography component="span" sx={{ color: theme.palette.primary.main, fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  Giriş Yap
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Button startIcon={<ArrowBackIcon />} sx={{ alignSelf: 'flex-start', mb: 2 }} onClick={() => router.back()}>
            Geri Dön
          </Button>
          <Typography variant="h4" fontWeight={700} mb={2} textAlign="center">
            Paketera'ya Kayıt Ol
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth={400} mb={4}>
            Ambalaj ihtiyaçlarınız için tedarikçi bulma platformuna erişmek için hesap oluşturun
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Ad Soyad"
            variant="outlined"
            margin="normal"
            required
            name="fullName"
            value={formData.fullName}
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

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="role-label">Kullanıcı Rolü</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              label="Kullanıcı Rolü"
              onChange={handleSelectChange}
            >
              <MenuItem value="customer">Müşteri</MenuItem>
              <MenuItem value="supplier">Tedarikçi</MenuItem>
            </Select>
          </FormControl>

          {formData.role === 'supplier' && (
            <TextField
              fullWidth
              label="Şirket Adı"
              variant="outlined"
              margin="normal"
              required
              name="companyName"
              value={formData.companyName}
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
          )}

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
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                  <Typography component="span" sx={{ color: theme.palette.primary.main, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                    Kullanım koşullarını
                  </Typography>
                </Link>{' '}kabul ediyorum
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
            sx={{ py: 2, fontSize: '1rem', fontWeight: 600, mb: 3 }}
          >
            {isLoading ? 'Hesap Oluşturuluyor...' : 'Kayıt Ol'}
          </Button>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary">VEYA</Typography>
          </Divider>

          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 4 }}>
            <Button fullWidth variant="outlined" color="inherit" size="large">Google ile Kayıt Ol</Button>
            <Button fullWidth variant="outlined" color="inherit" size="large">Apple ile Kayıt Ol</Button>
          </Box>

          <Typography variant="body2" color="text.secondary" align="center">
            Zaten hesabınız var mı?{' '}
            <Link href="/login" passHref>
              <Typography component="span" sx={{ color: theme.palette.primary.main, fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                Giriş Yapın
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