import { createClient } from '@/supabase/auth/server'
import BarberList from '@/features/barbers/BarberList'

const Home = async () => {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  return (
    <div className='w-full max-w-3xl mx-auto'>
      <BarberList />
    </div>
  )
}

export default Home
