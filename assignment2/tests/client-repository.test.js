const clientRepository = require('../src/client-repository');

const clientMock = () => ({
    write: jest.fn(),
    on: jest.fn(),
});

describe('clientRepository', () => {

    test('is a function', () => {
        expect(clientRepository).toEqual(expect.any(Function));
    });

    describe('count()', () => {
        test('count is 0 when just created', () => {
            const clients = clientRepository();
            expect(clients.count()).toEqual(0);
        });
    
        test('count is the number of registered clients', () => {
            const clients = clientRepository();
    
            clients.registerClient(clientMock());
            clients.registerClient(clientMock());
            clients.registerClient(clientMock());
    
            expect(clients.count()).toEqual(3);
        });
    });

    describe('registerClient()', () => {
        test('it throws when client is undefined', () => {
            const clients = clientRepository();
            const execution = () => clients.registerClient(undefined);
            expect(execution).toThrow();
        });
    
        test('it returns the id of the client', () => {
            const clients = clientRepository();
    
            const id = clients.registerClient(clientMock());
    
            expect(id).toEqual(expect.any(String));
        });
    });

    describe('dispatch()', () => {
        test('it throws when client does not exist', () => {
            const clients = clientRepository();
            const execution = () => clients.dispatch('unknow', 'any message');
            expect(execution).toThrow();
        });
    
        test('it writes on client\'s stream', () => {
            const clients = clientRepository();
            const client1 = clientMock();
            const clientId = clients.registerClient(client1);
            const message = 'any message';

            clients.dispatch(clientId, message);

            expect(client1.write).toHaveBeenCalledWith(message);
        });
    });

    describe('dispatchAll()', () => {
    
        test('it writes on every client\'s stream', () => {
            const clients = clientRepository();
            const client1 = clientMock();
            const client2 = clientMock();
            const client3 = clientMock();
            clients.registerClient(client1);
            clients.registerClient(client2);
            clients.registerClient(client3);
            const message = 'any message';

            clients.dispatchAll(message);

            expect(client1.write).toHaveBeenCalledWith(message);
            expect(client2.write).toHaveBeenCalledWith(message);
            expect(client3.write).toHaveBeenCalledWith(message);
        });
        
    });

});