const qr = require('qr-image')
const qs = require('qs')
const querystring = require('querystring')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if (request.method == 'GET') {
    try {
      let url = querystring.parse(request.url.split('?')[1], '&', '=')
      return new Response(qr.imageSync(url.text || ''), {
        status: 200,
        headers: { 'content-type': 'image/png' },
      })
    } catch (e) {
      return new Response(e, { status: 500 })
    }
  }

  return new Response('method not allowed', { status: 405 })
}
