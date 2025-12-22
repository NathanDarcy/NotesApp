import { useState } from 'react'
import type { Note } from './types/note.type'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Notes App</h2>

      <NoteForm notes={notes} setNotes={setNotes} />
      <NoteList notes={notes} />
    </div>
  )
}
