import { useState, useCallback } from 'react';
import { streamChat, buildSystemPrompt, type ChatMessage } from '../services/zhipuAI';
import type { Message } from '../types';

/**
 * AI对话Hook
 */
export function useAIChat(context: {
  datasets?: unknown[];
  trainingTasks?: unknown[];
  etlNodes?: unknown[];
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim() || isLoading) return;

      setIsLoading(true);

      // 添加用户消息
      const newUserMessage: Message = {
        role: 'user',
        content: userMessage.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newUserMessage]);

      // 准备AI消息占位
      const aiMessagePlaceholder: Message = {
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessagePlaceholder]);

      // 构建消息历史
      const chatMessages: ChatMessage[] = [
        { role: 'system', content: buildSystemPrompt(context) },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: 'user', content: userMessage.trim() },
      ];

      let assistantContent = '';

      await streamChat(
        chatMessages,
        // onChunk
        (chunk) => {
          assistantContent += chunk;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              ...newMessages[newMessages.length - 1],
              content: assistantContent,
            };
            return newMessages;
          });
        },
        // onComplete
        () => {
          setIsLoading(false);
        },
        // onError
        (error) => {
          console.error('AI Chat Error:', error);
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: 'assistant',
              content: '抱歉，连接失败了，请稍后再试。',
              timestamp: new Date().toISOString(),
            };
            return newMessages;
          });
          setIsLoading(false);
        }
      );
    },
    [isLoading, messages, context]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
