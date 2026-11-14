import React, { useState, useMemo } from 'react';
import { useLocalStorage, generateId, formatDueDate, isDueOverdue, isDueToday } from '../hooks';
import { Task, TaskStage } from '../types';
import Modal from '../components/Modal';

type Filter = 'all' | 'pending' | 'done';
type Sort = 'newest' | 'priority' | 'due' | 'alpha';
type View = 'list' | 'board';

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };

const STAGES: { key: TaskStage; label: string }[] = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];

const resolveStage = (task: Task): TaskStage => task.stage || (task.done ? 'done' : 'todo');

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

const ListIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const BoardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="5" height="18" rx="1" />
    <rect x="10" y="3" width="5" height="14" rx="1" />
    <rect x="17" y="3" width="5" height="10" rx="1" />
  </svg>
);

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('nara_tasks', []);
  const [view, setView] = useLocalStorage<View>('nara_task_view', 'list');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('newest');
  const [addMode, setAddMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStage | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formPriority, setFormPriority] = useState<Task['priority']>('medium');
  const [formDueDate, setFormDueDate] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formStage, setFormStage] = useState<TaskStage>('todo');

  const resetForm = () => {
    setFormTitle('');
    setFormPriority('medium');
    setFormDueDate('');
    setFormCategory('');
    setFormStage('todo');
  };

  const openAdd = () => {
    resetForm();
    setEditingId(null);
    setAddMode(true);
  };

  const openEdit = (task: Task) => {
    setAddMode(false);
    setFormTitle(task.title);
    setFormPriority(task.priority);
    setFormDueDate(task.dueDate || '');
    setFormCategory(task.category);
    setFormStage(resolveStage(task));
    setEditingId(task.id);
  };

  const saveAdd = () => {
    if (!formTitle.trim()) return;
    const task: Task = {
      id: generateId(),
      title: formTitle.trim(),
      done: false,
      priority: formPriority,
      dueDate: formDueDate || null,
      category: formCategory.trim(),
      createdAt: new Date().toISOString(),
      stage: 'todo',
    };
    setTasks((prev) => [task, ...prev]);
    resetForm();
    setAddMode(false);
  };

  const saveEdit = () => {
    if (!formTitle.trim() || !editingId) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingId
          ? {
              ...t,
              title: formTitle.trim(),
              priority: formPriority,
              dueDate: formDueDate || null,
              category: formCategory.trim(),
              stage: formStage,
              done: formStage === 'done',
            }
          : t
      )
    );
    setEditingId(null);
    resetForm();
  };

  const cancelForm = () => {
    setAddMode(false);
    setEditingId(null);
    resetForm();
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const newDone = !t.done;
        return {
          ...t,
          done: newDone,
          stage: newDone ? 'done' : resolveStage(t) === 'done' ? 'todo' : t.stage,
        };
      })
    );
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setTasks((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
    if (editingId === deleteId) {
      setEditingId(null);
      resetForm();
    }
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.done));
  };

  const handleDragStart = (taskId: string) => setDraggedId(taskId);
  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverColumn(null);
  };
  const handleDrop = (stage: TaskStage) => {
    if (!draggedId) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === draggedId ? { ...t, stage, done: stage === 'done' } : t
      )
    );
    setDraggedId(null);
    setDragOverColumn(null);
  };

  const searchedTasks = useMemo(() => {
    let result = [...tasks];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'priority':
        result.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
        break;
      case 'due':
        result.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        });
        break;
      case 'alpha':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return result;
  }, [tasks, search, sort]);

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return searchedTasks;
    if (filter === 'pending') return searchedTasks.filter((t) => !t.done);
    return searchedTasks.filter((t) => t.done);
  }, [searchedTasks, filter]);

  const pendingCount = tasks.filter((t) => !t.done).length;
  const completedCount = tasks.filter((t) => t.done).length;
  const deleteTarget = tasks.find((t) => t.id === deleteId);

  const renderForm = (onSave: () => void, isEdit?: boolean) => (
    <div className="task-form">
      <div className="task-form-row">
        <input
          className="input"
          placeholder="Task title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSave();
            if (e.key === 'Escape') cancelForm();
          }}
        />
      </div>
      <div className="task-form-row" style={{ flexWrap: 'wrap' }}>
        <select
          className="input"
          value={formPriority}
          onChange={(e) => setFormPriority(e.target.value as Task['priority'])}
          style={{ width: '110px', flexShrink: 0 }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          className="input"
          type="date"
          value={formDueDate}
          onChange={(e) => setFormDueDate(e.target.value)}
          style={{ width: '160px', flexShrink: 0 }}
        />
        <input
          className="input"
          placeholder="Category"
          value={formCategory}
          onChange={(e) => setFormCategory(e.target.value)}
          style={{ width: '120px', flexShrink: 0 }}
        />
        {isEdit && (
          <select
            className="input"
            value={formStage}
            onChange={(e) => setFormStage(e.target.value as TaskStage)}
            style={{ width: '130px', flexShrink: 0 }}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        )}
        <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
          <button className="btn btn-primary btn-sm" onClick={onSave}>
            {isEdit ? 'Save' : 'Add'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={cancelForm}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="heading-serif">Tasks</h1>
          <div className="page-header-line" />
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className="view-toggle">
            <button
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
              title="List view"
            >
              <ListIcon />
            </button>
            <button
              className={view === 'board' ? 'active' : ''}
              onClick={() => setView('board')}
              title="Board view"
            >
              <BoardIcon />
            </button>
          </div>
          {pendingCount > 0 && (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {pendingCount} pending
            </span>
          )}
          <button className="btn btn-primary btn-sm" onClick={openAdd}>
            Add Task
          </button>
        </div>
      </div>

      <div className="search-bar">
        <SearchIcon />
        <input
          className="input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ===== LIST VIEW ===== */}
      {view === 'list' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div className="filter-tabs" style={{ marginBottom: 0, flex: '1 1 auto' }}>
              {(['all', 'pending', 'done'] as Filter[]).map((f) => (
                <button
                  key={f}
                  className={`filter-tab${filter === f ? ' active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <select
              className="input"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              style={{ width: 'auto', flexShrink: 0, fontSize: '11px', padding: '6px 28px 6px 10px' }}
            >
              <option value="newest">Newest</option>
              <option value="priority">Priority</option>
              <option value="due">Due Date</option>
              <option value="alpha">A-Z</option>
            </select>
          </div>

          <div className="card">
            {addMode && renderForm(saveAdd)}

            {filteredTasks.length === 0 && !addMode ? (
              <div className="empty-state">
                <p className="empty-state-text">
                  {search || filter !== 'all' ? 'No matching tasks' : 'No tasks yet'}
                </p>
                {!search && filter === 'all' && (
                  <button className="btn btn-primary btn-sm" onClick={openAdd}>
                    Add your first task
                  </button>
                )}
              </div>
            ) : (
              filteredTasks.map((task) =>
                editingId === task.id ? (
                  <React.Fragment key={task.id}>{renderForm(saveEdit, true)}</React.Fragment>
                ) : (
                  <div key={task.id} className="task-item">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className={`priority-dot priority-${task.priority}`} />
                    <span className={`task-title${task.done ? ' done' : ''}`}>{task.title}</span>
                    <div className="task-meta">
                      {task.category && <span className="category-tag">{task.category}</span>}
                      {task.dueDate && (
                        <span
                          className={`due-badge${isDueOverdue(task.dueDate) && !task.done ? ' overdue' : isDueToday(task.dueDate) ? ' today' : ''}`}
                        >
                          {formatDueDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                    <div className="task-actions">
                      <button className="btn-icon" onClick={() => openEdit(task)} title="Edit">
                        <EditIcon />
                      </button>
                      <button className="btn-icon" onClick={() => setDeleteId(task.id)} title="Delete" style={{ color: 'var(--danger)' }}>
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          </div>

          {completedCount > 0 && filter !== 'done' && (
            <div style={{ textAlign: 'right', marginTop: '12px' }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={clearCompleted}
                style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Clear {completedCount} completed
              </button>
            </div>
          )}
        </>
      )}

      {/* ===== BOARD VIEW ===== */}
      {view === 'board' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <select
              className="input"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              style={{ width: 'auto', flexShrink: 0, fontSize: '11px', padding: '6px 28px 6px 10px' }}
            >
              <option value="newest">Newest</option>
              <option value="priority">Priority</option>
              <option value="due">Due Date</option>
              <option value="alpha">A-Z</option>
            </select>
          </div>

          <div className="kanban-board">
            {STAGES.map(({ key, label }) => {
              const columnTasks = searchedTasks.filter((t) => resolveStage(t) === key);
              return (
                <div
                  key={key}
                  className={`kanban-column${dragOverColumn === key ? ' drag-over' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverColumn(key);
                  }}
                  onDragLeave={() => setDragOverColumn(null)}
                  onDrop={() => handleDrop(key)}
                >
                  <div className="kanban-column-header">
                    <span className="kanban-column-title">{label}</span>
                    <span className="kanban-column-count">{columnTasks.length}</span>
                  </div>
                  <div className="kanban-cards">
                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`kanban-card${draggedId === task.id ? ' dragging' : ''}`}
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                        onDragEnd={handleDragEnd}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                            <span className={`priority-dot priority-${task.priority}`} />
                            <span className={`kanban-card-title${task.done ? ' done' : ''}`}>
                              {task.title}
                            </span>
                          </div>
                          <div className="kanban-card-actions">
                            <button
                              className="btn-icon"
                              onClick={() => openEdit(task)}
                              title="Edit"
                              style={{ padding: '2px' }}
                            >
                              <EditIcon />
                            </button>
                            <button
                              className="btn-icon"
                              onClick={() => setDeleteId(task.id)}
                              title="Delete"
                              style={{ padding: '2px', color: 'var(--danger)' }}
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                        {(task.category || task.dueDate) && (
                          <div className="kanban-card-meta" style={{ marginTop: '8px' }}>
                            {task.category && <span className="category-tag">{task.category}</span>}
                            {task.dueDate && (
                              <span
                                className={`due-badge${isDueOverdue(task.dueDate) && !task.done ? ' overdue' : isDueToday(task.dueDate) ? ' today' : ''}`}
                              >
                                {formatDueDate(task.dueDate)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    {columnTasks.length === 0 && (
                      <div style={{ padding: '24px 12px', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                        No tasks
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {(addMode || editingId) && (
            <div className="modal-overlay" onClick={cancelForm}>
              <div
                onClick={(e) => e.stopPropagation()}
                style={{ width: '100%', maxWidth: '520px' }}
              >
                {addMode
                  ? renderForm(saveAdd)
                  : renderForm(saveEdit, true)}
              </div>
            </div>
          )}
        </>
      )}

      <Modal
        open={!!deleteId && !addMode && !editingId}
        title="Delete Task"
        message={deleteTarget ? `Delete "${deleteTarget.title}"?` : ''}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Tasks;
