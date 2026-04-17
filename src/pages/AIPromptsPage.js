import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { getAdminToken, clearAdminToken } from '../utils/auth';

export default function AIPromptsPage() {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? getAdminToken() : null;
  const [prompts] = useState([
    { id: 1, name: 'Meal Plan Generation', type: 'System', status: 'Active', lastModified: '2024-01-20' },
    { id: 2, name: 'Health Query Response', type: 'User-facing', status: 'Active', lastModified: '2024-01-18' },
    { id: 3, name: 'Symptom Analysis', type: 'System', status: 'Active', lastModified: '2024-01-15' },
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
              AI Prompts
            </h1>
            <p className="text-xs text-muted mt-1">
              Manage AI prompts used for meal plan generation and health queries
            </p>
          </div>
        </header>

        <section>
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Prompt Templates</h2>
                <p className="card-subtitle">
                  System and user-facing prompts for AI interactions
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-muted border-b border-panel-border">
                    <th className="py-2 text-left font-semibold">Name</th>
                    <th className="py-2 text-left font-semibold">Type</th>
                    <th className="py-2 text-left font-semibold">Status</th>
                    <th className="py-2 text-left font-semibold">Last Modified</th>
                    <th className="py-2 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prompts.map((p) => (
                    <tr key={p.id} className="border-b border-panel-border/40">
                      <td className="py-2 pr-3 text-[11px] text-white font-semibold">
                        {p.name}
                      </td>
                      <td className="py-2 pr-3 text-[10px] text-muted">
                        {p.type}
                      </td>
                      <td className="py-2 pr-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          p.status === 'Active'
                            ? 'bg-sagePale/20 text-sage-light'
                            : 'bg-s150/15 text-s400'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-2 pr-3 text-[10px] text-muted">
                        {p.lastModified}
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
