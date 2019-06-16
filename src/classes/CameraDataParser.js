import Image from './Image'

const SPLIT_DELIMITER = ' Finished Pretending To Print for fun!'

class CameraDataParser {
  constructor({ cameraData, ignoreBorder, isDevMode }) {
    this.ignoreBorder = ignoreBorder
    this.isDevMode = isDevMode
    this.rawData = cameraData

    this.prepareData()
    this.decodeImages()
    this.validateImages()
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
    this.images = this.cameraData.map(imageData => {
      return new Image({
        ignoreBorder: this.ignoreBorder,
        imageData: imageData,
        isDevMode: this.isDevMode,
      })
    })
  }

  prepareData() {
    this.cameraData = this.rawData.split(SPLIT_DELIMITER)
  }

  validateImages() {
    this.images = this.images.filter(image => image.isValid())
  }
}

export default CameraDataParser
