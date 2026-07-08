export type OpenSourcePackage = {
  name: string;
  description: string;
  installCommand: string;
  techStack: string[];
  npmUrl: string;
};

export const openSourcePackages: OpenSourcePackage[] = [
  {
    name: 'react-vision-annotator',
    description:
      '一个基于 React 的视觉标注工具包，用于图像标记、形状编辑和交互式标注工作流。',
    installCommand: 'npm install react-vision-annotator',
    techStack: ['React', 'Canvas', 'TypeScript'],
    npmUrl: 'https://www.npmjs.com/package/react-vision-annotator',
  },
  {
    name: '@context-menu-kit/react',
    description:
      '一个灵活的 React 应用程序上下文菜单工具包，具有可组合 API 和自定义交互支持。',
    installCommand: 'npm install @context-menu-kit/react',
    techStack: ['React', 'TypeScript'],
    npmUrl: 'https://www.npmjs.com/package/@context-menu-kit/react',
  },
  {
    name: '@context-menu-kit/vue',
    description:
      '一个专为可重用右键菜单和复杂交互场景设计的 Vue 上下文菜单库。',
    installCommand: 'npm install @context-menu-kit/vue',
    techStack: ['Vue', 'TypeScript'],
    npmUrl: 'https://www.npmjs.com/package/@context-menu-kit/vue',
  },
  {
    name: 'native-layer-ui',
    description:
      '一个原生风格的 UI 层包，用于跨平台界面模式和移动端交互设计。',
    installCommand: 'npm install native-layer-ui',
    techStack: ['TypeScript', 'UI'],
    npmUrl: 'https://www.npmjs.com/package/native-layer-ui',
  },
  {
    name: '@adaptive-hover/react',
    description:
      '一个小的 React 工具，用于在鼠标、触摸和混合输入环境下的自适应悬停交互。',
    installCommand: 'npm install @adaptive-hover/react',
    techStack: ['React', 'TypeScript'],
    npmUrl: 'https://www.npmjs.com/package/@adaptive-hover/react',
  },
];