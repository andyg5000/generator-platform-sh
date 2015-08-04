# Platform.sh Yeoman Generator

A yeoman generator that scafolds a Platform.sh repository directory. Currently includes a Drupal 7 drush make based project based on https://github.com/platformsh/platformsh-examples/tree/drupal/7.x

## Usage

#### Starting a new project?

If you're starting a new project, you may want to initialize it with platform get [project_id] so that the project folder contains the structure for working locally. If you go that route, skip to "Already ran platform get [project_id]".

* Change into the directory for your git repository
* Run yo platform-sh:drupal7
* Answer the prompts for disk space, mysql, solr, and redis
* Git add all of the created directories files
* Git commit the new assets
* Add the appropriate git remote for your project
* Git push the branch to your Platform.sh environment

#### Already ran platform get [project_id]?

* Change into your projects repository directory
* Remove all visible and hidden files except the .git and .gitignore
* Run yo platform-sh:drupal7
* Answer the prompts for disk space, mysql, solr, and redis
* Git add all of the created directories files
* Git commit the new assets
* Git push the branch to your Platform.sh environment
