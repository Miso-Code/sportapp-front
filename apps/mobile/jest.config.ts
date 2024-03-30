import type { Config } from 'jest'

const config: Config = {
	preset: 'react-native',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
	setupFilesAfterEnv: ['<rootDir>/src/config/test/jest.setup.ts'],
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/components/**/*.{ts,tsx}',
		'<rootDir>/src/containers/**/*.{ts,tsx}',
		'!<rootDir>/src/**/interfaces/**/*.{ts,tsx}',
		'!<rootDir>/src/**/__mocks__/**/*.{ts,tsx}'
	],
	transformIgnorePatterns: ['node_modules/react-native-paper'],
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$':
			'<rootDir>/src/config/test/__mocks__/fileMock.ts',
		'^@/(.*)$': ['<rootDir>/src/$1'],
		'^components/(.*)$': ['<rootDir>/src/components/$1'],
		'^containers/(.*)$': ['<rootDir>/src/containers/$1'],
		'^screens/(.*)$': ['<rootDir>/src/screens/$1']
	},
	reporters: ['default'],
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70
		}
	}
}

export default config
