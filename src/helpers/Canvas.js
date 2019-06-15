const PIXEL_COLORS = ['#ffffff', '#aaaaaa', '#555555', '#000000']
const TILE_SIZE = 8
const TILE_X_INDEX_MAX = 20
const TILE_Y_INDEX_MAX = 18

export const CanvasDrawImage = ({
  ignoreBorder,
  imageCanvas,
  imageData,
  pixelSize,
}) => {
  const context = imageCanvas.current.getContext('2d')
  context.clearRect(0, 0, imageCanvas.current.width, imageCanvas.current.height)

  let tileX = 0
  let tileY = 0

  for (let tile of imageData.tiles) {
    if (ignoreBorder) {
      if (
        tileX < 2 ||
        tileY < 2 ||
        tileX > TILE_X_INDEX_MAX - 1 ||
        tileY > TILE_Y_INDEX_MAX - 1
      ) {
        tileX += 1

        if (tileX === TILE_X_INDEX_MAX) {
          tileX = 0
          tileY += 1
        }
        continue
      }
    }

    let tileXOffset = tileX * TILE_SIZE * pixelSize
    let tileYOffset = tileY * TILE_SIZE * pixelSize

    if (ignoreBorder) {
      tileXOffset -= TILE_SIZE * pixelSize * 2
      tileYOffset -= TILE_SIZE * pixelSize * 2
    }

    let bitY = 0

    for (let byte of tile.bytes) {
      let bitX = 0

      for (let bit of byte.bits) {
        context.fillStyle = PIXEL_COLORS[bit.value]
        context.fillRect(
          tileXOffset + bitX * pixelSize,
          tileYOffset + bitY * pixelSize,
          pixelSize,
          pixelSize,
        )

        bitX += 1
      }

      bitY += 1
    }

    tileX += 1

    if (tileX === TILE_X_INDEX_MAX) {
      tileX = 0
      tileY += 1
    }
  }
}

export const CanvasDrawUpdateTileCoords = ({ tileX, tileY }) => {
  tileX += 1

  if (tileX === TILE_X_INDEX_MAX) {
    tileX = 0
    tileY += 1
  }

  return [tileX, tileY]
}

const CanvasHelper = {
  CanvasDrawImage,
}

export default CanvasHelper
