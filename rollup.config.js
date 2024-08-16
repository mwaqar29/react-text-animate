import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    name: 'react-text-animate',
  },
  external: ['react', 'react-dom', 'framer-motion'],
  plugins: [
    typescript({ tsconfig: 'tsconfig.json' }),
    postcss({
      plugins: [autoprefixer()],
      sourceMap: true,
      minimize: true,
    }),
    terser(),
  ],
})
