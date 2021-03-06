let test = require('tape')
let tiny = require('tiny-json-http')
let sandbox = require('@architect/sandbox')
let url = 'http://localhost:6666/api'

/**
 * Sandbox / http test
 * - Demonstrates execising basic web integration tests using the local dev server
 */
test('Set up env', t => {
  t.plan(1)
  t.ok(sandbox, 'sandbox loaded')
})

test('Start the Sandbox', async t => {
  t.plan(1)
  let result = await sandbox.start()
  t.equal(result, 'Sandbox successfully started')
})

test('get /api (continuation-passing style)', t => {
  t.plan(1)
  tiny.get({url},
  function win (err, result) {
    if (err) {
      t.fail(err)
      if (err.message.includes('404') || err.code === 'ECONNREFUSED')
        console.log(didNotLoad)
    } else {
      t.ok(result, 'Got result', console.log(result.body.toString().substring(0,50) + '...'))
    }
  })
})

test('get /api (promise style)', t => {
  t.plan(1)
  tiny.get({url})
    .then(function win (result) {
      t.ok(result, 'Got result:', console.log(result.body.toString().substring(0,50) + '...'))
    })
    .catch(function fail (err) {
      t.fail(err)
      if (err.message.includes('404') || err.code === 'ECONNREFUSED')
        console.log(didNotLoad)
    })
})

test('get /api (async/await style)', async t => {
  t.plan(1)
  try {
    let result = await tiny.get({url})
    t.ok(result, 'Got result:', console.log(result.body.toString().substring(0,50) + '...'))
  } catch (err) {
    t.fail(err)
    if (err.message.includes('404') || err.code === 'ECONNREFUSED')
      console.log(didNotLoad)
  }
})

test('Shut down the Sandbox', async t => {
  t.plan(1)
  let result = await sandbox.end()
  t.equal(result, 'Sandbox successfully shut down')
})

let didNotLoad = 'You are likely seeing 404 or ECONNREFUSED errors because you do not have a `get /api` HTTP function and also do not have a `public/index.html` file\nPlease make use of one or the other to respond to web requests at the root of your application'
