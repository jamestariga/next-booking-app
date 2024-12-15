import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import Link from 'next/link'
import { createClient } from '@/supabase/auth/server'
import { filterAccountMenuItems, accountMenuItems } from '@/config/account-menu'

const Page = async () => {
  const getUserInfo = async () => {
    const supabase = await createClient()

    const { data } = await supabase.auth.getUser()

    const id = data.user?.id ?? ''

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', id)
      .single()

    const profileId = profile?.id ?? ''

    const { data: barberId } = await supabase
      .from('barbers')
      .select('id')
      .eq('user_id', profileId)
      .single()

    return { profile, barberId }
  }

  const { profile, barberId } = await getUserInfo()

  const cardItems = filterAccountMenuItems(accountMenuItems, {
    profileId: profile?.id ?? '',
    role: profile?.role ?? '',
    isBarber: !!barberId,
  })

  return (
    <section className='flex flex-col w-full items-center'>
      <div className='max-w-3xl tablet:max-w-screen-lg w-full space-y-4 mx-auto'>
        <h1 className='text-2xl font-bold'>Account</h1>
        <p className='text-lg text-gray-500'>
          Welcome, {profile?.display_name}
        </p>
        <div className='grid md:grid-cols-2 tablet:grid-cols-3 gap-4 mt-4'>
          {cardItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <Card className='cursor-pointer shadow-lg min-h-[150px] min-w-[150px] h-full'>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.value}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
