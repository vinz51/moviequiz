module.exports = {
	setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
	setupFilesAfterEnv: ["<rootDir>src/setupTests.js"],
	testMatch: [
		"**/__tests__/**/*.js?(x)",
		"**/?(*.)(-test).js?(x)"
	]
};
