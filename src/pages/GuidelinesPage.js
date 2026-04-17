import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { getAdminToken, clearAdminToken } from '../utils/auth';

export default function GuidelinesPage() {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? getAdminToken() : null;
  const [guidelines] = useState([
    { id: 1, source: 'ADA 2024', category: 'Diabetes', status: 'Active', lastUpdated: '2024-01-15' },
    { id: 2, source: 'AHA 2023', category: 'Cardiovascular', status: 'Active', lastUpdated: '2023-12-10' },
    { id: 3, source: 'WHO Nutrition', category: 'General', status: 'Active', lastUpdated: '2024-02-01' },
  ]);

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
              Guideline Sources
            </h1>
            <p className="text-xs text-muted mt-1">
              Manage clinical nutrition guidelines and sources
            </p>
          </div>
        </header>

        <section>
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Clinical Guidelines</h2>
                <p className="card-subtitle">
                  Sources used for meal plan generation and AI responses
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-muted border-b border-panel-border">
                    <th className="py-2 text-left font-semibold">Source</th>
                    <th className="py-2 text-left font-semibold">Category</th>
                    <th className="py-2 text-left font-semibold">Status</th>
                    <th className="py-2 text-left font-semibold">Last Updated</th>
                    <th className="py-2 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {guidelines.map((g) => (
                    <tr key={g.id} className="border-b border-panel-border/40">
                      <td className="py-2 pr-3 text-[11px] text-white font-semibold">
                        {g.source}
                      </td>
                      <td className="py-2 pr-3 text-[10px] text-muted">
                        {g.category}
                      </td>
                      <td className="py-2 pr-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          g.status === 'Active'
                            ? 'bg-sagePale/20 text-sage-light'
                            : 'bg-s150/15 text-s400'
                        }`}>
                          {g.status}
                        </span>
                      </td>
                      <td className="py-2 pr-3 text-[10px] text-muted">
                        {g.lastUpdated}
                      </td>
                      <td className="py-2 text-right">
                        <button
                          type="button"
                          className="text-[10px] font-semibold px-2 py-1 rounded-full border border-panel-border hover:border-sage-light hover:text-sage-light transition-colors bg-transparent text-inherit cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
