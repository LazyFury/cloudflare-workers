const qr = require('qr-image')
const querystring = require('querystring')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class Error {
  constructor({ msg = '', code = -1 }) {
    this.msg = msg
  }

  toString() {
    return JSON.stringify(this)
  }

  response(httpCode = 400) {
    return new Response(this.toString(), {
      status: httpCode,
    })
  }
}

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let url = new URL(request.url)
  if (url.pathname == '/qr') {
    if (request.method == 'GET') {
      return await generatorQr(request)
    }
    return new Error({ msg: 'method not allowed' }).response(405)
  } else {
    return new Error({ msg: 'route not found' }).response(404)
  }
}

/**
 * 生成二维码
 * @param {Request} request
 */
const generatorQr = request => {
  let query = (request.url.split('?') || [])[1]
  // if (!query) {
  //   return new Error({ msg: 'query is required' }).response()
  // }
  let url = querystring.parse(query || '', '&', '=')
  if (!url.text) {
    return new Error({ msg: 'query params {text} is required' }).response()
  }
  if (url.text.length > 300) {
    return new Error({ msg: 'text is too long' }).response()
  }
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
}
