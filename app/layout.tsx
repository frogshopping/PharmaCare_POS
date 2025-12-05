import './main.css'


export const metadata = {
  title: 'pharma_care',
  description: 'Pharma Care Next.js app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          {children}
        </div>
      </body>
    </html>
  )
}
