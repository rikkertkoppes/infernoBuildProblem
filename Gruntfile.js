module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        ts: {
            front: {
                src: ['src/**/*.ts', '!src/**/*.d.ts'],
                outDir: 'dist',
                options: {
                    module: 'commonjs', //or commonjs
                    target: 'es5', //or es3
                    // basePath: 'path/to/typescript/files',
                    sourceMap: true,
                    comments: true
                    // declaration: true
                }
            }
        },
        webpack: {
            dev: {
                entry: "./dist/main.js",
                devtool: "source-map",
                //angularjs is in global scope
                externals: [{
                    'angular': true
                }],
                output: {
                    path: "js/",
                    filename: "packed.js"
                },
                //use ts sourcemaps
                module: {
                    rules: [{
                        test: /\.js$/,
                        loader: "source-map-loader",
                        enforce: 'pre'
                    }]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-webpack');

    // Default task(s).
    grunt.registerTask('default', ['ts', 'webpack']);
};