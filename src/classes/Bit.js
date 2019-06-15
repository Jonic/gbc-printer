class Bit {
  // eslint-disable-next-line no-magic-numbers
  HIGH_DECODED_BIT = 3
  LOW_DECODED_BIT = 0

  constructor({ bitIndex, highByte, lowByte }) {
    let highBit = highByte[bitIndex]
    let lowBit = lowByte[bitIndex]

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
