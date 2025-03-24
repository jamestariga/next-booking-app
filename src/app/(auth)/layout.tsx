import '@/app/globals.css'
import Navbar from '@/components/Navigation/NavBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth Kols Studio',
  description: 'Login or Register to Kols Studio',
}

export default function AuthLayout({
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
