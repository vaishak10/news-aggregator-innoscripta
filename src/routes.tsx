import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bookmarks from './pages/Bookmarks';
import Settings from './pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes; 