// ECharts 按需导入配置
// 只导入需要的组件，减小打包体积
import * as echarts from 'echarts/core';
import {
  LineChart,
  BarChart,
  PieChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必需的组件
echarts.use([
  LineChart,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);

export default echarts;
