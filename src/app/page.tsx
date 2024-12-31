import { createClient } from '@/supabase/auth/server'
import BarberList from '@/features/barbers/BarberList'

const Home = async () => {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  if (!data) return <div>Loading...</div>

  return <BarberList />
}

export default Home
