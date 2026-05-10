'use client';

import { useState } from 'react';
import { FileText, Trash2, Clock } from 'lucide-react';
import styles from './notes.module.css';

export default function NotesClient({ initialNotes, tripId }: { initialNotes: any[], tripId: string }) {
  const [notes, setNotes] = useState(initialNotes);
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;

    const newNote = {
      id: Math.random().toString(),
      content: newNoteContent,
      timestamp: new Date().toISOString(),
      tripId
    };

    setNotes([newNote, ...notes]);
    setNewNoteContent('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Trip Notes & Journal</h2>
      </div>

      <form onSubmit={handleAddNote} className={styles.addForm}>
        <textarea 
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Jot down some thoughts, booking codes, or memories..."
          rows={4}
          className={styles.textarea}
        />
        <div className={styles.actions}>
          <button type="submit" className="btn-primary">Add Note</button>
        </div>
      </form>

      <div className={styles.notesList}>
        {notes.length === 0 ? (
          <div className={`glass ${styles.emptyState}`}>
            <FileText size={48} className={styles.emptyIcon} />
            <h3>No notes yet</h3>
            <p>Write something to remember!</p>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className={`glass ${styles.noteCard}`}>
              <div className={styles.noteHeader}>
                <span className={styles.timestamp}>
                  <Clock size={14} /> 
                  {new Date(note.timestamp).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </span>
                <button onClick={() => deleteNote(note.id)} className={styles.deleteBtn}>
                  <Trash2 size={16} />
                </button>
              </div>
              <p className={styles.content}>{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
