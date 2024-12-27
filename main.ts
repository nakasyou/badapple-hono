import { Hono } from 'hono'
import { streamText } from 'hono/streaming'

const processed: string[] = JSON.parse(
  await Deno.readTextFile('./processed.json'),
)

const app = new Hono()

app.get('/stream', (c) => {
  return streamText(c, async (stream) => {
    for (let i = 3; i >= 0; i--) {
      await stream.write(i.toString())
      await stream.sleep(1000)
    }
    const startedTime = Date.now()
    for (let i = 1; i <= 6572; i++) {
      /*const splitted = processed[i - 1].split('\n')
      let frame = '\n\n'
      for (let j = 0; j < splitted.length; j++) {
        frame += '   ' + splitted[j] + '\n'
      }*/
      const frame = '\n\n' + processed[i - 1]
      await stream.write(frame)
      const expectedTime = startedTime + i * 1000 / 30
      const crrTime = Date.now()
      if (expectedTime > crrTime) {
        await stream.sleep(expectedTime - crrTime)
      }
    }
  })
})

export default app
