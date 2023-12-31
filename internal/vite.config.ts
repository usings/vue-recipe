import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import radixResolver from 'radix-vue/resolver'
import unocss from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { getPascalCaseRouteName, VueRouterAutoImports as routerResolver } from 'unplugin-vue-router'
import vueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolvePath('src'),
    },
  },
  server: {
    port: 8080,
  },
  plugins: [
    vueRouter({
      routesFolder: 'src/views',
      dts: 'src/router.d.ts',
      exclude: ['**/__shared__/**/*'],
      importMode: 'async',
      getRouteName: routeNode => getPascalCaseRouteName(routeNode),
    }), // https://github.com/posva/unplugin-vue-router

    vue(),

    unocss(), // https://unocss.dev/

    autoImport({
      dts: 'src/imports.d.ts',
      dirs: [
        'src/shared',
        'src/stores',
      ],
      imports: [
        'vue',
        'pinia',
        '@vueuse/core',
        routerResolver,
      ],
      vueTemplate: true,
    }), // https://github.com/unplugin/unplugin-auto-import

    components({
      dts: 'src/components.d.ts',
      globs: ['src/components/**/*.vue'],
      resolvers: [
        radixResolver(),
      ],
    }), // https://github.com/unplugin/unplugin-vue-components
  ],
})
