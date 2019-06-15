import Byte from './Byte'
import chunk from 'chunk'
import hexToBinary from 'hex-to-binary'

class Tile {
  constructor({ tileData }) {
    this.MIN_BYTES_LENGTH = 8
    this.sourceData = tileData
    this.tileData = this.prepareData()

    this.decodeBytes()
  }

  prepareData() {
    return this.sourceData.split(' ').map(hexToBinary)
  }

  decodeBytes() {
    this.bytes = []

    // eslint-disable-next-line no-magic-numbers
    for (let bytesData of chunk(this.tileData, 2)) {
      let byte = new Byte({ bytesData })

      if (byte.isValid()) {
        this.bytes.push(byte)
      }
    }
  }

  isValid() {
    return this.bytes.length === this.MIN_BYTES_LENGTH
  }
}

export default Tile
