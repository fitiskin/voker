module.exports = {
  testRegex: "/test/.*\\.test\\.ts$",
  moduleNameMapper: {
    "^voker$": "<rootDir>/src",
  },
  transform: {
    "^.+\\.(t|j)s$": [
      "@swc-node/jest",
      {
        jsc: {
          minify: false,
        },
      },
    ],
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/", "/test/"],
  coverageReporters: ["text", "html"],
};
