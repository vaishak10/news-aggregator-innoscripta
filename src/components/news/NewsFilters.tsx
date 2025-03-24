import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NewsFilters as NewsFiltersType } from '../../types/news';

interface NewsFiltersProps {
  filters: NewsFiltersType;
  onFiltersChange: (filters: NewsFiltersType) => void;
  categories: string[];
  sources: string[];
}

const NewsFilters = ({ filters, onFiltersChange, categories, sources }: NewsFiltersProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category || ''}
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

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Source</InputLabel>
        <Select
          value={filters.source || ''}
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

      <DatePicker
        label="From Date"
        value={filters.dateFrom ? new Date(filters.dateFrom) : null}
        onChange={(date) =>
          onFiltersChange({ ...filters, dateFrom: date?.toISOString() })
        }
      />

      <DatePicker
        label="To Date"
        value={filters.dateTo ? new Date(filters.dateTo) : null}
        onChange={(date) =>
          onFiltersChange({ ...filters, dateTo: date?.toISOString() })
        }
      />

      <Button
        variant="outlined"
        onClick={() => onFiltersChange({})}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

export default NewsFilters; 