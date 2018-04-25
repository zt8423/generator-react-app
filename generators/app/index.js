'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`欢迎使用 ${chalk.red('react+react-router+webpack脚手架')} 生成工具!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'Title',
        message: '请输入工程标题',
        default: 'react-app'
      },
      {
        type: 'input',
        name: 'WebProjectName',
        message: '请输入工程目录名',
        default: 'react-app'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        Title: this.props.Title,
        WebProjectName: this.props.WebProjectName
      }
    );
    this.fs.copyTpl(
      this.templatePath('webpack.dev.config.js'),
      this.destinationPath('webpack.dev.config.js'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath('webpack.prod.config.js'),
      this.destinationPath('webpack.prod.config.js'),
      {
        Title: this.props.Title,
        WebProjectName: this.props.WebProjectName
      }
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {}
    );
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
    this.fs.copy(this.templatePath('config'), this.destinationPath('config'));
    this.fs.copy(this.templatePath('dev'), this.destinationPath('dev'));
    this.fs.copyTpl(
      this.templatePath('config/config.js'),
      this.destinationPath('config/config.js'),
      {
        Title: this.props.Title,
        WebProjectName: this.props.WebProjectName
      }
    );
    this.fs.copyTpl(
      this.templatePath('dev/index.html'),
      this.destinationPath('dev/index.html'),
      {
        Title: this.props.Title,
        WebProjectName: this.props.WebProjectName
      }
    );
  }

  install() {
    this.installDependencies();
  }
};
