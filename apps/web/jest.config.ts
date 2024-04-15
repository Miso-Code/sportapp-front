export default {
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/config/test/jest.setup.ts'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				diagnostics: {
					ignoreCodes: [1343]
				},
				astTransformers: {
					before: [
						{
							path: 'ts-jest-mock-import-meta', // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
							options: {
								metaObjectReplacement: {
									url: 'https://www.url.com'
								}
							}
						}
					]
				}
			}
		]
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/components/**/*.{ts,tsx}',
		'<rootDir>/src/containers/**/*.{ts,tsx}',
		'<rootDir>/src/pages/**/*.{ts,tsx}',
		'<rootDir>/src/router/**/*.{ts,tsx}',
		'<rootDir>/src/utils/**/*.{ts,tsx}',
		'!<rootDir>/src/**/interfaces/**/*.{ts,tsx}',
		'!<rootDir>/src/**/__mocks__/**/*.{ts,tsx}'
	],
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png|jpg)$':
			'<rootDir>/config/test/__mocks__/fileMock.ts',
		'^.+\\.(css|less|scss)$': 'babel-jest',
		'^@/(.*)$': ['<rootDir>/src/$1'],
		'^components/(.*)$': ['<rootDir>/src/components/$1'],
		'^containers/(.*)$': ['<rootDir>/src/containers/$1'],
		'^assets/(.*)$': ['<rootDir>/src/assets/$1'],
		'^pages/(.*)$': ['<rootDir>/src/pages/$1'],
		'^config/(.*)$': ['<rootDir>/config/$1']
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
