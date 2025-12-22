import { useState } from 'react'
import type { Note } from '../types/note.type'

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
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block font-semibold">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="w-full p-2 border rounded-lg"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block font-semibold">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full p-2 border rounded-lg"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Ideas">Ideas</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 border rounded-lg"
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <button className="w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover: bg-purple-600">
              Add Note
            </button>
          </div>
        </form>
      )}
    </>
  )
}
