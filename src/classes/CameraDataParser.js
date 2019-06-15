import Image from './Image'

class CameraDataParser {
  SPLIT_DELIMITER = '# Finished Pretending To Print for fun!'

  constructor({ cameraData }) {
    this.sourceData = cameraData
    this.sourceCameraData = this.prepareData()

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

    console.log(this.images)
  }

  prepareData() {
    return this.sourceData.split(this.SPLIT_DELIMITER)
  }
}

export default CameraDataParser
