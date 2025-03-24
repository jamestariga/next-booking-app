import BarberList from '@/features/barbers/BarberList'
import Navbar from '@/components/Navigation/NavBar'

const Home = async () => {
  return (
    <>
      <Navbar fixed={true} />
      <main className='px-8 min-h-screen flex justify-center items-center'>
        <BarberList />
      </main>
    </>
  )
}

export default Home
