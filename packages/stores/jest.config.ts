export default {
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/config/test/jest.setup.ts'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': ['ts-jest']
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/**/*.{ts,tsx}',
		'!<rootDir>/src/**/interfaces/**/*.{ts,tsx}',
		'!<rootDir>/src/**/__mocks__/**/*.{ts,tsx}'
	],
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png|jpg)$':
			'<rootDir>/config/test/__mocks__/fileMock.ts',
		'^.+\\.(css|less|scss)$': 'babel-jest',
		'^@/(.*)$': ['<rootDir>/src/$1']
	},
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70
		}
	},
	reporters: ['default']
}
