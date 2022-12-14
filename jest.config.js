module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    modulePathIgnorePatterns: ['<rootDir>/lib/']
};