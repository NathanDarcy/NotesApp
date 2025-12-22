import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteListItem, {
  type NoteListItemProps,
} from '../components/NoteListItem'

const mockOnDeleteNote = vi.fn()

function renderComponent(overrides: Partial<NoteListItemProps> = {}) {
  const {
    note = {
      id: 111,
      title: 'Test Title',
      priority: 'High',
      category: 'Work',
      description: 'Test Description',
    },
    onDeleteNote = mockOnDeleteNote,
  } = overrides

  render(<NoteListItem note={note} onDeleteNote={onDeleteNote} />)
}

describe('NoteListItem', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('rendering', () => {
    it('renders the note properties', () => {
      renderComponent()

      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText(/Category:/)).toBeInTheDocument()
      expect(screen.getByText('Work')).toBeInTheDocument()
      expect(screen.getByText(/Priority:/)).toBeInTheDocument()
      expect(screen.getByText('High')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
    })

    it.each([
      [1, 'High', 'rgb(255, 0, 0)'],
      [2, 'Medium', 'rgb(255, 165, 0)'],
      [3, 'Low', 'rgb(0, 128, 0)'],
    ] as const)(
      'renders note %s %s priority with border-left color %s',
      (id, priority, expectedColor) => {
        renderComponent({
          note: {
            id,
            title: 'Priority Test',
            priority,
            category: 'Work',
            description: '',
          },
        })

        const item = screen.getByTestId(`note-item-${id}`)
        const styles = getComputedStyle(item)

        expect(styles.borderLeftColor).toBe(expectedColor)
      }
    )
  })

  describe('behavior', () => {
    it('calls onDeleteNote with the note id when Delete is clicked', async () => {
      renderComponent()

      const user = userEvent.setup()
      await user.click(screen.getByText('Delete'))

      expect(mockOnDeleteNote).toHaveBeenCalledTimes(1)
      expect(mockOnDeleteNote).toHaveBeenCalledWith(111)
    })
  })
})
