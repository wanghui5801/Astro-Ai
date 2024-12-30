import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ request, cookies, redirect }, next) => {
  const url = new URL(request.url);
  
  // 允许访问登录页面和登录 API
  if (url.pathname === '/login' || url.pathname === '/api/login') {
    return next();
  }

  // 检查认证状态
  const isAuthenticated = cookies.get('authenticated')?.value === 'true';
  
  if (!isAuthenticated) {
    return redirect('/login');
  }

  return next();
});
