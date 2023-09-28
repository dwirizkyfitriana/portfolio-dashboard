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

export const pathMapper = {
  '/': {
    title: 'Main Dashboard',
    breadCrumb: 'Dashboard'
  },
  '/works': {
    title: 'Works',
    breadCrumb: 'Works'
  },
  '/works/new': {
    title: 'New Works',
    breadCrumb: 'Works / New'
  }
}
