import { createClient } from '@/supabase/auth/server'
import ListView from '@/components/ListView/ListView'
import BarberCards from './components/BarberCards'

const BarberList = async () => {
  const supabase = await createClient()

  // Join the barbers table with then profile table to get the display_name
  const { data } = await supabase.from('barbers').select(`
    user_id,
    profiles (id, display_name)
  `)

  const barbers =
    data?.map((barber) => ({
      ...barber.profiles,
      id: barber.user_id,
      display_name: barber.profiles?.display_name!,
    })) ?? []

  return (
    <ListView
      data={barbers}
      renderItem={(item) => <BarberCards data={item} />}
    />
  )
}

export default BarberList
