export type Reservation = {
  barber_id: number
  user_id: number
  service: string
  start: string
  end: string
  price: number
  status: string
}

export type Service = {
  id: number
  barber_id: number
  service_name: string
  price: number | null
}
