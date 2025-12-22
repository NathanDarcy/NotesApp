import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Textarea, { type TextareaProps } from '../Textarea'

const mockOnChange = vi.fn()

function renderComponent(overrides: Partial<TextareaProps> = {}) {
  const {
    label = 'Description',
    name = 'description',
    value = '',
    required = false,
    onChange = mockOnChange,
  } = overrides

  render(
    <Textarea
      label={label}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
    />
  )
}

describe('Textarea', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('rendering', () => {
    it('renders the label and associates it with the textarea', () => {
      renderComponent({ label: 'Notes', name: 'notes' })

      const label = screen.getByText('Notes')
      const textarea = screen.getByLabelText('Notes')

      expect(label).toBeInTheDocument()
      expect(textarea).toBeInTheDocument()
      expect(textarea).toHaveAttribute('id', 'notes')
      expect(label).toHaveAttribute('for', 'notes')
    })

    it('renders the initial value', () => {
      renderComponent({ value: 'Initial text' })

      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveValue('Initial text')
    })

    it('sets the required attribute when required is true', () => {
      renderComponent({ required: true })

      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeRequired()
    })
  })

  describe('behavior', () => {
    it('calls onChange when the user types', async () => {
      const user = userEvent.setup()
      renderComponent({ value: '' })

      const textarea = screen.getByRole('textbox')

      await user.type(textarea, 'Hello')

      expect(mockOnChange).toHaveBeenCalledTimes(5) // H e l l o
    })
  })
})
