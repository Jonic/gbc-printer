import Bit from './Bit'

class Byte {
  // eslint-disable-next-line no-magic-numbers
  BYTE_LENGTH = 8

  constructor({ bytesData }) {
    this.prepareData(bytesData)
    this.decodeBits()
  }

  decodeBits() {
    this.bits = []

    for (let bitIndex = 0; bitIndex < this.BYTE_LENGTH; bitIndex += 1) {
      let bit = new Bit({
        bitIndex,
        highByte: this.sourceHighByte,
        lowByte: this.sourceLowByte,
      })

      if (bit.isValid()) {
        this.bits.push(bit)
      }
    }
  }

  isValid() {
    return this.bits.length === this.BYTE_LENGTH
  }

  prepareData(data) {
    this.rawData = data
    this.sourceLowByte = this.rawData[0]
    this.sourceHighByte = this.rawData[1]
  }
}

export default Byte
