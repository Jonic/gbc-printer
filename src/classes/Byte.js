import Bit from './Bit'

class Byte {
  // eslint-disable-next-line no-magic-numbers
  BYTE_LENGTH = 8

  constructor({ bytesData }) {
    this.sourceData = bytesData
    this.bytesData = this.prepareData()

    this.decodeBits()
  }

  decodeBits() {
    this.bits = []

    for (let bitIndex = 0; bitIndex < this.BYTE_LENGTH; bitIndex += 1) {
      let bit = new Bit({
        ...bitIndex,
        highByte: this.highByte,
        lowByte: this.lowByte,
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
    this.lowByte = this.sourceData[0]
    this.highByte = this.sourceData[1]
  }
}

export default Byte
