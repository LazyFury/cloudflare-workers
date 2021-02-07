import { Router } from '../router'
import { HttpError } from '../error'
import { generateQr as qr } from './qrcode'
const app = () => {
  let handler = new Router()

  handler.addHandler({ Methods: 'GET', URL: '/qr', HandleFunc: qr })

  handler.addHandler({
    Methods: 'GET',
    URL: '/request-info',
    HandleFunc: function(request: Request): Response {
      return new HttpError({ msg: 'request info', data: request }).response()
    },
  })

  return handler
}
export { app }
