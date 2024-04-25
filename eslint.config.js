import { defineConfig } from '@witheslint/core'
import { presetVue } from '@witheslint/preset-vue'

export default defineConfig({
  presets: [
    presetVue(),
  ],
  extends: [
    {
      rules: {
        'no-undef': 'off',
        'unicorn/catch-error-name': 'off',
      },
    },
  ],
})
