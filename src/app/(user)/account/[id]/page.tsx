import { createClient } from '@/supabase/auth/server'

type Params = Promise<{ id: number }>

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params

  const supabase = await createClient()
  const userInfo = supabase.from('profiles').select('*').eq('id', id).single()

  const { data } = await userInfo

  console.log(data)

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Account {data?.display_name}</h1>
    </div>
  )
}

export default Page
