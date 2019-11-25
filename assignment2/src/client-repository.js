const uuid = require('uuid/v1');

const clientRepository = () => {

    const clients = new Map();

    const createClient = (client) => {
        const id = uuid();
        client.on('data', msg => others(id).forEach(client => sendMessage(client, msg)));
        client.on('end', () => clients.delete(id));
        clients.set(id, client);
        return id;
    }

    const others = id => Array.from(clients).filter(([key]) => key !== id).map(([,client]) => client);

    const sendMessage = (client, msg) => {
        return client.write(msg);
    }

    return { 
        registerClient: createClient,
        dispatch: (id, message) => sendMessage(clients.get(id), message),
        dispatchAll: (message) => Array.from(clients).forEach(([, client]) => sendMessage(client, message)),
        count: () => clients.size,
    }

};

module.exports = clientRepository;
