import Image from './Image'

class CameraDataParser {
  SPLIT_DELIMITER = '# Finished Pretending To Print for fun!'

  constructor({ cameraData }) {
    this.prepareData(cameraData)
    this.decodeImages()
  }

  decodeImages() {
    this.images = []

    for (let imageData of this.sourceCameraData) {
      let image = new Image({ imageData })

      if (image.isValid()) {
        this.images.push(image)
      }
    }
  }

  prepareData(data) {
    this.rawData = data
    this.sourceCameraData = data.split(this.SPLIT_DELIMITER)
  }
}

export default CameraDataParser
