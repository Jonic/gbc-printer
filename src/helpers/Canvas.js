/* eslint-disable no-magic-numbers */
const PIXEL_COLORS = ['#ffffff', '#aaaaaa', '#555555', '#000000']

export const getCanvasDimensions = ({ ignoreBorder, pixels, pixelSize }) => {
  const rowsCount = pixels.length
  const colsCount = pixels[0].length

  let canvasHeight = rowsCount * pixelSize
  let canvasWidth = colsCount * pixelSize

  if (ignoreBorder) {
    canvasHeight -= 32 * pixelSize
    canvasWidth -= 32 * pixelSize
  }

  return { canvasHeight, canvasWidth }
}

export const getRectPositions = ({
  colIndex,
  ignoreBorder,
  pixelSize,
  rowIndex,
}) => {
  let rectX = colIndex * pixelSize
  let rectY = rowIndex * pixelSize

  if (ignoreBorder) {
    rectX -= 16 * pixelSize
    rectY -= 16 * pixelSize
  }

  return { rectX, rectY }
}

export const CanvasDrawImage = ({
  ignoreBorder,
  imageCanvas,
  pixels,
  pixelSize,
}) => {
  const canvas = imageCanvas.current
  const context = imageCanvas.current.getContext('2d')

  const { canvasHeight, canvasWidth } = getCanvasDimensions({
    ignoreBorder,
    pixels,
    pixelSize,
  })

  canvas.height = canvasHeight
  canvas.width = canvasWidth
  context.fillStyle = PIXEL_COLORS[0]
  context.fillRect(0, 0, canvasWidth, canvasHeight)

  let colIndex = 0
  let rowIndex = 0

  for (let row of pixels) {
    colIndex = 0

    for (let pixel of row.split('')) {
      if (pixel === 0) {
        continue
      }

      let { rectX, rectY } = getRectPositions({
        colIndex,
        ignoreBorder,
        pixelSize,
        rowIndex,
      })

      if (rectX < 0 && rectY < 0) {
        continue
      }

      context.fillStyle = PIXEL_COLORS[pixel]
      context.fillRect(rectX, rectY, pixelSize, pixelSize)

      colIndex += 1
    }

    rowIndex += 1
  }
}

const CanvasHelper = {
  CanvasDrawImage,
}

export default CanvasHelper
