const WAIT_UNIT = 100;

const spyProcessEvents = (proc) => {
    const toSpyCallback = (obj, ...events) => events.reduce((acc, evt) => {
        const cb = jest.fn();
        obj.on(evt, cb);
        const [ first, ...rest] = evt.split('');
        return { ...acc, [`on${first.toUpperCase()}${rest.join('')}`]: cb};
    }, {})

    return {
        ...toSpyCallback(
            proc,
            'error',
            'message',
            'disconnect',
            'exit',
            'close',
        ),
        ...toSpyCallback(
            proc.stdout,
            'data',
            'error',
            'end',
        )
    }

};

const toBuffer = (str) => Buffer.from(str, 'utf8');
const fromBuffer = (buff) => buff.toString();

const toValue = ([, value] = []) => value;
const toKey = ([key] = []) => key;
const isKey = (compare) => ([key]) => key === compare;
const not = (fn) => (...args) => !fn(...args);

const delay = (ms) => new Promise(ok => setTimeout(ok, ms));
const longWait = () => delay(WAIT_UNIT * 10);
const shortWait = () => delay(WAIT_UNIT);

module.exports = {
    spyProcessEvents,
    toBuffer,
    fromBuffer,
    toValue,
    toKey,
    isKey,
    not,
    delay,
    longWait,
    shortWait,
};