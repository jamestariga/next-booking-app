'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

type BaseDialogProps = {
  title: string
  description: string
  triggerButton?: {
    label: string
    variant?:
      | 'default'
      | 'destructive'
      | 'outline'
      | 'secondary'
      | 'ghost'
      | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    icon?: ReactNode
  }
}

interface FormDialogProps extends BaseDialogProps {
  mode: 'form'
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

interface ConfirmDialogProps extends BaseDialogProps {
  mode: 'confirm'
  isPending: boolean
  onConfirm: () => void
  confirmLabel?: string
  cancelLabel?: string
}

type ScheduleDialogProps = FormDialogProps | ConfirmDialogProps

const ScheduleDialog = (props: ScheduleDialogProps) => {
  const { title, description, triggerButton, mode } = props

  if (mode === 'form') {
    const { isOpen, onOpenChange, children } = props

    // If triggerButton is not provided, render only the dialog content
    if (!triggerButton) {
      return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      )
    }

    // If triggerButton is provided, render the dialog with trigger
    const { label, variant = 'default', size = 'default', icon } = triggerButton

    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant={variant} size={size}>
            {icon && <span className='mr-2'>{icon}</span>}
            {label}
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  } else {
    // Confirm mode
    const {
      isPending,
      onConfirm,
      confirmLabel = 'Delete',
      cancelLabel = 'Cancel',
    } = props

    // triggerButton is required for confirm mode
    if (!triggerButton) {
      throw new Error('triggerButton is required for confirm mode')
    }

    const { label, variant = 'destructive', size = 'sm', icon } = triggerButton

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={variant} size={size}>
            {icon && <span className='mr-1'>{icon}</span>}
            {label}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm} disabled={isPending}>
              {isPending ? `${confirmLabel}...` : confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
}

export default ScheduleDialog
