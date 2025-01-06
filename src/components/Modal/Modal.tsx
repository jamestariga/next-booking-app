import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type ModalProps = {
  children: React.ReactNode
  title: string
  description: string
  link?: string
  isOpen: boolean
  linkTitle: string
}

const Modal = ({
  children,
  title,
  description,
  link,
  isOpen,
  linkTitle,
}: ModalProps) => {
  const router = useRouter()

  const handleOpenChange = () => {
    if (title === 'Login' || title === 'Sign Up') {
      router.push('/')
    } else {
      router.back()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent
          className='overflow-y-hidden'
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogTitle>{title}</DialogTitle>
          {children}
          <DialogDescription className='text-center'>
            {description}
            {link && (
              <Link
                className='text-foreground underline'
                href={`/${link}`}
                scroll={false}
              >
                {linkTitle}
              </Link>
            )}
          </DialogDescription>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}

export default Modal
