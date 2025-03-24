import { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: isMobile ? 'column' : 'row' }}>
      <Header 
        onMenuClick={handleDrawerToggle} 
      />
      <Sidebar 
        open={mobileOpen} 
        onClose={handleDrawerToggle} 
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: isMobile ? 0 : `calc(100% - 36px)` },
          mt: 8,
          padding: isMobile ? 2 : 3 
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 