/**
 * Définition des contrôleurs
 */
var routeAppControllers = angular.module('routeAppControllers', []);

// Contrôleur de la page d'accueil
routeAppControllers.controller('homeCtrl', function($scope, $http, $compile){
        $scope.getDico = function(val) {
        	var input = null;
        	if(val == null){
        		input = { input : $scope.input }
        	}else{
        		input = val;
        	}
        	console.log("post");
	         $http({
		    url: "/getDico",
		    method: "POST",
		    params: input,
		    }).
	        success(function(data) {
		        $http({
			    url: "/getDico",
			    method: "POST",
			    params: input,
			    }).
		        success(function(data) {
	            console.log("posted successfully ");
	            console.log(data);
	          	$http({
				    url: "/getTrad",
				    method: "POST",
				    params: {"data":data,"size": data.length, "input":$scope.input},
				}). 
				success(function(data) {
					console.log(data);
		            var div =  document.getElementById("list");
		           
		            div.innerHTML="";
		            var div1 = document.createElement("div");
		            div1.setAttribute("class","list-group")
		            //ul.setAttribute("class", "source");
		            for (var i = 0; i <= data.length - 1; i++) {
		            	if(data[i] != null){
			            	//var li = document.createElement("li");
			            	var a = document.createElement("a");
			            	a.setAttribute("ng-click", 'getRel('+data[i][0]+')');
			            	//a.setAttribute("ng-href","#here");
			            	a.setAttribute("id", "'"+data[i][0]+"'");
			            	a.setAttribute("class", "list-group-item");
			            	a.appendChild(document.createTextNode(data[i][1]));
			            	var compiled = $compile(a)($scope);
			            	div1.appendChild(a);
			            	//ul.appendChild(li);
			            }
		            }
		            div.appendChild(div1);
		           /* for (var i = data.length - 1; i >= 0; i--) {
		            	var el =angular.element(data[i]['eid']);
	 					el.attr('ng-click', 'getDico('+data[i]['n']+')');	
		            }*/
		        }).error(function(data) {
            	console.error("error in posting");
        		})     
	        }).error(function(data) {
            console.error("error in posting");
        	})
    	})
    };
    $scope.getRel= function(eid){
 		$http({
		    url: "/getRel",
		    method: "POST",
		    params: {"eid":eid},
		    }).
	    	success(function(data) {
	    	 	var typeTraite = [];
	    	 	for (var i = data.length - 1; i >= 0; i--) {
	    	 		if(typeTraite.indexOf(data[i][0])==-1){
	    	 			var div =  document.getElementById("relations");

	    	 			var p = document.createElement("p");
	    	 			p.appendChild(document.createTextNode(data[i][0]));
	    	 			var div1 = document.createElement("div");
	    	 			div1.setAttribute("id",data[i][0]);
	    	 			div1.setAttribute("class","rels");
	    	 			div1.appendChild(p);
	    	 			//var li = document.createElement("li");
	    	 			var a = document.createElement("a");
				        a.setAttribute("href", '#/getDef/'+data[i][0]);
				        a.appendChild(document.createTextNode(data[i][1]));
				        //li.appendChild(a);
				        div1.appendChild(a);
	    	 			div.appendChild(div1);
	    	 			typeTraite.push(data[i][0]);
	    	 		}
	    	 		else{
	    	 			var div1 = document.getElementById(data[i][0]);
	    	 			//var li = document.createElement("li");
	    	 			var a = document.createElement("a");
				        a.setAttribute("href", '#/getDef/'+data[i][0]);
				        a.appendChild(document.createTextNode(data[i][1]));
				        //li.appendChild(a);
				        div1.appendChild(document.createTextNode(" , "));
				        div1.appendChild(a);
	    	 		}
	    	 	}
	    })
 	}


	}
);

