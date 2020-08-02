// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export const clearMocks = true;
export const moduleDirectories = [
	'node_modules'
];
export const moduleFileExtensions = [
	'js',
	'json',
	'jsx',
	'ts',
	'tsx',
	'node'
];
export const testEnvironment = 'jest-environment-node';
export const transform = {
	'^.+\\.jsx?$': 'babel-jest'
};

export default {
	clearMocks,
	moduleDirectories,
	moduleFileExtensions,
	testEnvironment,
	transform
};