console.log("🔵 Hooks ejecutándose...");
import "./lib/server/db.ts";

import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  return await resolve(event);
};
