// js/script.js
'use strict';

/**
 * Déclaration de l'application routeApp
 */
var routeApp = angular.module('routeApp', [
    // Dépendances du "module"
    'ngRoute',
    'routeAppControllers',
    
]);

/**
 * Configuration du module principal : routeApp
 */
routeApp.config(['$routeProvider',
    function($routeProvider) { 
        
        // Système de routage
        $routeProvider
        .when('/', {
            templateUrl: 'Vue/definition.html',
            controller: 'homeCtrl'
        })
        .when('/home', {
            templateUrl: 'Vue/home.html',
            controller: 'homeCtrl'
        })
        .when('/getDef/:eid', {
            templateUrl: 'Vue/definition.html',
            controller: 'homeCtrl'
        })
   
     	/*.otherwise({
     		redirectTo:'/home'
     	})*/
    }
]);



