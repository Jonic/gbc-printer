class Bit {
  constructor({ bitIndex, lowByte, highByte }) {
    this.LOW_DECODED_BIT = 0
    this.HIGH_DECODED_BIT = 3

    let lowBit = lowByte[bitIndex]
    let highBit = highByte[bitIndex]

    // eslint-disable-next-line no-bitwise
    this.value = (highBit << 1) | lowBit
  }

  isValid() {
    return (
      this.value >= this.LOW_DECODED_BIT && this.value <= this.HIGH_DECODED_BIT
    )
  }
}

export default Bit
