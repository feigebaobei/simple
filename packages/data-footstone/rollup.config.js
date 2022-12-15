// 待测试
// import { nodeResolve } from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'
// // import cssnano from 'cssnano'
// import postcss from 'rollup-plugin-postcss'
// import autoprefixer from 'autoprifixer'
// import typescript from '@rollup/plugin-typescript'
// import strip from '@rollup/plugin-strip'
export default [
  {
    input: ['tscDist/src/index.js'],
    output: [
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
      {
        dir: 'dist_cjs',
        // entryFileNames: [name].js,
        assetFileNames: '[name]-[hash][extend]',
        chunkFileNames: '[name]-[hash].js',
        format: 'cjs',
        sourcemap: true,
        compact: false,
        // plugins: [terser()],
        preserveModules: true, // 保留目录结构
        // preserveModulesRoot: 'src' // 将保留的模块目录结构放在根目录下该路径下
      },
    ],
    // external: ['react'], // 指定不打包的包。
    plugins: [
      // nodeResolve(), // 加载node_modules是的文件
      // commonjs(), // 使rollup支持打包cjs规范的代码
      // postcss({
      //   // v3版本的postcss插件
      //   plugins: [
      //     autoprefixer(),
      //     // cssnano() // 压缩css文件
      //   ],
      //   // extract: 'css/index.css' // 抽离为单独的css文件
      // }),
      // typescript(), // 使其可打包ts文件
      // strip(), // 删除开发、测试代码。
    ],
  },
]
