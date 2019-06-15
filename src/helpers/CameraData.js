/*
  The Gameboy screen displayed 20 tiles horizontally,
  and 18 vertically, for a resotion of 160*144 pixels

  One data line is 16 pairs of HEX digits, representing one TILE of gameboy graphics data

  Say for example we have two pairs of hex values:

  lo byte = 7C
  hi byte = C6

  For each, to decimal:

  lo byte = 7C = 124
  hi byte = C6 = 198

  ...and then to binary we get an 8 digit binary number:

  lo byte = 7C = 124 = 01111100
  hi byte = C6 = 198 = 11000110

  We the loop through and compare each of their digits in the binary numbers

  Depending on how the lo and hi bits match up with assign them a new value:

  lo = 0, hi = 0 | 0
  lo = 1, hi = 0 | 1
  lo = 0, hi = 1 | 2
  lo = 1, hi = 1 | 3

  lo: 0 1 1 1 1 1 0 0
  hi: 1 1 0 0 0 1 1 0
      2 3 1 1 1 3 2 0

  the resulting values 0, 1, 2, 3 tell the Gameboy which shade of grey to show

  images = [
    image = [
      360 * tiles = [
        8 * [lo-hex, hi-hex]
      ]
    ]
  ]
*/

import hexToBinary from 'hex-to-binary'

const SPLIT_DELIMITER = '# Finished Pretending To Print for fun!'

export const cameraDataDecodeBytes = (loByte, hiByte) => {
  const decodedBits = []

  for (let bitIndex = 0; bitIndex < loByte.length; bitIndex += 1) {
    let loBit = loByte[bitIndex]
    let hiBit = hiByte[bitIndex]
    // eslint-disable-next-line no-bitwise
    decodedBits.push((hiBit << 1) | loBit)
  }

  return decodedBits
}

export const cameraDataDecodeTile = tile => {
  const bytes = tile.split(' ').map(byte => hexToBinary(byte))
  const decodedBytes = []

  for (let byteIndex = 0; byteIndex < bytes.length - 1; byteIndex += 2) {
    let loByte = bytes[byteIndex]
    let hiByte = bytes[byteIndex + 1]
    decodedBytes.push(cameraDataDecodeBytes(loByte, hiByte))
  }

  return decodedBytes
}

export const cameraDataProcess = data => {
  const images = data.split(SPLIT_DELIMITER)
  const decodedImages = []

  for (let image of images) {
    let tiles = image
      .split('\n')
      .filter(tile => tile.length > 1 && !/!|#/.test(tile))

    if (!tiles.length) {
      continue
    }

    let decodedImage = []
    decodedImage = tiles.map(cameraDataDecodeTile)
    decodedImages.push(decodedImage)
  }

  return decodedImages
}

const CameraDataHelper = {
  cameraDataProcess,
}

export default CameraDataHelper
