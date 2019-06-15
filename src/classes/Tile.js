import Byte from './Byte'
import chunk from 'chunk'
import hexToBinary from 'hex-to-binary'

class Tile {
  // eslint-disable-next-line no-magic-numbers
  MIN_BYTES_LENGTH = 8

  constructor({ tileData }) {
    this.prepareData(tileData)
    this.decodeBytes()
  }

  decodeBytes() {
    this.bytes = []

    // eslint-disable-next-line no-magic-numbers
    for (let bytesData of chunk(this.sourceTileData, 2)) {
      let byte = new Byte({ bytesData })

      if (byte.isValid()) {
        this.bytes.push(byte)
      }
    }
  }

  isValid() {
    return this.bytes.length === this.MIN_BYTES_LENGTH
  }

  prepareData(data) {
    this.rawData = data
    this.sourceTileData = data.split(' ').map(hexToBinary)
  }
}

export default Tile
