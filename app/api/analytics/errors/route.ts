import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      error_name,
      error_message,
      error_stack,
      component_stack,
      url,
      user_agent,
    } = body;

    if (!error_name || !error_message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.rpc('log_error', {
      p_error_name: error_name,
      p_error_message: error_message,
      p_error_stack: error_stack || null,
      p_component_stack: component_stack || null,
      p_url: url || null,
      p_user_agent: user_agent || null,
    } as any);

    if (error || !data) {
      console.error('Failed to log error:', error);
      return NextResponse.json(
        { error: 'Failed to log error' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      error_id: data,
    });

    if (error) {
      console.error('Failed to log error:', error);
      return NextResponse.json(
        { error: 'Failed to log error' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      error_id: data,
    });
  } catch (error) {
    console.error('Error logging error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for error stats
export async function GET() {
  const supabase = await createClient();

  try {
    // Get error count in last 24 hours
    const { data: recentErrors, error } = await supabase
      .from('error_logs')
      .select('error_name, created_at')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    // Group by error name
    const errorCounts: Record<string, number> = {};
    recentErrors?.forEach((err: any) => {
      const name = err.error_name;
      errorCounts[name] = (errorCounts[name] || 0) + 1;
    });

    return NextResponse.json({
      totalErrors: recentErrors?.length || 0,
      uniqueErrors: Object.keys(errorCounts).length,
      mostFrequentErrors: Object.entries(errorCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count })),
      timeRange: '24 hours',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to fetch error stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch error stats' },
      { status: 500 }
    );
  }
}
