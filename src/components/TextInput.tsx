export type FormTextInputProps = {
  label: string
  name: string
  inputValue: string
  required?: boolean
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
}

export default function TextInput({
  label,
  name,
  inputValue,
  required = false,
  onChange,
}: FormTextInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        className="w-full p-2 border rounded-lg"
        value={inputValue}
        required={required}
        onChange={onChange}
      />
    </div>
  )
}
