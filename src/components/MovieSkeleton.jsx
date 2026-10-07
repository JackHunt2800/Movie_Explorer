import React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const MovieSkeleton = ({ count = 8 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{ aspectRatio: '2/3', transform: 'none' }}
              animation="wave"
            />
            <CardContent sx={{ p: 2, flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
                <Skeleton variant="rounded" width={50} height={24} />
                <Skeleton variant="rounded" width={60} height={24} />
              </Box>
              <Skeleton variant="text" width="85%" height={28} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1.5 }} />
              <Skeleton variant="text" width="100%" height={16} />
              <Skeleton variant="text" width="95%" height={16} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieSkeleton;
