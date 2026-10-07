import React from 'react';
import { Box, Container, Typography, Stack, Link as MuiLink, Divider } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
          textAlign={{ xs: 'center', md: 'left' }}
        >
          {/* Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                p: 0.6,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                display: 'flex',
              }}
            >
              <MovieIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
            </Box>
            <Typography variant="subtitle1" fontWeight={800} className="heading-display">
              Movie Explorer
            </Typography>
          </Box>

          {/* Attribution & Disclaimer */}
          <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 520 }}>
            Powered by The Movie Database (TMDb) API. This product uses the TMDb API but is not
            endorsed or certified by TMDb.
          </Typography>

          {/* Copyright & Info */}
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Movie Explorer. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
