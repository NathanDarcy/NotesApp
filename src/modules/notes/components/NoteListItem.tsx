import type { Note } from '../types/note.type'

export type NoteListItemProps = {
  note: Note
  onDeleteNote: (id: number) => void
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

export default function NoteListItem({
  note,
  onDeleteNote,
}: NoteListItemProps) {
  return (
    <div
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
          onDeleteNote(note.id)
        }}
        className="mt-3 text-red-500 cursor-pointer transition hover:text-red-700"
      >
        Delete
      </button>
    </div>
  )
}
