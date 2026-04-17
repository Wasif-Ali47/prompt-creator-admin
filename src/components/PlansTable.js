export function PlansTable({ plans }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Top OpenAI Usage</h2>
          <p className="card-subtitle">
            Users with the highest cumulative token usage.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-muted border-b border-panel-border">
              <th className="py-2 text-left font-semibold">User</th>
              <th className="py-2 text-left font-semibold">Total Tokens</th>
              <th className="py-2 text-left font-semibold">Prompt Tokens</th>
              <th className="py-2 text-left font-semibold">Completion Tokens</th>
              <th className="py-2 text-left font-semibold">Requests</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.id} className="border-b border-panel-border/40">
                <td className="py-2 pr-3">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-white font-semibold">{p.name || 'Unnamed user'}</span>
                    <span className="text-[10px] text-muted">{p.email || '—'}</span>
                  </div>
                </td>
                <td className="py-2 pr-3 text-[10px] text-muted">
                  {Number(p.openAiUsage?.totalTokens || 0).toLocaleString()}
                </td>
                <td className="py-2 pr-3 text-[10px] text-muted">
                  {Number(p.openAiUsage?.promptTokens || 0).toLocaleString()}
                </td>
                <td className="py-2 pr-3 text-[10px] text-muted">
                  {Number(p.openAiUsage?.completionTokens || 0).toLocaleString()}
                </td>
                <td className="py-2 pr-3 text-[10px] text-muted">
                  {Number(p.openAiUsage?.requestCount || 0).toLocaleString()}
                </td>
              </tr>
            ))}
            {!plans.length && (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center text-[11px] text-muted"
                >
                  No usage data found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
