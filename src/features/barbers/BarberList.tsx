import { createClient } from '@/supabase/auth/server'
import ListView from '@/components/ListView/ListView'
import BarberCards from './components/BarberCards'

const BarberList = async () => {
  const supabase = await createClient()

  // Join the barbers table with then profile table to get the display_name
  const { data } = await supabase.from('barbers').select(`
    *,
    profiles (id, display_name)
  `)

  const barbers =
    data?.map((barber) => ({
      ...barber.profiles,
      id: barber.id,
      display_name: barber.profiles?.display_name,
    })) ?? []

  return (
    <div
      className={`w-full ${
        data && data?.length < 3 ? 'max-w-3xl mx-auto' : ''
      }`}
    >
      <ListView
        data={barbers}
        renderItem={(item) => <BarberCards data={item} />}
      />
    </div>
  )
}

export default BarberList
