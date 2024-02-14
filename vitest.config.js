import { fileURLToPath } from 'node:url';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mergeConfig, defineConfig, configDefaults } from 'vitest/dist/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
);
