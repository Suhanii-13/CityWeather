import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import './Navbar.css';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className='navbar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
              <Link to="/signup">
                  <Typography textAlign="center">SignUp</Typography>
              </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
              <Link to="/login">
                  <Typography textAlign="center">LogIn</Typography>
              </Link>
              </MenuItem>
              <MenuItem>
              <Link to="/logout">
                <Typography textAlign="center">Logout</Typography>
              </Link>
              </MenuItem>
            </Menu>
            <Typography variant="h3" className='title'>
              Weather App&#9729;
            </Typography>
          </Box>

          {/* Desktop Menu Items */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Typography variant="h3" className='title'>
              Weather App&#9729;
            </Typography>

            <Button
              component={Link}
              to="/signup"
              onClick={handleCloseNavMenu}
              className='btns'
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              SignUp
            </Button>
            <Button
              component={Link}
              to="/login"
              onClick={handleCloseNavMenu}
              className='btns'
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              LogIn
            </Button>
            <Button
              component={Link}
              to="/logout"
              className='btns'
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
