// import { nodeResolve } from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
export default [
  {
    input: ['index.js'],
    output: [
      {
        dir: 'dist_esm',
        // entryFileNames: [name].js,
        assetFileNames: '[name]-[hash][extend]',
        chunkFileNames: '[name]-[hash].js',
        format: 'esm',
        sourcemap: true,
        compact: false,
      },
      {
        dir: 'dist_cjs',
        // entryFileNames: [name].js,
        assetFileNames: '[name]-[hash][extend]',
        chunkFileNames: '[name]-[hash].js',
        format: 'cjs',
        sourcemap: true,
        compact: false,
      },
      // {
      //   dir: 'dist_umd',
      //   format: 'umd',
      //   name: 'umdModuleName',
      //   sourcemap: true,
      // }
    ],
    external: [],
    // plugins: [nodeResolve(), commonjs()],
  },
]
