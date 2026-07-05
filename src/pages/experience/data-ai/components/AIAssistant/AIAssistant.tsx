import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { SuggestedQuestions } from './SuggestedQuestions';
import type { Message } from '../../types';

interface AIAssistantProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const SUGGESTED_QUESTIONS = [
  '分析当前训练情况',
  '总结模型效果',
  '给出优化建议',
  '评估数据集质量',
];

export function AIAssistant({ messages, isLoading, onSendMessage }: AIAssistantProps) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-4 md:p-6">
      {/* 标题 */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white md:text-xl">AI Assistant</h2>
          <p className="mt-1 text-xs text-slate-400 md:text-sm">
            智能分析助手
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-xs">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-emerald-300">
            {isLoading ? '思考中' : '在线'}
          </span>
        </div>
      </div>

      {/* 预设问题 */}
      {messages.length === 0 && (
        <div className="mb-4">
          <div className="mb-2 text-xs text-slate-500">快速开始：</div>
          <SuggestedQuestions
            questions={SUGGESTED_QUESTIONS}
            onSelect={onSendMessage}
            disabled={isLoading}
          />
        </div>
      )}

      {/* 消息列表 */}
      <div className="mb-4">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* 输入框 */}
      <MessageInput onSend={onSendMessage} disabled={isLoading} />

      {/* 提示 */}
      <div className="mt-2 text-center text-xs text-slate-500">
        Enter 发送 · Shift + Enter 换行
      </div>
    </div>
  );
}
