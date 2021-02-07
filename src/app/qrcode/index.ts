import { HttpError } from '../../error'
import { HttpStatus } from '../../status'
const qr = require('qr-image')
const querystring = require('querystring')
/**
 * 生成二维码
 * @param {Request} request
 */
function generateQr(request: Request): Response {
  let query = (request.url.split('?') || [])[1]
  // if (!query) {
  //   return new Error({ msg: 'query is required' }).response()
  // }
  let url = querystring.parse(query || '', '&', '=')
  if (!url.text) {
    return new HttpError({ msg: 'query params {text} is required' }).response()
  }
  if (url.text.length > 300) {
    return new HttpError({ msg: 'text is too long' }).response()
  }
  return new Response(
    qr.imageSync(url.text || '', {
      type: 'png',
      margin: 1,
      parse_url: true,
    }),
    {
      status: HttpStatus.OK,
      headers: { 'content-type': 'image/png' },
    },
  )
}
export { generateQr }
