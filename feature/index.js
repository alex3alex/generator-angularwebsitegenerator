'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var glob = require("glob"),
  path = require("path"),
  fs = require("fs");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.splice = function (index,
                                    howManyToDelete,
                                    stringToInsert /* [, ... N-1, N] */) {

  // Create a character array out of the current string
  // by splitting it. In the context of this prototype
  // method, THIS refers to the current string value
  // being spliced.
  var characterArray = this.split("");

  // Now, let's splice the given strings (stringToInsert)
  // into this character array. It won't matter that we
  // are mix-n-matching character data and string data as
  // it will utlimately be joined back into one value.
  //
  // NOTE: Because splice() mutates the actual array (and
  // returns the removed values), we need to apply it to
  // an existing array to which we have an existing
  // reference.
  Array.prototype.splice.apply(
    characterArray,
    arguments
  );

  // To return the new string, join the character array
  // back into a single string value.
  return (
    characterArray.join("")
  );

};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.yeoman = {};
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the extraordinary ' + chalk.red('WebsiteGenerator') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'module',
        message: 'Module name?',
        default: 'app.home.myNewFeature'
      },
      {
        type: 'input',
        name: 'feature',
        message: 'Feature name in camelCase?',
        default: 'myNewFeature'
      },
      {
        type: 'input',
        name: 'state',
        message: 'Routing state?',
        default: 'home.myNewFeature'
      },
      {
        type: 'input',
        name: 'url',
        message: 'Routing url?',
        default: '/mynewfeature'
      },
      {
        type: 'input',
        name: 'outputDir',
        message: 'Output path?',
        default: 'app/home/myNewFeature'
      }
    ];

    // Y:\gentest>node --debug "C:\Users\bwessels\AppData\Roaming\npm\node_modules\yo\lib\cli.js" websitegenerator

    this.prompt(prompts, function (choices) {
      this.yeoman.choices = choices;
      this.yeoman.choices.Feature = capitalizeFirstLetter(this.yeoman.choices.feature);
      // To access props later use this.yeoman.choices.someOption;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      //this.directory('.', 'client/' + this.yeoman.choices.outputDir);
      var outdir = 'client/' + this.yeoman.choices.outputDir + '/' + this.yeoman.choices.feature;
      this.copy(this.templatePath('feature.config.js'), this.destinationPath(outdir + '.config.js'));
      this.copy(this.templatePath('feature.controller.js'), this.destinationPath(outdir + '.controller.js'));
      this.copy(this.templatePath('feature.controller.spec.js'), this.destinationPath(outdir + '.controller.spec.js'));
      this.copy(this.templatePath('feature.data.service.js'), this.destinationPath(outdir + '.data.service.js'));
      this.copy(this.templatePath('feature.fraedom.less'), this.destinationPath(outdir + '.fraedom.less'));
      this.copy(this.templatePath('feature.html'), this.destinationPath(outdir + '.html'));
      this.copy(this.templatePath('feature.less'), this.destinationPath(outdir + '.less'));
      this.copy(this.templatePath('feature.module.js'), this.destinationPath(outdir + '.module.js'));
      this.copy(this.templatePath('feature.route.js'), this.destinationPath(outdir + '.route.js'));
      //
      var module = this.yeoman.choices.module;
      this.fs.copy('client/app/app.module.js', 'client/app/app.module.js', {
        process: function (contents) {
          /* any modification goes here. note that contents is a Buffer object */
          var newContent = "" + contents.toString() + "";
          var index = newContent.indexOf('// yeoman:inject:feature');
          while (newContent[index] !== '\'') {
            index--;
          }
          return newContent.splice(index + 1, 0, ',\n      \'' + module + '\'');
        }
      });
    }
  }

  //install: function () {
  //  //
  //  var outpath = this.destinationPath('client/' + this.yeoman.choices.outputDir);
  //  var feature = this.yeoman.choices.feature;
  //  glob(outpath + "/*.*", function (err, files) {
  //    var processed = 0;
  //    files.forEach(function (file) {
  //      var dir = path.dirname(file);
  //      var filename = path.basename(file).replace('feature', feature);
  //      fs.renameSync(file, dir + "/" + filename);
  //      processed++;
  //    });
  //    console.log(processed + " files processed");
  //  });
  //}
});

