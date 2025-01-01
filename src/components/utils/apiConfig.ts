declare global {
  interface Window {
    _env_: Record<string, string>;
  }
}

export function getApiConfig() {
  const isServer = typeof window === 'undefined';
  let env: Record<string, string> = {};
  
  if (isServer) {
    // 服务器端：从 import.meta.env 读取
    env = {
      PUBLIC_OPENAI_API_KEY: import.meta.env.PUBLIC_OPENAI_API_KEY || '',
      PUBLIC_ANTHROPIC_API_KEY: import.meta.env.PUBLIC_ANTHROPIC_API_KEY || '',
      PUBLIC_GOOGLE_API_KEY: import.meta.env.PUBLIC_GOOGLE_API_KEY || '',
      PUBLIC_DEEPSEEK_API_KEY: import.meta.env.PUBLIC_DEEPSEEK_API_KEY || '',
      PUBLIC_DEFAULT_MODEL: import.meta.env.PUBLIC_DEFAULT_MODEL || '',
      PUBLIC_SHOW_SETTINGS: import.meta.env.PUBLIC_SHOW_SETTINGS || '',
      PUBLIC_ACCESS_PASSWORD: import.meta.env.PUBLIC_ACCESS_PASSWORD || ''
    };
    if (!env.PUBLIC_OPENAI_API_KEY) {
      console.warn('Environment variables not loaded correctly on server side');
    }
  } else {
    // 客户端：从 window._env_ 读取
    env = window._env_ || {};
    if (!env.PUBLIC_OPENAI_API_KEY) {
      console.warn('Environment variables not loaded correctly on client side');
    }
  }

  const localSettings = !isServer ? JSON.parse(localStorage.getItem('api-settings') || '{}') : {};

  return {
    modelName: localSettings['model-name'] || env.PUBLIC_DEFAULT_MODEL,
    openaiKey: localSettings['openai-key'] || env.PUBLIC_OPENAI_API_KEY,
    claudeKey: localSettings['claude-key'] || env.PUBLIC_ANTHROPIC_API_KEY,
    googleKey: localSettings['google-key'] || env.PUBLIC_GOOGLE_API_KEY,
    deepseekKey: localSettings['deepseek-key'] || env.PUBLIC_DEEPSEEK_API_KEY,
  };
}