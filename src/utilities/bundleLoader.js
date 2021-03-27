module.exports = {
  importFiles: () => {
    const images = require.context('./../assets/images', true)
    return images
  },
  loadImage: (images, imageName) => {
    const image = (images(`./${imageName}`).default)
    return image
  }
}
