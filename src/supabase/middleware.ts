import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/types/database.types'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const authRoutes = ['/login', '/signup']
  const publicRoutes = [...authRoutes, '/']
  const adminRoutes = ['/admin']

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch the current user's profile based on their user_id.
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user?.id ?? '')
    .single()

  // Protect admin routes for non-admin users.
  if (
    profile?.role !== 'admin' &&
    adminRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If the user is logged in, prevent them from accessing login/signup pages.
  if (user && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If there is no authenticated user and the route isn't public, redirect to login.
  if (!user && !publicRoutes.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // **Protect /account/[id] routes:**
  // When the URL is something like `/account/2`, ensure that `2` matches the current user's profile id.
  if (user && request.nextUrl.pathname.startsWith('/account/')) {
    // Use a regex to extract the numeric id from the pathname.
    const match = request.nextUrl.pathname.match(/^\/account\/(\d+)$/)
    if (match) {
      const requestedProfileId = Number(match[1])
      // If the requested id doesn't match the authenticated user's profile id,
      // redirect to their own account page (or to another page such as the homepage).
      if (profile?.id !== requestedProfileId && profile?.role !== 'admin') {
        return NextResponse.redirect(
          new URL(`/account/${profile?.id}`, request.url)
        )
      }
    }
  }

  // **Protect /account/schedule/[barber_id] routes:**
  if (user && request.nextUrl.pathname.startsWith('/account/schedule/')) {
    // Extract the barber_id from the pathname
    const match = request.nextUrl.pathname.match(/^\/account\/schedule\/(\d+)$/)
    if (match) {
      const requestedBarberId = Number(match[1])

      // Check if the user is associated with this barber_id
      const { data: barber } = profile?.id
        ? await supabase
            .from('barbers')
            .select('*')
            .eq('id', requestedBarberId)
            .eq('user_id', profile.id)
            .single()
        : { data: null }

      // If the user is not associated with this barber_id and is not an admin, redirect
      if (!barber && profile?.role !== 'admin') {
        // Fetch the barber associated with the user (if any)
        const { data: userBarber } = profile?.id
          ? await supabase
              .from('barbers')
              .select('id')
              .eq('user_id', profile.id)
              .single()
          : { data: null }

        if (userBarber) {
          // Redirect to the user's own barber schedule
          return NextResponse.redirect(
            new URL(`/account/schedule/${userBarber.id}`, request.url)
          )
        } else {
          // If the user is not a barber, redirect to their account page
          return NextResponse.redirect(
            new URL(`/account/${profile?.id}`, request.url)
          )
        }
      }
    }
  }

  return supabaseResponse
}
