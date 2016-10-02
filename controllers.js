'use strict';

angular.module('myportalApp')


.controller('UserTemplateController', ['$scope', 'sampleTemplateFactory', 'userTemplateFactory', 'AuthFactory', 
					function ($scope, sampleTemplateFactory, userTemplateFactory, AuthFactory) {
	
		  // Load user defined templates; if they do not exist; then load the sample templates;
	
		$scope.tempattribute = {
        fieldname: "",
        datatype: ""
    };
    
    // need to have this return just the users templates or databases.
    $scope.username = AuthFactory.getUsername();
    //		alert($scope.username);
    
		userTemplateFactory.query(
        function (response) {
           $scope.mytemplates = response; 
            
        },
        function (response) {
           $scope.mytemplates = sampleTemplateFactory.query();
        });
        
        
        $scope.addAttributeField = function () {
        	     	
        
    		};
    		
		


}])

.controller('UserDatabaseController', ['$scope', 'userDatabaseFactory', function ($scope, userDatabaseFactory) {
	
		userDatabaseFactory.query(
        function (response) {
           $scope.mydatabases = response; 
            
        },function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
        });
       
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', 'sampleTemplateFactory', 'userTemplateFactory',
					function ($scope, $state, $rootScope, ngDialog, AuthFactory, sampleTemplateFactory, userTemplateFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
      
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])
;