import { AppBar, Toolbar, IconButton, InputBase, Box } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255)',
  '&:hover': {
    backgroundColor: 'rgb(231 228 228 / 42%)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  paddingLeft: '16px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);
  };

  const handleSearchClick = () => {
    if (searchText) {
      navigate(`/?search=${encodeURIComponent(searchText)}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#ffffff' }} elevation={1} className='header'>
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
        <Box sx={{ flexGrow: 1, display: "flex", placeContent: "end" }}>
          <Search>
            <InputBase
              placeholder="Search News..."
              onChange={handleSearch}
              onKeyDown={handleKeyPress}
              value={searchText}
            />
            <IconButton 
              sx={{ p: 1 }} 
              aria-label="search" 
              onClick={handleSearchClick}
            >
              <SearchIcon />
            </IconButton>
          </Search>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 