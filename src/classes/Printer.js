/* eslint-disable no-magic-numbers */
import chunk from 'chunk'
import hexToBinary from 'hex-to-binary'
import uuidv4 from 'uuid/v4'

export default class Printer {
  SPLIT_DELIMITER = '# Finished Pretending To Print for fun!'
  TILE_SIZE = 8
  TILES_X = 20
  TILES_Y = 18

  constructor({ cameraData }) {
    this.cameraDataImages = this.prepareImages(cameraData)
    this.images = this.cameraDataImages.map(this.decodeImage)
  }

  decodeBytes = bytesPair => {
    const bits = []
    const [leftByte, rightByte] = bytesPair.map(hexToBinary)

    for (let bitIndex = 0; bitIndex < this.TILE_SIZE; bitIndex += 1) {
      const leftBit = leftByte[bitIndex]
      const rightBit = rightByte[bitIndex]
      // eslint-disable-next-line no-bitwise
      bits.push((rightBit << 1) | leftBit)
    }

    return bits.join('')
  }

  decodeImage = image => {
    const decodedBytes = image.map(this.decodeBytes)
    const decodedTiles = chunk(decodedBytes, this.TILE_SIZE)

    let byteOffsetY = 0
    let tileOffsetX = 0
    let tileOffsetY = 0
    let decodedPixels = new Array(this.TILES_Y * this.TILE_SIZE).fill('')

    for (let tile of decodedTiles) {
      byteOffsetY = 0

      for (let byte of tile) {
        decodedPixels[byteOffsetY + tileOffsetY * this.TILE_SIZE] += byte
        byteOffsetY += 1
      }

      tileOffsetX += 1

      if (tileOffsetX === this.TILES_X) {
        tileOffsetX = 0
        tileOffsetY += 1
      }
    }

    return { pixels: decodedPixels, uuid: uuidv4() }
  }

  prepareImages = cameraData => {
    return cameraData.split(this.SPLIT_DELIMITER).map(this.sanitiseImage)
  }

  sanitiseImage = image => {
    let sanitisedImage = image
      .split(/\n/)
      .filter(line => line.length > 1 && !/!|#/.test(line))
      .join(' ')
      .split(' ')

    return sanitisedImage.length > 0 && chunk(sanitisedImage, 2)
  }
}
