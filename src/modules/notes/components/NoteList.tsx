import type { Note } from '../types/note.type'

export type NoteListProps = {
  notes: Note[]
  deleteNote: (id: number) => void
}

export default function NoteList({ notes, deleteNote }: NoteListProps) {
  if (!notes.length) {
    return <p className="text-center text-gray-500">No notes yet</p>
  }

  function getStyleByPriority(priority: 'High' | 'Medium' | 'Low') {
    if (priority === 'High') {
      return 'red'
    }
    if (priority === 'Medium') {
      return 'orange'
    }
    return 'green'
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="p-4 bg-white rounded-lg shadow-md border-l-4"
          style={{ borderLeftColor: getStyleByPriority(note.priority) }}
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

          <button
            onClick={() => {
              deleteNote(note.id)
            }}
            className="mt-3 text-red-500 cursor-pointer transition hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
