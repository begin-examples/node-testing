// eslint-disable-next-line import/no-unresolved
const tiny = require('tiny-json-http')
// eslint-disable-next-line import/no-unresolved
const test = require('tape')

const baseUrl = process.env.STAGING_URL

test('Request /api', async (t) => {
  t.plan(1)
  try {
    const result = await tiny.get({ url: baseUrl + '/api' })
    t.ok(result.body, 'request to /api responded')
  }
  catch (e) {
    t.fail('request to /api failed')
  }
})
