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
            index: {
                src: 'src/<%= pkg.name %>/index.html',
                dest: 'build/index.html',
                expand: false
            },
            assets: {
                cwd: 'src/<%= pkg.name %>',
                src: 'assets/**',
                dest: 'build/',
                expand: true
            },
            phaser: {
                src: './node_modules/phaser/build/phaser.min.js',
                dest: 'build/js/phaser.min.js',
                expand: false
            },
            phasermap: {
                src: './node_modules/phaser/build/phaser.map',
                dest: 'build/js/phaser.map',
                expand: false
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
