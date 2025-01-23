export type IProfile = {
  created_at: string
  email: string
  first_name: string
  display_name: string
  id: number
  last_name: string
  role: string
  user_id: string
}

export type IBarberProfile = {
  created_at: string
  id: number
  user_id: number
  profiles: {
    id: number
    display_name: string
  }
}
