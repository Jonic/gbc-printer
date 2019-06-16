import Byte from './Byte'
import chunk from 'chunk'
import hexToBinary from 'hex-to-binary'

class Tile {
  // eslint-disable-next-line no-magic-numbers
  MIN_BYTES_LENGTH = 8

  constructor({ isDevMode, tileData, tileX, tileY }) {
    this.isDevMode = isDevMode
    this.rawData = tileData
    this.tileX = tileX
    this.tileY = tileY

    this.prepareData(tileData)
    this.decodeBytes()
    this.cleanUpData()
  }

  cleanUpData() {
    if (this.isDevMode) {
      return
    }

    delete this.rawData
    delete this.tileData
  }

  decodeBytes() {
    this.bytes = []

    // eslint-disable-next-line no-magic-numbers
    for (let bytesData of chunk(this.tileData, 2)) {
      let byte = new Byte({
        bytesData,
        isDevMode: this.isDevMode,
      })

      if (byte.isValid()) {
        this.bytes.push(byte)
      }
    }
  }

  isValid() {
    return this.bytes.length === this.MIN_BYTES_LENGTH
  }

  prepareData() {
    this.tileData = this.rawData.split(' ').map(hexToBinary)
  }
}

export default Tile
