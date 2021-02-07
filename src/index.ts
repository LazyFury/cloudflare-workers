import { app } from './app'

addEventListener('fetch', event => {
  event.respondWith(app().handleRequest(event.request))
})
