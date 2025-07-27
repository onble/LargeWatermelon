# 大西瓜游戏开发文档

## 项目概述

这是一个基于 LayaAir 引擎开发的休闲游戏，玩家通过触摸控制水果的移动和释放，碰撞相同水果可以合成更大的水果，目标是合成最大的西瓜。游戏包含分数计算、特效播放和失败检测等功能。

参考资料：[cocos合成大西瓜](https://github.com/yieio/daxigua)

## 核心模块

### 1. 游戏逻辑

- **MainGame.ts**：核心逻辑脚本，管理水果生成、触摸事件、分数计算和游戏流程。
- **Fruit.ts**：单个水果的逻辑脚本，处理碰撞、合成和边界检测。

### 2. 界面与特效

- **GameFailPanel.ts**：游戏失败面板，提供重新开始功能。
- **MaskView.ts**：遮罩视图（预留扩展）。
- **FillScreen.ts**：屏幕适配脚本。
- **AdjustWithHeight.ts**：节点高度调整脚本。

## 开发依赖

- **引擎**：LayaAir 3.2.6
- **语言**：TypeScript
- **工具**：VS Code 或其他支持 TypeScript 的 IDE