import React from 'react'
import { Text } from 'react-native'
import { useTranslation } from 'react-i18next'

function TestComponent() {
	const { t } = useTranslation()
	return <Text>{t('app.name')}</Text>
}

export default TestComponent
