type Sale = {
  id: number
  customerName: string
  invoiceNumber: string
  timeAgo: string
  total: number
  status: string
}

type Props = { items?: Sale[] }

export default function RecentSalesList({ items = [] }: Props): JSX.Element {
  return (
    <section className="card recent-sales bg-white p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Recent Sales</h3>
      <ul className="sales-list">
        {items.map((s) => (
          <li className="sale-row flex justify-between py-3 border-b last:border-b-0" key={s.id}>
            <div>
              <div className="sale-name font-medium">{s.customerName}</div>
              <div className="sale-meta text-sm text-slate-500">{s.invoiceNumber} • {s.timeAgo}</div>
            </div>
            <div className="sale-right flex flex-col items-end gap-1">
              <div className="sale-amount font-semibold">${s.total.toFixed(2)}</div>
              <div className={"badge text-xs px-2 py-1 rounded-full " + (s.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700')}>{s.status}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
