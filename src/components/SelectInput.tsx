export type SelectInputProps = {
  label: string
  name: string
  selected: string
  options: SelectOption[]
  required?: boolean
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
}

export type SelectOption = {
  label: string
  value: string
}

export default function SelectInput({
  label,
  name,
  selected,
  options = [],
  required = false,
  onChange,
}: SelectInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full p-2 border rounded-lg"
        value={selected}
        required={required}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
