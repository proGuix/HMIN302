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
	var query = "Match (n1:Node)-[:`1`]-(n2:Node) WHERE n1.n='"+req.query.input+"' OR n1.n='"+ req.query.input.charAt(0).toUpperCase()+ req.query.input.substring(1).toLowerCase() +"' RETURN n2 UNION MATCH (n2:Node {n:'"+ req.query.input.charAt(0).toUpperCase()+ req.query.input.substring(1).toLowerCase() +"'}) RETURN n2 UNION MATCH (n2:Node {n:'"+ req.query.input+"'}) RETURN n2";
	var params={n:req.query.input,};
	db.cypher({
		 query: query,
	    params: params,
	}, function (err, results) {
	    if (err) throw err;
	    var node = [];
	    for ( var i = results.length - 1; i >= 0; i--) {
	       	var result = results[i];
	  		if(result != null){
	  			node.push(result['n2']['properties']);
	  		}
		}
		res.send(JSON.stringify(node, null, 3));

	});
});

   // res.end();

	 app.post('/getDef', function(req, res) {
	 	var query = "Match (n1:Node)-[r]-(rel:Term_Def) WHERE n1.eid="+req.query.eid+" return rel";
		console.log(query);
	 	var params={n:req.query.eid,};
	 	db.cypher({
	 		 query: query,
	 	    params: params,
	 	}, function (err, def) {
	 	    if (err) throw err;
	 	    console.log(def);
				if(def.length == 0){
					res.send("Pas de définition disponible");
				}else if(def.length>=1){
					res.send(JSON.stringify(def[0]['rel']['properties']['def'], null, 3));
				}else{
					res.send(JSON.stringify(def['rel']['properties']['def'], null, 3));
				}


	 	});
	 });


app.post('/getTrad', function(req, res) {
	var j = req.query['size'] - 1;
	var subnode = [];
	var query = ""
	var rturn = "";
	var params ;
	if(req.query['size']<2){
			var oneNode =[];
			var dataElse = [];
			var dataJson = JSON.parse(req.query['data']);
			dataElse[1] = dataJson['n'];
			dataElse[0] = dataJson['eid'];
			dataElse[2] = dataJson['t'];
			dataElse[3] = dataJson['w'];
			oneNode.push(dataElse);
			res.send(JSON.stringify(oneNode, null, 3));
	}else{
		for (var i = req.query['size'] - 1; i >= 0; i--) {
			var s = "";
			var node1 = [];
			var dataJson = JSON.parse(req.query['data'][i]);
			name = dataJson['n'];
			if(name.lastIndexOf(">") == name.indexOf(">") && name != req.query['input'] && name != req.query['input'].charAt(0).toUpperCase()+ req.query['input'].substring(1).toLowerCase()){
		       		s =name.substring(name.lastIndexOf(">")+1);
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
					j--;
				    s="";
			}else{
		       	s =name.substring(name.indexOf(">")+1,name.lastIndexOf(">"));
		    }
		    if(s!=""){
		    	query =query + " Match (n"+i+":Node) WHERE n"+i+".eid = "+ s +" ";
		    	if(rturn==""){
		    		rturn ="RETURN DISTINCT n"+i
		    	}else{
		    		rturn =rturn +",n"+i
		    	}
				params={n:s,};
			}
		}
		var rqt = query + rturn;
		if(rqt == ''){
			var twoNode =[];
			var dataElse = [];
			var dataJson = JSON.parse(req.query['data'][0]);
			dataElse[1] = dataJson['n'];
			dataElse[0] = dataJson['eid'];
			dataElse[2] = dataJson['t'];
			dataElse[3] = dataJson['w'];
			twoNode.push(dataElse);
			var dataJson1 = JSON.parse(req.query['data'][1]);
			var dataElse1 = [];
			dataElse1[1] = dataJson1['n'];
			dataElse1[0] = dataJson1['eid'];
			dataElse1[2] = dataJson1['t'];
			dataElse1[3] = dataJson1['w'];
			twoNode.push(dataElse1);
			res.send(JSON.stringify(twoNode, null, 3));
		}else{
				db.cypher({
					query: rqt,
				    params: params,
				}, function (err, resultat) {
					var datajs
					if(err) throw err;

					for (var i = req.query['size'] - 1; i >= 2; i--) {
					var node = [];
						var result = resultat[0]['n'+i];
						for(c = req.query['size']- 1 ; c >=2 ; c--){

							datajs = JSON.parse(req.query['data'][c]);
							if(result != null){
								var name2 = datajs['n']
								if(name2.lastIndexOf(">") == name2.indexOf(">") && name2 != req.query['input'] && name2 != req.query['input'].charAt(0).toUpperCase()+ req.query['input'].substring(1).toLowerCase()){
						       		s =name2.substring(name2.lastIndexOf(">")+1);
						       	}else{
							       	s =name2.substring(name2.indexOf(">")+1,name2.lastIndexOf(">"));
							    }
				  				if(result['properties']['eid'] == s){

				  					node[1] = req.query['input']+" ("+result['properties']['n']+")";
									node[0] = datajs['eid'];
									node[2] = datajs['t'];
									node[3] = datajs['w'];
									subnode[c]=node;
				  				}
				  			}
			  			}
					}
				 	res.send(JSON.stringify(subnode, null, 3));

				});
			}
		}
});

