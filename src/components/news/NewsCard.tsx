import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { BookmarkBorder, Bookmark } from '@mui/icons-material';
import { format } from 'date-fns';
import { Article } from '../../types/news';

interface NewsCardProps {
  article: Article;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onClick: () => void;
}

const NewsCard = ({ article, isBookmarked, onBookmarkToggle, onClick }: NewsCardProps) => {
  const { title, description, imageUrl, source, category, publishedAt } = article;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardActionArea onClick={onClick}>
        {imageUrl && (
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt={title}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Chip label={source} size="small" sx={{ mr: 1 }} />
            <Chip label={category} size="small" color="primary" />
          </Box>
          <IconButton onClick={onBookmarkToggle}>
            {isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {format(new Date(publishedAt), 'MMM dd, yyyy')}
        </Typography>
      </Box>
    </Card>
  );
};

export default NewsCard; 