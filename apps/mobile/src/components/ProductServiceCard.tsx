import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet } from 'react-native'
import { Card, Text, Chip, MD3Theme, useTheme } from 'react-native-paper'

interface ProductServiceCardProps {
	title: string
	description: string
	price: number
	priceFrequency: string
	category: string
	image: string
	onPress?: () => void
	small?: boolean
}

const ProductServiceCard: React.FC<ProductServiceCardProps> = ({
	title,
	description,
	price,
	priceFrequency,
	category,
	image,
	small,
	...props
}) => {
	const theme = useTheme()
	const styles = createStyles(theme)
	const { i18n, t } = useTranslation()

	const formattedPrice =
		new Intl.NumberFormat(i18n.language || 'en-US', {
			style: 'currency',
			currency: 'COP'
		}).format(price) +
		(priceFrequency ? ` / ${t('productService.' + priceFrequency)}` : '')

	return (
		<Card
			testID='productServiceCard'
			elevation={1}
			style={small ? styles.cardSmall : styles.card}
			contentStyle={small ? styles.smallCard : undefined}
			{...props}>
			<Card.Cover
				source={{ uri: image }}
				style={small ? styles.smallCover : undefined}
			/>
			<Card.Content style={styles.cardContent}>
				<Text
					variant='titleLarge'
					ellipsizeMode={small ? 'tail' : undefined}
					numberOfLines={small ? 1 : undefined}
					style={styles.cardTitle}>
					{title}
				</Text>
				<Text
					variant='bodyMedium'
					ellipsizeMode={small ? 'tail' : undefined}
					numberOfLines={small ? 3 : undefined}>
					{description}
				</Text>
				{!small && (
					<View style={styles.chipContainer}>
						<Chip
							textStyle={styles.chip}
							style={styles.chipBackground}>
							{t(`productService.${category}`)}
						</Chip>
						<Chip
							textStyle={styles.chipCost}
							style={styles.chipCostBackground}>
							{formattedPrice}
						</Chip>
					</View>
				)}
			</Card.Content>
		</Card>
	)
}

const createStyles = (theme: MD3Theme) =>
	StyleSheet.create({
		card: {
			backgroundColor: '#f2f2f2',
			width: '100%'
		},
		cardSmall: {
			paddingRight: 100,
			backgroundColor: '#f2f2f2',
			width: '100%'
		},
		cardTitle: {
			fontWeight: 'bold'
		},
		cardContent: {
			justifyContent: 'center',
			marginTop: 10,
			paddingBottom: 10
		},
		chipContainer: {
			alignItems: 'flex-start',
			justifyContent: 'space-between',
			flexDirection: 'row',
			marginTop: 10
		},
		chipBackground: {
			backgroundColor: theme.colors.surfaceVariant
		},
		chip: {
			color: theme.colors.onPrimaryContainer,
			textTransform: 'capitalize'
		},
		chipCostBackground: {
			backgroundColor: theme.colors.tertiaryContainer
		},
		chipCost: {
			color: theme.colors.onTertiaryContainer
		},
		smallCard: {
			flexDirection: 'row',
			width: '100%'
		},
		smallCover: {
			width: 100,
			height: 100
		}
	})

export default ProductServiceCard
