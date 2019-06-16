import Bit from './Bit'

class Byte {
  // eslint-disable-next-line no-magic-numbers
  BYTE_LENGTH = 8

  constructor({ bytesData, isDevMode }) {
    this.isDevMode = isDevMode
    this.rawData = bytesData

    this.prepareData()
    this.decodeBits()
    this.cleanUpData()
  }

  cleanUpData() {
    if (this.isDevMode) {
      return
    }

    delete this.bytesData
    delete this.rawData
  }

  decodeBits() {
    this.bits = []

    for (let bitIndex = 0; bitIndex < this.BYTE_LENGTH; bitIndex += 1) {
      let bit = new Bit({
        bitIndex,
        bytesData: this.bytesData,
        isDevMode: this.isDevMode,
      })

      if (bit.isValid()) {
        this.bits.push(bit)
      }
    }
  }

  isValid() {
    return this.bits.length === this.BYTE_LENGTH
  }

  prepareData() {
    this.bytesData = this.rawData
  }
}

export default Byte
