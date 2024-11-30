import Image from 'next/image'
import Link from 'next/link'
import PopOver from './PopOver'
import { createClient } from '@/supabase/auth/server'

const Navbar = async () => {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  const { user } = data

  const userEmail = user?.email || ''

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-background border-b border-border'>
      <div className='container mx-auto flex justify-between items-center px-8'>
        <Link href='/' className='flex items-center space-x-4'>
          <Image
            src='/kolstudio.png'
            alt='Company Logo'
            width={250}
            height={250}
            className='h-28 w-40'
            priority
          />
        </Link>

        <PopOver email={userEmail} />
      </div>
    </nav>
  )
}

export default Navbar
