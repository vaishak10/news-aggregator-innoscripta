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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import fallbackImage from '../../assets/images/News-icon.png';

interface NewsCardProps {
  article: Article;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onClick: () => void;
}

const NewsCard = ({ article, isBookmarked, onBookmarkToggle, onClick }: NewsCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { title, description, imageUrl, source, category, publishedAt } = article;

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      margin: isMobile ? '8px 0' : 0
    }}>
      <CardActionArea onClick={onClick}>
        {
          <CardMedia
            component="img"
            height={isMobile ? "200" : "140"}
            image={imageUrl ?? fallbackImage}
            alt={title}
            sx={{ objectFit: 'cover' }}
          />
        }
        <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
          <Typography 
            gutterBottom 
            variant={isMobile ? "subtitle1" : "h6"} 
            component="h2" 
            noWrap
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: isMobile ? 3 : 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: isMobile ? 1 : 2, mt: 'auto' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 0
        }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
            width: isMobile ? '100%' : 'auto'
          }}>
            <Chip label={source} size={isMobile ? "small" : "medium"} />
            <Chip label={category} size={isMobile ? "small" : "medium"} color="primary" />
          </Box>
          <IconButton 
            onClick={onBookmarkToggle}
            size={isMobile ? "small" : "medium"}
          >
            {isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
          </IconButton>
        </Box>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            mt: 1, 
            display: 'block',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          {format(new Date(publishedAt), 'MMM dd, yyyy')}
        </Typography>
      </Box>
    </Card>
  );
};

export default NewsCard; 