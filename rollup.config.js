import babel from '@rollup/plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default {
  input: './src/client/view_model/chats.js',
  output: {
    file: './src/dist/bundle.js',
    format: 'cjs'
  },

  plugins: [
    babel(),
    nodeResolve({
      include: ['**.js', 'node_modules/**'],
      browser: true,
      moduleResolution: 'node',
      preferBuiltins: false
    }),
    commonjs(),
    json()
  ]
}
