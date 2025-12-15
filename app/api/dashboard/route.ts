import { NextResponse } from 'next/server'
import { getMockDashboardData } from '@/services/mockDashboardData'

export async function GET() {
  try {
    // TODO: Replace with actual API call to your backend
    // Example:
    // const response = await fetch('YOUR_API_ENDPOINT/dashboard');
    // const data = await response.json();
    // return NextResponse.json(data);
    
    // For now, return mock data
    const data = await getMockDashboardData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
