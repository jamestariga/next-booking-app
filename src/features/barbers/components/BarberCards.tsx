'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
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
      className='w-full max-h-[450px] max-w-3xl border bg-transparent shadow-none cursor-pointer'
      onClick={() => {
        router.push(`/barber/${data.id}`)
      }}
    >
      <CardHeader className='p-0 overflow-hidden relative h-80 rounded-t-lg border border-transparent rounded-xl'>
        Add an image here if needed
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
