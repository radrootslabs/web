import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { config as dotenv_config } from "dotenv";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	const web_repo_root = path.resolve(__dirname, "..");
	const monorepo_root = path.resolve(web_repo_root, "../../../..");
	const first_party_wasm_pkg_roots = [
		"events_codec_wasm",
		"replica_db_wasm",
		"replica_sync_wasm",
	].map((crate) =>
		path.resolve(monorepo_root, `domains/radroots/lib/crates/${crate}/pkg`)
	);
	const web_app_env_file = process.env.RADROOTS_WEB_APP_ENV_FILE;
	if (!web_app_env_file) throw new Error("Missing env var: RADROOTS_WEB_APP_ENV_FILE");
	dotenv_config({ path: path.resolve(web_app_env_file), override: true });
	const app_package_path = path.resolve(__dirname, "package.json");
	const app_package = JSON.parse(readFileSync(app_package_path, "utf8")) as { name?: string; version?: string };
	const git_hash = (() => {
		try {
			return execSync("git rev-parse HEAD", { cwd: web_repo_root }).toString().trim();
		} catch {
			return "unknown";
		}
	})();
	const required_env = (key: string): string => {
		const value = process.env[key];
		if (!value) throw new Error(`Missing env var: ${key}`);
		return value;
	};
	const required_package_string = (key: "name" | "version"): string => {
		const value = app_package[key];
		if (!value) throw new Error(`app package ${key} must be defined`);
		return value;
	};
	const web_env_keys = [
		"RADROOTS_WEB_APP_ACCENT",
		"RADROOTS_WEB_APP_DESCRIPTION",
		"RADROOTS_WEB_APP_NAME",
		"RADROOTS_WEB_API_BASE_URL",
		"RADROOTS_WEB_DEFAULT_RELAY_URLS",
		"RADROOTS_WEB_GEOCODER_DB_URL",
		"RADROOTS_WEB_KEYVAL_NAME",
		"RADROOTS_WEB_MEDIA_BASE_URL",
		"RADROOTS_WEB_NOSTR_CLIENT",
		"RADROOTS_WEB_RELAY_URL",
		"RADROOTS_WEB_SQL_WASM_URL",
	] as const;
	const web_env_define = Object.fromEntries(
		web_env_keys.map((key) => [`import.meta.env.${key}`, JSON.stringify(required_env(key))])
	);
	return {
		build: {
			sourcemap: true
		},
		envPrefix: "RADROOTS_WEB_",
		plugins: [
			tailwindcss(),
			sveltekit(),
		],
		define: {
			'process.env.NODE_ENV': `"${mode}"`,
			'__APP_GIT_HASH__': JSON.stringify(git_hash),
			'__APP_NAME__': JSON.stringify(`radroots/${required_package_string("name")}`),
			'__APP_VERSION__': JSON.stringify(required_package_string("version")),
			...web_env_define,
		},
		server: {
			host: required_env("RADROOTS_WEB_APP_DEV_HOST"),
			port: Number(required_env("RADROOTS_WEB_APP_DEV_PORT")),
			fs: {
				allow: [
					path.resolve(__dirname, ".."),
					path.resolve(__dirname, "../.."),
					...first_party_wasm_pkg_roots
				]
			}
		}
	};
});
