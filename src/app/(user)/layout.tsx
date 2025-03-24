import '@/app/globals.css'
import Navbar from '@/components/Navigation/NavBar'

export default function UserLayout({
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
