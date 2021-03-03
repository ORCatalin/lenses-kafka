module.exports = {
  setupFiles: ['<rootDir>/config/setup-enzyme.js'],
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules'],
  testRegex: '(\\.(test|spec))\\.(jsx|js|tsx|ts)$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'tsx', 'ts'],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__']
};
