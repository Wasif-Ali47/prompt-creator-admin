import { useState } from 'react';
import api from '../utils/apiClient';

export function NotificationsPanel() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    setFeedback('');

    try {
      const res = await api.post('/api/admin/notifications/broadcast', {
        title,
        body,
      });
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to send notification');
      }
      setFeedback(
        `Notification sent. Success: ${res.data?.successCount ?? 0}, Failed: ${res.data?.failureCount ?? 0}`
      );
      setTitle('');
      setBody('');
    } catch (err) {
      setFeedback(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card h-full">
      <div className="card-header">
        <div>
          <h2 className="card-title">Broadcast notification</h2>
          <p className="card-subtitle">
            Send a one-off push message to Prompt Generator users.
          </p>
        </div>
      </div>
      <form onSubmit={handleSend} className="space-y-3">
        <div>
          <label className="label" htmlFor="notif-title">
            Title
          </label>
          <input
            id="notif-title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={60}
            placeholder="New feature update"
          />
        </div>
        <div>
          <label className="label" htmlFor="notif-body">
            Body
          </label>
          <textarea
            id="notif-body"
            className="input min-h-[72px] resize-none"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={160}
            placeholder="We shipped improvements for prompt quality and speed."
          />
        </div>
        {feedback && (
          <p className="text-[11px] text-muted">
            {feedback}
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="btn-primary w-full mt-1"
        >
          {sending ? 'Sending…' : 'Send notification'}
        </button>
      </form>
    </div>
  );
}
