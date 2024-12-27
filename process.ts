import { processImage } from './process-image.ts'

const processed: string[] = []
for (let i = 1; i <= 6572; i++) {
  const text = await processImage(
    await Deno.readFile(
      `./bad_apple/bad_apple/${i.toString().padStart(4, '0')}.webp`,
    ),
    35,
  )
  processed.push(text)

  console.log(`Processed ${i}/6572 frames`)
}

await Deno.writeTextFile('./processed.json', JSON.stringify(processed))
