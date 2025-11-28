import './globals.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export const metadata = {
  title: 'pharma_care',
  description: 'Pharma Care Next.js app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <Sidebar />
          <div className="content-area">
            <Topbar />
            <main className="main-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
