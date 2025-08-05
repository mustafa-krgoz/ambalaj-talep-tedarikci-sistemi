import { 
    Box, 
    Container, 
    Typography, 
    IconButton, 
    useMediaQuery, 
    useTheme 
  } from '@mui/material';
  import { 
    Facebook, 
    Twitter, 
    LinkedIn, 
    Instagram 
  } from '@mui/icons-material';
  
  const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
    return (
      <Box sx={{ 
        py: 6, 
        backgroundColor: '#1a365d', 
        color: 'white' 
      }}>
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            gap: 6 
          }}>
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
              <Typography variant="body2" sx={{ mt: 2 }}>
                © {new Date().getFullYear()} Paketera
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default Footer;