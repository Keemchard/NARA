import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import { useTheme } from './hooks';

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

function App() {
  const [theme, toggleTheme] = useTheme();
  const handleExport = () => {
    const data = {
      version: 2,
      exportedAt: new Date().toISOString(),
      tasks: JSON.parse(localStorage.getItem('nara_tasks') || '[]'),
      notes: JSON.parse(localStorage.getItem('nara_notes') || '[]'),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nara-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.tasks && Array.isArray(data.tasks)) {
          localStorage.setItem('nara_tasks', JSON.stringify(data.tasks));
        }
        if (data.notes && Array.isArray(data.notes)) {
          localStorage.setItem('nara_notes', JSON.stringify(data.notes));
        }
        window.location.reload();
      } catch {
        // invalid file, silently ignore
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app-layout">
      <Sidebar onExport={handleExport} onImportFile={handleImportFile} theme={theme} onToggleTheme={toggleTheme} />
      <main className="main-content">
        <div className="mobile-header">
          <span
            className="heading-serif"
            style={{ fontSize: '18px', letterSpacing: '0.12em', fontWeight: 300 }}
          >
            NARA
          </span>
          <button className="btn-icon" onClick={toggleTheme} title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
