import { createHash } from "node:crypto";

export function createMD5Hash(data: string): string {
  return createHash("md5").update(data).digest("hex");
}
