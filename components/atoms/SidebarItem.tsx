import { Navigation } from '@/lib/navigations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const SidebarItem = ({ item, active }: { item: Navigation; active: boolean }) => {
  return (
    <Link href={item.href} className={`sidebar-item ${active ? 'active' : ''}`}>
      <FontAwesomeIcon className='icon' icon={item.icon} />
      <h1>{item.label}</h1>
    </Link>
  )
}

export default SidebarItem
