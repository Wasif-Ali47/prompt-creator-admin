import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { UsersTable } from '../components/UsersTable';
import { getAdminToken, clearAdminToken } from '../utils/auth';
import api from '../utils/apiClient';

const fetcher = (url) => api.get(url).then((res) => res.data);

export default function UsersPage() {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? getAdminToken() : null;

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  const { data: usersData } = useSWR(
    token ? '/api/admin/users' : null,
    fetcher
  );

  useEffect(() => {
    if (usersData && usersData.success === false && usersData.message?.includes('token')) {
      clearAdminToken();
      navigate('/login', { replace: true });
    }
  }, [usersData, navigate]);

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
              Users Management
            </h1>
            <p className="text-xs text-muted mt-1">
              Review Prompt Generator users, usage and ban status
            </p>
          </div>
        </header>

        <section>
          <UsersTable users={usersData?.users || []} />
        </section>
      </main>
    </div>
  );
}
