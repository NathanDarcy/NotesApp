import { useState } from 'react'
import type { Note } from './modules/notes/types/note.type'
import NoteForm from './modules/notes/components/NoteForm'
import NoteList from './modules/notes/components/NoteList'

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])

  function handleDeleteNote(id: number) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this note?'
    )

    if (!confirmDelete) {
      return
    }

    setNotes(notes.filter((note) => id !== note.id))
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Notes App</h2>

      <NoteForm notes={notes} setNotes={setNotes} />
      <NoteList notes={notes} deleteNote={handleDeleteNote} />
    </div>
  )
}
