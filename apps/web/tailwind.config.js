/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,scss}'],
	important: '#root',
	theme: {
		extend: {}
	},
	plugins: [],
	corePlugins: {
		preflight: false
	}
}
