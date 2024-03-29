import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		/* Absolutes paths */
		alias: {
			'@': '/src',
			'@components': '/src/components',
			'@containers': '/src/containers',
			'@pages': '/src/pages'
		}
	}
})
