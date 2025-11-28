"use client"

type Props = { title?: string }

export default function Topbar({ title = 'Dashboard' }: Props): JSX.Element {
  return (
    <header className="topbar flex items-center justify-between">
      <h2 className="page-title text-lg font-semibold">{title}</h2>
      <div className="topbar-actions">
        <button className="btn primary inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white">Generate Report</button>
      </div>
    </header>
  )
}
