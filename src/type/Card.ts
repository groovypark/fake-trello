export type Card = {
  id?: string
  order: number
  title: string
  description: string
  checklist: string[]
  comment: string[]
  dueDate: string
  attachments: string[]
}