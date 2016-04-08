import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'VueClickOutside',
  dest: 'build/index.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
