const PIXEL_COLORS = ['#ffffff', '#aaaaaa', '#555555', '#000000']
const TILE_SIZE = 8
const TILE_X_INDEX_MAX = 20

export const CanvasDrawImage = ({ imageCanvas, imageData, pixelSize }) => {
  const context = imageCanvas.current.getContext('2d')
  context.clearRect(0, 0, imageCanvas.current.width, imageCanvas.current.height)

  let tileX = 0
  let tileY = 0

  for (let tile of imageData) {
    let tileXOffset = tileX * TILE_SIZE * pixelSize
    let tileYOffset = tileY * TILE_SIZE * pixelSize

    for (let bitY = 0; bitY < TILE_SIZE; bitY += 1) {
      for (let bitX = 0; bitX < TILE_SIZE; bitX += 1) {
        let bitValue = tile[bitY][bitX]
        context.fillStyle = PIXEL_COLORS[bitValue]
        context.fillRect(
          tileXOffset + bitX * pixelSize,
          tileYOffset + bitY * pixelSize,
          pixelSize,
          pixelSize,
        )
      }
    }

    tileX += 1

    if (tileX === TILE_X_INDEX_MAX) {
      tileX = 0
      tileY += 1
    }
  }
}

const CanvasHelper = {
  CanvasDrawImage,
}

export default CanvasHelper
