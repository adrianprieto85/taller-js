/*const http = require('http');
const host = "localhost";
const port = "8090";
//create a server object:
http.createServer(function (req, res) {
    res.writeHead(200, {"Content-type": "text/html"});
    res.write('<h1> Hola Mundo </h1>'); //write a response to the client
    res.end(); //end the response
}).listen(port, host); //the server object listens on port 
*/

const express = require('express');
const path = __dirname;
const host = "localhost";

const app = express();
app.set('view engine','ejs');
app.set('views',path + '/plantillas');

const router = express.Router();
app.set('port', process.env.PORT || 8090);
router.use(function (req,res,next) {
    next();
});
router.get('/', function(req, res){
	res.sendFile(path + '/index.html');
});
router.get('/geo', function(req, res){
	res.sendFile(path + '/paginas/geomap/mapa.html');
});
router.get('/taller1', function(req, res){
	res.sendFile(path + '/paginas/taller1_coordenadas/index.html');
});
router.get('/taller2', function(req, res){
	res.sendFile(path + '/paginas/taller2oficinas/index.html');
});

//Todos los recursos que utilice la pagina html, como imagenes, estilos js, van a quedar almacenadas y disponibles en esa carpeta
app.use(express.static(__dirname + '/paginas'));
//Dirige directo al mapa
app.use('/', router);

app.use( (req,res,next)=>{
    res.end("<h1> 404 Not Found </h1>");
});

app.listen(app.get('port'), function(){
	console.log(`Listening at http://${host}:${app.get('port')}`);
});