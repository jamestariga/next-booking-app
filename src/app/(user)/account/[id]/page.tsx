import { createClient } from '@/supabase/auth/server'
import UserForm from '@/features/user/UserForm'

type Params = Promise<{ id: number }>

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params

  const supabase = await createClient()
  const userInfo = supabase.from('profiles').select('*').eq('id', id).single()

  const { data } = await userInfo

  const display_name = data?.display_name ?? ''
  const first_name = data?.first_name ?? ''
  const last_name = data?.last_name ?? ''
  const email = data?.email ?? ''
  const user_id = data?.user_id ?? ''

  return (
    <section className='flex flex-col space-y-8 w-full'>
      <div className='max-w-xl tablet:max-w-screen-lg w-full space-y-4 mx-auto'>
        <h1 className='text-3xl font-bold'>Account</h1>
        <p className='text-lg'>Welcome, {data?.display_name}!</p>
        <UserForm
          display_name={display_name}
          id={id}
          first_name={first_name}
          last_name={last_name}
          email={email}
          user_id={user_id}
        />
      </div>
    </section>
  )
}

export default Page
