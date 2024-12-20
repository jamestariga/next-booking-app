export type Reservation = {
  barber_id: number
  created_at: string
  end: string
  id: number
  service: Service
  start: string
  status: string
  user_id: number
}

export type Service = {
  id: number
  barber_id: number
  service_name: string
  price: number | null
  created_at: string
}
