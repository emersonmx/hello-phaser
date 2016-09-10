module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                tasks: ['browserify', 'notify:javascript']
            },
            sass: {
                files: 'src/<%= pkg.name %>/sass/**/*.scss',
                tasks: ['sass', 'notify:sass']
            },
            dist: {
                files: [
                    'src/<%= pkg.name %>/assets/**',
                    'src/<%= pkg.name %>/index.html',
                    'node_modules/phaser/build/phaser.min.js',
                    'node_modules/phaser/build/phaser.map'
                ],
                tasks: ['copy', 'notify:copy']
            },
            build: {
                files: 'build/**/*',
                tasks: ['notify:browserSync']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'build/**/*'
                    ]
                },
                options: {
                    watchTask: true,
                    server: 'build/'
                }
            }
        },
        notify: {
            server: {
                options: {
                    message: 'Server is ready!'
                }
            },
            browserSync: {
                options: {
                    message: 'Browser synchronized'
                }
            },
            sass: {
                options: {
                    message: 'Sass build finished'
                }
            },
            javascript: {
                options: {
                    message: 'Javascript build finished'
                }
            },
            copy: {
                options: {
                    message: 'Copying files to "build" finished'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    // Default task(s).
    grunt.registerTask('default', [
        'copy', 'sass', 'browserify', 'browserSync', 'notify:server', 'watch'
    ]);
};
