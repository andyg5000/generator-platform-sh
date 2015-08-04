'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  message: function() {
    this.log(chalk.red('Please run \"yo platform-sh:drupal7\"'));
  }
});
