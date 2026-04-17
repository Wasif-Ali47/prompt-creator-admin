import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAdminToken } from '../utils/auth';
import api from '../utils/apiClient';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/api/admin/auth/login', {
        email,
        password,
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Login failed');
      }

      setAdminToken(res.data.token);

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md bg-panel rounded-3xl shadow-soft p-8 border border-panel-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage-mid to-teal-mid flex items-center justify-center text-white text-lg font-bold">
            +
          </div>
          <div>
            <div className="text-[10px] tracking-[0.12em] font-semibold text-sage-light">
              PROMPT GENERATOR
            </div>
            <div className="text-xs font-semibold text-muted">
              Admin Console
            </div>
          </div>
        </div>
        <h1 className="text-xl font-serif text-white mb-2">
          Sign in to admin
        </h1>
        <p className="text-xs text-muted mb-6">
          Manage users, OpenAI usage, moderation and broadcast notifications.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="login-email">
              Admin Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@promptgenerator.app"
            />
          </div>
          <div>
            <label className="label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-[11px] text-rose mt-1">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
