import { useRef, useEffect } from 'react';
import type { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center text-center">
        <div className="mb-3 text-4xl">💬</div>
        <p className="text-sm text-slate-400">向AI助手提问，获得数据分析和优化建议</p>
      </div>
    );
  }

  return (
    <div className="max-h-64 space-y-3 overflow-y-auto [scrollbar-width:thin]">
      {messages.map((msg, index) => {
        const isUser = msg.role === 'user';
        return (
          <div
            key={index}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-[85%] items-start gap-2 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* 头像 */}
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${
                  isUser
                    ? 'bg-gradient-to-br from-sky-500 to-blue-600'
                    : 'bg-gradient-to-br from-violet-500 to-indigo-500'
                }`}
              >
                {isUser ? '你' : 'AI'}
              </div>

              {/* 消息内容 */}
              <div className="min-w-0">
                <div
                  className={`whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-sm leading-6 ${
                    isUser
                      ? 'rounded-tr-sm border border-sky-300/20 bg-gradient-to-br from-blue-600 to-sky-500 text-white'
                      : 'rounded-tl-sm border border-slate-700 bg-slate-800/90 text-slate-100'
                  }`}
                >
                  {msg.content ||
                    (isLoading && !isUser ? (
                      <span className="text-slate-400">正在生成回复...</span>
                    ) : null)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
