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

// eslint-disable-next-line no-magic-numbers
const MIN_TILES_LENGTH = 360
// eslint-disable-next-line no-magic-numbers
const TILE_X_INDEX_MAX = 20

class Image {
  constructor({ ignoreBorder, imageData, isDevMode }) {
    this.ignoreBorder = ignoreBorder
    this.isDevMode = isDevMode
    this.rawData = imageData
    this.uuid = uuidv4()

    this.prepareData()
    this.tileCountersInit()
    this.decodeTiles()
    this.validateTiles()
    this.parseDecodedTiles()
    this.cleanUpData()
  }

  cleanUpData() {
    if (this.isDevMode) {
      return
    }

    delete this.ignoreBorder
    delete this.imageData
    delete this.isDevMode
    delete this.rawData
    delete this.tileX
    delete this.tileY
  }

  decodeTiles() {
    this.tiles = this.imageData.map(tileData => {
      let tile = new Tile({
        ignoreBorder: this.ignoreBorder,
        isDevMode: this.isDevMode,
        tileData: tileData,
        tileX: this.tileX,
        tileY: this.tileY,
      })

      this.tileCountersUpdate()

      return tile
    })
  }

  isValid() {
    return this.tiles.length >= MIN_TILES_LENGTH
  }

  parseDecodedTiles() {}

  prepareData() {
    this.imageData = this.rawData.split('\n').filter(this.sanitiseDatum)
  }

  sanitiseDatum(datum) {
    return datum.length > 1 && !/!|#/.test(datum)
  }

  tileCountersInit() {
    this.tileX = 0
    this.tileY = 0
  }

  tileCountersUpdate() {
    this.tileX += 1

    if (this.tileX === TILE_X_INDEX_MAX) {
      this.tileX = 0
      this.tileY += 1
    }
  }

  validateTiles() {
    this.tiles = this.tiles.filter(tile => tile.isValid())
  }
}

export default Image
