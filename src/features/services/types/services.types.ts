import { Service } from '@/server-functions/services'
import { ServiceFormData } from '../schema/schema'

export interface ServiceCardProps {
  service: Service
  onEdit: (service: Service) => void
  onDelete: (id: number) => void
  isPending: boolean
}

export interface ServiceFormValues {
  service_name: string
  price: number
  is_active: boolean
}

export interface ServiceListProps {
  services: Service[]
  barberId: number
}

export interface ServiceFormProps {
  initialData?: Service | null
  onSubmitSuccess: () => void
  onCancel: () => void
  barberId: number
  mode: 'create' | 'update' | null
}
