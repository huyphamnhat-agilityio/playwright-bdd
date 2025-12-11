import { devices } from "@playwright/test";

export const BROWSER_CONFIGS = [
  {
    name: "chromium",
    device: devices["Desktop Chrome"],
  },
  {
    name: "firefox",
    device: devices["Desktop Firefox"],
  },
  {
    name: "webkit",
    device: devices["Desktop Safari"],
  },
] as const;

export const AUTH_FILE = "playwright/.auth/user.json";

export const TEST_PATTERNS = {
  SETUP: /.*\.setup\.ts/,
  AUTH: /auth\.feature/,
} as const;
