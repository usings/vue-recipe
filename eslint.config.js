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
        'unicorn/no-abusive-eslint-disable': 'off',
      },
    },
  ],
})
