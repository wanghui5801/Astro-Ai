import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, model, apiKey, history } = await request.json();

    let response;
    
    if (model.startsWith('gemini')) {
      response = await callGemini(message, apiKey, history, model);
    } else if (model.startsWith('deepseek')) {
      response = await callDeepseek(message, apiKey, history, model);
    } else if (model.startsWith('claude')) {
      response = await callClaude(message, apiKey, history, model);
    } else if (model.startsWith('gpt')) {
      response = await callOpenAI(message, apiKey, history, model);
    } else {
      throw new Error('Unsupported model');
    }

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

async function callGemini(message: string, apiKey: string, history: any[], model: string) {
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });

    // Add system prompt and history messages
    let allMessages = [
      { role: "system", content: "You are a helpful research assistant." },
      ...history.slice(-6), // Keep only the last 6 history messages
      { role: "user", content: message }
    ];

    // Keep recent messages to avoid exceeding limits
    if (allMessages.length > 8) { // 8 = 1(system) + 6(history) + 1(current)
      allMessages = allMessages.slice(-8);
    }

    const completion = await openai.chat.completions.create({
      model: model,
      messages: allMessages,
      max_tokens: 1024,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    // Update history
    if (typeof window !== 'undefined') {
      history.push(
        { role: "user", content: message },
        { role: "assistant", content: response }
      );
      
      // If history is too long, keep only recent records
      if (history.length > 18) { // 18 = 20 - 2 (system message and current message)
        history = history.slice(-18);
      }
      
      // Save latest history
      localStorage.setItem('gemini-history', JSON.stringify(history));
    }

    return response;
  } catch (error) {
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

async function callDeepseek(message: string, apiKey: string, history: any[], model: string) {
  try {
    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com/v1',
      apiKey: apiKey
    });

    // Add system prompt and history messages
    let allMessages = [
      { role: "system", content: "You are a helpful research assistant." },
      ...history.slice(-6), // Keep only the last 6 history messages
      { role: "user", content: message }
    ];

    // Keep recent messages to avoid exceeding limits
    if (allMessages.length > 8) { // 8 = 1(system) + 6(history) + 1(current)
      allMessages = allMessages.slice(-8);
    }

    const completion = await openai.chat.completions.create({
      model: model,
      messages: allMessages,
      max_tokens: 1024,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    // Update history
    if (typeof window !== 'undefined') {
      history.push(
        { role: "user", content: message },
        { role: "assistant", content: response }
      );
      
      // If history is too long, keep only recent records
      if (history.length > 18) { // 18 = 20 - 2 (system message and current message)
        history = history.slice(-18);
      }
      
      // Save latest history
      localStorage.setItem('deepseek-history', JSON.stringify(history));
    }

    return response;
  } catch (error) {
    throw new Error(`DeepSeek API error: ${error.message}`);
  }
}

async function callClaude(message: string, apiKey: string, history: any[], model: string) {
  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Add system prompt and history messages
    let allMessages = [
      { role: "assistant", content: "I am Claude, a helpful research assistant." },
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    // Keep recent messages to avoid exceeding limits
    if (allMessages.length > 8) { // 8 = 1(system) + 6(history) + 1(current)
      allMessages = allMessages.slice(-8);
    }

    const response = await anthropic.messages.create({
      model: model,
      max_tokens: 1024,
      messages: allMessages,
    });

    const responseContent = response.content[0].text;

    // Update history
    if (typeof window !== 'undefined') {
      history.push(
        { role: "user", content: message },
        { role: "assistant", content: responseContent }
      );
      
      // If history is too long, keep only recent records
      if (history.length > 18) { // 18 = 20 - 2 (system message and current message)
        history = history.slice(-18);
      }
      
      // Save latest history
      localStorage.setItem('claude-history', JSON.stringify(history));
    }

    return responseContent;
  } catch (error) {
    throw new Error(`Claude API error: ${error.message}`);
  }
}

async function callOpenAI(message: string, apiKey: string, history: any[], model: string) {
  try {
    const openai = new OpenAI({
      apiKey: apiKey
    });

    // Add system prompt and history messages
    let allMessages = [
      { role: "system", content: "You are a helpful research assistant." },
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    // Keep recent messages to avoid exceeding limits
    if (allMessages.length > 8) { // 8 = 1(system) + 6(history) + 1(current)
      allMessages = allMessages.slice(-8);
    }

    const completion = await openai.chat.completions.create({
      model: model,
      messages: allMessages,
      max_tokens: 1024,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    // Update history
    if (typeof window !== 'undefined') {
      history.push(
        { role: "user", content: message },
        { role: "assistant", content: response }
      );
      
      // If history is too long, keep only recent records
      if (history.length > 18) { // 18 = 20 - 2 (system message and current message)
        history = history.slice(-18);
      }
      
      // Save latest history
      localStorage.setItem('gpt-history', JSON.stringify(history));
    }

    return response;
  } catch (error) {
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

// Implement other API call functions... 