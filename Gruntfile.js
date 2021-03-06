// Generated on 2014-08-10 using generator-webapp 0.4.9
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-requirejs');

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jslint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use('/libs', connect.static('./libs')),
              connect.static(config.app)
            ];
          }
        }
      },

      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/libs', connect.static('./libs')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    jslint: {
      client: {
        src: [
          './app/scripts/**/*.js'
        ],
        exclude: [
          './app/scripts/libs/**/*.js',
          './app/scripts/vendor/**/*.js'
        ],
        directives: {
          browser: true,
          strict: false,
          globals: {
            'define': false,
            'require': false,
            'PIXI': true
          },
          indent: 2,
          vars: true,
          nomen: true,
          devel: true,
          jquery: true,
        },
        options: {
          log: './logs/jslint-report.log',
        }
      }
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        includePaths: [
          'libs'
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.scss'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.scss'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    // // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower libs into the HTML file
    bowerInstall: {
      app: {
        src: ['<%= config.app %>/index.html'],
        exclude: ['libs/bootstrap-sass-official/vendor/assets/javascripts/bootstrap.js']
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}']
      }
    },

    // Renames files for browser caching purposes
    // rev: {
    //   dist: {
    //     files: {
    //       src: [
    //         '<%= config.dist %>/scripts/{,*/!(require)}*.js',
    //         '<%= config.dist %>/styles/{,*/}*.css',
    //         '<%= config.dist %>/images/**/*.*',
    //         '<%= config.dist %>/styles/fonts/{,*/}*.*',
    //         '<%= config.dist %>/*.{ico,png}'
    //       ]
    //     }
    //   }
    // },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images/**/*.*',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images/**/*.*',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    cssmin: {
      dist: {
        files: {
          '<%= config.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= config.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/scripts/main.js': [
            '<%= config.app %>/scripts/modules/core/elements/archer.js',
            '<%= config.app %>/scripts/modules/core/elements/arrow.js',
            '<%= config.app %>/scripts/modules/core/elements/map.js',
            '<%= config.app %>/scripts/modules/core/models/archer.js',
            '<%= config.app %>/scripts/modules/core/models/maps/twilightSpire.js',
            '<%= config.app %>/scripts/modules/core/views/archer.js',
            '<%= config.app %>/scripts/modules/core/views/arrow.js',
            '<%= config.app %>/scripts/modules/core/views/maps/twilightSpire.js',
            '<%= config.app %>/scripts/modules/core/utils.js',
            '<%= config.app %>/scripts/modules/core/field.js',
            '<%= config.app %>/scripts/modules/core/game.js',
            '<%= config.app %>/scripts/modules/core/renderers.js',
            '<%= config.app %>/scripts/modules/inputs/keyboardMapper.js',
            '<%= config.app %>/scripts/modules/inputs/keyboardMappings.js',
            '<%= config.app %>/scripts/modules/inputs/virtualGamePad.js',
            '<%= config.app %>/scripts/modules/physics/behaviors.js',
            '<%= config.app %>/scripts/modules/physics/bodies.js',
            '<%= config.app %>/scripts/modules/physics/bounds.js',
            '<%= config.app %>/scripts/modules/physics/worldHelper.js',
            '<%= config.app %>/scripts/modules/pixi/spriteCache.js'
          ]
        }
      }
    },

    concat: {
      dist: {}
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: false,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/**.*',
            'scripts/**.*'
          ]
        }, {
          expand: false,
          cwd: '<%= config.app %>/scripts/libs/requirejs/',
          dest: '<%= config.dist %>/scripts/libs/requirejs/',
          src: ['require.js']
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },
    requirejs: {
      dist: {
        options: {
          wrap: true,
          // *insert almond in all your modules
          almond: false,
          optimize : 'uglify2',
          // *replace require script calls, with the almond modules
          // in the following files
          replaceRequireScript: [{
            files: ['<%= config.dist %>/index.html'],
            module: 'main',
            modulePath: '/scripts/app.min'
          }],
          // "normal" require config
          // *create at least a 'main' module
          // thats necessary for using the almond auto insertion
          modules: [{
            name: 'main'
          }],
          dir: 'dist',
          appDir: '<%= config.app %>/scripts',
          baseUrl: './',
          paths: {
            jquery: './scripts/libs/jquery/dist/jquery',
            underscore: './scripts/libs/underscore/underscore',
            pixi: './scripts/libs/pixi.js/bin/pixi.dev',
            keyboard: './scripts/libs/KeyboardJS/keyboard',
            minivents: './scripts/vendor/allouis-minivents/minivents',
            archerElement: './scripts/modules/core/elements/archer',
            arrowElement: './scripts/modules/core/elements/arrow',
            mapElement: './scripts/modules/core/elements/map',
            quiverModel: './scripts/modules/core/models/quiver',
            archerModels: './scripts/modules/core/models/archer',
            twilightSpireMapModels: './scripts/modules/core/models/maps/twilightSpire',
            quiverView: './scripts/modules/core/views/quiver',
            archerView: './scripts/modules/core/views/archer',
            arrowView: './scripts/modules/core/views/arrow',
            twilightSpireMapView: './scripts/modules/core/views/maps/twilightSpire',
            utils: './scripts/modules/core/utils',
            field: './scripts/modules/core/field',
            game: 'scripts/modules/core/game',
            renderers: './scripts/modules/core/renderers',
            keyboardMapper: 'scripts/modules/inputs/keyboardMapper',
            keyboardMappings: 'scripts/modules/inputs/keyboardMappings',
            virtualGamePad: './scripts/modules/inputs/virtualGamePad',
            behaviors: './scripts/modules/physics/behaviors',
            bodies: './scripts/modules/physics/bodies',
            bounds: './scripts/modules/physics/bounds',
            worldHelper: './scripts/modules/physics/worldHelper',
            spriteCache: 'scripts/modules/pixi/spriteCache'
          }
        }
      }
    }
  });

  grunt.registerTask('default', 'jslint');

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    // 'concat',
    'cssmin',
    'copy:dist',
    'requirejs',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jslint',
    'build'
  ]);
};
