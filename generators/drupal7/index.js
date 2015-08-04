'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  tab: '    ',

  setupProject: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Plaform.sh') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'drupalCore',
        message: 'What version of Drupal core do you want to use?',
        default: '7.38'
      },
      {
        type: 'input',
        name: 'diskSize',
        message: 'How much disk space in MB should your project have?',
        default: '5120'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.drupalCore = props.drupalCore;
      this.projectName = props.projectName;
      this.diskSize = props.diskSize;
      done();
    }.bind(this));
  },

  setupMysql: function() {
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'enableMysql',
      message: 'Would you like to enable MySQL?',
      default: true
    }, function(props) {
      this.enableMysql = props.enableMysql;
      if (!this.enableMysql) {
        done();
      }
      else {
        this.prompt({
          type: 'input',
          name: 'mysqlDisk',
          message: 'Enter the size of the MySQL dataset',
          default: 1024
        },function(props) {
          this.mysqlDisk = props.mysqlDisk;
          done();
        }.bind(this));
      }
    }.bind(this));
  },

  setupSolr: function() {
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'enableSolr',
      message: 'Would you like to enable SOLR?',
      default: true
    }, function(props) {
      this.enableSolr = props.enableSolr;
      if (!this.enableSolr) {
        done();
      }
      else {
        this.prompt({
          type: 'input',
          name: 'solrDisk',
          message: 'Enter the size of the SOLR dataset',
          default: 1024
        },function(props) {
          this.solrDisk = props.solrDisk;
          done();
        }.bind(this));
      }
    }.bind(this));
  },

  setupRedis: function() {
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'enableRedis',
      message: 'Would you like to enable Redis?',
      default: true
    }, function(props) {
      this.enableRedis = props.enableRedis;
      if (!this.enableRedis) {
        done();
      }
      else {
        this.prompt({
          type: 'input',
          name: 'redisDisk',
          message: 'Enter the size of the Redis dataset',
          default: 1024
        },function(props) {
          this.redisDisk = props.redisDisk;
          done();
        }.bind(this));
      }
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
      this.fs.copy(
        this.templatePath('libraries'),
        this.destinationPath('libraries')
      );
      this.fs.copy(
        this.templatePath('modules'),
        this.destinationPath('modules')
      );
      this.fs.copy(
        this.templatePath('themes'),
        this.destinationPath('themes')
      );
      this.fs.copyTpl(
        this.templatePath('project.make'),
        this.destinationPath('project.make'),
        { drupalCore: this.drupalCore }
      );
      this.fs.copyTpl(
        this.templatePath('.platform.app.yaml'),
        this.destinationPath('.platform.app.yaml'),
        {
          diskSize : this.diskSize,
          relationships: this._getRelationships()
        }
      );
      this.fs.copyTpl(
        this.templatePath('.platform/services.yaml'),
        this.destinationPath('.platform/services.yaml'),
        { services: this._getServices() }
      );
      this.fs.copy(
        this.templatePath('.platform/routes.yaml'),
        this.destinationPath('.platform/routes.yaml')
      );
    }
  },

  install: function () {
    this.log('Your platform project is ready!');
  },

  _getRelationships: function() {
    var relationships = 'relationships:\n';
    if (this.enableMysql) {
      relationships += this.tab + 'database: "mysql:mysql"\n';
    }
    if (this.enableSolr) {
      relationships += this.tab + 'solr: "solr:solr"\n';
    }
    if (this.enableRedis) {
      relationships += this.tab + 'redis: "redis:redis"\n';
    }
    return relationships;
  },

  _getServices: function() {
    var services = '';

    if (this.enableMysql) {
      services += '\nmysql:\n';
      services += this.tab + 'type: mysql\n';
      services += this.tab + 'disk: ' + this.mysqlDisk + '\n';
    }

    if (this.enableSolr) {
      services += '\nsolr:\n';
      services += this.tab + 'type: solr\n';
      services += this.tab + 'disk: ' + this.solrDisk + '\n';
    }

    if (this.enableRedis) {
      services += '\nredis:\n';
      services += this.tab + 'type: redis\n';
      services += this.tab + 'disk: ' + this.redisDisk + '\n';
    }

    return services;
  }
});
