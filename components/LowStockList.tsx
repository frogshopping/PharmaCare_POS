type Product = {
  id: number
  name: string
  category?: string
  stock: number
  minStock: number
}

function Progress({ value = 0 }: { value?: number }) {
  return (
    <div className="progress bg-slate-100 h-2 rounded-full overflow-hidden">
      <div className="progress-bar bg-orange-400 h-full" style={{ width: `${value}%` }} />
    </div>
  )
}

type Props = { items?: Product[] }

export default function LowStockList({ items = [] }: Props): JSX.Element {
  return (
    <aside className="card low-stock bg-white p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Low Stock Alert</h3>
      <div className="low-list flex flex-col gap-3">
        {items.map((p) => {
          const pct = Math.min(100, Math.round((p.stock / Math.max(1, p.minStock)) * 100))
          return (
            <div key={p.id} className="low-item">
              <div className="low-item-top flex justify-between">
                <div className="low-name font-medium">{p.name}</div>
                <div className="low-min text-sm text-slate-400">Min: {p.minStock}</div>
              </div>
              <div className="low-meta text-sm text-slate-500 mb-2">Stock: {p.stock}</div>
              <Progress value={pct} />
            </div>
          )
        })}
      </div>
    </aside>
  )
}
