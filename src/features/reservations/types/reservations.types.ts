export type Reservation = {
  id: number
  start: string
  end: string
  status: string
  service: {
    id: number
    price: number
    barber_id: number
    service_name: string
  }
  barber?: {
    id: number
    profile: {
      id: number
      display_name: string
    }
  }
  customer?: {
    id: number
    display_name: string
  }
  created_at: string
}

export type Service = {
  id: number
  barber_id: number
  service_name: string
  price: number | null
  created_at?: string
}

export type ProfileAndReservations = {
  id: number
  display_name: string
  reservations: Array<{
    id: number
    start: string
    end: string
    status: string
    service: {
      id: number
      price: number
      barber_id: number
      service_name: string
    }
    barber: {
      id: number
      profile: {
        id: number
        display_name: string
      }
    }
    created_at: string
  }>
}

export type Appointment = {
  barber_id: number
  created_at: string
  end: string
  id: number
  service: {
    id: number
    price: number
    barber_id: number
    service_name: string
  }
  start: string
  status: string
  user_id: number
}

export type AppointmentStatus = {
  id: number
  status: string
}

export type TimeSlot = {
  start: string
  end: string
  display: string
  active: boolean
}
