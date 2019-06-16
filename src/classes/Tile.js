import Byte from './Byte'
import chunk from 'chunk'
import hexToBinary from 'hex-to-binary'

// eslint-disable-next-line no-magic-numbers
const MIN_BYTES_LENGTH = 8

class Tile {
  constructor({ isDevMode, tileData, tileX, tileY }) {
    this.isDevMode = isDevMode
    this.rawData = tileData
    this.tileX = tileX
    this.tileY = tileY

    this.prepareData(tileData)
    this.decodeBytes()
    this.validateBytes()
    this.cleanUpData()
  }

  cleanUpData() {
    if (this.isDevMode) {
      return
    }

    delete this.rawData
    delete this.ignoreBorder
    delete this.isDevMode
    delete this.tileData
  }

  decodeBytes() {
    this.bytes = chunk(this.tileData, 2).map(bytesData => {
      return new Byte({
        bytesData: bytesData,
        isDevMode: this.isDevMode,
      })
    })
  }

  isValid() {
    return this.bytes.length === MIN_BYTES_LENGTH
  }

  prepareData() {
    this.tileData = this.rawData.split(' ').map(hexToBinary)
  }

  validateBytes() {
    this.bytes = this.bytes.filter(byte => byte.isValid())
  }
}

export default Tile
