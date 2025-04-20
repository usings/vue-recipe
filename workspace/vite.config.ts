import path from 'node:path'
import { unheadVueComposablesImports as unheadImports } from '@unhead/vue'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import iconsResolver from 'unplugin-icons/resolver'
import icons from 'unplugin-icons/vite'
import components from 'unplugin-vue-components/vite'
import { getPascalCaseRouteName, VueRouterAutoImports as routerImports } from 'unplugin-vue-router'
import vueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import layouts from 'vite-plugin-vue-layouts-next'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(import.meta.dirname, 'src'),
    },
  },
  server: {
    port: 8080,
  },
  plugins: [
    vueRouter({
      dts: 'shims/routes.d.ts',
      routesFolder: 'src/views',
      importMode: 'async',
      getRouteName: (routeNode: any) => getPascalCaseRouteName(routeNode),
    }), // https://github.com/posva/unplugin-vue-router

    layouts({
      layoutsDirs: 'src/layouts',
      pagesDirs: 'src/views',
      defaultLayout: 'default',
    }), // https://github.com/JohnCampionJr/vite-plugin-vue-layouts

    vue(),
    vueJsx(),
    vueDevTools(),

    unocss(), // https://unocss.dev/

    icons({
      customCollections: {
        icon: FileSystemIconLoader('src/assets/icons'),
      },
    }), // https://github.com/unplugin/unplugin-icons

    autoImport({
      dts: 'shims/imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
      ],
      imports: [
        'vue',
        'pinia',
        '@vueuse/core',
        routerImports,
        unheadImports,
      ],
      vueTemplate: true,
    }), // https://github.com/unplugin/unplugin-auto-import

    components({
      dts: 'shims/components.d.ts',
      globs: ['src/components/**/*.vue'],
      resolvers: [
        iconsResolver({ prefix: false, enabledCollections: ['icon'] }),
      ],
    }), // https://github.com/unplugin/unplugin-vue-components
  ],
})
