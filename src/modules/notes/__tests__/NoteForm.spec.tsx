import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm, { type NoteFormProps } from '../components/NoteForm'

const mockSetNotes = vi.fn()

function renderComponent(overrides: Partial<NoteFormProps> = {}) {
  const { notes = [], setNotes = mockSetNotes } = overrides

  render(<NoteForm notes={notes} setNotes={setNotes} />)
}

describe('NoteForm', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('rendering', () => {
    it('toggles the form visibility when clicking the button', async () => {
      const user = userEvent.setup()
      renderComponent()

      // Initially hidden
      expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument()

      // Click to show
      await user.click(screen.getByRole('button', { name: /add new note/i }))
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument()

      // Click to hide
      await user.click(screen.getByRole('button', { name: /hide form/i }))
      expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument()
    })

    it('renders all form fields when visible', async () => {
      const user = userEvent.setup()
      renderComponent()

      await user.click(screen.getByRole('button', { name: /add new note/i }))

      expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    })
  })

  describe('behavior', () => {
    it('updates form fields when typing/selecting', async () => {
      const user = userEvent.setup()
      renderComponent()

      await user.click(screen.getByRole('button', { name: /add new note/i }))

      const title = screen.getByLabelText(/title/i)
      const priority = screen.getByLabelText(/priority/i)
      const category = screen.getByLabelText(/category/i)
      const description = screen.getByLabelText(/description/i)

      await user.type(title, 'My Note')
      await user.selectOptions(priority, 'High')
      await user.selectOptions(category, 'Ideas')
      await user.type(description, 'This is a test')

      expect(title).toHaveValue('My Note')
      expect(priority).toHaveValue('High')
      expect(category).toHaveValue('Ideas')
      expect(description).toHaveValue('This is a test')
    })

    it('does not submit when required fields are empty', async () => {
      const user = userEvent.setup()
      renderComponent()

      await user.click(screen.getByRole('button', { name: /add new note/i }))

      // Only fill description, leave title empty
      await user.type(screen.getByLabelText(/description/i), 'Missing title')

      await user.click(screen.getByRole('button', { name: /add note/i }))

      expect(mockSetNotes).not.toHaveBeenCalled()
    })

    it('submits the form and calls setNotes with a new note', async () => {
      const user = userEvent.setup()
      renderComponent()

      await user.click(screen.getByRole('button', { name: /add new note/i }))

      await user.type(screen.getByLabelText(/title/i), 'New Note')
      await user.type(screen.getByLabelText(/description/i), 'Some details')

      await user.click(screen.getByRole('button', { name: /add note/i }))

      expect(mockSetNotes).toHaveBeenCalledTimes(1)

      const callArg = mockSetNotes.mock.calls[0][0]
      expect(typeof callArg).toBe('function') // React state setter callback

      // Simulate the state update to inspect the new note
      const result = callArg([])
      expect(result[0].title).toBe('New Note')
      expect(result[0].description).toBe('Some details')
      expect(result[0].priority).toBe('Medium') // default
      expect(result[0].category).toBe('Work') // default
      expect(typeof result[0].id).toBe('number')
    })

    it('resets the form after successful submission', async () => {
      const user = userEvent.setup()
      renderComponent()

      await user.click(screen.getByRole('button', { name: /add new note/i }))

      const title = screen.getByLabelText(/title/i)
      const description = screen.getByLabelText(/description/i)

      await user.type(title, 'Reset Test')
      await user.type(description, 'Reset desc')

      await user.click(screen.getByRole('button', { name: /add note/i }))

      expect(title).toHaveValue('')
      expect(description).toHaveValue('')
    })
  })
})
