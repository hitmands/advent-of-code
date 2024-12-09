import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

const reporter = [["html", { subdir: "html" }], ["text"]];

const coverage = {
  enabled: true,
  provider: "v8",
  reportsDirectory: "./dist/vitest-coverage",
  reporter,
};

const dir = "src";

const test = {
  coverage,
  dir,
};

const plugins = [swc.vite()];

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  test,
  plugins,
});
