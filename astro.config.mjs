import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://ccardea.github.io/',
  base: '/github.io',
  trailingSlash: 'ignore',
  output: 'static',
})
