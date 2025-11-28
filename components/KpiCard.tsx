type Props = {
  title?: string
  value?: string | number
  trend?: string
}

export default function KpiCard({ title, value, trend }: Props): JSX.Element {
  return (
    <div className="kpi-card bg-white p-4 rounded-md shadow-sm">
      <div className="kpi-title text-sm text-slate-500">{title}</div>
      <div className="kpi-value text-xl font-bold mt-1">{value}</div>
      {trend && <div className="kpi-trend text-sm text-green-500 mt-1">{trend}</div>}
    </div>
  )
}
