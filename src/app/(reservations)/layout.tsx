import '@/app/globals.css'
import Navbar from '@/components/Navigation/NavBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reservations - Kols Studio',
  description: 'Manage your appointments and reservations',
}

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar fixed={false} />
      <main className='p-8 flex justify-center'>{children}</main>
    </>
  )
}
