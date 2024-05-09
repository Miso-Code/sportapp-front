const fs = require('fs')
const path = require('path')

fs.readdirSync(__dirname).forEach((file) => {
	if (file.startsWith('.env')) {
		const envPath = path.join(__dirname, file)
		console.log(`Loading env from ${envPath}`)
		require('dotenv').config({ path: envPath })
	}
})

console.log('Detox config loaded')
/** @type {Detox.DetoxConfig} */
module.exports = {
	logger: {
		level: process.env.CI ? 'debug' : undefined
	},
	testRunner: {
		$0: 'jest',
		args: {
			config: 'e2e/jest.config.js',
			_: ['e2e']
		}
	},
	artifacts: {
		plugins: {
			log: process.env.CI ? 'failing' : undefined,
			screenshot: 'failing'
		}
	},
	apps: {
		'ios.release': {
			type: 'ios.app',
			build: 'xcodebuild -workspace ios/sportapp.xcworkspace -scheme sportapp -configuration Release -sdk iphonesimulator -arch x86_64 -derivedDataPath ios/build',
			binaryPath:
				'ios/build/Build/Products/Release-iphonesimulator/sportapp.app'
		},
		'android.release': {
			type: 'android.apk',
			build: 'cd android && gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release && cd ..',
			binaryPath: 'android/app/build/outputs/apk/release/app-release.apk'
		}
	},
	devices: {
		simulator: {
			type: 'ios.simulator',
			device: {
				type: 'iPhone 14'
			}
		},
		emulator: {
			type: 'android.emulator',
			device: {
				avdName: 'Pixel_3a_API_34'
			}
		}
	},
	configurations: {
		'ios.release': {
			device: 'simulator',
			app: 'ios.release'
		},
		'android.release': {
			device: 'emulator',
			app: 'android.release'
		}
	}
}
