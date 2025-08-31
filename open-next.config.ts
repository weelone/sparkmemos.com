import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // Enable this after creating an R2 bucket and binding it as NEXT_INC_CACHE_R2_BUCKET
  // incrementalCache: r2IncrementalCache,
});
