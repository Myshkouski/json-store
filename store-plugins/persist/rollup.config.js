import path from 'path'
import babel from 'rollup-plugin-babel'

const __src = path.resolve('src')
const __dist = path.resolve('dist')

const uglifyOptions = {
  sourceMap: true
}

const generateConfig = modules => modules.map(module => {
  return {
    input: path.resolve(__src, module),
    output: {
      format: 'cjs',
      file: path.resolve(__dist, module)
    },
    external: id => id != path.resolve(__src, module),
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      })
    ]
  }
})

export default generateConfig(['index.js'])
