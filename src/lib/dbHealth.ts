import { logServerError } from "@/lib/api";

const DB_BACKOFF_MS = 60 * 1000;

type DbHealthState = {
  unavailableUntil: number;
};

const globalForDbHealth = globalThis as typeof globalThis & {
  __radiatechDbHealth?: DbHealthState;
};

const state = globalForDbHealth.__radiatechDbHealth ?? { unavailableUntil: 0 };
globalForDbHealth.__radiatechDbHealth = state;

export function shouldSkipPublicDbRead() {
  return state.unavailableUntil > Date.now();
}

export function markPublicDbUnavailable(error: unknown) {
  const now = Date.now();
  if (state.unavailableUntil > now) {
    return;
  }

  state.unavailableUntil = now + DB_BACKOFF_MS;
  logServerError("db.public-unavailable", error, { retryAfterMs: DB_BACKOFF_MS });
}

export function markPublicDbAvailable() {
  state.unavailableUntil = 0;
}