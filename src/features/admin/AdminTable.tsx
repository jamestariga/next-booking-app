'use client'

import { useState } from 'react'
import { User } from '@/features/admin/types/admin.types'
import { addUserToBarber, removeUserFromBarber } from '@/server-actions/admin'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'
import Modal from './components/Modal'

type AdminTableProps = {
  usersWithBarberStatus: User[]
}

const AdminTable = ({ usersWithBarberStatus }: AdminTableProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleCellClick = (user: User) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const handleAddBarber = async () => {
    if (selectedUser) {
      const action = selectedUser.isBarber
        ? removeUserFromBarber
        : addUserToBarber
      try {
        await action(selectedUser.id)
        setIsDialogOpen(false)

        const userName = selectedUser.display_name || 'User'
        if (action === addUserToBarber) {
          toast(`${userName} added as a barber`)
        } else {
          toast(`${userName} removed as a barber`)
        }
      } catch (error) {
        console.error('Error adding user to barber:', error)
        toast.error('An error occurred while updating the user status')
      }
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Is Barber</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersWithBarberStatus.map((user) => (
            <TableRow
              key={user.id}
              className='cursor-pointer'
              onClick={() => handleCellClick(user)}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.display_name || 'N/A'}</TableCell>
              <TableCell>{user.email || 'N/A'}</TableCell>
              <TableCell>{user.isBarber ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        selectedUser={selectedUser}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleAddBarber={handleAddBarber}
      />
    </>
  )
}

export default AdminTable
