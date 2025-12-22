import type { Note } from '../types/note.type'

export type NoteListProps = {
  notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
  if (!notes.length) {
    return <p className="text-center text-gray-500">No notes yet</p>
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="p-4 bg-white rounded-lg shadow-md border-l-4"
        >
          <h3 className="text-lg font-bold">{note.title}</h3>
          <p className="text-sm text-gray-600">
            <strong>Category:</strong>
            {note.category}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Priority:</strong>
            {note.priority}
          </p>
          <p className="mt-2">{note.description}</p>
        </div>
      ))}
    </div>
  )
}
