import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import autoprefixer from 'autoprefixer'
import { defineConfig, RollupOptions } from 'rollup'
import banner2 from 'rollup-plugin-banner2'
import del from 'rollup-plugin-delete'
import { dts } from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'

const config: RollupOptions[] = defineConfig([
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'es',
      name: 'react-text-animate',
    },
    external: ['react', 'react-dom', 'framer-motion'],
    plugins: [
      typescript(),
      postcss({
        plugins: [autoprefixer()],
        minimize: true,
      }),
      terser(),
      banner2(() => `"use client";`),
    ],
  },
  {
    input: './dist/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts(), del({ hook: 'buildEnd', targets: './dist/src' })],
    external: [/\.css$/],
  },
])

export default config
