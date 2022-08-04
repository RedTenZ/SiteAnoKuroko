const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);
console.log(process.env.PORT);

server.listen(process.env.PORT || 3000);
