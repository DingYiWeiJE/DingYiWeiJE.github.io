import { HeroSection } from './components/HeroSection';
import { ETLPipeline } from './components/ETLPipeline';
import { DatasetManagement } from './components/DatasetManagement';
import { ModelTraining } from './components/ModelTraining';
import { AIAssistant } from './components/AIAssistant';
import { useETLAnimation, useTrainingSimulation, useAIChat } from './hooks';
import { mockDatasets, mockETLNodes, mockTrainingTasks } from './mock';
import type { PlatformStats } from './types';

export function DataAIPage() {
  // ETL动画
  const { nodes: etlNodes } = useETLAnimation(mockETLNodes);

  // 训练任务（选择第一个训练中的任务进行模拟）
  const activeTask = mockTrainingTasks.find((t) => t.status === 'training') || mockTrainingTasks[0];
  const simulatedTask = useTrainingSimulation(activeTask);

  // 平台统计
  const platformStats: PlatformStats = {
    datasetCount: mockDatasets.length,
    modelCount: mockTrainingTasks.length,
    trainingTasks: mockTrainingTasks.filter((t) => t.status === 'training').length,
    gpuUtilization: simulatedTask?.gpu.utilization || 0,
  };

  // AI助手
  const { messages, isLoading, sendMessage } = useAIChat({
    datasets: mockDatasets,
    trainingTasks: mockTrainingTasks,
    etlNodes: etlNodes,
  });

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Hero区域 */}
      <HeroSection stats={platformStats} />

      {/* ETL Pipeline */}
      <ETLPipeline nodes={etlNodes} />

      {/* 数据集管理和模型训练 - 两列布局 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DatasetManagement datasets={mockDatasets} />
        {simulatedTask && <ModelTraining task={simulatedTask} />}
      </div>

      {/* AI助手 */}
      <AIAssistant messages={messages} isLoading={isLoading} onSendMessage={sendMessage} />
    </div>
  );
}
