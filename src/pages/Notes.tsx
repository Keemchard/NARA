import React, { useState, useMemo } from 'react';
import { useLocalStorage, generateId, formatDate } from '../hooks';
import { Note, NoteColor } from '../types';
import Modal from '../components/Modal';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PinIcon = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 17v5" />
    <path d="M5 17h14v-1.76a2 2 0 00-1.11-1.79l-1.78-.9A2 2 0 0115 10.76V6h1a2 2 0 000-4H8a2 2 0 000 4h1v4.76a2 2 0 01-1.11 1.79l-1.78.9A2 2 0 005 15.24z" />
  </svg>
);

const COLOR_KEYS: NoteColor[] = ['none', 'clay', 'olive', 'slate', 'amber'];

const Notes: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('nara_notes', []);
  const [search, setSearch] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editColor, setEditColor] = useState<NoteColor>('none');
  const [editPinned, setEditPinned] = useState(false);

  const openNewNote = () => {
    setActiveId(null);
    setEditTitle('');
    setEditContent('');
    setEditColor('none');
    setEditPinned(false);
    setIsNew(true);
    setEditorOpen(true);
  };

  const openExistingNote = (note: Note) => {
    setActiveId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditColor(note.color);
    setEditPinned(note.pinned);
    setIsNew(false);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setActiveId(null);
  };

  const saveNote = () => {
    if (!editTitle.trim() && !editContent.trim()) {
      closeEditor();
      return;
    }
    const now = new Date().toISOString();
    if (isNew) {
      const note: Note = {
        id: generateId(),
        title: editTitle.trim(),
        content: editContent.trim(),
        pinned: editPinned,
        color: editColor,
        createdAt: now,
        updatedAt: now,
      };
      setNotes((prev) => [note, ...prev]);
    } else if (activeId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === activeId
            ? {
                ...n,
                title: editTitle.trim(),
                content: editContent.trim(),
                pinned: editPinned,
                color: editColor,
                updatedAt: now,
              }
            : n
        )
      );
    }
    closeEditor();
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setNotes((prev) => prev.filter((n) => n.id !== deleteId));
    setDeleteId(null);
    if (activeId === deleteId) closeEditor();
  };

  const sortedNotes = useMemo(() => {
    let result = [...notes];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return result;
  }, [notes, search]);

  const deleteTarget = notes.find((n) => n.id === deleteId);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="heading-serif">Notes</h1>
          <div className="page-header-line" />
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {notes.length > 0 && (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </span>
          )}
          <button className="btn btn-primary btn-sm" onClick={openNewNote}>
            New Note
          </button>
        </div>
      </div>

      {notes.length > 0 && (
        <div className="search-bar">
          <SearchIcon />
          <input
            className="input"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {sortedNotes.length === 0 && !search ? (
        <div className="card">
          <div className="empty-state">
            <p className="empty-state-text">No notes yet</p>
            <button className="btn btn-primary btn-sm" onClick={openNewNote}>
              Create your first note
            </button>
          </div>
        </div>
      ) : sortedNotes.length === 0 && search ? (
        <div className="card">
          <div className="empty-state">
            <p className="empty-state-text">No matching notes</p>
          </div>
        </div>
      ) : (
        <div className="notes-grid">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className="card note-card"
              onClick={() => openExistingNote(note)}
              style={{
                background: note.color !== 'none' ? `var(--note-${note.color})` : undefined,
              }}
            >
              <div
                className="note-card-accent"
                style={{
                  background: note.color !== 'none' ? `var(--note-${note.color}-border)` : 'transparent',
                }}
              />
              <div className="note-card-title">{note.title || 'Untitled'}</div>
              <div className="note-card-content">{note.content}</div>
              <div className="note-card-footer">
                <span>{formatDate(note.updatedAt)}</span>
                {note.pinned && <span className="pin-indicator">pinned</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {editorOpen && (
        <div className="modal-overlay" onClick={closeEditor}>
          <div className="note-editor" onClick={(e) => e.stopPropagation()}>
            <div className="note-editor-header">
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {isNew ? 'New Note' : 'Edit Note'}
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn btn-primary btn-sm" onClick={saveNote}>
                  Save
                </button>
                <button className="btn btn-ghost btn-sm" onClick={closeEditor}>
                  Close
                </button>
              </div>
            </div>
            <div className="note-editor-body">
              <input
                className="note-editor-title heading-serif"
                placeholder="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                autoFocus
              />
              <textarea
                className="note-editor-content"
                placeholder="Start writing..."
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            </div>
            <div className="note-editor-footer">
              <div className="color-picker">
                {COLOR_KEYS.map((color) => (
                  <button
                    key={color}
                    className={`color-swatch${editColor === color ? ' active' : ''}`}
                    style={{
                      background: color === 'none' ? 'var(--bg-elevated)' : `var(--note-${color})`,
                      border: color === 'none' ? '1.5px solid var(--border-hover)' : undefined,
                    }}
                    onClick={() => setEditColor(color)}
                    title={color === 'none' ? 'Default' : color}
                  />
                ))}
              </div>
              <button
                className="btn-icon"
                onClick={() => setEditPinned(!editPinned)}
                title={editPinned ? 'Unpin' : 'Pin'}
                style={{ color: editPinned ? 'var(--accent)' : undefined }}
              >
                <PinIcon filled={editPinned} />
              </button>
              <div style={{ flex: 1 }} />
              {!isNew && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setDeleteId(activeId)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        open={!!deleteId}
        title="Delete Note"
        message={deleteTarget ? `Delete "${deleteTarget.title || 'Untitled'}"?` : ''}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Notes;
