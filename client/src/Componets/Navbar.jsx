import { React, Link,AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuIcon, Container, Button, MenuItem, axios, useState, useEffect } from './import';
import "./flash.css"
import './Navbar.css';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  
  useEffect(() => {
    let timer;
    if (flashMessage) {
      timer = setTimeout(() => {
        setFlashMessage(null);
      }, 2000);
    }
    return () => clearTimeout(timer); 
  }, [flashMessage]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    // setflashMessage(null);
    axios.post("http://localhost:8080/logout", {}, { withCredentials: true })
      .then(response => {
        window.location.reload(); 
      })
      .catch(err => {
        setFlashMessage({ type: 'error', text:"Registration not found. Please register" });
      });
  };
  return (
    <div>
    <AppBar position="static" className='navbar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile XMenu Button */}
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
              <Link to="/login" >
                  <Typography textAlign="center">LogIn</Typography>
              </Link>
              </MenuItem>
              <MenuItem >
                <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
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
              onClick={handleLogout}
              className='btns'
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {flashMessage && (
        <div className={`flash-message ${flashMessage.type === 'success' ? 'flash-success' : 'flash-error'}`}>
          {flashMessage.text}
        </div>
      )}
    </div>
  );
}

export default Navbar;