import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Badge,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useThemeMode } from '../context/ThemeContext';
import { useMovies } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleColorMode } = useThemeMode();
  const { favorites } = useMovies();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleOpenUserMenu = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate('/');
  };

  const navLinks = [
    { title: 'Explore', path: '/', icon: <ExploreIcon /> },
    {
      title: 'Favorites',
      path: '/favorites',
      icon: (
        <Badge badgeContent={favorites.length} color="secondary" max={99}>
          <FavoriteIcon />
        </Badge>
      ),
    },
  ];

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setMobileDrawerOpen(true)}
              sx={{ mr: 1.5, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Brand Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                mr: 4,
              }}
            >
              <Box
                sx={{
                  p: 0.8,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.2,
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                }}
              >
                <MovieIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  noWrap
                  className="heading-display"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: '-0.5px',
                    fontSize: { xs: '1.15rem', md: '1.35rem' },
                    background:
                      mode === 'dark'
                        ? 'linear-gradient(90deg, #FFFFFF 30%, #A5B4FC 100%)'
                        : 'linear-gradient(90deg, #1E1B4B 30%, #4F46E5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Movie Explorer
                </Typography>
              </Box>
            </Box>



            {/* Desktop Navigation Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Button
                    key={link.title}
                    component={Link}
                    to={link.path}
                    startIcon={link.icon}
                    sx={{
                      color: isActive ? 'primary.main' : 'text.primary',
                      fontWeight: isActive ? 700 : 500,
                      position: 'relative',
                      px: 2,
                      bgcolor: isActive ? 'action.selected' : 'transparent',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    {link.title}
                  </Button>
                );
              })}
            </Box>

            {/* Right Action Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
              {/* Light / Dark Mode Toggle Button */}
              <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <IconButton
                  onClick={toggleColorMode}
                  aria-label="toggle color mode"
                  size="small"
                  sx={{
                    p: 1,
                    color: mode === 'dark' ? '#FBBF24' : '#4F46E5',
                    bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(79, 70, 229, 0.08)',
                    border: '1px solid',
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(79, 70, 229, 0.25)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(79, 70, 229, 0.16)',
                      transform: 'scale(1.06)',
                    },
                  }}
                >
                  {mode === 'dark' ? (
                    <Brightness7Icon sx={{ color: '#FBBF24', fontSize: 22 }} />
                  ) : (
                    <Brightness4Icon sx={{ color: '#4F46E5', fontSize: 22 }} />
                  )}
                </IconButton>
              </Tooltip>

              {/* User Authentication Menu / Profile */}
              {isAuthenticated ? (
                <>
                  <Tooltip title="Account profile">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      size="small"
                      sx={{ p: 0.5, ml: 0.5 }}
                    >
                      <Avatar
                        alt={user.name}
                        src={user.avatarUrl}
                        sx={{
                          width: 36,
                          height: 36,
                          border: '2px solid',
                          borderColor: 'primary.main',
                        }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleCloseUserMenu}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        borderRadius: 3,
                        minWidth: 180,
                        border: '1px solid',
                        borderColor: 'divider',
                      },
                    }}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        @{user.username}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem component={Link} to="/favorites" onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                        <FavoriteIcon fontSize="small" color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary={`Favorites (${favorites.length})`} />
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                      <ListItemIcon sx={{ color: 'error.main' }}>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Log out" />
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<LoginIcon />}
                  sx={{
                    ml: 1,
                    px: { xs: 1.5, sm: 2.2 },
                    fontSize: '0.85rem',
                    borderRadius: 50,
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        PaperProps={{
          sx: { width: 280, p: 2, bgcolor: 'background.paper' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              p: 0.8,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              display: 'flex',
            }}
          >
            <MovieIcon sx={{ color: '#FFFFFF', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} className="heading-display">
              Movie Explorer
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List>
          {navLinks.map((link) => (
            <ListItem key={link.title} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={link.path}
                onClick={() => setMobileDrawerOpen(false)}
                selected={location.pathname === link.path}
                sx={{ borderRadius: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.title}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={isAuthenticated ? '/favorites' : '/login'}
              onClick={() => setMobileDrawerOpen(false)}
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                {isAuthenticated ? <AccountCircleIcon /> : <LoginIcon />}
              </ListItemIcon>
              <ListItemText
                primary={isAuthenticated ? `Profile (@${user.username})` : 'Sign In'}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={
              mode === 'dark' ? (
                <Brightness7Icon sx={{ color: '#FBBF24' }} />
              ) : (
                <Brightness4Icon sx={{ color: '#4F46E5' }} />
              )
            }
            onClick={() => {
              toggleColorMode();
            }}
            sx={{
              mb: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              color: mode === 'dark' ? 'text.primary' : 'primary.main',
              borderColor: mode === 'dark' ? 'divider' : 'primary.main',
            }}
          >
            {mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Button>

          {isAuthenticated && (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={() => {
                setMobileDrawerOpen(false);
                logout();
              }}
            >
              Log out
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
