import { render, screen } from '@testing-library/react'
import NoteForm from '../components/NoteForm'

function renderComponent() {
  render(<NoteForm notes={[]} setNotes={vi.fn()} />)
}

describe('NoteForm', () => {
  describe('rendering', () => {
    it('renders all form fields', () => {
      renderComponent()

      expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    })
  })
})
