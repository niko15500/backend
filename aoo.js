
require('dotenv').config();
const Server = require('./servidor');

const server = new Server();

server.listen();