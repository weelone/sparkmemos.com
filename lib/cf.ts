import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getCf() {
  return getCloudflareContext({ async: true });
}
