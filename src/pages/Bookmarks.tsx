import { Container, Typography } from '@mui/material';

const Bookmarks = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3, color: '#000000' }}>
        Bookmarked Articles
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, color: '#000000' }}>
        * Yet to implement *
      </Typography>
    </Container>
  );
};

export default Bookmarks;
