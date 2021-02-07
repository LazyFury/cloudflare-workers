import { HttpError } from './error'
interface Handler {
  Methods: string
  URL: string
  HandleFunc: (request: Request) => Response
}
export class Router {
  handler: Handler[] = []
  constructor() {}

  makeKey(method: string, url: string) {
    return `[${method.toUpperCase()}]:${url}`
  }

  get handlerMap(): { [key: string]: Handler } {
    let obj: { [key: string]: Handler } = {}
    this.handler.forEach(h => {
      obj[this.makeKey(h.Methods, h.URL)] = h
    })
    return obj
  }

  handleRequest(request: Request): Response {
    let method = request.method
    let path = new URL(request.url).pathname
    let handler = this.handlerMap[this.makeKey(method, path)]
    if (handler) {
      return handler.HandleFunc(request)
    }
    return new HttpError({ msg: 'err', data: this.handlerMap }).response()
  }

  addHandler(handler: Handler) {
    this.handler.push(handler)
  }
}
