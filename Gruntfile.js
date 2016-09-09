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
        browserify: {
            dist: {
                options: {
                    transform: [[
                        'babelify', { presets: ['es2015'] }
                    ]]
                },
                files: {
                    'build/js/<%= pkg.name %>.js': 'src/<%= pkg.name %>/js/main.js'
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
            phaser: {
                cwd: './node_modules/phaser/build/',
                src: ['phaser.min.js', 'phaser.map'],
                dest: 'build/js/',
                expand: true
            }
        },
        watch: {
            js: {
                files: 'src/<%= pkg.name %>/js/**/*.js',
                tasks: ['browserify']
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
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'sass', 'browserify', 'connect', 'open', 'watch']);

};
