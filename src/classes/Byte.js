import Bit from './Bit'

class Byte {
  constructor({ bytesData }) {
    this.BYTE_LENGTH = 8

    this.sourceData = bytesData
    this.bytesData = this.prepareData()

    this.decodeBits()
  }

  prepareData() {
    this.lowByte = this.sourceData[0]
    this.highByte = this.sourceData[1]
  }

  decodeBits() {
    this.bits = []

    for (let bitIndex = 0; bitIndex < this.BYTE_LENGTH; bitIndex += 1) {
      let bit = new Bit({
        ...bitIndex,
        lowByte: this.lowByte,
        highByte: this.highByte,
      })

      if (bit.isValid()) {
        this.bits.push(bit)
      }
    }
  }

  isValid() {
    return this.bits.length === this.BYTE_LENGTH
  }
}

export default Byte
