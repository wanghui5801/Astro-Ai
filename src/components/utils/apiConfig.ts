export function getApiConfig() {
  if (typeof window === 'undefined') {
    // Use environment variables on server side
    return {
      modelName: import.meta.env.PUBLIC_DEFAULT_MODEL || 'gpt-4-turbo-preview',
      openaiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
      claudeKey: import.meta.env.PUBLIC_ANTHROPIC_API_KEY,
      googleKey: import.meta.env.PUBLIC_GOOGLE_API_KEY,
      deepseekKey: import.meta.env.PUBLIC_DEEPSEEK_API_KEY,
    };
  }

  // Client-side configuration source depends on PUBLIC_SHOW_SETTINGS
  const showSettings = import.meta.env.PUBLIC_SHOW_SETTINGS === 'true';
  const localSettings = JSON.parse(localStorage.getItem('api-settings') || '{}');

  // If settings page is disabled, use environment variables directly
  if (!showSettings) {
    return {
      modelName: import.meta.env.PUBLIC_DEFAULT_MODEL,
      openaiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
      claudeKey: import.meta.env.PUBLIC_ANTHROPIC_API_KEY,
      googleKey: import.meta.env.PUBLIC_GOOGLE_API_KEY,
      deepseekKey: import.meta.env.PUBLIC_DEEPSEEK_API_KEY,
    };
  }

  // If settings page is enabled, prioritize locally stored settings
  return {
    modelName: localSettings['model-name'] || import.meta.env.PUBLIC_DEFAULT_MODEL,
    openaiKey: localSettings['openai-key'] || import.meta.env.PUBLIC_OPENAI_API_KEY,
    claudeKey: localSettings['claude-key'] || import.meta.env.PUBLIC_ANTHROPIC_API_KEY,
    googleKey: localSettings['google-key'] || import.meta.env.PUBLIC_GOOGLE_API_KEY,
    deepseekKey: localSettings['deepseek-key'] || import.meta.env.PUBLIC_DEEPSEEK_API_KEY,
  };
}