app.post('/getRel', function(req, res) {
	var query = "Match (n1:Node {eid:"+req.query.eid+"})-[r]-(n2:Node) RETURN r ORDER BY r.w DESC LIMIT 50000";
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
	  			var subnode=result['r']['type'];

	  			node.push(subnode);
	  		}

		}
		res.send(JSON.stringify(node, null, 3));

	});
});

app.post('/getNbrRel', function(req, res) {
	var query = "Match (n1:Node {eid:"+req.query.eid+"})-[r]-(n2:Node) RETURN count(n2)";
	var params={eid:req.query.eid,};
	db.cypher({
		 query: query,
	    params: params,
	}, function (err, results) {
	    if (err) throw err;
	    var node = [];
		res.send(JSON.stringify(results[0]['count(n2)'], null, 3));
	});
});

app.post('/getRelElem', function(req, res) {
	var query = "Match (n1:Node {eid:"+req.query.eid+"})-[r:`"+req.query.type+"`]-(n2:Node)  RETURN n2 ORDER BY r.w DESC";
	console.log(query);
	var params={eid:req.query.eid};
	db.cypher({
		 query: query,
	    params: params,
	}, function (err, results) {

	    if (err) throw err;
	    var node = [];

	    for ( var i = 0; i <= results.length - 1; i++) {
	       	var result = results[i];
	  		if(result != null){
	  			var subnode=result['n2']['properties'];
	  			node.push(subnode);
	  		}

		}
		res.send(JSON.stringify(node, null, 3));

	});
});

app.post('/getRelName', function(req, res) {
	var query = "Match (r:Type_Rel {rtid:"+req.query.rtid+"}) RETURN r";
	var params={rtid:req.query.rtid,};

	db.cypher({
		 query: query,
	    params: params,
	}, function (err, results) {
	    if (err) throw err;
	    var node = [];

	    for ( var i = results.length - 1; i >= 0; i--) {
	       	var result = results[i];
	  		if(result != null){
	  			var subnode=[result['r']['properties']['nom_etendu']];
	  			node.push(subnode);
	  		}

		}
		res.send(JSON.stringify(node, null, 3));

	});
});

app.post('/getNode', function(req, res) {
	var query = "Match (n1:Node {eid:"+req.query.eid1+"}) Match(n2:Node {eid:"+req.query.eid2+"}) RETURN n1,n2";
	console.log(query);
	db.cypher({
		 query: query,
	}, function (err, results) {
	    if (err) throw err;
			var node = [];
	    var result1 = results[0]['n1'];
			var result2 = results[0]['n2'];
	  	if(result1 != null && result2 != null){
	  		var subnode=[result1['properties']];
	  		node.push(subnode);
				var subnode=[result2['properties']];
				node.push(subnode);
	  	}

		res.send(JSON.stringify(node, null, 3));

	});
});

app.post('/getPol', function(req, res) {
	var query = "Match (n1:Node {eid:"+req.query.eid+"})-[r1:`36`]-(n2:Node {n:\"_POL-NEG\"}) Match (n3:Node {eid:"+req.query.eid+"})-[r3:`36`]-(n4:Node {n:\"_POL-POS\"})  RETURN r1,r3";
	console.log(query);
	db.cypher({
		 query: query,
	}, function (err, results) {
		console.log(results);
	    if (err) throw err;
			if(results.length == 0){
				res.send(JSON.stringify('neutre', null, 3));
			}else {
				var neg = results[0]['r1']["properties"]["w"];
				var pos = results[0]['r3']["properties"]["w"];
				if(neg>pos){
					res.send("neg");
				}else{
					res.send("pos");
				}


			}

	});
});

app.listen(8888);
