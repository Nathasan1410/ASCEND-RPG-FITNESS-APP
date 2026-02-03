"use client";

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send metrics to analytics endpoint
    const endpoint = '/api/analytics/performance';

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
      keepalive: true, // Ensure the request completes even if page unloads
    }).catch((error) => {
      // Silent fail - don't console.error in production
      // Log to local storage for retry
      try {
        const metrics = JSON.parse(localStorage.getItem('vitals_buffer') || '[]');
        metrics.push({ ...metric, timestamp: Date.now() });
        localStorage.setItem('vitals_buffer', JSON.stringify(metrics.slice(-10))); // Keep last 10
      } catch {
        // Storage might be full or disabled
      }
    });
  });

  return null; // This component doesn't render anything
}
