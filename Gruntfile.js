'use strict';

module.exports = function(grunt) {

    // Grunt Loaded Tasks
    // http://chrisawren.com/posts/Advanced-Grunt-tooling
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Grunt Config
    grunt.initConfig({

        // JSON Grunt Package
        pkg: grunt.file.readJSON('package.json'),

        // Global Project Config
        project: {
            img: 'assets/images',
            js: "assets/javascripts",
            css: "assets/stylesheets/css",
            sass: "assets/stylesheets/sass"
        },

        // Grunt Meta Banner
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>'+
                'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
                ' Licensed <%= pkg.licenses %> */\n'
        },

        // Grunt Dev Update
        // https://npmjs.org/package/grunt-dev-update
        // http://pgilad.github.io/grunt-dev-update
        devUpdate: {
            main: {
                options: {
                    // Report updated dependencies? 'false' | 'true'
                    reportUpdated: false,
                    // 'force'|'report'|'prompt'
                    updateType: "force"
                }
            }
        },

        // Watch Task
        // List watch tasks: 'grunt -v'
        watch: {
            options: {
                livereload: true
            },

            html: {
                files: [
                    '**/*.html',
                    '**/*.php',
                    '<%= project.img %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },

            scss: {
                files: ['<%= project.sass %>/*.scss', '<%= project.sass %>/**/*.scss'],
                tasks: ['compass:watch']
            },

            css: {
                files: ['<%= project.css %>/*.css']
            },

            js: {
                files: ['<%= project.js %>/**/*.js']
            },

            livereload: {
                files: [
                    '**/*.html',
                    '**/*.php',
                    '<%= project.css %>/**/*.css',
                    '<%= project.js %>/**/*.js',
                    '<%= project.img %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // Compass Config
        compass: {
            prod: {
                options: {
                    config: 'config.rb',
                    environment: 'production',
                    force: true
                }
            },
            watch: {
                options: {
                    config: 'config.rb',
                    environment: 'development'
                }
            }
        },

        // Grunt Imagemin
        // http://integralist.co.uk/Grunt-Boilerplate.html
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7,
                    cache: false // https://github.com/gruntjs/grunt-contrib-imagemin/issues/140
                },

                files: [{
                    expand: true,
                    cwd: '<%= project.img %>', // cwd is 'current working directory'
                    src: ['**/*.png'],
                    dest: '<%= project.img %>',
                    ext: '.png'
                }]
            },

            jpg: {
                options: {
                    progressive: true,
                    cache: false // https://github.com/gruntjs/grunt-contrib-imagemin/issues/140
                },

                files: [{
                    expand: true,
                    cwd: '<%= project.img %>', // cwd is 'current working directory'
                    src: ['**/*.jpg'],
                    dest: '<%= project.img %>',
                    ext: '.jpg'
                }]
            }
        },

        // JSHint
        jshint: {
            files: ['js/**/*.js'],

            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            },

            uses_defaults: ['js/**/*.js']
        },

        // Concatenation
        concat: {
            options: {
                stripBanners: false,
                banner: '<%= meta.banner %>',
                separator: ';'
            },

            // Allows for multiple files
            basic_and_extras: {
                files: {
                    // Destiniation 'string' : Source [array]
                    '<%= project.js %>/minified/main.min.js': [
                        '<%= project.js %>/app.js'
                    ]
                }
            }
        },

        // Uglify/Minification
        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                sourceMap: '<%= project.js %>/map/source-map-main.js.map'
            },

            my_target: {
                files: {
                    // Destiniation 'string' : Source [array]
                    '<%= project.js %>/minified/main.min.js': ['<%= project.js %>/minified/main.min.js']
                }
            }
        },

        // Grunt htmlmin
        // https://github.com/gruntjs/grunt-contrib-htmlmin
        htmlmin: {
            dist: {
                options: {
                    removeComments: false,
                    collapseWhitespace: false
                },

                files: {
                    // Destiniation 'string' : Source [array]
                    'index.html': ['index.html']
                }
            }
        },

    });


    // Development Tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('hint', ['jshint']);

    // Build Tasks
    grunt.registerTask('imgmin', ['imagemin']);

    grunt.registerTask('build', [
        'compass:prod',
        'concat',
        'uglify'
    ]);

    // Maintenance
    grunt.registerTask('update', ['devUpdate']);
};
