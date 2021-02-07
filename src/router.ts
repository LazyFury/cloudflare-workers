import { HttpError } from './error'
import { HttpStatus } from './status'
interface Handler {
  Methods: string
  URL: string
  HandleFunc: (request: Request) => Response
}

interface handlerMapInterface {
  [key: string]: {
    [key: string]: Handler
  }
}
export class Router {
  handler: Handler[] = []
  constructor() {
    this.addHandler({
      Methods: 'GET',
      URL: '/all',
      HandleFunc: (request: Request): Response => {
        return new HttpError({ msg: 'err', data: this.handlerMap }).response()
      },
    })
  }

  get handlerMap(): handlerMapInterface {
    let obj: handlerMapInterface = {}
    this.handler.forEach(h => {
      obj[h.URL] = {
        [h.Methods]: h,
      }
    })
    return obj
  }

  handleRequest(request: Request): Response {
    let method = request.method
    let path = new URL(request.url).pathname
    let handlerGroup = this.handlerMap[path]
    if (handlerGroup) {
      let handler = handlerGroup[method]
      if (handler) {
        return handler.HandleFunc(request)
      }
      return new HttpError({ msg: 'method not allowed' }).response(
        HttpStatus.MethodsNotAllowed,
      )
    }
    return new HttpError({ msg: 'route not found' }).response(
      HttpStatus.NotFound,
    )
  }

  addHandler(handler: Handler) {
    this.handler.push(handler)
  }
}
