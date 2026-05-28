// Middleware for admin API routes - validates admin password
export async function onRequest(context: any) {
  const { request, env, next } = context;

  // Allow GET requests without auth (for listing schools from admin page init)
  if (request.method === 'GET') {
    return next();
  }

  // For POST/PUT/DELETE, verify admin password
  const adminKey = request.headers.get('X-Admin-Key');
  const validKey = env.PASS_APPS_RISETSD;

  if (!adminKey || adminKey !== validKey) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return next();
}
