import { giveMePi } from './modules/madhava-leibniz.js'

const ports = new Set()

function broadcastMessage(message) {
  for (const port of ports) {
    try {
      port.postMessage(message)
    } catch (err) {
      ports.delete(port)
    }
  }
}

onconnect = (connectEvent) => {
  const port = connectEvent.ports[0]
  ports.add(port)

  port.onmessage = (event) => {
    if (event.data === 'addition') {
      broadcastMessage('addition')
      return
    }
    const message = event.data
    console.debug(`worker got message: ${message}`)

    broadcastMessage('running')
    const pi = giveMePi(message)
    broadcastMessage(pi)
  }
}

onerror = (errorEvent) => {
  console.debug(`Error in sharedWorker: ${errorEvent.message}`)
}
