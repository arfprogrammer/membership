var assert = require('assert');
var db = require('secondthought');

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['lib/**/*js', 'models/**/*js']
        },
        watch: {
            files: ['lib/**/*js', 'models/**/*js'],
            tasks: ['jshint']
        }
    });

    grunt.registerTask('installDb', function () {
        var done = this.async();
        db.connect({db: 'membership'}, function (err, db) {
            db.install(['users', 'logs', 'sessions'], function (err, tableResult) {
                assert.ok(err === null, err);
                console.log('DB Installed: ' + tableResult);
                done();
            });
        });
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-coffee");
}