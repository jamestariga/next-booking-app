import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import Link from 'next/link'
import { createClient } from '@/supabase/auth/server'

type CardProps = {
  title: string
  value: string
  link: string
}

const Page = async () => {
  const getUserProfileId = async () => {
    const supabase = await createClient()

    const { data } = await supabase.auth.getUser()

    const id = data.user?.id ?? ''

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', id)
      .single()

    return profile
  }

  const profile = await getUserProfileId()

  const cardItems: CardProps[] = [
    {
      title: 'Personal Info',
      value: 'Provide your personal information',
      link: `/account/${profile?.id}`,
    },
    {
      title: 'Create Service',
      value: 'Create a new service',
      link: '/account/create-service',
    },
    {
      title: 'My Services',
      value: 'View your created services',
      link: `/account/dashboard/${profile?.id}`,
    },
    {
      title: 'Payment Info',
      value: 'Add payment information',
      link: '/account/payment',
    },
    {
      title: 'Settings',
      value: 'Change your account settings',
      link: '/account/settings',
    },
    {
      title: 'Login & Security',
      value: 'Change your password and security settings',
      link: '/account/security',
    },
  ]

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
