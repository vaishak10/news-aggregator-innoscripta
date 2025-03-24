import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NewsFilters as NewsFiltersType } from '../../types/news';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface NewsFiltersProps {
  filters: NewsFiltersType;
  onFiltersChange: (filters: NewsFiltersType) => void;
  categories: string[];
  sources: string[];
}

const NewsFilters = ({ filters, onFiltersChange, categories, sources }: NewsFiltersProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: isMobile ? 1 : 2,
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: 'wrap', 
        mb: 3 
      }}
    >
      <FormControl sx={{ minWidth: isMobile ? '100%' : 200 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category || 'All'}
          label="Category"
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: isMobile ? '100%' : 200 }}>
        <InputLabel>Source</InputLabel>
        <Select
          value={filters.source || 'All'}
          label="Source"
          onChange={(e) => onFiltersChange({ ...filters, source: e.target.value })}
        >
          {sources.map((source) => (
            <MenuItem key={source} value={source}>
              {source}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        flexDirection: isMobile ? 'column' : 'row',
        width: isMobile ? '100%' : 'auto' 
      }}>
        <DatePicker
          label="From Date"
          value={filters.dateFrom ? new Date(filters.dateFrom) : null}
          onChange={(date) =>
            onFiltersChange({ ...filters, dateFrom: date?.toISOString() })
          }
          sx={{ width: isMobile ? '100%' : 'auto' }}
        />

        <DatePicker
          label="To Date"
          value={filters.dateTo ? new Date(filters.dateTo) : null}
          onChange={(date) =>
            onFiltersChange({ ...filters, dateTo: date?.toISOString() })
          }
          sx={{ width: isMobile ? '100%' : 'auto' }}
        />
      </Box>

      <Button
        variant="outlined"
        onClick={() => onFiltersChange({})}
        sx={{ width: isMobile ? '100%' : 'auto' }}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

export default NewsFilters; 