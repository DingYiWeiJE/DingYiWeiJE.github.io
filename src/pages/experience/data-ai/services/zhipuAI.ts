const API_KEY = 'c60fd7b311c5453cbde6180dbfe0349b.jgQdCdXME9hrdlDu';
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * 调用智谱AI流式API
 */
export async function streamChat(
  messages: ChatMessage[],
  onChunk: (content: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void,
  options: ChatOptions = {}
) {
  const { model = 'glm-4-flash', temperature = 0.7, maxTokens = 2000 } = options;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        stream: true,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Response body reader is null');
    }

    let buffer = '';

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
            onChunk(content);
          }
        } catch (e) {
          console.error('Failed to parse JSON:', dataStr, e);
        }
      }
    }

    onComplete();
  } catch (error) {
    onError(error as Error);
  }
}

/**
 * 构建AI平台分析的系统提示词
 */
export function buildSystemPrompt(context: {
  datasets?: unknown[];
  trainingTasks?: unknown[];
  etlNodes?: unknown[];
}): string {
  const { datasets = [], trainingTasks = [], etlNodes = [] } = context;

  // 类型守卫函数
  const isTrainingTask = (t: unknown): t is { status: string; modelName: string; modelType: string; epoch: { current: number; total: number }; metrics: { loss: number[]; accuracy: number[] } } => {
    return typeof t === 'object' && t !== null && 'status' in t && 'modelName' in t;
  };

  const activeTrainingTasks = (trainingTasks as unknown[]).filter(t => isTrainingTask(t) && t.status === 'training');

  return `你是一位企业级AI数据平台的智能分析助手。你的职责是帮助用户分析和优化AI训练流程。

当前平台状态：
- 数据集数量：${datasets.length}
- 训练任务数量：${trainingTasks.length}
- ETL流程节点：${etlNodes.length}

${activeTrainingTasks.length > 0 ? `
活跃训练任务：
${activeTrainingTasks.map(t =>
  isTrainingTask(t) ? `- ${t.modelName} (${t.modelType}): Epoch ${t.epoch.current}/${t.epoch.total}, Loss=${t.metrics.loss[t.metrics.loss.length - 1]}, Acc=${t.metrics.accuracy[t.metrics.accuracy.length - 1]}%` : ''
).join('\n')}
` : ''}

请提供：
1. 简洁专业的分析
2. 基于数据的可执行建议
3. 使用中文回答
4. 回答控制在200字以内

重点关注：数据质量、训练效率、模型性能、资源利用率。`;
}
