# News Aggregator

A modern news aggregator built with React, TypeScript, and Vite that pulls articles from multiple sources including NewsAPI, The Guardian, and The New York Times.

## Features

- Multi-source news aggregation
- Article filtering by category and source
- Search functionality
- Date range filtering
- Responsive design
- Bookmarking capability

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