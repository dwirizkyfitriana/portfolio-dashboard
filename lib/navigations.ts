import { IconDefinition, faBriefcase, faHome } from '@fortawesome/free-solid-svg-icons'

export type Navigation = {
  label: string
  icon: IconDefinition
  href: string
}

export const sidebarItems: Navigation[] = [
  {
    label: 'Dashboard',
    icon: faHome,
    href: '/'
  },
  {
    label: 'Works',
    icon: faBriefcase,
    href: '/works'
  }
]
