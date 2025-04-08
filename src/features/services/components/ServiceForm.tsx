'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

import {
  Service,
  createService,
  updateService,
} from '@/server-functions/services'
import { serviceSchema, ServiceFormData } from '../schema/schema'

interface ServiceFormProps {
  initialData?: Service | null
  onSubmitSuccess: () => void
  onCancel: () => void
  barberId: number
  mode: 'create' | 'update' | null
}

const ServiceForm = ({
  initialData,
  onSubmitSuccess,
  onCancel,
  barberId,
  mode,
}: ServiceFormProps) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData
      ? {
          service_name: initialData.service_name,
          price: initialData.price,
          is_active: initialData.is_active,
        }
      : {
          service_name: '',
          price: 0,
          is_active: true,
        },
  })

  const onSubmit = (formData: ServiceFormData) => {
    startTransition(async () => {
      try {
        if (mode === 'create') {
          await createService({
            ...formData,
            barber_id: barberId,
          })
          toast.success('Service created successfully')
        } else if (mode === 'update' && initialData) {
          await updateService(initialData.id, formData)
          toast.success('Service updated successfully')
        }
        onSubmitSuccess()
      } catch (error) {
        console.error(error)
        toast.error(
          `Failed to ${mode === 'create' ? 'create' : 'update'} service`
        )
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
        id='service-form'
      >
        <FormField
          control={form.control}
          name='service_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input placeholder='Haircut' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price ($)</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='30.00'
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value)
                    field.onChange(isNaN(value) ? '' : value)
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter the price in CAD (without the $ symbol)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='is_active'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Active</FormLabel>
                <FormDescription>
                  Inactive services won't be visible to clients
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className='flex justify-end space-x-2'>
          <Button variant='outline' onClick={onCancel} type='button'>
            Cancel
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {mode === 'create' ? 'Create' : 'Update'} Service
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ServiceForm
