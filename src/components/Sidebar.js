import { Link, useLocation } from 'react-router-dom';

export function Sidebar({ onLogout }) {
  const { pathname } = useLocation();

  const isActive = (page) => {
    if (page === 'dashboard') {
      return pathname === '/';
    }
    return pathname === `/${page}`;
  };

  return (
    <aside className="w-68 bg-panel border-r border-panel-border flex flex-col min-h-screen">
      <div className="px-5 py-4 border-b border-panel-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage-mid to-teal-mid flex items-center justify-center text-white text-lg font-bold">
          +
        </div>
        <div>
          <div className="text-[10px] tracking-[0.14em] font-semibold text-sage-light">
            PROMPT GENERATOR
          </div>
          <div className="text-xs font-semibold text-muted">
            Admin Panel
          </div>
        </div>
      </div>
      <nav className="px-3 py-4 flex-1">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted mb-3 px-2">
          Overview
        </p>
        <Link
          to="/"
          className={`nav-item ${isActive('dashboard') ? 'nav-item-active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <span className={`nav-dot ${isActive('dashboard') ? '' : 'dim'}`} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/users"
          className={`nav-item ${isActive('users') ? 'nav-item-active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <span className={`nav-dot ${isActive('users') ? '' : 'dim'}`} />
          <span>Users</span>
        </Link>
        <Link
          to="/usage"
          className={`nav-item ${isActive('usage') ? 'nav-item-active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <span className={`nav-dot ${isActive('usage') ? '' : 'dim'}`} />
          <span>OpenAI Usage</span>
        </Link>
        <Link
          to="/notifications"
          className={`nav-item ${isActive('notifications') ? 'nav-item-active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <span className={`nav-dot ${isActive('notifications') ? '' : 'dim'}`} />
          <span>Notifications</span>
        </Link>
      </nav>
      <div className="px-4 py-4 border-t border-panel-border text-xs text-muted flex items-center justify-between">
        <span>v1.0.0 · Internal</span>
        <button
          type="button"
          onClick={onLogout}
          className="text-rose hover:text-rose-light transition-colors text-[11px] font-semibold bg-transparent border-none cursor-pointer"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
