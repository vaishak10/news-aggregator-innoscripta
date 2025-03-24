import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes; 