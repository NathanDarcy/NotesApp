import { render, screen } from '@testing-library/react'
import type { NoteListProps } from '../components/NoteList'
import NoteList from '../components/NoteList'
import type { Note } from '../types/note.type'

const mockDeleteNote = vi.fn()
const note1: Note = {
  id: 1,
  title: 'Do note 1',
  category: 'Work',
  priority: 'High',
  description: 'This is note 1',
}
const note2: Note = {
  id: 2,
  title: 'Do note 2',
  category: 'Personal',
  priority: 'Low',
  description: 'This is note 2',
}

function renderComponent(overrides: Partial<NoteListProps> = {}) {
  const { notes = [note1, note2], deleteNote = mockDeleteNote } = overrides

  render(<NoteList notes={notes} deleteNote={deleteNote} />)
}

describe('NoteList', () => {
  it('renders a list of notes', () => {
    renderComponent()

    expect(screen.getByText(note1.title)).toBeInTheDocument()
    expect(screen.getByText(note2.title)).toBeInTheDocument()
  })
})
