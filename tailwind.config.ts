import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  presets: [require('@nuxt/ui/tailwind.config')],
  plugins: [],
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}'
  ]
}