jest.setTimeout(100000);

const createOrchestrator = require('./orchestrator');
const {
    spyProcessEvents,
    toBuffer: b,
    toValue,
    isKey,
    not,
    longWait,
    shortWait,
} = require('./utils');

const PORT = 10001;

const DUDE = 'dude';
const WALT = 'walt';

const orchestrator = createOrchestrator(PORT);


describe('Sequence message testing', () => {

    describe('Scenario: calmer than you are', () => {

        const script = [
            [DUDE, "You can't do that man. These guys, you know, they're like me, they're pacifists. Smokey was a conscientious objector."],
            [WALT, "You know Dude, I myself dabbled with pacifism at one point. Not in Nam, of course--"],
            [DUDE, "And you know he's got emotional problems man!"],
        ];
        const characters = [WALT, DUDE];

        beforeEach(async () => {
            orchestrator.startServer();

            await longWait();

            characters.forEach(orchestrator.startClient)

            await longWait();
        })

        afterEach(async () => {
            orchestrator.killAllClients();
            orchestrator.killServer();

            await longWait();
        });

        test('messages are red in sequence', async () => {

            const spies = [WALT, DUDE]
                .map((name) => [name, orchestrator.getClient(name)])
                .map(([name, client]) => [name, spyProcessEvents(client)]);

            for (let [name, line] of script) {

                await shortWait()

                const him = toValue(spies.find(isKey(name)))
                const other = toValue(spies.find(not(isKey(name))));
                
                him.onData.mockClear();
                other.onData.mockClear();

                const client = orchestrator.getClient(name);
                await shortWait()

                client.stdin.write(line);

                await shortWait()

                expect(him.onData).not.toHaveBeenCalled();
                expect(other.onData).toHaveBeenCalledWith(b(line));
            };

            orchestrator.killAllClients();

        });

        test('messages appears in the correct order', async () => {

            const spies = [WALT, DUDE]
                .map((name) => [name, orchestrator.getClient(name)])
                .map(([name, client]) => [name, spyProcessEvents(client)]);

            const calls = (spy) => spy.mock.calls || [];
            
            for (let [name, line] of script) {
            
                await shortWait();

                const him = toValue(spies.find(isKey(name)));
                const other = toValue(spies.find(not(isKey(name))));

                const himCounter = calls(him.onData).length;
                const otherCounter = calls(other.onData).length;

                const client = orchestrator.getClient(name);
                client.stdin.write(line);

                await shortWait();

                expect(calls(him.onData).length).toEqual(himCounter);
                expect(calls(other.onData).length).toEqual(otherCounter + 1);
            };
            
        });

    });


});