const {
    After,
    AfterAll,
    Before,
    BeforeAll
} = require('cucumber');

const {
    connect,
    close,
    beginTransaction,
    endTransaction
} = require('../engine/pool');

BeforeAll(connect);

Before(beginTransaction);

Before('@ignore', () => 'skipped');

After(endTransaction);

AfterAll(close);
