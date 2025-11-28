import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    summary: [
      { title: 'Total Revenue', value: '$45,231', trend: '+12.5%' },
      { title: 'Total Products', value: '1,234', trend: '+3.2%' },
      { title: 'Active Customers', value: '892', trend: '+8.1%' },
      { title: 'Low Stock Items', value: '23', trend: '-2 items' }
    ],
    recentSales: [
      { id: 1, customerName: 'Sarah Johnson', invoiceNumber: 'INV-001', timeAgo: '10 mins ago', total: 156.0, status: 'Completed' },
      { id: 2, customerName: 'Mike Smith', invoiceNumber: 'INV-002', timeAgo: '25 mins ago', total: 89.5, status: 'Completed' },
      { id: 3, customerName: 'Emily Davis', invoiceNumber: 'INV-003', timeAgo: '1 hour ago', total: 234.0, status: 'Pending' },
      { id: 4, customerName: 'James Wilson', invoiceNumber: 'INV-004', timeAgo: '2 hours ago', total: 67.25, status: 'Completed' },
      { id: 5, customerName: 'Lisa Brown', invoiceNumber: 'INV-005', timeAgo: '3 hours ago', total: 145.8, status: 'Completed' }
    ],
    lowStock: [
      { id: 11, name: 'Aspirin 500mg', category: 'Pain Relief', stock: 15, minStock: 50 },
      { id: 12, name: 'Amoxicillin 250mg', category: 'Antibiotics', stock: 8, minStock: 30 },
      { id: 13, name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 22, minStock: 50 },
      { id: 14, name: 'Vitamin D3', category: 'Supplements', stock: 12, minStock: 40 }
    ]
  }

  return NextResponse.json(data)
}
