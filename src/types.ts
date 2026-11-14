export type TaskStage = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  category: string;
  createdAt: string;
  stage?: TaskStage;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  color: NoteColor;
  createdAt: string;
  updatedAt: string;
}

export type NoteColor = 'none' | 'clay' | 'olive' | 'slate' | 'amber';

export const NOTE_COLOR_VALUES: Record<NoteColor, string> = {
  none: 'transparent',
  clay: '#3D2B24',
  olive: '#2B3028',
  slate: '#272A30',
  amber: '#332D1F',
};

export const NOTE_COLOR_BORDER: Record<NoteColor, string> = {
  none: 'transparent',
  clay: '#6B4A3A',
  olive: '#4A5A42',
  slate: '#454B56',
  amber: '#5A4D33',
};
