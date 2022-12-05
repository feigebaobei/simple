// import typescript from '@rollup/plugin-typescript'
export default [
    {
      // input: ['src/index.ts'],
      input: ['tscDist/src/index.js'],
      output: // [
        {
          dir: 'dist_esm',
          // entryFileNames: [name].js,
          assetFileNames: '[name]-[hash][extend]',
          chunkFileNames: '[name]-[hash].js',
          format: 'esm',
          sourcemap: true,
          compact: false,
          // plugins: [terser()],
          preserveModules: true, // 保留目录结构
          // preserveModulesRoot: 'src' // 将保留的模块目录结构放在根目录下该路径下
        },
      // ],
      plugins: [
        // typescript(),   // 使其可打包ts文件
      ]
    }
  ]