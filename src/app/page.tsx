import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import { Button } from '@/components/ui/button'
import { signOut } from '@/server-actions/auth'
import { createClient } from '@/supabase/auth/server'
import Link from 'next/link'

const Home = async () => {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  const { user } = data

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <ThemeToggle />
      {user?.email}
      {user ? (
        <Button onClick={signOut}>Sign out</Button>
      ) : (
        <Button>
          <Link href='/login'> Login </Link>
        </Button>
      )}
    </div>
  )
}

export default Home
