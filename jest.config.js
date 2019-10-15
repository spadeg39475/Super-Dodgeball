module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    setupFiles: [
      "jest-canvas-mock"
    ],
    moduleFileExtensions: [
      "js",
      "jsx"
    ],  
    moduleNameMapper: {
      "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.js",
      '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
    }
};