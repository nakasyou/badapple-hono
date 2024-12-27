import sharp from 'sharp'

export const processImage = async (
  webp: Uint8Array,
  outputHeight: number,
) => {
  const im = await sharp(webp)
  const metadata = await im.metadata()

  const { width, height } = metadata
  if (!width || !height) throw new Error('Invalid image dimensions')

  const pixelData = await im.raw().toBuffer()
  const getPixel = (x: number, y: number) => {
    const index = (y * width + x) * 3
    return {
      r: pixelData[index],
      g: pixelData[index + 1],
      b: pixelData[index + 2],
      //a: pixelData[index + 3],
    }
  }

  const outputWidth = Math.ceil((outputHeight * width) / height)

  let result = ''
  for (let y = 0; y < outputHeight; y++) {
    for (let x = 0; x < outputWidth; x++) {
      const { r, g, b } = getPixel(
        Math.floor((x * width) / outputWidth),
        Math.floor((y * height) / outputHeight),
      )
      const brightness = (r + g + b) / 3
      const char = ' .:-=+*#%$@'[Math.floor(brightness / 32)]
      result += char + char
    }
    result += '\n'
  }
  return result
}
