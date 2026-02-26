import { v4 as uuidv4 } from "uuid";

const KEY = "singe_device_id";

export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";
  const existing = localStorage.getItem(KEY);
  if (existing) return existing;
  const id = uuidv4();
  localStorage.setItem(KEY, id);
  return id;
}
