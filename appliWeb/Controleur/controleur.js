/**
 * Définition des contrôleurs
 */
var routeAppControllers = angular.module('routeAppControllers', []);

// Contrôleur de la page d'accueil
routeAppControllers.controller('searchCtrl', function($scope, $http, $window){
        $scope.search = function(val) {
        	console.log("héhé" + $scope.input);
        	if(!$scope.input){
        		 $log.log('Impossible de charger le mot');
        	}else{
        		$window.location.href = '#/getDef/'+$scope.input;
        	}

        }
 });

routeAppControllers.controller('homeCtrl', function($scope, $http, $compile, $routeParams){
		
		$scope.hideShow = function(val) {
			var list = document.getElementById("collapse"+val);
			if(list.style.display=='block'){
				list.style.display = 'none';
			}else{
				list.style.display = 'block';
			}
		};

        $scope.getDico = function(val) {
        	var input = null;
        	if(val == null){
        		input = { input : $scope.input }
        	}else{
        		input = {input : val};
        	}
        	console.log(input);
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
				    params: {"data":data,"size": data.length, "input":input["input"]},
				}). 
				success(function(data) {
					console.log(data);
		            var div =  document.getElementById("list");
		           
		            div.innerHTML="";
		            
		            
		            var ul = document.createElement('ul')
		           // ul.setAttribute("class","list-group collapse")
		            ul.setAttribute("id", "side-menu-collapse");
		            for (var i = 0; i <= data.length - 1; i++) {
		            	if(data[i] != null){
			            	var li = document.createElement("li");
			            	var a = document.createElement("a");
			            	a.setAttribute("ng-click", 'getRel('+data[i][0]+')');
			            	
			            	a.setAttribute("id", "'"+data[i][0]+"'");
			            	li.setAttribute("class", "list-group-item");
			            	a.appendChild(document.createTextNode(data[i][1]));
			            	var compiled = $compile(a)($scope);
			            	li.appendChild(a);
			            	ul.appendChild(li);
			            }
		            }
		            div.appendChild(ul);
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
	    	 	console.log(data);
	    	 	var div =  document.getElementById("relations");
	    	 	div.innerHTML = "";
	    	 	for (var i = data.length - 1; i >= 0; i--) {
	    	 		if(typeTraite.indexOf(data[i][0])==-1){
	    	 			var divTitle = document.createElement("div");
	    	 			divTitle.setAttribute("class", "panel-heading");
	    	 			var h4 = document.createElement("h4");
	    	 			h4.setAttribute("class", "panel-title");
	    	 			var a1 = document.createElement("a");
	    	 			a1.appendChild(document.createTextNode(data[i][0]));
	    	 			a1.setAttribute("data-toggle","collapse");
	    	 			a1.setAttribute("data-parent","#accordion");
	    	 			a1.setAttribute("ng-click","hideShow("+data[i][0]+")");
	    	 			var compiled = $compile(a1)($scope);
	    	 			h4.appendChild(a1);
	    	 			divTitle.appendChild(h4);
	    	 			var div1 = document.createElement("div");
	    	 			var div2 = document.createElement("div");
	    	 			div1.setAttribute("id",data[i][0]);
	    	 			div1.setAttribute("class","panel panel-default");
	    	 			div1.appendChild(divTitle);
	    	 			div2.setAttribute("id","collapse"+data[i][0]);
	    	 			div2.setAttribute("class","panel-collapse collapse");
	    	 			//var li = document.createElement("li");
	    	 			var a = document.createElement("a");
				        a.setAttribute("ng-click", 'getRel('+data[i][1]['eid']+')');
				        a.appendChild(document.createTextNode(data[i][1]['n']));
				        var compiled = $compile(a)($scope);
				        //li.appendChild(a);
				        div2.appendChild(a);
				        div2.style.display='none';
				        div1.appendChild(div2);
	    	 			div.appendChild(div1);
	    	 			typeTraite.push(data[i][0]);
	    	 		}
	    	 		else{
	    	 			var div2 = document.getElementById("collapse"+data[i][0]);

	    	 			//var li = document.createElement("li");
	    	 			var a = document.createElement("a");
				        a.setAttribute("ng-click", 'getRel('+data[i][1]['eid']+')');
				        a.appendChild(document.createTextNode(data[i][1]['n']));
				        var compiled = $compile(a)($scope);
				        //li.appendChild(a);
				        div2.appendChild(document.createTextNode(" , "));
				        div2.appendChild(a);
				        if(div2.style.display=='block') { 
				            div2.style.display='none'; 
				        } 
	    	 		}
	    	 	}
	    	$('#relations').children('div').each(function () {
	    		console.log($(this).attr("id"));
	    		var i =0;
	    		var id = [];
	    		id[i] = $(this).attr("id");
	    		 i++; var j = 0;
			   $http({
			    url: "/getRelName",
			    method: "POST",
			    params: {"rtid": $(this).attr("id")},
			    }).
			   success(function(n) {
			   		console.log(n);
			   		var target = document.getElementById(id[j]).firstChild.firstChild.firstChild;
			   		console.log(target);
			   		target.innerHTML=n;			   		
			   		j++;
	    	 	})
			});
	    })
 	}
 	if($routeParams.n != null){
			$scope.getDico($routeParams.n);
		}

	}
);

