import { getEnv } from "../config/env";
import { mockFetch } from "./mockApi";

/**
 * Very small fetch wrapper. If no API base is configured, uses local mock API.
 */

const withTimeout = async (promise, timeoutMs) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Request timeout")), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId);
  }
};

const normalizeBase = (base) => {
  if (!base) return "";
  return base.endsWith("/") ? base.slice(0, -1) : base;
};

// PUBLIC_INTERFACE
export async function apiGet(path, options = {}) {
  /** Performs a GET request against the configured API base, or returns mock data if base is unset/unreachable. */
  const env = getEnv();
  const base = normalizeBase(env.apiBase || env.backendUrl);

  if (!base) {
    return mockFetch("GET", path);
  }

  const url = `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  try {
    const res = await withTimeout(
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        ...options,
      }),
      6500
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    // Graceful fallback to mocks when backend isn't present
    return mockFetch("GET", path);
  }
}

// PUBLIC_INTERFACE
export async function apiPost(path, body, options = {}) {
  /** Performs a POST request against the configured API base, or returns mock data if base is unset/unreachable. */
  const env = getEnv();
  const base = normalizeBase(env.apiBase || env.backendUrl);

  if (!base) {
    return mockFetch("POST", path, body);
  }

  const url = `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  try {
    const res = await withTimeout(
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {}),
        ...options,
      }),
      6500
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    return mockFetch("POST", path, body);
  }
}
