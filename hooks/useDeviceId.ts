"use client";

import { useEffect, useState } from "react";
import { getOrCreateDeviceId } from "@/lib/deviceId";

export function useDeviceId() {
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    setDeviceId(getOrCreateDeviceId());
  }, []);

  return deviceId;
}
