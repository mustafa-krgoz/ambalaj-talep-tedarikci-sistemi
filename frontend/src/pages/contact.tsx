import { useState } from 'react';
import Head from 'next/head';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
  Stack,
  Paper,
  Alert
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  CheckCircle as SuccessIcon
} from '@mui/icons-material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const primaryColor = '#1a365d';
const secondaryColor = '#2c5282';

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>İletişim | Paketera</title>
        <meta name="description" content="Paketera ile iletişime geçin" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <Box sx={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        color: 'white',
        py: 10,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ 
            fontWeight: 800, 
            mb: 2,
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            Bizimle İletişime Geçin
          </Typography>
          <Typography variant="h5" sx={{ 
            opacity: 0.9,
            maxWidth: 800,
            mx: 'auto',
            fontSize: isMobile ? '1.1rem' : '1.3rem'
          }}>
            Sorularınız, önerileriniz veya işbirliği teklifleriniz için bize ulaşabilirsiniz
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Flexbox Layout instead of Grid */}
        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 6,
          mb: 8
        }}>
          {/* Contact Form - Left Side */}
          <Box sx={{ 
            width: isMobile ? '100%' : '50%',
            flexShrink: 0
          }}>
            <Paper elevation={3} sx={{ 
              p: isMobile ? 3 : 4,
              borderRadius: 3,
              height: '100%'
            }}>
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <SuccessIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
                  <Typography variant="h4" gutterBottom>
                    Mesajınız Gönderildi!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    En kısa sürede sizinle iletişime geçeceğiz.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setSubmitted(false)}
                    sx={{
                      backgroundColor: primaryColor,
                      '&:hover': { backgroundColor: secondaryColor },
                      px: 4,
                      py: 1.5
                    }}
                  >
                    Yeni Mesaj Gönder
                  </Button>
                </Box>
              ) : (
                <>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                    Mesaj Gönder
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Adınız Soyadınız"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Email Adresiniz"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Telefon Numaranız"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Mesajınız"
                        name="message"
                        multiline
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={<SendIcon />}
                        sx={{
                          backgroundColor: primaryColor,
                          '&:hover': { backgroundColor: secondaryColor },
                          py: 1.5,
                          borderRadius: 2,
                          fontSize: '1rem',
                          fontWeight: 600,
                          mt: 2
                        }}
                      >
                        {loading ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                      </Button>
                    </Stack>
                  </form>
                </>
              )}
            </Paper>
          </Box>

          {/* Contact Info - Right Side */}
          <Box sx={{ 
            width: isMobile ? '100%' : '50%',
            flexShrink: 0
          }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              İletişim Bilgilerimiz
            </Typography>
            
            <Paper elevation={3} sx={{ 
              p: isMobile ? 3 : 4,
              borderRadius: 3,
              flexGrow: 1,
              backgroundColor: 'rgba(26, 54, 93, 0.03)'
            }}>
              <Stack spacing={4}>
                {/* Contact Item 1 */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{
                    backgroundColor: 'rgba(26, 54, 93, 0.1)',
                    borderRadius: '50%',
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    flexShrink: 0
                  }}>
                    <EmailIcon sx={{ fontSize: 30, color: primaryColor }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Email Adresimiz
                    </Typography>
                    <Typography variant="body1">
                      info@paketera.com
                    </Typography>
                    <Typography variant="body1">
                      destek@paketera.com
                    </Typography>
                  </Box>
                </Box>

                {/* Contact Item 2 */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{
                    backgroundColor: 'rgba(26, 54, 93, 0.1)',
                    borderRadius: '50%',
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    flexShrink: 0
                  }}>
                    <PhoneIcon sx={{ fontSize: 30, color: primaryColor }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Telefon Numaramız
                    </Typography>
                    <Typography variant="body1">
                      +90 212 123 45 67
                    </Typography>
                    <Typography variant="body1">
                      +90 555 123 45 67 (WhatsApp)
                    </Typography>
                  </Box>
                </Box>

                {/* Contact Item 3 */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{
                    backgroundColor: 'rgba(26, 54, 93, 0.1)',
                    borderRadius: '50%',
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    flexShrink: 0
                  }}>
                    <LocationIcon sx={{ fontSize: 30, color: primaryColor }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Ofis Adresimiz
                    </Typography>
                    <Typography variant="body1">
                      Paketera Plaza
                    </Typography>
                    <Typography variant="body1">
                      Maslak Mahallesi, Dereboyu Caddesi No:123
                    </Typography>
                    <Typography variant="body1">
                      34485 Sarıyer/İstanbul
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              <Divider sx={{ my: 4 }} />

              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Çalışma Saatlerimiz
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'].map(day => (
                    <Chip 
                      key={day}
                      label={day}
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Box>
                <Typography variant="body1">
                  09:00 - 18:00
                </Typography>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Cumartesi ve Pazar günleri kapalıyız
                </Alert>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Map Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            Harita Üzerinde Bizi Bulun
          </Typography>
          <Box sx={{
            height: isMobile ? 300 : 400,
            width: '100%',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: theme.shadows[4],
            border: `1px solid ${theme.palette.divider}`
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.674357832899!2d29.02101531572304!3d41.04425842470896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a24975fe5d%3A0x4b8d9a0a6e8a4a4a!2sMaslak%2C%20Istanbul!5e0!3m2!1sen!2str!4v1620000000000!5m2!1sen!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </Box>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default ContactPage;