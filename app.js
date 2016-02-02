import koa from 'koa';
import serve from 'koa-static';
import router from './router';
import path from 'path';
import socketIO from 'socket.io';
import http from 'http';
import config from './config'

const app = koa();
const server = http.createServer(app.callback());
const io = socketIO.listen(server);
const configure = config();

io.on('connection', (socket) => {
	socket.emit('open');

	socket.on('new message', (data) => {
		console.log(data);
		socket.broadcast.emit('new message', data);
	});
});

app.use(function *(next) {
	GLOBAL.navigator = {userAgent: this.headers['user-agent']};
	yield next;
});

app.use( serve( path.join(__dirname, 'www') ) );
app.use( router.routes() );

server.listen( configure.port, '0.0.0.0', (ser)=> {
	console.log('app listening on port %s...',  configure.port);
})
