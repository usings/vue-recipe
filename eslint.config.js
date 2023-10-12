import { defineFlatConfig, presetBasic, presetVue } from 'eslint-presets'

export default defineFlatConfig([
  presetBasic({ enableTs: true }),
  presetVue({ enableTs: true }),
  {
    rules: {
      'no-undef': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
    },
  },
])
