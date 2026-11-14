import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage, formatDate, formatDueDate, isDueOverdue, isDueToday } from '../hooks';
import { Task, Note } from '../types';

const Dashboard: React.FC = () => {
  const [tasks] = useLocalStorage<Task[]>('nara_tasks', []);
  const [notes] = useLocalStorage<Note[]>('nara_notes', []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const dateStr = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.done).length;
    const pending = total - completed;
    const today = new Date().toISOString().split('T')[0];
    const overdue = tasks.filter((t) => !t.done && t.dueDate && t.dueDate < today).length;
    return { total, completed, pending, overdue };
  }, [tasks]);

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((t) => !t.done)
      .sort((a, b) => {
        const pa = { high: 0, medium: 1, low: 2 }[a.priority];
        const pb = { high: 0, medium: 1, low: 2 }[b.priority];
        if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate) || pa - pb;
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;
        return pa - pb;
      })
      .slice(0, 6);
  }, [tasks]);

  const recentNotes = useMemo(() => {
    return [...notes]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 4);
  }, [notes]);

  return (
    <div className="page">
      <div className="dashboard-greeting" style={{ marginBottom: '36px' }}>
        <h1 className="heading-serif">{greeting}</h1>
        <p className="dashboard-date">{dateStr}</p>
      </div>

      <div className="stats-grid">
        {([
          { label: 'Total Tasks', value: stats.total, color: undefined as string | undefined },
          { label: 'Completed', value: stats.completed, color: stats.completed > 0 ? 'var(--success)' : undefined },
          { label: 'Pending', value: stats.pending, color: undefined as string | undefined },
          { label: 'Overdue', value: stats.overdue, color: stats.overdue > 0 ? 'var(--danger)' : undefined },
        ]).map((stat) => (
          <div key={stat.label} className="card stat-card">
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <span className="dashboard-section-title">Upcoming Tasks</span>
          <Link to="/tasks" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
            View All
          </Link>
        </div>
        {upcomingTasks.length === 0 ? (
          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              No pending tasks
            </p>
            <Link to="/tasks" className="btn btn-primary btn-sm" style={{ marginTop: '16px', textDecoration: 'none' }}>
              Add Task
            </Link>
          </div>
        ) : (
          <div className="card">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="task-item">
                <span className={`priority-dot priority-${task.priority}`} />
                <span className="task-title">{task.title}</span>
                <div className="task-meta">
                  {task.category && <span className="category-tag">{task.category}</span>}
                  {task.dueDate && (
                    <span
                      className={`due-badge${isDueOverdue(task.dueDate) ? ' overdue' : isDueToday(task.dueDate) ? ' today' : ''}`}
                    >
                      {formatDueDate(task.dueDate)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <span className="dashboard-section-title">Recent Notes</span>
          <Link to="/notes" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
            View All
          </Link>
        </div>
        {recentNotes.length === 0 ? (
          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              No notes yet
            </p>
            <Link to="/notes" className="btn btn-primary btn-sm" style={{ marginTop: '16px', textDecoration: 'none' }}>
              Create Note
            </Link>
          </div>
        ) : (
          <div className="notes-grid">
            {recentNotes.map((note) => (
              <Link key={note.id} to="/notes" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card note-card">
                  <div className="note-card-title">{note.title || 'Untitled'}</div>
                  <div className="note-card-content">{note.content}</div>
                  <div className="note-card-footer">
                    <span>{formatDate(note.updatedAt)}</span>
                    {note.pinned && <span className="pin-indicator">pinned</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
