module.exports = (grunt) ->
  grunt.file.mkdir "dist/"
  grunt.initConfig
    pkg : grunt.file.readJSON "package.json"

    sass :
      dist :
        files :
          "src/style.css" : "src/style.scss"

    typescript :
      base :
        src  : ["src/**/*.ts", "typings/**/*.d.ts"]
        dest : "src/app.js"
        options :
          target : "es5"

    inline :
      dist :
        options :
          cssmin : true
          uglify : true
        src : ["src/index.html"]
        dest : ["dist/"]

    watch :
      files : ["src/**/*.html", "src/**/*.scss", "src/**/*.ts"]
      tasks : ["default"]

    grunt.loadNpmTasks "grunt-inline"
    grunt.loadNpmTasks "grunt-typescript"
    grunt.loadNpmTasks "grunt-contrib-sass"
    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-contrib-uglify"
    grunt.loadNpmTasks "grunt-contrib-cssmin"

    grunt.registerTask "default", ["typescript", "sass", "inline"]
