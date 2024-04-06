import { DefaultTheme } from 'react-native-paper'

const CustomTheme = {
	...DefaultTheme,
	colors: {
		primary: '#37618E',
		primaryContainer: '#D2E4FF',
		secondary: '#535F70',
		secondaryContainer: '#D7E3F8',
		tertiary: '#6B5778',
		tertiaryContainer: '#F3DAFF',
		surface: '#F8F9FF',
		surfaceVariant: '#DFE2EB',
		surfaceDisabled: '#DFE2EB', // Assuming this as React Native Paper does not specifically have a 'surfaceDisabled' color.
		background: '#F8F9FF',
		error: '#BA1A1A',
		errorContainer: '#FFDAD6',
		onPrimary: '#FFFFFF',
		onPrimaryContainer: '#001D36',
		onSecondary: '#FFFFFF',
		onSecondaryContainer: '#101C2B',
		onTertiary: '#FFFFFF',
		onTertiaryContainer: '#251431',
		onSurface: '#191C20',
		onSurfaceVariant: '#43474E',
		onSurfaceDisabled: '#73777F', // Assuming this as React Native Paper does not specifically have an 'onSurfaceDisabled' color.
		onError: '#FFFFFF',
		onErrorContainer: '#410002',
		onBackground: '#191C20',
		outline: '#73777F',
		outlineVariant: '#C3C6CF', // This is an extra, assuming based on your requirement.
		inverseSurface: '#2E3135',
		inverseOnSurface: '#EFF0F7',
		inversePrimary: '#A1CAFD',
		shadow: '#000000',
		scrim: '#000000',
		backdrop: '#000000' // Used 'scrim' value, as 'backdrop' isn't defined in your JSON. Adjust as necessary.
		// 'elevation' can't be directly mapped to a color. You might need to handle it separately.
	},
	fonts: {
		...DefaultTheme.fonts
		// Customize fonts here if necessary
	}
	// Additional custom properties for MD3ElevationColors or other theme-specific settings can go here
}

export default CustomTheme
