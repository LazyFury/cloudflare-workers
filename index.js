const qr = require('qr-image')
const querystring = require('querystring')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let url = new URL(request.url)
  if (url.pathname == '/generator') {
    if (request.method == 'GET') {
      return await generatorQr(request)
    }
    return new Response('method not allowed', { status: 405 })
  } else {
    return new Response('route not found', { status: 404 })
  }
}

/**
 * 生成二维码
 * @param {Request} request
 */
const generatorQr = request => {
  let query = (request.url.split('?') || [])[1]
  if (!query) {
    return new Response('params is required', { status: 400 })
  }
  let url = querystring.parse(query || '', '&', '=')
  if (!url.text) {
    return new Response('params {text} is required', { status: 400 })
  }
  if (url.text.length > 300) {
    return new Response('text is too long', { status: 414 })
  }
  if (url.text) {
    return new Response(
      qr.imageSync(url.text || '', {
        type: 'png',
        margin: 1,
        parse_url: true,
      }),
      {
        status: 200,
        headers: { 'content-type': 'image/png' },
      },
    )
  } else {
    return new Response('text can not be empty', { status: 400 })
  }
}
