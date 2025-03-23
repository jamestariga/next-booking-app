import BarberList from '@/features/barbers/BarberList'
import { cachedUser } from '@/lib/cached'

const Home = async () => {
  const user = await cachedUser()

  if (!user) return <div>Loading...</div>

  return <BarberList />
}

export default Home
