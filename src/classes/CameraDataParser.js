import Image from './Image'

const SPLIT_DELIMITER = ' Finished Pretending To Print for fun!'

class CameraDataParser {
  constructor({ cameraData, ignoreBorder, isDevMode }) {
    this.ignoreBorder = ignoreBorder
    this.isDevMode = isDevMode
    this.rawData = cameraData

    this.prepareData()
    this.decodeImages()
    this.cleanUpData()
  }

  cleanUpData() {
    if (this.isDevMode) {
      return
    }

    delete this.rawData
    delete this.cameraData
    delete this.ignoreBorder
    delete this.isDevMode
  }

  decodeImages() {
    this.images = []

    for (let imageData of this.cameraData) {
      let image = new Image({
        ignoreBorder: this.ignoreBorder,
        imageData,
        isDevMode: this.isDevMode,
      })

      if (image.isValid()) {
        this.images.push(image)
      }
    }
  }

  prepareData() {
    this.cameraData = this.rawData.split(SPLIT_DELIMITER)
  }
}

export default CameraDataParser
