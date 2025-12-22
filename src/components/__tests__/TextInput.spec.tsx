import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextInput, { type FormTextInputProps } from '../TextInput'

const mockOnChange = vi.fn()

function renderComponent(overrides: Partial<FormTextInputProps> = {}) {
  const {
    label = 'Title',
    name = 'title',
    inputValue = '',
    required = false,
    onChange = mockOnChange,
  } = overrides

  render(
    <TextInput
      label={label}
      name={name}
      inputValue={inputValue}
      required={required}
      onChange={onChange}
    />
  )
}

describe('TextInput', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('rendering', () => {
    it('renders the label and associates it with the input', () => {
      renderComponent({ label: 'Name', name: 'name' })

      const label = screen.getByText('Name')
      const input = screen.getByLabelText('Name')

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('id', 'name')
      expect(label).toHaveAttribute('for', 'name')
    })

    it('renders the initial value', () => {
      renderComponent({ inputValue: 'Hello' })

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('Hello')
    })

    it('sets the required attribute when required is true', () => {
      renderComponent({ required: true })

      const input = screen.getByRole('textbox')
      expect(input).toBeRequired()
    })
  })

  describe('behavior', () => {
    it('calls onChange when the user types', async () => {
      const user = userEvent.setup()
      renderComponent({ inputValue: '' })

      const input = screen.getByRole('textbox')

      await user.type(input, 'abc')

      expect(mockOnChange).toHaveBeenCalledTimes(3) // a b c
    })
  })
})
