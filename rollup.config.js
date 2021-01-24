import ts  from '@wessberg/rollup-plugin-ts';
import pkg from './package.json';

const banner = `/*! Nason ${pkg.version} MIT | https://github.com/Simonwep/nason */`;

export default {
    input: 'src/index.ts',
    plugins: [
        ts()
    ],
    output: [
        {
            banner,
            file: pkg.module,
            format: 'es',
            sourcemap: true
        },
        {
            banner,
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        }
    ]
};
