import path from 'path'
import micromatch from 'micromatch'
import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'

const __src = path.resolve('src')
const __dist = path.resolve('dist')

const pathPatterns = options => id => {
  for(let pattern in options) {
    const captured = micromatch.capture(pattern, id)

    if(captured) {
      const replace = options[pattern]

      if(replace instanceof Function) {
        return path.normalize(replace(captured))
      } else if(typeof replace == 'string') {
        return path.join(options[pattern], captured.join('/'))
      }
    }
  }
}

const generateConfig = modules => modules.map(module => {
  return {
    input: path.resolve(__src, module),
    output: {
      format: 'cjs',
      file: path.resolve(__dist, module),
      paths: pathPatterns({
        '@alexeimyshkouski/*/src/**': captured => `@alexeimyshkouski/${ captured[0] }/dist/${ captured[1] }`
      })
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

export default generateConfig(['index.js', 'schedule.js'])
