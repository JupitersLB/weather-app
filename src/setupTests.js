import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const mockGeolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementationOnce((success) => Promise.resolve(success({
      coords: {
        latitude: 51.1,
        longitude: 45.3
      }
    })))
};
global.navigator.geolocation = mockGeolocation;

jest.mock('./utilities/bundleLoader', () => ({
  importFiles: () => {
    return ['cat', 'dog']
  },
  loadImage: (images, imageName) => {
    return "./src/assets/images/cat.png"
  }
}))
