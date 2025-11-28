"use client"

import { useEffect, useState } from 'react'
import KpiCard from '../../components/KpiCard'
import RecentSalesList from '../../components/RecentSalesList'
import LowStockList from '../../components/LowStockList'

type DashboardData = {
  summary?: { title: string; value: string; trend?: string }[]
  recentSales?: any[]
  lowStock?: any[]
}

export default function DashboardPage(): JSX.Element {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    try {
      const res = await fetch('/api/dashboard')
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error('fetch error', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="dashboard-grid">
      <section className="kpi-row grid grid-cols-4 gap-4">
        {(data?.summary || [1, 2, 3, 4]).map((s: any, i: number) => (
          <KpiCard
            key={i}
            title={
              s?.title ?? ['Total Revenue', 'Total Products', 'Active Customers', 'Low Stock Items'][i]
            }
            value={s?.value ?? (i === 0 ? '$45,231' : s?.value ?? '—')}
            trend={s?.trend}
          />
        ))}
      </section>

      <div className="dashboard-columns mt-6 flex gap-6">
        <RecentSalesList items={data?.recentSales || []} />
        <LowStockList items={data?.lowStock || []} />
      </div>

      {loading && <div className="loading">Loading...</div>}
    </div>
  )
}
