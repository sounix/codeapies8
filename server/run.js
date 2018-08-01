import debug from 'debug';
import http from 'http';
import chalk from 'chalk';
import 'babel-register';
import app from './app';

debug(`reaper-ewjn:server`)
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
 
  debug('http');
  debug(`Listening on ${chalk.green(`http://127.0.0.1:${addr.port}`)}`);
  
  console.debug(`${chalk.green(`
                     /$$ /$$                    
                    | $$|__/                    
  /$$$$$$  /$$$$$$$ | $$ /$$ /$$$$$$$   /$$$$$$ 
 /$$__  $$| $$__  $$| $$| $$| $$__  $$ /$$__  $$
| $$  \\ $$| $$  \\ $$| $$| $$| $$  \\ $$| $$$$$$$$
| $$  | $$| $$  | $$| $$| $$| $$  | $$| $$_____/
|  $$$$$$/| $$  | $$| $$| $$| $$  | $$|  $$$$$$$
 \______/ |__/  |__/|__/|__/|__/  |__/ \_______/

 ${chalk.green(`Reaper-EWJN v1.0.0 live`)}
 Listening on ${chalk.blue(`http://127.0.0.1:${addr.port}/api/v1/
 ${chalk.red(`Ctrl + C para Salir`)}`)}`)} \n`);
}

let port = normalizePort(process.env.ENV_PORT || '3000');
app.set('port', port);

let server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);