import Image from '../classes/Image'

const SPLIT_DELIMITER = '# Finished Pretending To Print for fun!'

export const cameraDataProcess = data => {
  const imagesData = data.split(SPLIT_DELIMITER)
  const images = []

  for (let imageData of imagesData) {
    let image = new Image({ imageData })

    if (image.isValid()) {
      images.push(image)
    }
  }

  return images
}

const CameraDataHelper = {
  cameraDataProcess,
}

export default CameraDataHelper
