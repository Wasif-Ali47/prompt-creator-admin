import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { getAdminToken, clearAdminToken } from '../utils/auth';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? getAdminToken() : null;

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  const handleLogout = () => {
    clearAdminToken();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-surface text-white flex">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif text-white">
              Notifications
            </h1>
            <p className="text-xs text-muted mt-1">
              Send broadcast notifications to Prompt Generator users
            </p>
          </div>
        </header>

        <section className="max-w-2xl">
          <NotificationsPanel />
        </section>
      </main>
    </div>
  );
}
