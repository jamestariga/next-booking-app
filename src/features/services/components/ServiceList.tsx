'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Service, deleteService } from '@/server-functions/services'

type ServiceListProps = {
  services: Service[]
  barberId: number
}

const ServicesList = ({ services, barberId }: ServiceListProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleDelete = async (id: number) => {
    startTransition(async () => {
      try {
        await deleteService(id)
        toast.success('Service deleted successfully')
        router.refresh()
      } catch (error) {
        console.error(error)
        toast.error('Failed to delete service')
      }
    })
  }

  // TODO: Could leverage the custom useActionState hook
  const handleEdit = (service: Service) => {
    setEditingService(service)
    setIsDialogOpen(true)
  }

  const handleCreateSuccess = () => {
    setIsDialogOpen(false)
    router.refresh()
  }

  const handleUpdateSuccess = () => {
    setIsDialogOpen(false)
    setEditingService(null)
    router.refresh()
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Services</h2>
      </div>
    </div>
  )
}

export default ServicesList
