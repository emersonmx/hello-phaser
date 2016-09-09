module.exports = function(grunt) { 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './build/'
                }
            }
        },
        sass: {
            'build/css/<%= pkg.name %>.css': 'src/<%= pkg.name %>/sass/main.scss'
        },
        typescript: {
            base: {
                src: ['src/<%= pkg.name %>/scripts/main.ts'],
                dest: 'build/js/<%= pkg.name %>.js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    references: [
                        './node_modules/phaser/typescript/phaser.d.ts'
                    ]
                }
            }
        },
        copy: {
            sources: {
                cwd: 'src/<%= pkg.name %>',
                src: ['assets/**', 'index.html'],
                dest: 'build/',
                expand: true
            },
            libs: {
                cwd: 'node_modules/phaser/build',
                src: ['phaser.min.js'],
                dest: 'build/js',
                expand: true
            }
        },
        watch: {
            ts: {
                files: 'src/<%= pkg.name %>/scripts/**/*.ts',
                tasks: ['typescript']
            },
            sass: {
                files: 'src/<%= pkg.name %>/sass/**/*.scss',
                tasks: ['sass']
            },
            dist: {
                files: 'src/<%= pkg.name %>/**/*',
                tasks: ['copy']
            }
        },
        open: {
            dev: {
                path: 'http://localhost:8000/index.html'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'sass', 'typescript', 'connect', 'open', 'watch']);

};
