const test = require('node:test');
const assert = require('node:assert');
const { once } = require('node:events');
const app = require('../src/app');

test('Check application response', async (t) => {
    const server = app.listen(0, '127.0.0.1');

    await once(server, 'listening');
    t.after(() => server.close());

    const url = `http://127.0.0.1:${server.address().port}/`;
    const response = await fetch(url);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.message, 'Hello from DevOps Intern Task!');
    assert.equal(data.status, 'running');
});
