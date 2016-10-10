export default {
  entry: 'src/index.js',
  moduleName: 'VueClickOutside',
  plugins: [
    require('rollup-plugin-babel')()
  ],
  targets: [
    { dest: "dist/clickoutside.js", format: "umd" },
    { dest: "dist/clickoutside.common.js", format: "cjs" }
  ]
};
