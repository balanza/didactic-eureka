const m = (...msg) => msg.map((e) => `>> ${e}\n`).join('');

exports.welcome = (count = 1) => m(
    'Welcome to our chat!',
    count === 1 
        ? 'You are alone at the moment' 
        : `We are ${count} connected`,
);

exports.shutdown = () => m(
    'We\'re closing today!',
    'bye!',
);

exports.failure = () => m(
    'An error occurred on the server',
    'Please don\'t blame the developer!',
);
