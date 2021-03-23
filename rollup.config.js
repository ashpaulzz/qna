import riot from 'rollup-plugin-riot';
import scss from 'rollup-plugin-scss';
import assets from 'rollup-plugin-copy-assets';
import resolve from '@rollup/plugin-node-resolve';
import builtIns from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

// rollup
const production = !process.env.ROLLUP_WATCH;

/**
 * serve file
 */
const serve = () => {
  // set started
  let started = false;

  return {
    writeBundle() {
      // check started
      if (started) return;

      // set started
      started = true;

      // create child process
      require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio : ['ignore', 'inherit', 'inherit'],
        shell : true,
      });
    },
  };
};

// export default
export default {
  input  : 'src/main.js',
  output : {
    file      : 'public/build/bundle.js',
    name      : 'app',
    format    : 'iife',
    sourcemap : true,
  },
  plugins : [
    riot(),
    builtIns(),
    scss({
      includePaths : [
        './node_modules',
      ],
      output    : 'public/build/bundle.css',
      sourcemap : true,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser : true,
      dedupe  : ['riot'],
    }),
    commonjs(),
    assets({
      assets : [
        'src/assets',
      ],
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch : {
    clearScreen : false,
  },
};
