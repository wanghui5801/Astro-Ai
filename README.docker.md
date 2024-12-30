# AI Assistant Docker Image

An AI-powered assistant built with Astro and multiple language model integrations.

## Features

- 🤖 Multi-model support (GPT, Claude, Gemini, DeepSeek)
- 🌓 Dark/Light theme
- ✨ Markdown & LaTeX support
- 💾 Chat history with local storage
- 📱 Responsive design

## Quick Start

1. Pull the Docker image:

```bash
docker pull xhh1128/astro-ai:latest
```

2. Create `.env` file with your API keys:

```env
PUBLIC_OPENAI_API_KEY=your-openai-key
PUBLIC_ANTHROPIC_API_KEY=your-anthropic-key
PUBLIC_GOOGLE_API_KEY=your-google-key
PUBLIC_DEEPSEEK_API_KEY=your-deepseek-key
PUBLIC_DEFAULT_MODEL=gpt-4-turbo-preview
PUBLIC_SHOW_SETTINGS=true
PUBLIC_ACCESS_PASSWORD=your-access-password
```

3. Run with Docker:

```bash
docker run -d \
--name ai-assistant \
-p 4321:4321 \
--env-file .env \
xhh1128/astro-ai:latest
```

Or use Docker Compose:

```yaml
version: '3.8'
services:
ai-assistant:
    image: xhh1128/astro-ai:latest
    ports:
    - "4321:4321"
    environment:
        - PUBLIC_OPENAI_API_KEY=${PUBLIC_OPENAI_API_KEY}
        - PUBLIC_ANTHROPIC_API_KEY=${PUBLIC_ANTHROPIC_API_KEY}
        - PUBLIC_GOOGLE_API_KEY=${PUBLIC_GOOGLE_API_KEY}
        - PUBLIC_DEEPSEEK_API_KEY=${PUBLIC_DEEPSEEK_API_KEY}
        - PUBLIC_DEFAULT_MODEL=${PUBLIC_DEFAULT_MODEL}
        - PUBLIC_SHOW_SETTINGS=${PUBLIC_SHOW_SETTINGS}
        - PUBLIC_ACCESS_PASSWORD=${PUBLIC_ACCESS_PASSWORD}
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

4. Access the application at `http://localhost:4321`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PUBLIC_OPENAI_API_KEY | Your OpenAI API key | Yes |
| PUBLIC_ANTHROPIC_API_KEY | Your Anthropic API key | Yes |
| PUBLIC_GOOGLE_API_KEY | Your Google AI key | Yes |
| PUBLIC_DEEPSEEK_API_KEY | Your DeepSeek API key | Yes |
| PUBLIC_DEFAULT_MODEL | Default model to use | Yes |
| PUBLIC_SHOW_SETTINGS | Show settings page | No |
| PUBLIC_ACCESS_PASSWORD | Password for accessing the application | Yes |

## Source Code

Visit our [GitHub repository](https://github.com/wanghui5801/Astro-Ai) for more information.
