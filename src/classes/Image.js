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
    n * image = [
      360 * tiles = [
        8 * bytes [
          8 * bits
        ]
      ]
    ]
  ]
*/

import Tile from './Tile'
// import chunk from 'chunk'
import uuidv4 from 'uuid/v4'

class Image {
  // eslint-disable-next-line no-magic-numbers
  MIN_TILES_LENGTH = 360
  // eslint-disable-next-line no-magic-numbers
  TILE_X_INDEX_MAX = 20

  constructor({ ignoreBorder, imageData, isDevMode }) {
    this.ignoreBorder = ignoreBorder
    this.isDevMode = isDevMode
    this.rawData = imageData
    this.uuid = uuidv4()

    this.prepareData()
    this.decodeTiles()
    // this.parseDecodedTiles()
    this.cleanUpData()
  }

  cleanUpData() {
    if (this.isDevMode) {
      return
    }

    delete this.rawData
    delete this.imageData
  }

  decodeTiles() {
    this.tiles = []

    this.initTileCounters()

    for (let tileData of this.imageData) {
      let tile = new Tile({
        isDevMode: this.isDevMode,
        tileData,
        tileX: this.tileX,
        tileY: this.tileY,
      })

      if (tile.isValid()) {
        this.tiles.push(tile)
      }

      this.updateTileCounters()
    }
  }

  initTileCounters() {
    this.tileX = 0
    this.tileY = 0
  }

  isBorderTile(x, y) {
    return true
  }

  isValid() {
    return this.tiles.length >= this.MIN_TILES_LENGTH
  }

  prepareData() {
    this.imageData = this.rawData.split('\n').filter(this.sanitiseDatum)
  }

  sanitiseDatum(datum) {
    return datum.length > 1 && !/!|#/.test(datum)
  }

  updateTileCounters() {
    this.tileX += 1

    if (this.tileX === this.TILE_X_INDEX_MAX) {
      this.tileX = 0
      this.tileY += 1
    }
  }
}

export default Image
