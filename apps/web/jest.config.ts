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
		'<rootDir>/src/components/**/*.{ts,tsx}',
		'<rootDir>/src/containers/**/*.{ts,tsx}',
		'<rootDir>/src/hooks/**/*.{ts,tsx}',
		'<rootDir>/src/pages/**/*.{ts,tsx}',
		'<rootDir>/src/store/**/*.{ts,tsx}',
		'<rootDir>/src/repository/**/*.ts',
		'<rootDir>/src/utils/**/*.ts',
		'!<rootDir>/src/**/interfaces/**/*.{ts,tsx}',
		'!<rootDir>/src/**/__mocks__/**/*.{ts,tsx}'
	],
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$':
			'<rootDir>/config/test/__mocks__/fileMock.ts',
		'^.+\\.(css|less|scss)$': 'babel-jest',
		'^@/(.*)$': ['<rootDir>/src/$1'],
		'^@components/(.*)$': ['<rootDir>/src/components/$1'],
		'^@containers/(.*)$': ['<rootDir>/src/containers/$1'],
		'^@assets/(.*)$': ['<rootDir>/src/assets/$1'],
		'^@pages/(.*)$': ['<rootDir>/src/pages/$1'],
		'^@styles/(.*)$': ['<rootDir>/src/styles/$1'],
		'^@utils/(.*)$': ['<rootDir>/src/utils/$1'],
		'^@hooks/(.*)$': ['<rootDir>/src/hooks/$1'],
		'^@locales/(.*)$': ['<rootDir>/src/translate/locales/$1'],
		'^@store/(.*)$': ['<rootDir>/src/store/$1']
	},
	reporters: ['default', 'jest-junit']
}
