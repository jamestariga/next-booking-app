'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from '@/server-functions/auth'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'

const PopOver = ({ email, isBarber }: { email: string; isBarber: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleRedirect = (pathName: string) => {
    router.push(pathName, { scroll: false })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='flex items-center space-x-4 py-2 px-4 rounded-full'>
        <HamburgerMenuIcon width={24} height={24} />
      </PopoverTrigger>
      <PopoverContent className='w-full mt-4 min-w-60' align='end'>
        <div className='flex flex-col gap-2 w-full'>
          {email && <div className='border-b pb-2'>{email}</div>}
          <div className='flex flex-col items-start'>
            {email ? (
              <>
                <Button
                  onClick={() => handleRedirect('/account')}
                  variant='none'
                  size='noPadding'
                  className='w-full'
                >
                  Account
                </Button>
                <Button
                  onClick={() => handleRedirect('/reservations')}
                  variant='none'
                  size='noPadding'
                  className='w-full'
                >
                  My Reservations
                </Button>
                {isBarber && (
                  <Button
                    onClick={() => handleRedirect('/appointments')}
                    variant='none'
                    size='noPadding'
                    className='w-full'
                  >
                    My Appointments
                  </Button>
                )}
                <Button
                  onClick={signOut}
                  variant='none'
                  size='noPadding'
                  className='w-full'
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleRedirect('/login')}
                  variant='none'
                  size='noPadding'
                  className='w-full'
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleRedirect('/signup')}
                  variant='none'
                  size='noPadding'
                  className='w-full'
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
          <ThemeToggle />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopOver
