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
				list.style.display = 'table-row';

			}else{
				$('#'+val).find(".glyphicon-minus").removeClass("glyphicon-minus");
				$('#'+val).find('span').addClass("glyphicon-plus");
				list.style.display = 'none';
			}

		}

    $scope.change = function(toHide,toShow){
      document.getElementById(toHide).style.display = "none";
      document.getElementById(toShow).style.display = "block";
    }

		$scope.hideShow = function(val,eid) {
      var list = document.getElementById("collapse"+val);
			if (!list.firstChild) {
				$http({
				    url: "/getRelElem",
				    method: "POST",
				    params: {"type":val,"eid": eid},
				}).
				success(function(data) {
          if(val == 45 || val==46 || val==66){
            var j = 0;
            for (var i = 0; i <= data.length - 1; i++) {
              if(data[i]['n'].lastIndexOf(">") < data[i]['n'].lastIndexOf(":")){
                var eidtosearch = data[i]['n'].substring(data[i]['n'].lastIndexOf(":")+1,data[i]['n'].length);
                var bool = true;
                $http({
                    url: "/getNode",
                    method: "POST",
                    params: {"eid1":eid,"eid2": eidtosearch},
                }).
                success(function(nodes) {
          				addRelations(j,val,eid,data,nodes);
                  j++;
                  bool = false;
                })
                while(!bool){}

              }
            }
            }else{
              var t = 0;
                var k = [];
                for (var j = 0; j <= data.length - 1; j++) {

                  if(data[j]['n'].lastIndexOf(">") < data[j]['n'].lastIndexOf(":") && data[j]['n'].lastIndexOf("::>")!=-1){
                    var eidtosearch = data[j]['n'].substring(data[j]['n'].lastIndexOf(":")+1,data[j]['n'].length);
                    var bool = true;
                    k.push(j);
                    $http({
                        url: "/getNode",
                        method: "POST",
                        params: {"eid1":eid,"eid2": eidtosearch},
                    }).
                    success(function(nodes) {

              				addRelations(k[t],val,eid,data,nodes);
                      t++;
                    })


                  }else{

                    addRelations(j,val,eid,data,null);
                  }
                }
              }
				})
			}
			if(list.style.display=='block'){
				list.style.display = 'none';
			}else{
				list.style.display = 'block';
			}
			};

  function addRelations(j,val,eid, data, nodes){
    var list = document.getElementById("collapse"+val);
        if (j%10 == 0){

          var div = document.createElement("div");
          var divA = document.createElement("div");
          divA.setAttribute("class","col-sm-9");
          div.setAttribute("class","row");
          div.setAttribute('id', "collapse"+val+j);
          divA.setAttribute('id', "divA"+val+j);
          if(j != 0){
            div.setAttribute('style', "display:none;");
            var divmd= document.createElement("div");
            divmd.setAttribute("class","col-sm-1 pull-left chevron");
            var precedent = document.createElement("button");
            precedent.setAttribute("class", "glyphicon glyphicon-chevron-left btn btn-responsive");
            var prec = j-10;
            precedent.setAttribute("ng-click", "change('"+"collapse"+val+j+"','"+"collapse"+val+prec+"')");
            var compiled = $compile(precedent)($scope);
            divmd.appendChild(precedent);
            div.appendChild(divmd);
          }
            if(data.length-j > 10){
              var divmd= document.createElement("div");
              divmd.setAttribute("class","col-sm-1 pull-right chevron");
              var suivant = document.createElement("button");
              suivant.setAttribute("class", "glyphicon glyphicon-chevron-right btn btn-responsive");
              var suiv = j+10;
              suivant.setAttribute("ng-click", "change('"+"collapse"+val+j+"','"+"collapse"+val+suiv+"')");
              var compiled = $compile(suivant)($scope);
              divmd.appendChild(suivant);
              div.appendChild(divmd);
            }
            div.appendChild(divA);
            list.appendChild(div);
        }else{
          if(Math.floor(j/10) == 0){
            cpt=0;
          }else{
            cpt=Math.floor(j/10)*10;
          }
          var div = document.getElementById("collapse"+val+cpt);
          var divA = document.getElementById("divA"+val+cpt);
        }
        if(div != null){
          var a = document.createElement("a");
          a.setAttribute("ng-click", 'getRel('+data[j]['eid']+',"'+data[j]['n']+'")');
            if(val == 45){
              a.appendChild(document.createTextNode(nodes[0][0]['n']+" -[Sujet]-> "+nodes[1][0]['n']));
            }else if(val == 46){
              a.appendChild(document.createTextNode(nodes[1][0]['n']+" -[Objet]-> "+nodes[0][0]['n']));
            }else if(val==66){
              a.appendChild(document.createTextNode(nodes[0][0]['n']+" -[Caracterisation]-> "+nodes[1][0]['n']));
            }else if(nodes!=null){
              a.appendChild(document.createTextNode(nodes[0][0]['n']+" --> "+nodes[1][0]['n']));
            }else{
                a.appendChild(document.createTextNode(data[j]['n']));
            }
            var compiled = $compile(a)($scope);
            divA.appendChild(a);
            var p= document.createElement("p");
            p.innerHTML="&nbsp &nbsp | &nbsp &nbsp";
            p.setAttribute("style","display: inline-block; vertical-align: top;");
            divA.appendChild(p);



          }

    }

		$scope.hide = function(val) {
			$("#"+val).parent().hide();
		};

		$scope.show = function() {
			$('#relations').children('tr').each(function () {
		    	$(this).show();
		    })
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
              if(data.length == 0 || data == null){
                var tbody =  document.getElementById("collapseOne");
                tbody.innerHTML="";
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var p = document.createElement("p");
                p.innerHTML="Aucun resultat trouvé"
                td.appendChild(p);
                tr.appendChild(td);
                tbody.appendChild(tr);
              }else{
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
            }
	        }).error(function(data) {
            console.error("error in posting");
        	})
    	//})
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
            $http({
  			    url: "/getDef",
  			    method: "POST",
  			    params: {"eid":eid},
  			    }).
            success(function(definition) {
  		    	 	var typeTraite = [];
              var titre = document.getElementById('titre');
              titre.innerHTML="";
              titre.appendChild(document.createTextNode("Résultats pour '"+name+"'"));

  		    	 	var divnbr = document.createElement('div');
  		    	 	var nbrAssociations = document.createElement('span');
  		    	 	var icone = document.createElement('span');
  		    	 	icone.setAttribute('class',"glyphicon glyphicon-chevron-right");
  		    	 	nbrAssociations.setAttribute('id',"nbr");
  		    	 	nbrAssociations.appendChild(document.createTextNode(nbr));
  		    	 	divnbr.appendChild(icone);
  		    	 	divnbr.appendChild(nbrAssociations);
  		    	 	divnbr.setAttribute('class', "nbrAssociations" );
  		    	 	$(".nbrAssociations").remove();
  		    	 	$("#"+eid).parent().parent().append(divnbr);
  		    	 	var tbody =  document.getElementById("relations");
  		    	 	tbody.innerHTML="";
  		    	 	var nbrassoc= [];
              var tr = document.createElement("tr");
              var tdPlus = document.createElement("td");
              tdPlus.setAttribute("id","plusDef");
              var td = document.createElement("td");
              var divTitle = document.createElement("div");
              divTitle.setAttribute("class", "panel-heading");
              var h4 = document.createElement("h4");
              h4.setAttribute("class", "panel-title");
              var a1 = document.createElement("a");
              a1.appendChild(document.createTextNode("Définition"));
              a1.setAttribute("data-toggle","collapse");
              a1.setAttribute("data-parent","#accordion");
              a1.setAttribute("ng-click","hideShow('def')");
              var compiled = $compile(a1)($scope);
              h4.appendChild(a1);
              icone.setAttribute('class',"glyphicon glyphicon-remove pull-right");
              var a2 = document.createElement("a");
              a2.appendChild(icone);
              a2.setAttribute("ng-click","hide('definition')");
              var compiled = $compile(a2)($scope);
              h4.appendChild(a2);
              divTitle.appendChild(h4);
              var div2 = document.createElement("div");
              td.setAttribute("id",'definition');
              td.setAttribute("class","panel panel-default");
              td.appendChild(divTitle);
              div2.setAttribute("id","collapsedef");
              div2.setAttribute("class","panel-collapse collapse");
              div2.innerHTML=definition;
              td.appendChild(div2);
              tr.appendChild(td);
              tr.appendChild(tdPlus);
              tbody.appendChild(tr);
              var nbr36=0;
  		    	 	for (var i = data.length - 1; i >= 0; i--) {
                if(data[i]==555){

                }else if(data[i]==36 && nbr36==0){
                  nbr36++;
                  $http({
        			    url: "/getPol",
        			    method: "POST",
        			    params: {"eid":eid},
        			    }).
                  success(function(pol) {
                    polarite = document.getElementById("pol");
                    if(pol == "neg"){
                      polarite.innerHTML="<i class=\"fa fa-frown-o\" aria-hidden=\"true\"></i>";
                    }
                    else if(pol == "neutre"){

                      polarite.innerHTML="<i class=\"fa fa-meh-o\" aria-hidden=\"true\"></i>";
                    }else if(pol == "pos"){

                      polarite.innerHTML="<i class=\"fa fa-smile-o\" aria-hidden=\"true\"></i>";
                    }
                  })
                }else{
                  if(typeTraite.indexOf(data[i])==-1 ){
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
                    var icone = document.createElement('span');
                    icone.setAttribute('class',"glyphicon glyphicon-remove pull-right");
                    var a2 = document.createElement("a");
                    a2.appendChild(icone);
                    a2.setAttribute("ng-click","hide("+data[i]+")");
                    var compiled = $compile(a2)($scope);
                    h4.appendChild(a2);
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
              }

  		    	 	var traite = [];
  		    	 	for (var j = data.length - 1; j >= 0; j--) {

                if(data[j]==555){

                }else{
                  if (traite.indexOf(data[j])==-1 ){

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
              }

  		    	$('#relations').children('tr').each(function () {
  		    		$(this).children('td').each(function(){
  		    				string = "plus";
  		    				if($(this).attr('id').indexOf(string)==-1 && $(this).attr('id') !="definition"){
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
                     if(n==""){
                       var target = document.getElementById(id[j]).parentElement.remove();
   							   		j++;
                     }
                     if(id[j]!= null){
                       var target = document.getElementById(id[j]).firstChild.firstChild.firstChild;

                       if(n=="r_chunk_head"){
                         target.innerHTML="Associé à une caractéristique";
                       }else{
                         target.innerHTML=n;
                       }

   							   		j++;
                     }

  				    	 		})
  		    				}
  		    			})
  				});
  				$("#relations").sortable();
  				$("#relations").disableSelection();
		    })
      })
	 	})
	 }
 	if($routeParams.n != null){
			$scope.getDico($routeParams.n);
		}

	}
);
