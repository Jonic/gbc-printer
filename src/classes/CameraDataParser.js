import Image from './Image'

class CameraDataParser {
  SPLIT_DELIMITER = ' Finished Pretending To Print for fun!'

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
    this.cameraData = this.rawData.split(this.SPLIT_DELIMITER)
  }
}

export default CameraDataParser
