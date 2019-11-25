const { spawn } = require('child_process');

const createOrchestrator = (port) => {
    let server;
    const clients = new Map();

    const startServer = () => {
        server = spawn('node', ['index.js', port]);
        return server;
    };

    const killServer = () => server.kill();

    const startClient = (name) => {
        if (clients.has(name)) return clients.get(name);
        const client = spawn('telnet', ['localhost', port]);
        clients.set(name, client);
        return client;
    };

    const killClient = (name) => {
        const client = clients.get(name);
        if (client) {
            client.kill();
            clients.delete(name);
        }
    };

    const killAllClients = () => {
        Array.from(clients).forEach(([, client])=> client.kill());
        clients.clear();
    };

    const getClient = (name) => {
        return clients.get(name);
    };

    const getOtherClients = (name) => {
        return Array.from(clients).filter(([e]) => e !== name).map(([,client]).client)
    }

    return {
        startServer,
        killServer,
        startClient,
        killClient,
        killAllClients,
        getClient,
        getOtherClients,
    }
};

module.exports = createOrchestrator;
