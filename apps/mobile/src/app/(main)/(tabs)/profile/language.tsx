import React from 'react'
import { useTranslation } from 'react-i18next'

import { View, StyleSheet } from 'react-native'
import { RadioButton, Text } from 'react-native-paper'

const Language: React.FC = () => {
	const { t, i18n } = useTranslation()
	return (
		<View style={styles.container}>
			<Text variant='bodyMedium'>{t('language.changeText')}</Text>
			<RadioButton.Group
				data-testID='radio-group'
				onValueChange={(value) => i18n.changeLanguage(value)}
				value={i18n.language}>
				<View testID='language' style={styles.row}>
					<RadioButton.Android
						value='es'
						status={
							i18n.language === 'es' ? 'checked' : 'unchecked'
						}
					/>
					<Text onPress={() => i18n.changeLanguage('es')}>
						{t('language.options.es')}
					</Text>
				</View>
				<View testID='language' style={styles.row}>
					<RadioButton.Android
						value='en'
						status={
							i18n.language === 'en' ? 'checked' : 'unchecked'
						}
					/>
					<Text onPress={() => i18n.changeLanguage('en')}>
						{t('language.options.en')}
					</Text>
				</View>
			</RadioButton.Group>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		marginHorizontal: 15,
		marginBottom: 15,
		marginTop: 120
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	}
})

export default Language
