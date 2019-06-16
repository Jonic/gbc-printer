import Bit from './Bit'

// eslint-disable-next-line no-magic-numbers
const BYTE_LENGTH = 8

class Byte {
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
    delete this.ignoreBorder
    delete this.isDevMode
    delete this.rawData
  }

  decodeBits() {
    this.bits = []

    for (let bitIndex = 0; bitIndex < BYTE_LENGTH; bitIndex += 1) {
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
    return this.bits.length === BYTE_LENGTH
  }

  prepareData() {
    this.bytesData = this.rawData
  }
}

export default Byte
