import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function b64(p) {
  return fs.readFileSync(path.join(root, p)).toString('base64');
}

const MAID_LEFT = 'data:image/webp;base64,' + b64('assets/maid-left.webp');
const MAID_RIGHT = 'data:image/webp;base64,' + b64('assets/maid-right.webp');

const client = `window.__ModuleLoader__.load({
\tid: "dsh-plugin-whale-skin",
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;

\t\t// Deep-sea whale-girl palette ({ light, dark } pairs).
\t\tvar TOKENS = {
\t\t\t"--dsw-alias-brand-primary": { light: "#2f5fc7", dark: "#7aaaff" },
\t\t\t"--dsw-alias-link": { light: "#2f5fc7", dark: "#7aaaff" },
\t\t\t"--dsw-alias-state-business-primary": { light: "#2f5fc7", dark: "#7aaaff" },
\t\t\t"--dsw-alias-bg-base": { light: "#f4f7fc", dark: "#0b101d" },
\t\t\t"--dsw-alias-bg-layer-1": { light: "#ffffff", dark: "#111829" },
\t\t\t"--dsw-alias-bg-layer-2": { light: "#eef2f9", dark: "#172034" },
\t\t\t"--dsw-alias-bg-layer-3": { light: "#e5ecf6", dark: "#1e2a40" },
\t\t\t"--dsw-alias-bg-overlay": { light: "#ffffff", dark: "#19233a" },
\t\t\t"--dsw-alias-bg-module-platform": { light: "#fbfcfe", dark: "#151f32" },
\t\t\t"--dsw-alias-label-primary": { light: "#16233c", dark: "#eef2fa" },
\t\t\t"--dsw-alias-label-secondary": { light: "#45546e", dark: "#b9c4d8" },
\t\t\t"--dsw-alias-label-tertiary": { light: "#7c8aa3", dark: "#8a97ad" },
\t\t\t"--dsw-alias-label-caption": { light: "#a2adbf", dark: "#66718a" },
\t\t\t"--dsw-alias-border-l1": { light: "#e4eaf3", dark: "#1f2b42" },
\t\t\t"--dsw-alias-border-l2": { light: "#d4dded", dark: "#2a3854" },
\t\t\t"--dsw-alias-border-l3": { light: "#c3d0e5", dark: "#354767" },
\t\t\t"--dsw-alias-border-l4": { light: "#b0c0da", dark: "#435a82" },
\t\t\t"--dsw-specific-sidebar-fill": { light: "#eef2f9", dark: "#0e1626" },
\t\t\t"--dsw-alias-interactive-bg-hover": { light: "#2f5fc70f", dark: "#7aaaff14" },
\t\t\t"--dsw-alias-interactive-bg-active": { light: "#2f5fc71a", dark: "#7aaaff24" }
\t\t};

\t\t// Embedded whale-maid artwork (CC BY-NC-SA 4.0, see README/NOTICE).
\t\tvar MAID_LEFT = ${JSON.stringify(MAID_LEFT)};
\t\tvar MAID_RIGHT = ${JSON.stringify(MAID_RIGHT)};

\t\tvar inject = ["theme", "slots"];

\t\tfunction createPlugin(require) {
\t\t\tvar React = require("react");
\t\t\tvar h = React.createElement;

\t\t\t// Two whale maids standing at the bottom corners, purely decorative:
\t\t\t// pointer-events none, pushed to the bottom of the stacking order and
\t\t\t// kept faint so they never obscure text or controls.
\t\t\tfunction MaidDecor() {
\t\t\t\tvar wrap = {
\t\t\t\t\tposition: "fixed", inset: "0", pointerEvents: "none",
\t\t\t\t\tzIndex: 0, overflow: "hidden"
\t\t\t\t};
\t\t\t\tvar maid = {
\t\t\t\t\tposition: "absolute", bottom: "0", userSelect: "none",
\t\t\t\t\tpointerEvents: "none", opacity: 0.28
\t\t\t\t};
\t\t\t\treturn h("div", { "aria-hidden": "true", style: wrap },
\t\t\t\t\th("img", { src: MAID_LEFT, alt: "", style: Object.assign({}, maid, { left: "0", height: "min(46vh, 480px)" }) }),
\t\t\t\t\th("img", { src: MAID_RIGHT, alt: "", style: Object.assign({}, maid, { right: "0", height: "min(48vh, 500px)" }) })
\t\t\t\t);
\t\t\t}

\t\t\treturn {
\t\t\t\tinject: inject,
\t\t\t\tapply: function (ctx) {
\t\t\t\t\tvar dispose = ctx.theme.overrideTokens("dsh-plugin-whale-skin", TOKENS);
\t\t\t\t\tctx.effect(function () { return dispose; }, "whale-skin: theme tokens");
\t\t\t\t\tctx.slots.inject("shell.overlay", function () {
\t\t\t\t\t\treturn ctx.slots.register({
\t\t\t\t\t\t\tname: "shell.overlay", id: "whale-skin-maids", order: 20
\t\t\t\t\t\t}, MaidDecor);
\t\t\t\t\t});
\t\t\t\t}
\t\t\t};
\t\t}

\t\treturn createPlugin(require);
\t}
});
`;

fs.writeFileSync(path.join(root, 'lib', 'client.js'), client);
console.log('built lib/client.js with embedded artwork:', (client.length / 1024).toFixed(1) + ' KB');
