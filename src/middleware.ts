import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ request, cookies, redirect }, next) => {
  // If PUBLIC_ACCESS_PASSWORD is 'false', skip authentication
  if (import.meta.env.PUBLIC_ACCESS_PASSWORD === 'false') {
    return next();
  }

  const url = new URL(request.url);
  
  if (url.pathname === '/login' || url.pathname === '/api/login') {
    return next();
  }

  const isAuthenticated = cookies.get('authenticated')?.value === 'true';
  
  if (!isAuthenticated) {
    return redirect('/login');
  }

  return next();
});
