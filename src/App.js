import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import UsagePage from './pages/UsagePage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/usage" element={<UsagePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
