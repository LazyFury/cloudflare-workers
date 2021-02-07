import { HttpStatus } from './status'
const errCode = {}
export class HttpError {
  msg: string = ''
  code: number = -1
  data: any = null

  static ErrCode = errCode

  constructor(err: { msg: string; code?: number; data?: any }) {
    this.msg = err.msg
    this.code = err.code || -1
    this.data = err.data || null
  }

  toString() {
    return JSON.stringify(this)
  }

  response(httpCode = HttpStatus.OK): Response {
    return new Response(this.toString(), {
      status: httpCode,
    })
  }
}
