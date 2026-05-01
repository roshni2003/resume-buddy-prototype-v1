// Local stub for defineConfig to avoid missing module/type errors.
// If you later install the real package with types, replace this stub
// with: import { defineConfig } from "@tanstack/react-start/config";
function defineConfig<T = any>(config: T): T {
  return config;
}

export default defineConfig({
  server: {
    preset: "aws-amplify",
  },
});