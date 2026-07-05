import { mockDashboardData } from '../data/mock/dashboard';
import type { DashboardData } from '../data/types/dashboard';

class MockDataService {
  // Dashboard
  getDashboardData(): DashboardData {
    return mockDashboardData;
  }

  // 模拟异步请求
  async fetchData<T>(data: T, delay: number = 500): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay);
    });
  }
}

export const mockDataService = new MockDataService();
