interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_KEY: string;
  PASS_APPS_RISETSD: string;
}

interface School {
  name: string;
  slug: string;
  type: string;
  kurikulum: string;
  fees: number;
  location: string;
  akreditasi: string;
  facilities: string[];
  program: string;
  fullDay: boolean;
  website: string;
  dataNote: string;
  description: string;
}

async function supabaseQuery(env: Env, query: string): Promise<any[]> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/pg_query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`Supabase error: ${res.status} ${await res.text()}`);
  return res.json();
}

// Use REST API directly for CRUD
async function supabaseRest(env: Env, path: string, options: RequestInit = {}): Promise<Response> {
  const url = `${env.SUPABASE_URL}/rest/v1/${path}`;
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      'Prefer': 'return=representation',
      ...(options.headers || {}),
    },
  });
}

export const onRequest: any = async (context: any) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;

  try {
    switch (method) {
      case 'GET': {
        // List all schools
        const res = await supabaseRest(env, 'schools?select=*&order=name.asc');
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      case 'POST': {
        // Create new school
        const body: any = await request.json();
        const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        // Map frontend field names to DB column names
        const dbBody: any = {
          name: body.name,
          slug: slug,
          type: body.type,
          kurikulum: body.kurikulum,
          fees: body.fees,
          location: body.location,
          akreditasi: body.akreditasi,
          facilities: body.facilities,
          program: body.program,
          fullday: body.fullday ?? body.fullDay ?? false,
          website: body.website,
          datanote: body.datanote ?? body.dataNote ?? '',
          description: body.description,
        };

        const res = await supabaseRest(env, 'schools', {
          method: 'POST',
          body: JSON.stringify(dbBody),
        });

        if (!res.ok) {
          const err = await res.text();
          return new Response(JSON.stringify({ error: err }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'PUT': {
        // Update school
        const slug = url.searchParams.get('slug');
        if (!slug) {
          return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const body: any = await request.json();
        // Map frontend field names to DB column names
        const dbBody: any = {
          name: body.name,
          type: body.type,
          kurikulum: body.kurikulum,
          fees: body.fees,
          location: body.location,
          akreditasi: body.akreditasi,
          facilities: body.facilities,
          program: body.program,
          fullday: body.fullday ?? body.fullDay ?? false,
          website: body.website,
          datanote: body.datanote ?? body.dataNote ?? '',
          description: body.description,
        };
        // Remove undefined fields so PATCH still works
        Object.keys(dbBody).forEach(k => dbBody[k] === undefined && delete dbBody[k]);

        const res = await supabaseRest(env, `schools?slug=eq.${encodeURIComponent(slug)}`, {
          method: 'PATCH',
          body: JSON.stringify(dbBody),
        });

        if (!res.ok) {
          const err = await res.text();
          return new Response(JSON.stringify({ error: err }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'DELETE': {
        // Delete school
        const slug = url.searchParams.get('slug');
        if (!slug) {
          return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const res = await supabaseRest(env, `schools?slug=eq.${encodeURIComponent(slug)}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          const err = await res.text();
          return new Response(JSON.stringify({ error: err }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      default: {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
