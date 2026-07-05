import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const API_KEY = 'c60fd7b311c5453cbde6180dbfe0349b.jgQdCdXME9hrdlDu';

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch(
        'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'glm-4.5-air',
            stream: true,
            messages: [...messages, userMessage]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let assistantMessage = '';
      let buffer = '';

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: ''
        }
      ]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmedLine = line.trim();

            if (!trimmedLine.startsWith('data:')) continue;

            const dataStr = trimmedLine.slice(5).trim();

            if (!dataStr || dataStr === '[DONE]') continue;

            try {
              const data = JSON.parse(dataStr);
              const content = data.choices?.[0]?.delta?.content || '';

              if (content) {
                assistantMessage += content;

                setMessages(prev => {
                  const newMessages = [...prev];

                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: assistantMessage
                  };

                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Failed to parse JSON:', dataStr, e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '抱歉，连接失败了，请稍后再试。'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="box-border min-h-screen w-full bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_34%),linear-gradient(135deg,#09090b_0%,#111827_50%,#020617_100%)] px-4 py-8 text-slate-100">
      <div className="mx-auto flex h-[calc(100vh-64px)] max-h-[820px] min-h-[620px] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-400/20 bg-slate-950/75 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex items-center gap-4 border-b border-slate-400/15 bg-gradient-to-br from-slate-800/95 to-slate-950/95 px-6 py-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 text-xl shadow-[0_10px_30px_rgba(99,102,241,0.35)]">
            ✦
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-wide text-slate-50">
              AI 聊天助手
            </h1>
          </div>

          <div
            className={`ml-auto flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
              loading
                ? 'border-amber-400/25 bg-amber-400/10 text-amber-300'
                : 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                loading
                  ? 'bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.9)]'
                  : 'bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.9)]'
              }`}
            />
            {loading ? '思考中' : '在线'}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-900/70 to-slate-950/90 px-5 py-6 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.35)_transparent] sm:px-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-400/15 bg-gradient-to-br from-indigo-500/20 to-cyan-500/15 text-4xl shadow-[0_20px_60px_rgba(15,23,42,0.5)]">
                💬
              </div>

              <div className="mb-2 text-lg font-semibold text-slate-200">
                开始一段新的对话
              </div>

              <p className="max-w-sm text-sm leading-7 text-slate-400">
                输入你的问题，AI 会以流式方式实时返回结果。
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';

                return (
                  <div
                    key={index}
                    className={`flex ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`flex max-w-[86%] items-start gap-3 sm:max-w-[78%] ${
                        isUser ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-lg ${
                          isUser
                            ? 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/25'
                            : 'bg-gradient-to-br from-violet-500 to-indigo-500 shadow-violet-500/25'
                        }`}
                      >
                        {isUser ? '你' : 'AI'}
                      </div>

                      <div className="min-w-0">
                        <div
                          className={`mb-1.5 text-xs text-slate-500 ${
                            isUser ? 'text-right' : 'text-left'
                          }`}
                        >
                          {isUser ? '你' : '智谱助手'}
                        </div>

                        <div
                          className={`whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-7 shadow-xl ${
                            isUser
                              ? 'rounded-tr-md border border-sky-300/20 bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-blue-600/20'
                              : 'rounded-tl-md border border-slate-400/15 bg-slate-800/90 text-slate-100 shadow-black/20'
                          }`}
                        >
                          {msg.content ||
                            (loading && !isUser ? (
                              <span className="text-slate-400">
                                正在生成回复...
                              </span>
                            ) : null)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-slate-400/15 bg-slate-950/80 px-5 py-5 sm:px-6">
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="输入你的问题，按 Enter 发送，Shift + Enter 换行..."
              disabled={loading}
              className="min-h-12 max-h-40 flex-1 resize-y rounded-2xl border border-slate-400/20 bg-slate-900/90 px-4 py-3 text-sm leading-6 text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-indigo-400/70 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="h-12 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(99,102,241,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(99,102,241,0.42)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-none disabled:bg-slate-700 disabled:text-slate-300 disabled:shadow-none"
            >
              {loading ? '发送中...' : '发送'}
            </button>
          </div>

          <div className="mt-3 text-center text-xs text-slate-500">
            Enter 发送 · Shift + Enter 换行
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;