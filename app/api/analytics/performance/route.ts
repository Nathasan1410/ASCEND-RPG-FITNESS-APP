import { NextRequest, NextResponse } from 'next/server';

// Core Web Vitals types
type WebVitalMetric = {
  id: string;
  name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';
  value: number;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
};

// Core Web Vitals thresholds
const VITAL_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  FID: { good: 100, poor: 300 }, // First Input Delay
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
} as const;

// Rating calculation
function getVitalRating(name: WebVitalMetric['name'], value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = VITAL_THRESHOLDS[name];
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

// Store metrics in Supabase (would connect to performance_logs table)
async function storeMetric(metric: WebVitalMetric) {
  // For now, log to console (in production, use Supabase)
  console.log('📊 Web Vital:', {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
  });

  // TODO: Create performance_logs table and store:
  // await supabase.from('performance_logs').insert({
  //   metric_name: metric.name,
  //   metric_value: metric.value,
  //   rating: metric.rating,
  //   url: window.location.href,
  //   user_agent: navigator.userAgent,
  //   created_at: new Date().toISOString(),
  // });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const metrics: WebVitalMetric[] = Array.isArray(body) ? body : [body];
 
    // Calculate rating for each metric
    const enrichedMetrics = metrics.map(metric => ({
      ...metric,
      rating: getVitalRating(metric.name, metric.value),
      timestamp: metric.timestamp || Date.now(),
    }));

    // Store each metric
    for (const metric of enrichedMetrics) {
      await storeMetric(metric);
    }

    // Calculate overall health score
    const goodCount = enrichedMetrics.filter(m => m.rating === 'good').length;
    const totalCount = enrichedMetrics.length;
    const healthScore = totalCount > 0 ? Math.round((goodCount / totalCount) * 100) : 100;

    return NextResponse.json({
      success: true,
      healthScore,
      metricsCount: totalCount,
      message: healthScore >= 80
        ? 'Performance is good'
        : healthScore >= 50
        ? 'Performance needs improvement'
        : 'Performance is poor',
    });
  } catch (error) {
    console.error('Failed to store web vitals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to store metrics' },
      { status: 500 }
    );
  }
}

// GET endpoint for current performance stats
export async function GET() {
  // TODO: Fetch from performance_logs table
  // For now, return mock data
  return NextResponse.json({
    FCP: { avg: 2500, target: 1800, current: 'needs-improvement' },
    LCP: { avg: 3200, target: 2500, current: 'needs-improvement' },
    TTI: { avg: 4100, target: 2000, current: 'poor' },
    CLS: { avg: 0.15, target: 0.1, current: 'needs-improvement' },
    healthScore: 45,
    lastUpdated: new Date().toISOString(),
  });
}
