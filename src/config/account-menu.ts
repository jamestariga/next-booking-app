export type AccountMenuItem = {
  title: string
  value: string
  link: string
  roles: string[] // Restrict to existing roles
  barberOnly?: boolean // Additional flag for barber-specific items
}

export const accountMenuItems: AccountMenuItem[] = [
  {
    title: 'Personal Info',
    value: 'Provide your personal information',
    link: '/account/[profileId]',
    roles: ['user', 'admin'],
  },
  {
    title: 'Create Service',
    value: 'Create a new service',
    link: '/account/create-service',
    roles: ['user', 'admin'],
    barberOnly: true,
  },
  {
    title: 'My Services',
    value: 'View your created services',
    link: '/account/dashboard/[profileId]',
    roles: ['user', 'admin'],
    barberOnly: true,
  },
  {
    title: 'Payment Info',
    value: 'Add payment information',
    link: '/account/payment',
    roles: ['user', 'admin'],
  },
  {
    title: 'Settings',
    value: 'Change your account settings',
    link: '/account/settings',
    roles: ['user', 'admin'],
  },
  {
    title: 'Login & Security',
    value: 'Change your password and security settings',
    link: '/account/security',
    roles: ['user', 'admin'],
  },
  {
    title: 'Admin Dashboard',
    value: 'View the admin dashboard',
    link: '/admin',
    roles: ['admin'],
  },
]

// Utility function to filter menu items
export function filterAccountMenuItems(
  menuItems: AccountMenuItem[],
  user: {
    profileId: number | ''
    role: string
    isBarber: boolean
  }
) {
  return menuItems
    .filter((item) => {
      // Check role-based access
      const hasRoleAccess = !item.roles || item.roles.includes(user.role)

      // Check barber-specific items
      const meetsBarberCondition =
        !item.barberOnly || (item.barberOnly && user.isBarber)

      return hasRoleAccess && meetsBarberCondition
    })
    .map((item) => ({
      ...item,
      link: item.link.replace('[profileId]', user.profileId.toLocaleString()),
    }))
}
