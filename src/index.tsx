import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

(function migrate() {
  if (localStorage.getItem('nara_migrated')) return;

  const oldTodos = localStorage.getItem('todos');
  if (oldTodos && !localStorage.getItem('nara_tasks')) {
    try {
      const parsed = JSON.parse(oldTodos);
      const migrated = parsed.map((t: any, i: number) => ({
        id: (Date.now() + i).toString(36) + Math.random().toString(36).slice(2, 8),
        title: t.title || '',
        done: t.isDone ?? false,
        priority: 'medium' as const,
        dueDate: null,
        category: '',
        createdAt: new Date().toISOString(),
      }));
      localStorage.setItem('nara_tasks', JSON.stringify(migrated));
    } catch {
      // corrupt data, skip
    }
  }

  const oldNotes = localStorage.getItem('notes');
  if (oldNotes && !localStorage.getItem('nara_notes')) {
    try {
      const parsed = JSON.parse(oldNotes);
      const migrated = parsed.map((n: any, i: number) => ({
        id: (Date.now() + i).toString(36) + Math.random().toString(36).slice(2, 8),
        title: n.noteTitle || '',
        content: n.noteContent || '',
        pinned: false,
        color: 'none' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      localStorage.setItem('nara_notes', JSON.stringify(migrated));
    } catch {
      // corrupt data, skip
    }
  }

  localStorage.setItem('nara_migrated', '1');
})();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
