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

export const cameraDataDecode = image => {
  return image
}

export const cameraDataProcess = data => {
  const images = cameraDataSanitise(data)
  const proccessedImages = []

  for (let image of images) {
    proccessedImages.push(cameraDataDecode(image))
  }

  return proccessedImages
}

export const cameraDataSanitise = data => {
  let imagesArray = []
  let imagesArrayIndex = 0
  let lines = data.split(/\n/)

  imagesArray.push([])

  for (let line of lines) {
    if (!line.length) {
      continue
    }

    if (line.indexOf('Finished') > -1) {
      imagesArrayIndex += 1
      imagesArray.push([])
      continue
    }

    if (/!|#/.test(line)) {
      continue
    }

    if (line.indexOf(' -> ') > -1) {
      line = line.split(' -> ')[1]
    }

    imagesArray[imagesArrayIndex].push(line.split(' '))
  }

  return imagesArray
}

const CameraDataHelper = {
  cameraDataDecode,
  cameraDataProcess,
  cameraDataSanitise,
}

export default CameraDataHelper
