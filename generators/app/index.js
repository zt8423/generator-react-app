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
      },
      {
        type: 'list',
        name: 'PlatForm',
        message: '请选择要生成的脚手架使用平台',
        choices: ['PC', 'Mobile']
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.platform = this.props.PlatForm;
    this.fs.copyTpl(
      this.templatePath(this.platform + '/package.json'),
      this.destinationPath('package.json'),
      {
        Title: this.props.Title
      }
    );
    this.fs.copyTpl(
      this.templatePath(this.platform + '/webpack.dev.config.js'),
      this.destinationPath('webpack.dev.config.js'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath(this.platform + '/webpack.prod.config.js'),
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
    this.fs.copy(this.templatePath(this.platform + '/src'), this.destinationPath('src'));
    this.fs.copy(
      this.templatePath(this.platform + '/config'),
      this.destinationPath('config')
    );
    this.fs.copy(this.templatePath(this.platform + '/dev'), this.destinationPath('dev'));
    this.fs.copyTpl(
      this.templatePath(this.platform + '/config/config.js'),
      this.destinationPath('config/config.js'),
      {
        WebProjectName: this.props.WebProjectName
      }
    );
    this.fs.copyTpl(
      this.templatePath(this.platform + '/dev/index.html'),
      this.destinationPath('dev/index.html'),
      {
        Title: this.props.Title
      }
    );
    if (this.platform === 'Mobile') {
      this.fs.copy(
        this.templatePath(this.platform + '/template'),
        this.destinationPath('template')
      );
      this.fs.copyTpl(
        this.templatePath(this.platform + '/template/index.html'),
        this.destinationPath('template/index.html'),
        {
          Title: this.props.Title
        }
      );
    }
  }

  install() {
    this.installDependencies();
  }
};
