import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { PlansTable } from '../components/PlansTable';
import { getAdminToken, clearAdminToken } from '../utils/auth';
import api from '../utils/apiClient';

const fetcher = (url) => api.get(url).then((res) => res.data);

export default function MealPlansPage() {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? getAdminToken() : null;

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  const { data: plansData } = useSWR(
    token ? '/api/admin/meal-plans' : null,
    fetcher
  );

  useEffect(() => {
    if (plansData && plansData.success === false && plansData.message?.includes('token')) {
      clearAdminToken();
      navigate('/login', { replace: true });
    }
  }, [plansData, navigate]);

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
              Meal Plans
            </h1>
            <p className="text-xs text-muted mt-1">
              View and manage all generated 7-day nutrition plans
            </p>
          </div>
        </header>

        <section>
          <PlansTable plans={plansData?.mealPlans || []} />
        </section>
      </main>
    </div>
  );
}
