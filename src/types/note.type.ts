export type Note = {
  id: number
  title: string
  priority: 'High' | 'Medium' | 'Low'
  category: 'Work' | 'Personal' | 'Ideas'
  description: string
}
