import { useSWRConfig } from 'swr';
import api from '../utils/apiClient';

export function UsersTable({ users }) {
  const { mutate } = useSWRConfig();

  const handleToggleBan = async (user) => {
    const nextIsBanned = !Boolean(user.isBanned);
    try {
      const res = await api.patch(`/api/admin/users/${user.id}/ban`, {
        isBanned: nextIsBanned,
        bannedReason: nextIsBanned ? 'Flagged by admin for abuse investigation' : '',
      });

      if (res.data?.success) {
        await mutate('/api/admin/users');
      } else {
        throw new Error(res.data?.message || 'Failed to update user status');
      }
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message || 'Failed to update user status';
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Users</h2>
          <p className="card-subtitle">
            Manage Prompt Generator users and moderation.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-muted border-b border-panel-border">
              <th className="py-2 text-left font-semibold">User</th>
              <th className="py-2 text-left font-semibold">Profession</th>
              <th className="py-2 text-left font-semibold">Usage</th>
              <th className="py-2 text-left font-semibold">Status</th>
              <th className="py-2 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-panel-border/40">
                <td className="py-2 pr-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[11px] text-white">
                      {u.name || 'Unnamed user'}
                    </span>
                    <span className="text-[10px] text-muted truncate">
                      {u.email}
                    </span>
                  </div>
                </td>
                <td className="py-2 pr-3 text-[10px] text-muted">
                  {u.profession || '—'}
                </td>
                <td className="py-2 pr-3 text-[10px] text-muted">
                  <div>{Number(u.openAiUsage?.totalTokens || 0).toLocaleString()} tokens</div>
                  <div className="text-[9px]">
                    {Number(u.openAiUsage?.requestCount || 0).toLocaleString()} requests
                  </div>
                </td>
                <td className="py-2 pr-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      u.isBanned
                        ? 'bg-s150/15 text-s400'
                        : 'bg-sagePale/20 text-sage-light'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        u.isBanned ? 'bg-s400' : 'bg-sage-light'
                      }`}
                    />
                    {u.isBanned ? 'Banned' : 'Active'}
                  </span>
                </td>
                <td className="py-2 text-right">
                  <button
                    type="button"
                    onClick={() => handleToggleBan(u)}
                    className="text-[10px] font-semibold px-2 py-1 rounded-full border border-panel-border hover:border-sage-light hover:text-sage-light transition-colors bg-transparent text-inherit cursor-pointer"
                  >
                    {u.isBanned ? 'Unban' : 'Ban'}
                  </button>
                </td>
              </tr>
            ))}
            {!users.length && (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center text-[11px] text-muted"
                >
                  No users found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
