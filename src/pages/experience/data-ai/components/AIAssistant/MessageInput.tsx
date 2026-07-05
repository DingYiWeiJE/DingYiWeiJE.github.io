import { useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入你的问题，按 Enter 发送..."
        disabled={disabled}
        className="min-h-12 max-h-24 flex-1 resize-y rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="h-10 shrink-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 text-sm font-medium text-white transition hover:from-cyan-600 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        发送
      </button>
    </div>
  );
}
