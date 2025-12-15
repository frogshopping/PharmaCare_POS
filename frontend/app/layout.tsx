import './main.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PharmaCare | Pharmacy Management System',
  description: 'Advanced pharmacy management system for inventory, sales, and customer tracking.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-layout h-full bg-slate-50">
          {children}
        </div>
      </body>
    </html>
  )
}
