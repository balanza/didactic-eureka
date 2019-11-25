const server = require('./src/server');
const clientRepository = require('./src/client-repository');
const { shutdown, failure, welcome } = require('./src/messages');

const [,, port = 10000] = process.argv;

const { registerClient, dispatchAll, dispatch, count } = clientRepository();

server({ port })
    .on('connected', () => console.log(`>> Up&Running on port ${port}`))
    .on('client', (client) => {
        const clientId = registerClient(client);
        dispatch(clientId, welcome(count()))
        console.log('new client joined', clientId);
    })
    .on('error', (err) => {
        dispatchAll(failure());
        terminate(err);
    })

process.on('SIGINT', (err) => {
    dispatchAll(shutdown());
    terminate();
});

const terminate = (reason) => {
    if (reason) {
        console.error('Terminating chat, reason:', reason);
        process.exit(1);
    } else {
        console.error('Shutting down');
        process.exit(0);
    }
};