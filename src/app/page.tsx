import { createClient } from '@/supabase/auth/server'

const Home = async () => {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  const { user } = data

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {user?.email}
    </div>
  )
}

export default Home
