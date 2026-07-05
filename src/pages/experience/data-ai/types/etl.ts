export type ETLNodeStatus = 'running' | 'completed' | 'pending' | 'error';

export interface ETLNodeStats {
  processed: number;
  total: number;
  throughput: string;
  duration?: string;
}

export interface ETLNode {
  id: string;
  name: string;
  description: string;
  status: ETLNodeStatus;
  progress: number;
  stats: ETLNodeStats;
  icon: string;
  details: {
    input?: string;
    output?: string;
    config?: Record<string, unknown>;
  };
}

export interface ETLConnection {
  source: string;
  target: string;
  active: boolean;
}
