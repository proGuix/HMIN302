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
            templateUrl: 'vue/home.html',
            controller: 'searchCtrl'
        })
        .when('/home', {
            templateUrl: 'vue/home.html',
            controller: 'searchCtrl'
        })
        .when('/getDef/:n', {
            templateUrl: 'vue/definition.html',
            controller: 'homeCtrl'
        })
   
     	/*.otherwise({
     		redirectTo:'/home'
     	})*/
    }
]);



