import { OAUTH_STATE_COOKIE, encodeOAuthState } from "@shared/const";

export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const getApiBaseUrl = () =>
  (import.meta.env.VITE_API_BASE_URL?.trim() ?? "").replace(/\/$/, "");
export const getApiUrl = (path: string) => `${getApiBaseUrl()}${path}`;
type RuntimePublicConfig = {
  appId?: string;
  oauthPortalUrl?: string;
};

let runtimePublicConfig: RuntimePublicConfig = {};
export const setRuntimePublicConfig = (config: RuntimePublicConfig) => {
  runtimePublicConfig = config;
};
export const isOfflinePreview =
  import.meta.env.VITE_OFFLINE_PREVIEW === "true" ||
  (typeof window !== "undefined" &&
    window.location.hostname.endsWith("github.io") &&
    !getApiBaseUrl());

export const getLoginUrl = (type: "signIn" | "signUp" = "signIn") => {
  const oauthPortalUrl =
    runtimePublicConfig.oauthPortalUrl ?? import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = runtimePublicConfig.appId ?? import.meta.env.VITE_APP_ID;
  if (!oauthPortalUrl || !appId) {
    throw new Error("OAuth public configuration is not available");
  }
  const apiOrigin = getApiBaseUrl() || window.location.origin;
  const redirectUri = `${apiOrigin}/api/oauth/callback`;
  const nonce = crypto.randomUUID();
  document.cookie = `${OAUTH_STATE_COOKIE}=${nonce}; Path=/; Max-Age=600; SameSite=None; Secure`;
  const state = encodeOAuthState({ redirectUri, nonce });
  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", type);
  return url.toString();
};

export const startLogin = () => {
  window.location.href = getLoginUrl("signIn");
};
