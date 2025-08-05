import { useRouter } from 'next/router';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  useMediaQuery, 
  useTheme,
  Container
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Navbar = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLoginRedirect = () => router.push('/login');
  const handleRegisterRedirect = () => router.push('/register');
  const handleRequestRedirect = () => router.push('/customer/create-request');

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a365d' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: 'bold', 
              color: 'white', 
              mr: 4,
              cursor: 'pointer'
            }}
            onClick={() => router.push('/')}
          >
            Paketera
          </Typography>

          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
              <Button color="inherit" onClick={() => router.push('/homepage')}>Ana Sayfa</Button>
              <Button color="inherit" onClick={() => router.push('/products')}>Ürünler</Button>
              <Button color="inherit" onClick={handleRequestRedirect}>Talep Oluştur</Button>
              <Button color="inherit" onClick={() => router.push('/suppliers')}>Tedarikçiler</Button>
              <Button color="inherit" onClick={() => router.push('/contact')}>İletişim</Button>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Button 
                variant="outlined" 
                onClick={handleLoginRedirect} 
                sx={{
                  mr: 2, 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Giriş Yap
              </Button>
              <Button 
                variant="contained" 
                onClick={handleRegisterRedirect} 
                sx={{
                  backgroundColor: '#4c51bf',
                  '&:hover': { backgroundColor: '#5a67d8' }
                }}
              >
                Kayıt Ol
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;