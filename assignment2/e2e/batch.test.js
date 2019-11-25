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
const DONNY = 'donny';
const SMOKEY = 'smokey';

const orchestrator = createOrchestrator(PORT);

describe('Batch message testing', () => {

    describe('Scenario: world of pain', () => {

        const script = [
            [DONNY, "Woohoo...I'm slammin them tonight. You guys are dead in the water!!"],
            [WALT, "Alright! Way to go, Donny! If you will it, it is no dream."],
            [DUDE, "You're fucking twenty minutes late, man. What the fuck is that?"],
            [WALT, "Theodore Herzel"],
            [WALT, "Fucking dog has fucking papers, --Over the line!"],
            [SMOKEY, "Huh?"],
            [WALT, "I'm sorry Smokey, You were over the line, that's a foul."],
            [SMOKEY, "Bullshit. Mark it eight Dude."],
            [WALT, "Excuse me! Mark it zero. Next frame."],
        ];
        const characters = [DONNY, WALT, DUDE, SMOKEY];

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

        test('sender does\'n receive his messages', async () => {

            const spies = characters
                .map((name) => [name, orchestrator.getClient(name)])
                .map(([name, client]) => [name, spyProcessEvents(client)]);

            for (let [name, line] of script) {
                await shortWait();
                const client = orchestrator.getClient(name);
                client.stdin.write(line);
            };

            await longWait();

            for (let [name, line] of script) {
                const him = toValue(spies.find(isKey(name)))
                expect(him.onData).not.toHaveBeenCalledWith(b(line));
            };


        });

        test('everybody receive messages', async () => {

            const spies = characters
                .map((name) => [name, orchestrator.getClient(name)])
                .map(([name, client]) => [name, spyProcessEvents(client)]);

            for (let [name, line] of script) {
                await shortWait();
                const client = orchestrator.getClient(name);
                client.stdin.write(line);
            };

            await longWait();

            for (let [name, line] of script) {
                const them = spies.filter(not(isKey(name))).map(toValue);
                them.forEach((spied) => expect(spied.onData).toHaveBeenCalledWith(b(line)))
            };

        });

    });

});