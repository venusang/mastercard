# generate file name sfor compiled production assets
nowStamp = Date.now()
productionAssetNames =
  css: "application-#{nowStamp}.css"
  js: "application-#{nowStamp}.js"

# generate file configurations for asset compilation tasks
minifyFiles = {}
uglifyFiles = {}
minifyFiles["public/#{productionAssetNames.css}"] = ['public/application.css']
uglifyFiles["public/#{productionAssetNames.js}"] = ['public/application.js']

module.exports = (grunt) ->
  # load package JSON
  pkg = grunt.file.readJSON 'package.json'
  
  # initialize grunt
  grunt.initConfig
    pkg: pkg
    clean:
      javascripts: ['app/assets/javascripts/app/**/*.js', 'app/assets/javascripts/sdk/*.js']
      stylesheets: ['app/assets/stylesheets/all.css', 'app/assets/stylesheets/app/styles.css']
    copy:
      images:
        expand: true
        cwd: 'app/assets/images/'
        src: ['**']
        dest: 'public/'
    sass:
      css:
        options:
          compass: true
          require: ['compass', 'bootstrap-sass']
        files:
          'app/assets/stylesheets/all.css': ['app/assets/stylesheets/app/styles.sass', 'custom/stylesheets/**/*.sass']
    coffee:
      app:
        expand: true
        cwd: 'app/assets/javascripts/'
        src: ['**/*.coffee']
        dest: 'app/assets/javascripts/'
        ext: '.js'
      custom:
        expand: true
        src: ['custom/javascripts/**/*.coffee']
        ext: '.js'
    concat:
      css:
        src: [
          'app/assets/stylesheets/all.css'
          'custom/stylesheets/**/*.css'
        ]
        dest: 'public/application.css'
      js:
        src: [
          # libraries
          #'app/assets/javascripts/lib/jquery/jquery-1.10.2.js'
          'node_modules/jquery/dist/jquery.js'
          'node_modules/backbone/node_modules/underscore/underscore.js'
          'node_modules/backbone/backbone.js'
          'node_modules/twitter-bootstrap-3.0.0/js/transition.js'
          'node_modules/twitter-bootstrap-3.0.0/js/collapse.js'
          'node_modules/twitter-bootstrap-3.0.0/js/modal.js'
          'node_modules/twitter-bootstrap-3.0.0/js/dropdown.js'
          'node_modules/twitter-bootstrap-3.0.0/js/tooltip.js'
          'node_modules/twitter-bootstrap-3.0.0/js/popover.js'
          'app/assets/javascripts/sdk/ap_sdk.js'
          # ap / application
          'app/assets/javascripts/app/ap/*.js'
          'app/assets/javascripts/app/application/*.js'
          # profiles
          'app/assets/javascripts/app/profile/Profile.js'
          'app/assets/javascripts/app/profile/component/*.js'
          # routers
          'app/assets/javascripts/app/router/Router.js'
          # environment
          'app/assets/javascripts/app/environment/Environment.js'
          'app/assets/javascripts/app/environment/component/*.js'
          # controllers
          'app/assets/javascripts/app/controller/Controller.js'
          'app/assets/javascripts/app/controller/component/*.js'
          # views
          'app/assets/javascripts/app/view/View.js'
          'app/assets/javascripts/app/view/Page.js'
          'app/assets/javascripts/app/view/NavPage.js'
          'app/assets/javascripts/app/view/Panel.js'
          'app/assets/javascripts/app/view/PanelGroup.js'
          'app/assets/javascripts/app/view/Button.js'
          'app/assets/javascripts/app/view/Content.js'
          'app/assets/javascripts/app/view/Table.js'
          'app/assets/javascripts/app/view/TableRow.js'
          'app/assets/javascripts/app/view/DataTable.js'
          'app/assets/javascripts/app/view/DataViewItem.js'
          'app/assets/javascripts/app/view/DataView.js'
          'app/assets/javascripts/app/view/Form.js'
          'app/assets/javascripts/app/view/Fieldset.js'
          'app/assets/javascripts/app/view/Field.js'
          'app/assets/javascripts/app/view/Option.js'
          'app/assets/javascripts/app/view/SelectField.js'
          'app/assets/javascripts/app/view/ModelForm.js'
          'app/assets/javascripts/app/view/ModelFormPage.js'
          'app/assets/javascripts/app/view/RecordTable.js'
          'app/assets/javascripts/app/view/RecordTablePage.js'
          'app/assets/javascripts/app/view/MessagePage.js'
          'app/assets/javascripts/app/view/Viewport.js'
          'app/assets/javascripts/app/view/component/*.js'
          # custom
          'custom/javascripts/**/*.js'
          # app init
          'app/assets/javascripts/app/init/*.js'
        ]
        dest: 'public/application.js'
    cssmin:
      app:
        files: minifyFiles
    uglify:
      app:
        files: uglifyFiles
    compress:
      css:
        options:
          mode: 'gzip'
        expand: true
        src: ["public/#{productionAssetNames.css}"]
        ext: '.css.gzip'
      js:
        options:
          mode: 'gzip'
        expand: true
        src: ["public/#{productionAssetNames.js}"]
        ext: '.js.gzip'
    template:
      app:
        src: 'templates/index.html.mustache'
        dest: 'public/index.html'
        variables:
          title: pkg.name
          css: productionAssetNames.css
          js: productionAssetNames.js
      s3:
        src: 'templates/index.s3.html.mustache'
        dest: 'public/index.s3.html'
        variables:
          title: pkg.name
          css: productionAssetNames.css
          js: productionAssetNames.js
    watch:
      sass:
        files: ['app/assets/stylesheets/**/*.sass', 'custom/stylesheets/**/*.sass']
        tasks: ['compile-css', 'clean']
      coffee:
        files: ['app/assets/javascripts/**/*.coffee', 'custom/javascripts/**/*.coffee']
        tasks: ['compile-js', 'clean']
  
  # load required grunt tasks
  grunt.loadNpmTasks 'grunt-templater'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  
  # define custom tasks
  grunt.registerTask 'compile-css', ['sass', 'concat:css']
  grunt.registerTask 'compile-js', ['coffee', 'concat:js']
  grunt.registerTask 'compile', ['clean', 'compile-css', 'compile-js']
  grunt.registerTask 'build', ['compile', 'cssmin', 'uglify', 'compress', 'template']
