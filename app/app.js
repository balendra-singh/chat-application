import angular from 'angular'
import 'angular-ui-router'
import AppConfig from 'app.config'
import AppRun from 'app.run'

const app = angular.module('chatApp', ['ui.router'])
  .config(AppConfig)
  .run(AppRun)

angular.element(document).ready(() => {
  return angular.bootstrap(document, [app.name])
})
