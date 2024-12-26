export type User = {
  isBarber: boolean
  created_at: string
  display_name: string
  email: string
  first_name: string
  id: number
  last_name: string
  role: string
  user_id: string
}

export type ModalProps = {
  selectedUser: User | null
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleAddBarber: () => Promise<void>
}
