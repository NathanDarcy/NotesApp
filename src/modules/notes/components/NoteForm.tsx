import { useState } from 'react'
import type { Note } from '../types/note.type'
import TextInput from '../../../components/TextInput'
import SelectInput from '../../../components/SelectInput'
import Textarea from '../../../components/Textarea'

export type NoteFormProps = {
  notes: Note[]
  setNotes: React.Dispatch<React.SetStateAction<Note[]>> // react state setter function
}

export default function NoteForm({ setNotes }: NoteFormProps) {
  type NoteFormData = {
    title: string
    priority: 'High' | 'Medium' | 'Low'
    category: 'Work' | 'Personal' | 'Ideas'
    description: string
  }

  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    priority: 'Medium',
    category: 'Work',
    description: '',
  })

  const [isFormVisible, setIsFormVisible] = useState(false)

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    if (!formData.title || !formData.description) {
      return
    }

    const newNote = { id: Date.now(), ...formData }
    setNotes((prev) => [...prev, newNote])
    setFormData({
      title: '',
      priority: 'Medium',
      category: 'Work',
      description: '',
    })
  }

  return (
    <>
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full bg-gray-100 border border-gray-300 text-purple-800 
                  py-2 rounded-lg cursor-pointer hover:bg-purple-200 
                  hover:border-purple-300 transition mb-4"
      >
        {isFormVisible ? 'Hide Form' : 'Add New Note'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-6">
          <TextInput
            label="Title"
            name="title"
            inputValue={formData.title}
            required
            onChange={handleChange}
          />
          <SelectInput
            label="Priority"
            name="priority"
            selected={formData.priority}
            options={[
              { value: 'High', label: 'High' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Low', label: 'Low' },
            ]}
            onChange={handleChange}
          />
          <SelectInput
            label="Category"
            name="category"
            selected={formData.category}
            options={[
              { value: 'Work', label: 'Work' },
              { value: 'Personal', label: 'Personal' },
              { value: 'Ideas', label: 'Ideas' },
            ]}
            onChange={handleChange}
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button className="w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover: bg-purple-600">
            Add Note
          </button>
        </form>
      )}
    </>
  )
}
