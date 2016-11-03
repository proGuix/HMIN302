/**
 * Définition des contrôleurs
 */
var routeAppControllers = angular.module('routeAppControllers', []);

// Contrôleur de la page d'accueil
routeAppControllers.controller('searchCtrl', function($scope, $http, $window){
        $scope.search = function(val) {
        	if(!$scope.input){
        		 $log.log('Impossible de charger le mot');
        	}else{
        		$window.location.href = '#/getDef/'+$scope.input;
        	}

        }
 });

routeAppControllers.controller('homeCtrl', function($scope, $http, $compile, $routeParams){
		$scope.showHide = function(val){
			var list = null;
			if(val == 'domaines'){
				 list = document.getElementById('relations');
			}else if(val == 'plus'){
				list = document.getElementById('plus');
			}else{
				list = document.getElementById('collapseOne');
			}
			if($('#'+val).parent().find(".glyphicon-plus").length != 0){

				$('#'+val).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
				list.style.display = 'block';

			}else{
				$('#'+val).find(".glyphicon-minus").removeClass("glyphicon-minus");
				$('#'+val).find('span').addClass("glyphicon-plus");
				list.style.display = 'none';
			}
		
		}
		
		$scope.hideShow = function(val,eid) {
			var list = document.getElementById("collapse"+val);
			console.log(val);
			if (!list.firstChild) {
				$http({
				    url: "/getRelElem",
				    method: "POST",
				    params: {"type":val,"eid": eid},
				}). 
				success(function(data) {
					console.log(data);
					for (var i = data.length - 1; i >= 0; i--) {
						var a = document.createElement("a");
						a.setAttribute("ng-click", 'getRel('+data[i]['eid']+')');
						if (list.firstChild) {
							a.appendChild(document.createTextNode(", "+data[i]['n']));
						} else{
							a.appendChild(document.createTextNode(data[i]['n']));
						}
						var compiled = $compile(a)($scope);
						list.appendChild(a);
						
					}
					
				})
			}
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
	          	$http({
				    url: "/getTrad",
				    method: "POST",
				    params: {"data":data,"size": data.length, "input":input["input"]},
				}). 
				success(function(data) {
		            var tbody =  document.getElementById("collapseOne");
		            tbody.innerHTML="";
		           // ul.setAttribute("class","list-group collapse")
		            
		            for (var i = 0; i <= data.length - 1; i++) {
		            	if(data[i] != null){
		            		var tr = document.createElement("tr");
			            	var td = document.createElement("td");
			            	var a = document.createElement("a");
			            	a.setAttribute("ng-click", 'getRel('+data[i][0]+' , "'+data[i][1]+'")');
			            	a.setAttribute("id", data[i][0]);
			            	a.appendChild(document.createTextNode(data[i][1]));
			            	var compiled = $compile(a)($scope);
			            	var div = document.createElement("div");
			            	div.appendChild(a);
			            	td.appendChild(div);
			            	tr.appendChild(td);
			            	tbody.appendChild(tr);
			            }
		            }
		          	
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
    $scope.getRel= function(eid, name){
 		$http({
		    url: "/getRel",
		    method: "POST",
		    params: {"eid":eid},
		    }).
	    	success(function(data) {
	    		$http({
			    url: "/getNbrRel",
			    method: "POST",
			    params: {"eid":eid},
			    }).
			    success(function(nbr) {
		    	 	var typeTraite = [];
		    	 	//$('#titleDef').find('span')[0].innerHTML=name;
		    	 	//console.log($('#titleDef').find('span'));
		    	 	var divnbr = document.createElement('div');
		    	 	var nbrAssociations = document.createElement('span');
		    	 	nbrAssociations.appendChild(document.createTextNode(nbr));
		    	 	divnbr.appendChild(nbrAssociations);
		    	 	divnbr.setAttribute('class', "nbrAssociations" );
		    	 	$("#"+eid).parent().parent().append(divnbr);
		    	 	console.log($(eid).parent());
		    	 	var tbody =  document.getElementById("relations");
		    	 	tbody.innerHTML="";
		    	 	var nbrassoc= [];
		    	 	for (var i = data.length - 1; i >= 0; i--) {
		    	 		if(typeTraite.indexOf(data[i])==-1){
		    	 			var tr = document.createElement("tr");
		    	 			var tdPlus = document.createElement("td");
		    	 			tdPlus.setAttribute("id","plus"+data[i]);
		    	 			var td = document.createElement("td");
		    	 			var divTitle = document.createElement("div");
		    	 			divTitle.setAttribute("class", "panel-heading");
		    	 			var h4 = document.createElement("h4");
		    	 			h4.setAttribute("class", "panel-title");
		    	 			var a1 = document.createElement("a");
		    	 			a1.appendChild(document.createTextNode(data[i]));
		    	 			a1.setAttribute("data-toggle","collapse");
		    	 			a1.setAttribute("data-parent","#accordion");
		    	 			a1.setAttribute("ng-click","hideShow("+data[i]+","+eid+")");
		    	 			var compiled = $compile(a1)($scope);
		    	 			h4.appendChild(a1);
		    	 			divTitle.appendChild(h4);
		    	 			var div2 = document.createElement("div");
		    	 			td.setAttribute("id",data[i]);
		    	 			td.setAttribute("class","panel panel-default");
		    	 			td.appendChild(divTitle);
		    	 			div2.setAttribute("id","collapse"+data[i]);
		    	 			div2.setAttribute("class","panel-collapse collapse");
					        td.appendChild(div2);
		    	 			
		    	 			tr.appendChild(td);
		    	 			tr.appendChild(tdPlus);
		    	 			tbody.appendChild(tr);
		    	 			typeTraite.push(data[i]);
		    	 			nbrassoc[data[i]]=1;
		    	 		}
		    	 		else{
		    	 			
		    	 			nbrassoc[data[i]]++;
		    	 			
		    	 	
		    	 		}
		    	 	}
		    	 	var traite = [];
		    	 	for (var j = data.length - 1; j >= 0; j--) {
		    	 		if (traite.indexOf(data[j])==-1){
			    	 		var divTitle = document.createElement("div");
			    	 		divTitle.setAttribute("class", "panel-heading");
			    	 		var h4 = document.createElement("h4");
			    	 		h4.setAttribute("class", "panel-title");
			    	 		h4.innerHTML=nbrassoc[data[j]];
			    	 		divTitle.appendChild(h4);
			    	 		tdPlus = document.getElementById('plus'+data[j])
			    	 		tdPlus.appendChild(divTitle);
			    	 		traite[j]=data[j];
			    	 	}
		    	 	}
		    	$('#relations').children('tr').each(function () {
		    		$(this).children('td').each(function(){
		    				string = "plus";
		    				if($(this).attr('id').indexOf(string)==-1){
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
							   		var target = document.getElementById(id[j]).firstChild.firstChild.firstChild;
							   		target.innerHTML=n;			   		
							   		j++;
				    	 		})
		    				}
		    			})
				});
				$("#relations").sortable();
				$("#relations").disableSelection();
		    })
	 	})
	 }   	
 	if($routeParams.n != null){
			$scope.getDico($routeParams.n);
		}

	}
);

