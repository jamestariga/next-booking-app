import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ModalProps } from '../types/admin.types'

const Modal = ({
  selectedUser,
  isDialogOpen,
  setIsDialogOpen,
  handleAddBarber,
}: ModalProps) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogOverlay>
        <DialogContent
          className='overflow-y-hidden'
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Make Changes to the selected user
          </DialogDescription>
          {selectedUser && (
            <div className='space-y-4'>
              <div>
                <p className='font-medium'>Name:</p>
                <p>{selectedUser.display_name || 'N/A'}</p>
              </div>
              <div>
                <p className='font-medium'>Email:</p>
                <p>{selectedUser.email}</p>
              </div>

              <Button
                onClick={handleAddBarber}
                className='w-full'
                variant={`${selectedUser.isBarber ? 'destructive' : 'default'}`}
              >
                {selectedUser.isBarber ? 'Remove as Barber' : 'Add as Barber'}
              </Button>
            </div>
          )}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}

export default Modal
