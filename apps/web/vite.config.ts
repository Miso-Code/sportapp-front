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
				EXPO_PUBLIC_SPORTAPP_API_URL: env.EXPO_PUBLIC_SPORTAPP_API_URL,
				EXPO_PUBLIC_STORAGE: env.EXPO_PUBLIC_STORAGE
			}
		},
		optimizeDeps: {
			include: ['@emotion/styled']
		},
		build: {
			outDir: 'dist',
			emptyOutDir: true,
			sourcemap: true,
			chunkSizeWarningLimit: 500,
			rollupOptions: {
				onwarn(warning, defaultHandler) {
					if (warning.code === 'SOURCEMAP_ERROR') {
						return
					}

					defaultHandler(warning)
				},
				output: {
					manualChunks: {
						react: ['react', 'react-dom'],
						material: ['@mui/material', '@mui/icons-material'],
						i18next: ['i18next', 'react-i18next'],
						router: ['react-router-dom'],
						emotion: ['@emotion/react', '@emotion/styled']
					}
				}
			}
		}
	}
})
