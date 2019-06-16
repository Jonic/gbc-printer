import Byte from './Byte'
import chunk from 'chunk'
import hexToBinary from 'hex-to-binary'

// eslint-disable-next-line no-magic-numbers
const MIN_BYTES_LENGTH = 8
// eslint-disable-next-line no-magic-numbers
const SKIP_X_INDICES = [0, 1, 18, 19]
// eslint-disable-next-line no-magic-numbers
const SKIP_Y_INDICES = [0, 1, 16, 17]

class Tile {
  constructor({ ignoreBorder, isDevMode, tileData, tileX, tileY }) {
    this.ignoreBorder = ignoreBorder
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
    delete this.tileX
    delete this.tileY
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
    let isValid = this.bytes.length === MIN_BYTES_LENGTH

    if (this.ignoreBorder) {
      isValid =
        SKIP_X_INDICES.indexOf(this.tileX) === -1 &&
        SKIP_Y_INDICES.indexOf(this.tileY) === -1
    }

    return isValid
  }

  prepareData() {
    this.tileData = this.rawData.split(' ').map(hexToBinary)
  }

  validateBytes() {
    this.bytes = this.bytes.filter(byte => byte.isValid())
  }
}

export default Tile
