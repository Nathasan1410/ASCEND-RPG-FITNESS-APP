"use client";

import React, { Component, ReactNode } from 'react';

// Error boundary state
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

// Error boundary props
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

// Log error to Supabase
async function logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
  const errorData = {
    error_name: error.name || 'UnknownError',
    error_message: error.message,
    error_stack: error.stack,
    component_stack: errorInfo.componentStack,
    url: window.location.href,
    user_agent: navigator.userAgent,
  };

  console.error('🚨 Error Boundary caught:', errorData);

  // Store in localStorage for debugging
  try {
    const errors = JSON.parse(localStorage.getItem('error_log') || '[]');
    errors.push({ ...errorData, id: Date.now() });
    localStorage.setItem('error_log', JSON.stringify(errors.slice(-10))); // Keep last 10
  } catch {
    // Silent fail
  }

  // Send to Supabase error logging
  try {
    await fetch('/api/analytics/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData),
    });
  } catch (e) {
    // Silent fail - error already logged to console and localStorage
  }
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    logErrorToService(error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optionally reload page
    // window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback as React.ReactElement;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-void-panel border border-white/10 rounded-xl p-8 shadow-2xl">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-status-error/20 border-2 border-status-error flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-white text-center mb-2">
              System Error Detected
            </h1>
            <p className="text-white/70 text-center mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>

            {/* System Aesthetic Message */}
            <div className="bg-system-panel/50 border border-system-border rounded-lg p-4 mb-6">
              <p className="text-sm text-system-accent font-mono">
                &gt; ANOMALY DETECTED
                &gt; INITIATING RECOVERY PROTOCOL...
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-4 bg-system-accent text-black font-bold rounded-lg hover:bg-system-accent/90 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full py-3 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <span>Return to Dashboard</span>
              </button>
            </div>

            {/* Debug Info (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6">
                <summary className="text-sm text-white/50 cursor-pointer">
                  View Error Details
                </summary>
                <pre className="mt-2 p-4 bg-black/50 rounded-lg text-xs text-red-400 overflow-auto max-h-60">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
