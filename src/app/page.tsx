import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <ThemeToggle />
      Test
      <Button>Click me</Button>
    </div>
  )
}
