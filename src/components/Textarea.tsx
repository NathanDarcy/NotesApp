export type TextareaProps = {
  label: string
  name: string
  value: string
  required: boolean
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
}

export default function Textarea({
  label,
  name,
  required = false,
  value,
  onChange,
}: TextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className="w-full p-2 border rounded-lg"
        required={required}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  )
}
