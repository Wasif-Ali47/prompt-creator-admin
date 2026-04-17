import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { UsersTable } from './UsersTable';
import { PlansTable } from './PlansTable';
import { NotificationsPanel } from './NotificationsPanel';
import { getAdminToken, clearAdminToken } from '../utils/auth';
import api from '../utils/apiClient';

const fetcher = (url) => api.get(url).then((res) => res.data);

export default function DashboardClient() {
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

  const { data: usageData } = useSWR(
    token ? '/api/admin/usage' : null,
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
              Admin Overview
            </h1>
            <p className="text-xs text-muted mt-1">
              Prompt Generator moderation and usage controls
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card">
            <p className="text-[10px] uppercase tracking-[0.08em] text-muted">Users</p>
            <p className="mt-1 text-xl font-semibold text-white">{Number(usageData?.summary?.users || 0).toLocaleString()}</p>
          </div>
          <div className="card">
            <p className="text-[10px] uppercase tracking-[0.08em] text-muted">Banned</p>
            <p className="mt-1 text-xl font-semibold text-white">{Number(usageData?.summary?.bannedUsers || 0).toLocaleString()}</p>
          </div>
          <div className="card">
            <p className="text-[10px] uppercase tracking-[0.08em] text-muted">Total Tokens</p>
            <p className="mt-1 text-xl font-semibold text-white">{Number(usageData?.summary?.totalTokens || 0).toLocaleString()}</p>
          </div>
          <div className="card">
            <p className="text-[10px] uppercase tracking-[0.08em] text-muted">Requests</p>
            <p className="mt-1 text-xl font-semibold text-white">{Number(usageData?.summary?.totalRequests || 0).toLocaleString()}</p>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
          <div className="xl:col-span-2">
            <UsersTable users={usersData?.users || []} />
          </div>
          <div>
            <NotificationsPanel />
          </div>
        </section>

        <section className="mt-4">
          <PlansTable plans={usageData?.topUsers || []} />
        </section>
      </main>
    </div>
  );
}
