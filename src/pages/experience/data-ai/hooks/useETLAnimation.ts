import { useState, useEffect, useRef } from 'react';
import type { ETLNode } from '../types';

/**
 * ETL动画Hook - 模拟数据流处理
 */
export function useETLAnimation(initialNodes: ETLNode[]) {
  const [nodes, setNodes] = useState<ETLNode[]>(initialNodes);
  const [isAnimating, setIsAnimating] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!isAnimating) return;

    intervalRef.current = setInterval(() => {
      setNodes((prevNodes) => {
        const newNodes = [...prevNodes];

        // 找到第一个running或completed但还未到100%的节点
        const runningIndex = newNodes.findIndex(
          (node) => node.status === 'running' || (node.status === 'completed' && node.progress < 100)
        );

        if (runningIndex !== -1) {
          const node = newNodes[runningIndex];

          if (node.status === 'running') {
            // 更新进度
            const newProgress = Math.min(100, node.progress + Math.random() * 5);
            const processed = Math.floor((node.stats.total * newProgress) / 100);

            newNodes[runningIndex] = {
              ...node,
              progress: newProgress,
              stats: {
                ...node.stats,
                processed,
              },
            };

            // 如果完成，更新状态并启动下一个节点
            if (newProgress >= 100) {
              newNodes[runningIndex].status = 'completed';

              // 启动下一个节点
              if (runningIndex + 1 < newNodes.length) {
                newNodes[runningIndex + 1].status = 'running';
              }
            }
          }
        }

        return newNodes;
      });
    }, 1000); // 每秒更新一次

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating((prev) => !prev);
  };

  const resetAnimation = () => {
    setNodes(initialNodes);
    setIsAnimating(true);
  };

  return {
    nodes,
    isAnimating,
    toggleAnimation,
    resetAnimation,
  };
}
