'use client'

import ButtonIcon from '@/components/ButtonIcon/ButtonIcon'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <ButtonIcon
      icon={
        resolvedTheme === 'dark' ? (
          <SunIcon width='30' height='30' />
        ) : (
          <MoonIcon width='30' height='30' />
        )
      }
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    />
  )
}

export default ThemeToggle
