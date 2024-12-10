'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type BarberCardsProps = {
  data: {
    id: number
    display_name: string
  }
}

const BarberCards = ({ data }: BarberCardsProps) => {
  const router = useRouter()

  return (
    <Card
      className='w-full max-h-[450px] border bg-transparent shadow-none cursor-pointer hover:scale-[1.05] transition-all duration-300'
      onClick={() => {
        router.push(`/barber/${data.id}`)
      }}
    >
      <CardHeader className='p-0 overflow-hidden relative h-80 rounded-t-lg border border-transparent'>
        {/* Temporary placeholder image */}
        <Image
          src='/default.jpg'
          alt='Barber Profile'
          fill
          style={{ objectFit: 'cover' }}
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </CardHeader>
      <CardContent className='p-4 flex flex-col gap-2'>
        <h3 className='text-lg font-bold'>{data.display_name}</h3>
        <CardDescription>
          <p className=''>Description here</p>
          <p className='font-semibold'>this is the ID: {data.id}</p>
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default BarberCards
