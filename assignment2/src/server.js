const net = require('net');
const EventEmitter = require('events').EventEmitter;

module.exports = ({ port }) => {

    const emitter = new EventEmitter();
    const server = net.createServer((client) => emitter.emit('client', client));
    server.on('error', (err) => emitter.emit('error', err));
    server.listen(port, () => emitter.emit('connected'));

    return emitter;
};