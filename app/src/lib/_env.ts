const DEFAULT_RELAYS = import.meta.env.RADROOTS_WEB_DEFAULT_RELAY_URLS;
if (!DEFAULT_RELAYS || typeof DEFAULT_RELAYS !== 'string') throw new Error('Missing env var: RADROOTS_WEB_DEFAULT_RELAY_URLS');

const RADROOTS_API = import.meta.env.RADROOTS_WEB_API_BASE_URL;
if (!RADROOTS_API || typeof RADROOTS_API !== 'string') throw new Error('Missing env var: RADROOTS_WEB_API_BASE_URL');

const RADROOTS_MEDIA = import.meta.env.RADROOTS_WEB_MEDIA_BASE_URL;
if (!RADROOTS_MEDIA || typeof RADROOTS_MEDIA !== 'string') throw new Error('Missing env var: RADROOTS_WEB_MEDIA_BASE_URL');

const KEYVAL_NAME = import.meta.env.RADROOTS_WEB_KEYVAL_NAME;
if (!KEYVAL_NAME || typeof KEYVAL_NAME !== 'string') throw new Error('Missing env var: RADROOTS_WEB_KEYVAL_NAME');

const SQL_WASM_URL = import.meta.env.RADROOTS_WEB_SQL_WASM_URL;
if (!SQL_WASM_URL || typeof SQL_WASM_URL !== 'string') throw new Error('Missing env var: RADROOTS_WEB_SQL_WASM_URL');

const GEOCODER_DB_URL = import.meta.env.RADROOTS_WEB_GEOCODER_DB_URL;
if (!GEOCODER_DB_URL || typeof GEOCODER_DB_URL !== 'string') throw new Error('Missing env var: RADROOTS_WEB_GEOCODER_DB_URL');

const NOSTR_CLIENT = import.meta.env.RADROOTS_WEB_NOSTR_CLIENT;
if (!NOSTR_CLIENT || typeof NOSTR_CLIENT !== 'string') throw new Error('Missing env var: RADROOTS_WEB_NOSTR_CLIENT');

const RADROOTS_RELAY = import.meta.env.RADROOTS_WEB_RELAY_URL;
if (!RADROOTS_RELAY || typeof RADROOTS_RELAY !== 'string') throw new Error('Missing env var: RADROOTS_WEB_RELAY_URL');

const PLATFORM_NAME = import.meta.env.RADROOTS_WEB_APP_NAME;
if (!PLATFORM_NAME || typeof PLATFORM_NAME !== 'string') throw new Error('Missing env var: RADROOTS_WEB_APP_NAME');

const PLATFORM_ACCENT = import.meta.env.RADROOTS_WEB_APP_ACCENT;
if (!PLATFORM_ACCENT || typeof PLATFORM_ACCENT !== 'string') throw new Error('Missing env var: RADROOTS_WEB_APP_ACCENT');

const PLATFORM_DESCRIPTION = import.meta.env.RADROOTS_WEB_APP_DESCRIPTION;
if (!PLATFORM_DESCRIPTION || typeof PLATFORM_DESCRIPTION !== 'string') throw new Error('Missing env var: RADROOTS_WEB_APP_DESCRIPTION');

const PROD = import.meta.env.MODE === 'production';

export const _env = {
  PROD,
  DEFAULT_RELAYS,
  GEOCODER_DB_URL,
  KEYVAL_NAME,
  NOSTR_CLIENT,
  PLATFORM_ACCENT,
  PLATFORM_DESCRIPTION,
  PLATFORM_NAME,
  RADROOTS_API,
  RADROOTS_MEDIA,
  RADROOTS_RELAY,
  SQL_WASM_URL,
} as const;
