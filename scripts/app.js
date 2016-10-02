'use strict';

angular.module('myportalApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
            
            // route for user templates page
            .state('app.mytemplates', {
                url:'mytemplates',
                views: {
                    'content@': {
                        templateUrl : 'views/mytemplates.html',
                        controller  : 'UserTemplateController'                  
                    }
                }
            })
             // route for user databases page
            .state('app.mydatabases', {
                url:'mydatabases',
                views: {
                    'content@': {
                        templateUrl : 'views/mydatabases.html',
                        controller  : 'UserDatabaseController'                  
                    }
                }
            })
        
            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',                 
                    }
                }
            })


            // route for the dishdetail page
           // .state('app.dishdetails', {
           //     url: 'menu/:id',
           //     views: {
           //         'content@': {
           //             templateUrl : 'views/dishdetail.html',
           //             controller  : 'DishDetailController'
           //        }
           //     }
           // });
           //
        $urlRouterProvider.otherwise('/');
    })
;
