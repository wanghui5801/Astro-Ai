import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { password } = await request.json();
    const correctPassword = import.meta.env.PUBLIC_ACCESS_PASSWORD;

    if (password === correctPassword) {
      // Set authentication cookie
      cookies.set('authenticated', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
};
