'use client'

import { useState, useTransition } from 'react'
import ListView from '@/components/ListView/ListView'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Service, deleteService } from '@/server-functions/services'
import ServiceForm from './ServiceForm'

type ServiceListProps = {
  services: Service[]
  barberId: number
}

const ServicesList = ({ services, barberId }: ServiceListProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean
    mode: 'create' | 'update' | null
  }>({
    isOpen: false,
    mode: null,
  })

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
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
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setDialogState({ isOpen: true, mode: 'update' })
  }

  const handleCreateOpen = () => {
    setEditingService(null)
    setDialogState({ isOpen: true, mode: 'create' })
  }

  const handleDialogClose = () => {
    setDialogState({ isOpen: false, mode: null })
    setEditingService(null)
  }

  const handleFormSuccess = () => {
    handleDialogClose()
    router.refresh()
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Services</h2>
        <Button onClick={handleCreateOpen} size='sm'>
          <Plus className='h-4 w-4 mr-2' />
          Add Service
        </Button>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className='pt-6'>
            <p className='text-center text-muted-foreground py-4'>
              No services found. Click 'Add Service' to create your first
              service.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ListView
          data={services}
          renderItem={(service) => (
            <Card key={service.id} className='w-full'>
              <CardHeader className='pb-2'>
                <div className='flex justify-between items-start'>
                  <CardTitle>{service.service_name}</CardTitle>
                  <Badge variant={service.is_active ? 'default' : 'secondary'}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <CardDescription>${service.price.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent className='flex justify-end space-x-2 pt-0'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleEdit(service)}
                  disabled={isPending}
                >
                  <Pencil className='h-4 w-4 mr-2' />
                  Edit
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleDelete(service.id)}
                  disabled={isPending}
                  className='text-destructive hover:text-destructive hover:bg-destructive/10'
                >
                  <Trash2 className='h-4 w-4 mr-2' />
                  Delete
                </Button>
              </CardContent>
            </Card>
          )}
        />
      )}

      <Dialog
        open={dialogState.isOpen}
        onOpenChange={(open) => {
          if (!open) handleDialogClose()
        }}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>
              {dialogState.mode === 'create' ? 'Add Service' : 'Edit Service'}
            </DialogTitle>
          </DialogHeader>
          {dialogState.isOpen && (
            <ServiceForm
              initialData={editingService}
              onSubmitSuccess={handleFormSuccess}
              onCancel={handleDialogClose}
              barberId={barberId}
              mode={dialogState.mode}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ServicesList
