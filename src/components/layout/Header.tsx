import { AppBar, Toolbar, IconButton, InputBase, Box, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

interface HeaderProps {
  onMenuClick: () => void;
  onSearch: (query: string) => void;
}

const Header = ({ onMenuClick, onSearch }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="fixed" color="default" elevation={1} className='header'>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Search>
            <InputBase
              placeholder="Search news..."
              onChange={(e) => onSearch(e.target.value)}
              //sx={{ ml: 2, flex: 1, color: 'inherit', width: '100%' }}
            />
            <IconButton sx={{ p: 1 }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Search>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 