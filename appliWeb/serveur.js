var express = require('express');
var fs = require("fs");
var app = express();
var url = require("url");

//Conexion to Neo4j
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:root@localhost:7474');

//function recherche(json, filtre)


app.get('/', function(req, res){
	var file = fs.readFileSync("vue/index.html");
	var header= fs.readFileSync("vue/header.html")
	res.end(file);
});



app.get('/controleur/index.js', function(req, res){
	var script = fs.readFileSync("controleur/index.js");
	res.end(script);
});

app.get('/controleur/controleur.js', function(req, res){
	var script = fs.readFileSync("controleur/controleur.js");
	res.end(script);
});


app.get('/vue/home.html', function(req, res){
	var contact = fs.readFileSync("vue/home.html");
	res.end(contact);
});


app.get('/vue/definition.html', function(req, res){
	var contact = fs.readFileSync("vue/definition.html");
	res.end(contact);
});

app.get('/web/search.css', function(req, res){
	
	var css= fs.readFileSync("web/search.css");
		res.end(css);
});

app.get('/web/style.css', function(req, res){
	
	var css= fs.readFileSync("web/style.css");
		res.end(css);
});

app.post('/getDico', function(req, res) {
	console.log(req.query.input);
	console.log("Match (n1:Node)-[:`1`]-(n2:Node) WHERE n1.n='"+req.query.input+"' OR n1.n='"+ req.query.input.charAt(0).toUpperCase()+ req.query.input.substring(1).toLowerCase() +"' RETURN n2 UNION MATCH (n3:Node {n:'"+ req.query.input.charAt(0).toUpperCase()+ req.query.input.substring(1).toLowerCase() +"'}) RETURN n2 RETURN n2 UNION MATCH (n3:Node {n:'"+ req.query.input+"'}) RETURN n2");
	var query = "Match (n1:Node)-[:`1`]-(n2:Node) WHERE n1.n='"+req.query.input+"' OR n1.n='"+ req.query.input.charAt(0).toUpperCase()+ req.query.input.substring(1).toLowerCase() +"' RETURN n2 UNION MATCH (n2:Node {n:'"+ req.query.input.charAt(0).toUpperCase()+ req.query.input.substring(1).toLowerCase() +"'}) RETURN n2 UNION MATCH (n2:Node {n:'"+ req.query.input+"'}) RETURN n2";
	var params={n:req.query.input,};
	db.cypher({
		 query: query,
	    params: params,
	}, function (err, results) {
	    if (err) throw err;
	    console.log(results);
	    var node = [];
	    for ( var i = results.length - 1; i >= 0; i--) {
	       	var result = results[i];
	  		if(result != null){
	  			node.push(result['n2']['properties'])
	  		}
		  	
		}

		res.send(JSON.stringify(node, null, 3));
		
	});
});	
	
   // res.end();


app.post('/getTrad', function(req, res) {
	console.log(req.query);
	var j = req.query['size'] - 1;
	var subnode = [];
	var query = ""
	var rturn = "";
	var params ;
	for (var i = req.query['size'] - 1; i >= 0; i--) {
		console.log(j);
		console.log(i);
		var s = "";
		var node1 = [];
		
		var dataJson = JSON.parse(req.query['data'][i]);
		name = dataJson['n'];
		if(name.lastIndexOf(">") == name.indexOf(">") && name != req.query['input'] && name != req.query['input'].charAt(0).toUpperCase()+ req.query['input'].substring(1).toLowerCase()){
	       		s =name.substring(name.lastIndexOf(">")+1);
	       		console.log(req.query['input'] );
	     }else if(name == req.query['input'].charAt(0).toUpperCase()+ req.query['input'].substring(1).toLowerCase() || name==req.query['input']){
			    node1[1] = dataJson['n'];
				node1[0] = dataJson['eid'];
				node1[2] = dataJson['t'];
				node1[3] = dataJson['w'];
				if(subnode[0]== null){
					subnode[0]=node1;
				}else{
					subnode[1]= node1;
				}
				console.log('aleeeez ' + subnode);
				j--;
			    s="";
		}else{
	       	s =name.substring(name.indexOf(">")+1,name.lastIndexOf(">"));
	    } 
	    console.log("s:"+s);
	    if(s!=""){
	    	query =query + " Match (n"+i+":Node) WHERE n"+i+".eid = '"+ s +"' ";
	    	console.log(query);
	    	if(rturn==""){
	    		rturn ="RETURN DISTINCT n"+i
	    	}else{
	    		rturn =rturn +",n"+i
	    	}
			params={n:s,};
		}
	}	
	var rqt = query + rturn;
	console.log(rqt);
			db.cypher({
				query: rqt,
			    params: params,
			}, function (err, resultat) {
				var datajs
				
				if(err) throw err;
				console.log(resultat[0]);
				console.log(req.query['data']);
				for (var i = req.query['size'] - 1; i >= 2; i--) {
				var node = [];
					var result = resultat[0]['n'+i];
					for(c = req.query['size']- 1 ; c >=2 ; c--){
						
						datajs = JSON.parse(req.query['data'][c]);
						if(result != null){
							console.log(result);
							var name2 = datajs['n']
							if(name2.lastIndexOf(">") == name2.indexOf(">") && name2 != req.query['input'] && name2 != req.query['input'].charAt(0).toUpperCase()+ req.query['input'].substring(1).toLowerCase()){
					       		s =name2.substring(name2.lastIndexOf(">")+1);
					       	}else{
						       	s =name2.substring(name2.indexOf(">")+1,name2.lastIndexOf(">"));
						    } 
						    console.log(s);
			  				if(result['properties']['eid'] == s){
			  					console.log(datajs);
			  					node[1] = req.query['input']+"("+result['properties']['n']+")"; 
								node[0] = datajs['eid'];
								node[2] = datajs['t'];
								node[3] = datajs['w'];
								subnode[c]=node;
			  				}
			  			}
		  			}
				}
				console.log(subnode);   
			  	console.log('send'); 
			 	res.send(JSON.stringify(subnode, null, 3));				       	
				
			});
	    
	
});

app.post('/getRel', function(req, res) {
	var query = "Match (n1:Node {eid:{eid}})-[r]-(n2:Node) RETURN  r,n2 ORDER BY r.w DESC";
	var params={eid:req.query.eid,};
	
	db.cypher({
		 query: query,
	    params: params,
	}, function (err, results) {
	    if (err) throw err;
	    var node = [];
	    for ( var i = results.length - 1; i >= 0; i--) {
	       	var result = results[i];
	  		if(result != null){
	  			var subnode=[result['r']['type'],result['n2']['properties']];
	  			node.push(subnode);
	  		}
		}
		console.log(node);
		res.send(JSON.stringify(node, null, 3));
		
	});
});	

app.post('/getRelName', function(req, res) {
	var query = "Match (r:Type_Rel {rtid:{rtid}}) RETURN  r";
	var params={rtid:req.query.rtid,};
	
	db.cypher({
		 query: query,
	    params: params,
	}, function (err, results) {
		if (err) throw err;
		console.log(results[0]['r']['properties']['nom_etendu'])
		res.send(JSON.stringify(results[0]['r']['properties']['nom_etendu'], null, 3));
	});
});	



app.listen(8888);