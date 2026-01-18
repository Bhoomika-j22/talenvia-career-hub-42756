/**
 * Centralized access to env vars. CRA exposes only REACT_APP_* variables at build time.
 */

// PUBLIC_INTERFACE
export function getEnv() {
  /** Returns typed access to environment variables used by the frontend. */
  const parseJson = (value) => {
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  return {
    apiBase: process.env.REACT_APP_API_BASE || "",
    backendUrl: process.env.REACT_APP_BACKEND_URL || "",
    frontendUrl: process.env.REACT_APP_FRONTEND_URL || "",
    wsUrl: process.env.REACT_APP_WS_URL || "",
    nodeEnv: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "development",
    healthcheckPath: process.env.REACT_APP_HEALTHCHECK_PATH || "/health",
    logLevel: process.env.REACT_APP_LOG_LEVEL || "info",
    enableSourceMaps: process.env.REACT_APP_ENABLE_SOURCE_MAPS || "",
    trustProxy: process.env.REACT_APP_TRUST_PROXY || "",
    featureFlags: parseJson(process.env.REACT_APP_FEATURE_FLAGS) || {},
    experimentsEnabled:
      (process.env.REACT_APP_EXPERIMENTS_ENABLED || "").toLowerCase() === "true",
  };
}
