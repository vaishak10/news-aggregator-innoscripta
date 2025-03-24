# News Aggregator

A modern news aggregator built with React, TypeScript, and Vite that pulls articles from multiple sources including NewsAPI, The Guardian, and The New York Times.

## Features

- Multi-source news aggregation
- Article filtering by category and source
- Search functionality
- Date range filtering
- Responsive design
- Bookmarking capability

## Note on Features Under Development

Some sections of the application are currently in development:

- **Bookmarks**: This feature is UI-ready but not yet functional. Future implementation will include:
  - Backend API for storing bookmarked articles
  - Database collection for user preferences
  - User authentication system
  - Persistent storage of bookmarks

- **Settings**: This section is planned for future development and will include:
  - User preferences management
  - Theme customization
  - News source preferences
  - Notification settings

## Planned Improvements

1. **Infinite Scroll Implementation**
   - Currently, the application fetches articles in a single request
   - Planning to implement Pinterest-style infinite scroll
   - Will fetch data in chunks as users scroll
   - Improve performance and user experience
   - Reduce initial load time

2. **Future Enhancements**
   - User authentication system
   - Personalized news feeds
   - Article categorization improvements
   - Push notifications for breaking news
   - Article sharing capabilities

## Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/news-aggregator-innoscripta.git
cd news-aggregator-innoscripta
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```env
VITE_NEWS_API_KEY=your_newsapi_key
VITE_THE_GUARDIAN_API_KEY=your_guardian_key
VITE_NEW_YORK_TIMES_API_KEY=your_nyt_key
```

4. Start the development server:
```bash
npm run dev
```

## Docker Setup

### Development

1. Build the Docker image:
```bash
docker build -t news-aggregator-innoscripta .
```

2. Run with Docker Compose:
```bash
docker-compose up
```

### Environment Variables

Create a `.env` file in the root directory with your API keys:
```env
VITE_NEWS_API_KEY=your_newsapi_key
VITE_THE_GUARDIAN_API_KEY=your_guardian_key
VITE_NEW_YORK_TIMES_API_KEY=your_nyt_key
```

### Manual Docker Commands

Build and run manually:
```bash
# Build the image
docker build -t news-aggregator-innoscripta .

# Run the container
docker run -p 80:80 \
  -e VITE_NEWS_API_KEY=your_newsapi_key \
  -e VITE_THE_GUARDIAN_API_KEY=your_guardian_key \
  -e VITE_NEW_YORK_TIMES_API_KEY=your_nyt_key \
  news-aggregator-innoscripta
```

Access the application at http://localhost

## Technologies Used

- React 18
- TypeScript
- Vite
- Material-UI
- React Query
- Axios
- Date-fns

## License

MIT