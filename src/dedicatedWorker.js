import { giveMePi } from './modules/madhava-leibniz.js'

onmessage = (event) => {
  const seconds = event.data
  console.debug(`worker got message: ${seconds}`)
  const pi = giveMePi(seconds)
  postMessage(pi)
}

onerror = (errorEvent) => {
  console.debug(`Error in worker: ${errorEvent.message}`)
}
