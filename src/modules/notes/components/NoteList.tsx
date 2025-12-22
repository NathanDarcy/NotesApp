import type { Note } from '../types/note.type'
import NoteListItem from './NoteListItem'

export type NoteListProps = {
  notes: Note[]
  deleteNote: (id: number) => void
}

export default function NoteList({ notes, deleteNote }: NoteListProps) {
  if (!notes.length) {
    return <p className="text-center text-gray-500">No notes yet</p>
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteListItem key={note.id} note={note} onDeleteNote={deleteNote} />
      ))}
    </div>
  )
}
