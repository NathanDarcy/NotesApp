import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelectInput, { type SelectInputProps } from '../SelectInput'

const mockOnChange = vi.fn()

function renderComponent(overrides: Partial<SelectInputProps> = {}) {
  const {
    label = 'Priority',
    name = 'priority',
    selected = 'High',
    required = false,
    options = [
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' },
    ],
    onChange = mockOnChange,
  } = overrides

  render(
    <SelectInput
      label={label}
      name={name}
      selected={selected}
      required={required}
      options={options}
      onChange={onChange}
    />
  )
}

describe('SelectInput', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('rendering', () => {
    it('renders the label and associates it with the select', () => {
      renderComponent({ label: 'Category', name: 'category' })

      const label = screen.getByText('Category')
      const select = screen.getByLabelText('Category')

      expect(label).toBeInTheDocument()
      expect(select).toBeInTheDocument()
      expect(select).toHaveAttribute('id', 'category')
      expect(label).toHaveAttribute('for', 'category')
    })

    it('renders all provided options', () => {
      const options = [
        { label: 'Work', value: 'work' },
        { label: 'Personal', value: 'personal' },
      ]

      renderComponent({ options })

      expect(screen.getByRole('option', { name: 'Work' })).toBeInTheDocument()
      expect(
        screen.getByRole('option', { name: 'Personal' })
      ).toBeInTheDocument()
    })

    it('sets the initial selected value', () => {
      renderComponent({ selected: 'Medium' })

      const select = screen.getByRole('combobox')
      expect(select).toHaveValue('Medium')
    })

    it('sets the required attribute when required is true', () => {
      renderComponent({ required: true })

      const select = screen.getByRole('combobox')
      expect(select).toBeRequired()
    })
  })

  describe('behavior', () => {
    it('calls onChange when the user selects a new option', async () => {
      const user = userEvent.setup()
      renderComponent({ selected: 'High' })

      const select = screen.getByRole('combobox')

      await user.selectOptions(select, 'Low')

      expect(mockOnChange).toHaveBeenCalledTimes(1)
    })
  })
})
