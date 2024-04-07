import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [react()],
		resolve: {
			alias: {
				'@': '/src',
				components: '/src/components',
				containers: '/src/containers',
				config: '/config',
				assets: '/src/assets',
				pages: '/src/pages'
			}
		},
		define: {
			'process.env': {
				EXPO_PUBLIC_SPORTAPP_API_URL: env.EXPO_PUBLIC_SPORTAPP_API_URL
			}
		}
	}
})
