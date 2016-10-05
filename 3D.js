angular.module("app", [])
    .controller("ctrl", function($scope) {
	var table = {"table": 
		     {"plateau": ["600", "15", "250"],
		      "pieds": ["20", "222.5", "20"],
		      "couleur": "0x8B4513"
		     },
		     "chaise":
		     {"dossier": ["150", "140", "10"],
		      "plateau": ["150", "10", "150"],
		      "pieds": ["10", "125", "10"],
		      "couleur": "0xD2B48C"
		     },
		     "bureau": 
		     {"plateau": ["800", "30", "300"],
		      "pieds": ["40", "222.5", "40"],
		      "couleur": "0x231000"
		     }
		    };
	
	var camera, scene, renderer;
	var geometry, material, mesh;

	init();
	camera.lookAt(scene.position);
	renderer.render(scene, camera);

	function init() {

	    // la scène	    
	    scene = new THREE.Scene();

	    // la caméra
	    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	    camera.position.z = 0;
	    camera.position.y = 20;
	    camera.position.x = -4000;

	    //les fenetres
	    createFenetre(-1100);
	    createFenetre(-500);
	    createFenetre(100);
	    createFenetre(700);
	    createFenetre(1300);

	    //la porte
	    geometry = new THREE.CubeGeometry(20, 800*(2/3), 280);
	    material = new THREE.MeshBasicMaterial({color: 0x6A5330, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = -1400;
	    mesh.position.z = -1600;
	    mesh.position.y = -400+800*(2/6);
	    scene.add(mesh);

	    //la poignée
	    geometry = new THREE.CubeGeometry(20, 10, 5);
	    material = new THREE.MeshBasicMaterial({color: 0x978F84, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = -1400-10-2.5;
	    mesh.position.z = -1600+100;
	    mesh.position.y = -400+800*(2/6);
	    scene.add(mesh);
	    geometry = new THREE.CubeGeometry(5, 10, 40);
	    material = new THREE.MeshBasicMaterial({color: 0x978F84, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = -1400-10-10-2.5;
	    mesh.position.z = -1600-20+2.5+100;
	    mesh.position.y = -400+800*(2/6);
	    scene.add(mesh);
	    geometry = new THREE.CubeGeometry(20, 10, 5);
	    material = new THREE.MeshBasicMaterial({color: 0x978F84, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = -1400+10+2.5;
	    mesh.position.z = -1600+100;
	    mesh.position.y = -400+800*(2/6);
	    scene.add(mesh);
	    geometry = new THREE.CubeGeometry(5, 10, 40);
	    material = new THREE.MeshBasicMaterial({color: 0x978F84, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = -1400+10+10+2.5;
	    mesh.position.z = -1600-20+2.5+100;
	    mesh.position.y = -400+800*(2/6);
	    scene.add(mesh);    

	    // le texte au dessus de la porte
	    var textGeo = new THREE.TextGeometry( "Salle de TD 1 ", {
		size : 30,
		height : 1,
		font : "optimer",
		weight : "bold",
		style : "normal"
	    });
	    material = new THREE.MeshBasicMaterial({color : 0x000000});
	    mesh = new THREE.Mesh(textGeo, material);
	    mesh.position.x = -1420;
	    mesh.position.z = -1725;
	    mesh.position.y = 200;
	    mesh.rotation.y = (-90/180)*Math.PI;
	    scene.add(mesh);


	    //mur gauche
	    geometry = new THREE.CubeGeometry(40, 800, 260);
	    material = new THREE.MeshBasicMaterial({color: 0xCD853F, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -1870;
	    mesh.position.x = -1400;
	    scene.add(mesh);

	    geometry = new THREE.CubeGeometry(40, 800/3, 440);
	    material = new THREE.MeshBasicMaterial({color: 0xCD853F, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -1870+220+130;
	    mesh.position.x = -1400;
	    mesh.position.y = -400+800*(2/3)+800*(1/6);
	    scene.add(mesh);

	    geometry = new THREE.CubeGeometry(40, 800*(2/3), 160);
	    material = new THREE.MeshBasicMaterial({color: 0xCD853F, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -1460+80;
	    mesh.position.x = -1400;
	    mesh.position.y = -400+800*(2/6);
	    scene.add(mesh);

	    geometry = new THREE.CubeGeometry(40, 200, 3380);
	    material = new THREE.MeshBasicMaterial({color: 0xCD853F, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = 310;
	    mesh.position.x = -1400;
	    mesh.position.y = 300;
	    scene.add(mesh);

	    geometry = new THREE.CubeGeometry(40, 200, 3380);
	    material = new THREE.MeshBasicMaterial({color: 0xCD853F, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = 310;
	    mesh.position.x = -1400;
	    mesh.position.y = -300;
	    scene.add(mesh);

	    for(var i = 0; i < 4; i++){
		geometry = new THREE.CubeGeometry(40, 400, 200);
		material = new THREE.MeshBasicMaterial({color: 0xCD853F, wireframe:false});
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.z = -800+600*i;
		mesh.position.x = -1400;
		scene.add(mesh);
	    }

	    geometry = new THREE.CubeGeometry(40, 400, 500);
	    material = new THREE.MeshBasicMaterial({color: 0xCD853F, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = 1750;
	    mesh.position.x = -1400;
	    scene.add(mesh);

	    //mur droit
	    geometry = new THREE.BoxGeometry(40, 800, 4000);
	    material = new THREE.MeshBasicMaterial({color: 0xCD853F, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = 1400;
	    scene.add(mesh);

	    //mur face
	    geometry = new THREE.BoxGeometry(2840, 800, 40);
	    material = new THREE.MeshBasicMaterial({color: 0xCD853F, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -2020;
	    scene.add(mesh);

	    //mur fond
	    geometry = new THREE.BoxGeometry(2840, 800, 40);
	    material = new THREE.MeshBasicMaterial({color: 0xCD853F, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = 1980;
	    scene.add(mesh);


	    //mur haut
	    geometry = new THREE.BoxGeometry(2840, 40, 4040);
	    material = new THREE.MeshBasicMaterial({color: 0xC0C0C0, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.y = 420;
	    mesh.position.z = -20;
	    scene.add(mesh);

	    //mur bas
	    geometry = new THREE.BoxGeometry(2840, 40, 4040);
	    material = new THREE.MeshBasicMaterial({color: 0xFFF8DC, wireframe:false});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.y = -420;
	    mesh.position.z = -20;
	    scene.add(mesh);

	    //tableau
	    geometry = new THREE.BoxGeometry(1500, 400, 5);
	    material = new THREE.MeshBasicMaterial({color : 0x2F4F4F});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -2000;
	    mesh.position.y = 40;
	    scene.add(mesh);

	    //le rebord en bas du tableau
	    geometry = new THREE.BoxGeometry(1500, 10, 30);
	    material = new THREE.MeshBasicMaterial({color : 0xC0C0C0});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -2000+7.5;
	    mesh.position.y = 40-200;
	    scene.add(mesh);

	    //l'efface craie
	    geometry = new THREE.BoxGeometry(60, 30, 30);
	    material = new THREE.MeshBasicMaterial({color : 0x000000});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -2000+7.5;
	    mesh.position.y = 40-200+15+5;
	    mesh.position.x = -500;
	    scene.add(mesh);

	    //craies
	    geometry = new THREE.CylinderGeometry(3, 3, 30, 30);
	    material = new THREE.MeshBasicMaterial({color : 0xffffff});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -1500;
	    mesh.position.y = 255.5-400;
	    mesh.position.x = 0;
	    mesh.rotation.z = Math.PI/3;
	    mesh.rotation.x = Math.PI/2;
	    scene.add(mesh);

	    geometry = new THREE.CylinderGeometry(3, 3, 30, 30);
	    material = new THREE.MeshBasicMaterial({color : 0xff0000});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -1500;
	    mesh.position.y = 255.5-400;
	    mesh.position.x = 50;
	    mesh.rotation.z = Math.PI/3;
	    mesh.rotation.x = Math.PI/2;
	    scene.add(mesh);

	    geometry = new THREE.CylinderGeometry(3, 3, 30, 30);
	    material = new THREE.MeshBasicMaterial({color : 0xffcc33});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -1500;
	    mesh.position.y = 255.5-400;
	    mesh.position.x = 100;
	    mesh.rotation.z = Math.PI/3;
	    mesh.rotation.x = Math.PI/2;
	    scene.add(mesh);

	    geometry = new THREE.CylinderGeometry(3, 3, 30, 30);
	    material = new THREE.MeshBasicMaterial({color : 0x339900});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -1500;
	    mesh.position.y = 255.5-400;
	    mesh.position.x = -50;
	    mesh.rotation.z = Math.PI/3;
	    mesh.rotation.x = Math.PI/2;
	    scene.add(mesh);

	    geometry = new THREE.CylinderGeometry(3, 3, 30, 30);
	    material = new THREE.MeshBasicMaterial({color : 0x000099});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.z = -1500;
	    mesh.position.y = 255.5-400;
	    mesh.position.x = -100;
	    mesh.rotation.z = Math.PI/3;
	    mesh.rotation.x = Math.PI/2;
	    scene.add(mesh);

	    // le texte sur le tableau
	    var textGeo = new THREE.TextGeometry( "le JavaScript c'est nul", {
		size : 30,
		height : 1,
		font : "optimer",
		weight : "bold",
		style : "normal"
	    });
	    material = new THREE.MeshBasicMaterial({color : 0xffffff});
	    mesh = new THREE.Mesh(textGeo, material);
	    mesh.position.z = -1997;
	    mesh.position.y = -100;
	    mesh.position.x = 50;
	    scene.add(mesh);
	    
	    for(var i = 0; i < 5; i++){
		//les tables
		createTable(-1080, -800+i*550);
		createTable(1080, -800+i*550);
		createTable(-470, -800+i*550);
		createTable(470, -800+i*550);
		//les chaises
		createChaise(-1080+150, -650+i*550, 0);
		createChaise(-1080-150, -650+i*550, 0);
		createChaise(1080+150, -650+i*550, 0);
		createChaise(1080-150, -650+i*550, 0);
		createChaise(-470+150, -650+i*550, 0);
		createChaise(-470-150, -650+i*550, 0);
		createChaise(470+150, -650+i*550, 0);
		createChaise(470-150, -650+i*550, 0);
	    }
	    
	    //le bureau du prof
	    createBureau(0, -1500);
	    createChaise(0, -1650, 1);
	    
	    // le rendu
	    renderer = new THREE.WebGLRenderer();
	    renderer.setSize(window.innerWidth, window.innerHeight);

	    // on ajoute le rendu au body
	    document.body.appendChild(renderer.domElement);    
	}

	//l'évènement quand la souris bouge
	addEventListener("mousemove", onMouseMove, false);

	function onMouseMove(e){
	    var mouseX = (e.clientX - window.innerWidth/2)*10;
	    var mouseY = (e.clientY - window.innerHeight/2)*10;
	    camera.position.x = mouseX;
	    camera.position.z = mouseY;
	    camera.lookAt(scene.position);
	    renderer.render(scene, camera);
	}

	function createTable(posX, posZ){ //posX et posZ sont la coordonée du milieu du plateau de la table
	    //le plateau de la table
	    geometry = new THREE.BoxGeometry(table["table"]["plateau"][0], table["table"]["plateau"][1], table["table"]["plateau"][2]);
	    material = new THREE.MeshBasicMaterial({color : parseInt(table["table"]["couleur"], 16)});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = posX;
	    mesh.position.z = posZ;
	    mesh.position.y = -400+parseInt(table["table"]["pieds"][1])+parseInt(table["table"]["plateau"][1])/2;
	    scene.add(mesh);
	    //les pieds de la table
	    for(var i = 0; i < 4; i++){
		geometry = new THREE.BoxGeometry(table["table"]["pieds"][0], table["table"]["pieds"][1], table["table"]["pieds"][2]);
		material = new THREE.MeshBasicMaterial({color : parseInt(table["table"]["couleur"], 16)});
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = posX+((parseInt(table["table"]["plateau"][0])/2)-(parseInt(table["table"]["pieds"][0])/2))*Math.pow(-1, i);
		mesh.position.z = posZ+((parseInt(table["table"]["plateau"][2])/2)-parseInt(table["table"]["pieds"][2])/2)*Math.pow(-1, Math.floor(i/2));
		mesh.position.y = -400+parseInt(table["table"]["pieds"][1])/2;
		scene.add(mesh);
	    }
	}

	function createChaise(posX, posZ, type){ //posX et posZ sont la coordonée du milieu du plateau de la chaise; type vaut 0 ou 1
	    //le plateau de la chaise
	    geometry = new THREE.BoxGeometry(table["chaise"]["plateau"][0], table["chaise"]["plateau"][1], table["chaise"]["plateau"][2]);
	    material = new THREE.MeshBasicMaterial({color : parseInt(table["chaise"]["couleur"], 16)});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = posX;
	    mesh.position.z = posZ;
	    mesh.position.y = -400+parseInt(table["chaise"]["pieds"][1])+parseInt(table["chaise"]["plateau"][1])/2;
	    scene.add(mesh);
	    //le dossier de la chaise
	    geometry = new THREE.BoxGeometry(table["chaise"]["dossier"][0], table["chaise"]["dossier"][1], table["chaise"]["dossier"][2]);
	    material = new THREE.MeshBasicMaterial({color : parseInt(table["chaise"]["couleur"], 16)});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = posX;
	    if(type == 0) mesh.position.z = posZ+parseInt(table["chaise"]["plateau"][2])/2 - parseInt(table["chaise"]["dossier"][2])/2;
	    else mesh.position.z = posZ-parseInt(table["chaise"]["plateau"][2])/2 + parseInt(table["chaise"]["dossier"][2])/2;
	    mesh.position.y = -400+parseInt(table["chaise"]["pieds"][1])+parseInt(table["chaise"]["plateau"][1])+parseInt(table["chaise"]["dossier"][1])/2;
	    scene.add(mesh);
	    //les pieds de la chaise
	    for(var i = 0; i < 4; i++){
		geometry = new THREE.BoxGeometry(table["chaise"]["pieds"][0], table["chaise"]["pieds"][1], table["chaise"]["pieds"][2]);
		material = new THREE.MeshBasicMaterial({color : parseInt(table["chaise"]["couleur"], 16)});
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = posX+((parseInt(table["chaise"]["plateau"][0])/2)-(parseInt(table["chaise"]["pieds"][0])/2))*Math.pow(-1, i);
		mesh.position.z = posZ+((parseInt(table["chaise"]["plateau"][2])/2)-parseInt(table["chaise"]["pieds"][2])/2)*Math.pow(-1, Math.floor(i/2));
		mesh.position.y = -400+parseInt(table["chaise"]["pieds"][1])/2;
		scene.add(mesh);
	    }
	}

	function createBureau(posX, posZ){ //posX et posZ sont la coordonée du milieu du plateau du bureau
	    //le plateau du bureau
	    geometry = new THREE.BoxGeometry(table["bureau"]["plateau"][0], table["bureau"]["plateau"][1], table["bureau"]["plateau"][2]);
	    material = new THREE.MeshBasicMaterial({color : parseInt(table["bureau"]["couleur"], 16)});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = posX;
	    mesh.position.z = posZ;
	    mesh.position.y = -400+parseInt(table["bureau"]["pieds"][1])+parseInt(table["bureau"]["plateau"][1])/2;
	    scene.add(mesh);
	    //panneau lateral de l'avant du bureau
	    geometry = new THREE.BoxGeometry(parseInt(table["bureau"]["plateau"][0])-2*parseInt(table["bureau"]["pieds"][0]), parseInt(table["bureau"]["pieds"][1])*(3/4), parseInt(table["bureau"]["pieds"][2])/2);
	    material = new THREE.MeshBasicMaterial({color : parseInt(table["bureau"]["couleur"], 16)});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = posX;
	    mesh.position.z = posZ+(parseInt(table["bureau"]["plateau"][2])/2)-parseInt(table["bureau"]["pieds"][2])/4;
	    mesh.position.y = -400+parseInt(table["bureau"]["pieds"][1])-parseInt(table["bureau"]["pieds"][1])*(3/8);
	    scene.add(mesh);
	    //panneau lateral de gauche du bureau
	    geometry = new THREE.BoxGeometry(parseInt(table["bureau"]["pieds"][0])/2, parseInt(table["bureau"]["pieds"][1])*(3/4), parseInt(table["bureau"]["plateau"][2])-2*parseInt(table["bureau"]["pieds"][2]));
	    material = new THREE.MeshBasicMaterial({color : parseInt(table["bureau"]["couleur"], 16)});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = posX-(parseInt(table["bureau"]["plateau"][0])/2)+parseInt(table["bureau"]["pieds"][0])/4;
	    mesh.position.z = posZ;
	    mesh.position.y = -400+parseInt(table["bureau"]["pieds"][1])-parseInt(table["bureau"]["pieds"][1])*(3/8);
	    scene.add(mesh);
	    //panneau lateral de droit du bureau
	    geometry = new THREE.BoxGeometry(parseInt(table["bureau"]["pieds"][0])/2, parseInt(table["bureau"]["pieds"][1])*(3/4), parseInt(table["bureau"]["plateau"][2])-2*parseInt(table["bureau"]["pieds"][2]));
	    material = new THREE.MeshBasicMaterial({color : parseInt(table["bureau"]["couleur"], 16)});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = posX+(parseInt(table["bureau"]["plateau"][0])/2)-parseInt(table["bureau"]["pieds"][0])/4;
	    mesh.position.z = posZ;
	    mesh.position.y = -400+parseInt(table["bureau"]["pieds"][1])-parseInt(table["bureau"]["pieds"][1])*(3/8);
	    scene.add(mesh);
	    //les pieds du bureau
	    for(var i = 0; i < 4; i++){
		geometry = new THREE.BoxGeometry(table["bureau"]["pieds"][0], table["bureau"]["pieds"][1], table["bureau"]["pieds"][2]);
		material = new THREE.MeshBasicMaterial({color : parseInt(table["bureau"]["couleur"], 16)});
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = posX+((parseInt(table["bureau"]["plateau"][0])/2)-(parseInt(table["bureau"]["pieds"][0])/2))*Math.pow(-1, i);
		mesh.position.z = posZ+((parseInt(table["bureau"]["plateau"][2])/2)-parseInt(table["bureau"]["pieds"][2])/2)*Math.pow(-1, Math.floor(i/2));
		mesh.position.y = -400+parseInt(table["bureau"]["pieds"][1])/2;
		scene.add(mesh);
	    }
	}

	function createFenetre(posZ){ //posZ sont la coordonée z du milieu de la fenetre
	    geometry = new THREE.CubeGeometry(5, 400, 400);
	    material = new THREE.MeshBasicMaterial({transparent: true, wireframe: false, opacity: 0.5, color: 0xEDF7F2});
	    mesh = new THREE.Mesh(geometry, material);
	    mesh.position.x = -1400;
	    mesh.position.z = posZ;
	    scene.add(mesh);

	}
    });