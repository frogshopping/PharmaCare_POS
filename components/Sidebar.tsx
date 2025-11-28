"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/sales', label: 'Sales' },
  { href: '/customers', label: 'Customers' },
  { href: '/reports', label: 'Reports' }
]

export default function Sidebar(): JSX.Element {
  const pathname = usePathname() || '/dashboard'

  return (
    <aside className="sidebar">
      <div>
        <div className="logo text-xl">PharmaCare</div>

        <nav className="nav-list mt-6">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item block px-3 py-2 rounded-md ${active ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="avatar bg-slate-200 text-slate-700">JD</div>
        <div className="profile text-sm">
          <div className="font-medium">John Doe</div>
          <div className="text-slate-500 text-xs">Pharmacist</div>
        </div>
      </div>
    </aside>
  )
}
