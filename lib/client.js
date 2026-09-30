window.__ModuleLoader__.load({
	id: "dsh-plugin-whale-skin",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;

		// Deep-sea whale-girl palette. Each token maps to a { light, dark }
		// pair so the skin follows DSH's built-in light/dark/system switch.
		// Values are layered over the active theme through theme.overrideTokens,
		// and the ui-layout theme presenter applies them as CSS variables.
		var TOKENS = {
			// Brand & accents
			"--dsw-alias-brand-primary": { light: "#2f5fc7", dark: "#7aaaff" },
			"--dsw-alias-link": { light: "#2f5fc7", dark: "#7aaaff" },
			"--dsw-alias-state-business-primary": { light: "#2f5fc7", dark: "#7aaaff" },

			// Backgrounds
			"--dsw-alias-bg-base": { light: "#f4f7fc", dark: "#0b101d" },
			"--dsw-alias-bg-layer-1": { light: "#ffffff", dark: "#111829" },
			"--dsw-alias-bg-layer-2": { light: "#eef2f9", dark: "#172034" },
			"--dsw-alias-bg-layer-3": { light: "#e5ecf6", dark: "#1e2a40" },
			"--dsw-alias-bg-overlay": { light: "#ffffff", dark: "#19233a" },
			"--dsw-alias-bg-module-platform": { light: "#fbfcfe", dark: "#151f32" },

			// Text
			"--dsw-alias-label-primary": { light: "#16233c", dark: "#eef2fa" },
			"--dsw-alias-label-secondary": { light: "#45546e", dark: "#b9c4d8" },
			"--dsw-alias-label-tertiary": { light: "#7c8aa3", dark: "#8a97ad" },
			"--dsw-alias-label-caption": { light: "#a2adbf", dark: "#66718a" },

			// Borders
			"--dsw-alias-border-l1": { light: "#e4eaf3", dark: "#1f2b42" },
			"--dsw-alias-border-l2": { light: "#d4dded", dark: "#2a3854" },
			"--dsw-alias-border-l3": { light: "#c3d0e5", dark: "#354767" },
			"--dsw-alias-border-l4": { light: "#b0c0da", dark: "#435a82" },

			// Sidebar & interaction
			"--dsw-specific-sidebar-fill": { light: "#eef2f9", dark: "#0e1626" },
			"--dsw-alias-interactive-bg-hover": { light: "#2f5fc70f", dark: "#7aaaff14" },
			"--dsw-alias-interactive-bg-active": { light: "#2f5fc71a", dark: "#7aaaff24" }
		};

		// Required service: the theme registry owned by ui-theme.
		var inject = ["theme"];

		// Apply the skin once; theme.overrideTokens returns a disposer that the
		// plugin fiber tears down on unload.
		function apply(ctx) {
			var dispose = ctx.theme.overrideTokens("dsh-plugin-whale-skin", TOKENS);
			ctx.effect(function () { return dispose; }, "whale-skin: theme tokens");
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
