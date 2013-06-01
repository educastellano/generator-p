'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PGenerator = module.exports = function PGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PGenerator, yeoman.generators.Base);

PGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  console.log(welcome);

  var prompts = [
//      {
//    name: 'someOption',
//    message: 'Would you like to enable this option?',
//    default: 'Y/n',
//    warning: 'Yes: Enabling this will be totally awesome!'
//  },
      {
          name: 'persist',
          message: 'What persistence strategy will you use by default? [REST/LocalStorage/Firebase]',
          default: 'REST'
      }
  ];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

//    this.someOption = (/y/i).test(props.someOption);
//      this.someOption = 'y' === 'y'.trim();
      this.persist = props.persist;
      this.routing = (/y/i).test(props.routing);

    cb();
  }.bind(this));
};

PGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/model');
  this.mkdir('app/view');

  this.template('app/__init__.js', 'app/__init__.js');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

PGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
