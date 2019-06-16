class Bit {
  // eslint-disable-next-line no-magic-numbers
  HIGH_DECODED_BIT = 3
  LOW_DECODED_BIT = 0

  constructor({ bitIndex, bytesData, isDevMode }) {
    this.isDevMode = isDevMode
    this.bitIndex = bitIndex
    this.rawData = bytesData

    this.prepareData()
    this.convertData()
    this.cleanUpData()
  }

  cleanUpData() {
    if (this.isDevMode) {
      return
    }

    delete this.bitIndex
    delete this.leftBit
    delete this.rawData
    delete this.rightBit
  }

  convertData() {
    // eslint-disable-next-line no-bitwise
    this.value = (this.rightBit << 1) | this.leftBit
  }

  isValid() {
    return (
      this.value >= this.LOW_DECODED_BIT && this.value <= this.HIGH_DECODED_BIT
    )
  }

  prepareData() {
    const leftByte = this.rawData[0]
    const rightByte = this.rawData[1]

    this.leftBit = leftByte[this.bitIndex]
    this.rightBit = rightByte[this.bitIndex]
  }
}

export default Bit
