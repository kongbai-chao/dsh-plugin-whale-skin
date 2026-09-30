# dsh-plugin-whale-skin · 鲸鱼娘 · 深海蓝皮肤

给 DeepSeek Harness 桌面版换上一套「鲸鱼娘」主题：深海蓝配色（浅色 / 深色两套）+ 屏幕两角各一位鲸鱼娘女仆立绘，跟随 DSH 的「外观」亮暗切换自动适配。

## 这是什么

DSH 桌面版没有 web 版那样的「皮肤中心」，但内置了官方的主题扩展点：`theme` 服务支持第三方插件通过 `overrideTokens()` 覆盖 `--dsw-alias-*` 主题变量。本插件基于这个机制换配色，并通过 `shell.overlay` 挂载两位鲸鱼娘女仆立绘（左下角 + 右下角，纯装饰）。

它**只做界面呈现**：改配色 + 加装饰，不改任何 DSH 服务、事件、模型请求或原生控件，也不加载远程资源，卸载即恢复官方界面。

## 安装

在 DSH 的「设置 → 插件」里，输入本插件的**本地绝对路径**（或 npm 包名）安装：

```text
C:\Users\Zero\Documents\deepseek-harness\default-workspace\dsh-plugin-whale-skin
```

（Windows 下正斜杠 / 反斜杠均可。）安装完成后**重启一次 DSH** 生效。

也可以命令行安装（在 profile 目录下）：

```powershell
pnpm add "C:\Users\Zero\Documents\deepseek-harness\default-workspace\dsh-plugin-whale-skin"
```

## 效果

| 模式 | 风格 |
|---|---|
| 浅色 | 浅海蓝白底，深海蓝文字与品牌色 |
| 深色 | 深海蓝黑底，亮蓝点缀，像深海里的微光 |
| 装饰 | 屏幕左下角、右下角各一位鲸鱼娘女仆立绘（透明背景，不遮挡操作） |

切换方式：设置 → 外观 → 浅色 / 深色 / 跟随系统，与官方主题完全一致，无需额外开关。

## 配色一览

品牌主色 `#2f5fc7`（浅色）/ `#7aaaff`（深色）；背景、文字、边框、侧栏、交互态均围绕深海蓝展开，详见 `lib/client.js` 的 `TOKENS`。

## 兼容性

针对 **DSH 桌面版 0.2.x（`desktop` profile）** 开发与验证。它依赖 DSH 内置的 `theme` 服务（`@deepseek-ai/dsh-client-ui-theme` 的 `overrideTokens`），该接口在 0.2.0-rc.2 已存在；DSH 后续版本若改动主题接口，需重新适配。

## 开发 / 本地预览

立绘以 base64 内嵌进 `lib/client.js`，由构建脚本生成。改美术后重新构建：

```powershell
node scripts/build.mjs
```

用 `pnpm link` 安装后，改源码/重构建再重启 DSH 即可加载最新改动。

## 卸载

在 DSH 的「设置 → 插件」里移除 `dsh-plugin-whale-skin`，或命令行：

```powershell
pnpm remove dsh-plugin-whale-skin
```

刷新页面即恢复官方配色。

## 许可

- **代码**：MIT。
- **鲸鱼娘立绘**（`assets/maid-left.webp` / `assets/maid-right.webp`，已内嵌进 `lib/client.js`）：改编自 [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) 的 `maid-atelier`，按 **CC BY-NC-SA 4.0** 分发——**禁止商业使用**，需署名并保持相同方式共享，署名链见 [NOTICE](NOTICE)。
  - 角色原作：上善
  - 女仆二次设计：ZipZipPipe
- **图标**：原创 SVG，MIT。
