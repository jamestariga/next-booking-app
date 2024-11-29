'use client'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { signOut } from '@/server-actions/auth'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'

const PopOver = () => {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  const handleSignUp = () => {
    router.push('/signup')
  }

  return (
    <Popover>
      <PopoverTrigger className='flex items-center space-x-4 py-2 px-4 rounded-full '>
        <HamburgerMenuIcon />
      </PopoverTrigger>
      <PopoverContent className='w-56 bg-background p-2 rounded-lg shadow-lg'>
        <div className='flex flex-col gap-2'>
          <Button onClick={handleLogin} className='w-full'>
            Login
          </Button>
          <Button onClick={handleSignUp} className='w-full'>
            Sign Up
          </Button>
          <Button onClick={signOut} className='w-full'>
            Logout
          </Button>
          <ThemeToggle />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopOver
