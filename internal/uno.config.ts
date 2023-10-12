import { fileURLToPath } from 'node:url'
import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

const iconDirectory = fileURLToPath(new URL('src/assets/icons', import.meta.url))

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      prefix: '',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        icon: FileSystemIconLoader(iconDirectory),
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})
