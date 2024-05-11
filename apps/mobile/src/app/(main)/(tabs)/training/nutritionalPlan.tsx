import React, { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/en' // import English locale
import 'dayjs/locale/es' // import French locale
import weekday from 'dayjs/plugin/weekday' // load weekday plugin

dayjs.extend(weekday) // use weekday plugin

import { ScrollView, StyleSheet } from 'react-native'

import { ActivityIndicator, Text, FAB as Fab } from 'react-native-paper'

import { useNutritionalPlanStore } from '@sportapp/stores'

import { useTranslation } from 'react-i18next'
import DishCard from '@/components/DishCard'

const NutritionalPlan: React.FC = () => {
	const { t, i18n } = useTranslation()
	const { loading, getNutritionalPlan, planDishes } =
		useNutritionalPlanStore()

	const scrollViewRef = useRef<ScrollView>(null)

	const daysOfWeek = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday'
	]
	const currentDay = dayjs().weekday()
	const currentDayDishes = planDishes.filter(
		(d) => d.week_day === daysOfWeek[currentDay]
	)

	const futureDishes = planDishes.filter(
		(d) => d.week_day !== currentDayDishes[0].week_day
	)

	useEffect(() => {
		;(async () => {
			await getNutritionalPlan({ lang: i18n.language })
		})()
	}, [getNutritionalPlan, i18n.language])

	return (
		<>
			<ScrollView
				testID='scrollView'
				ref={scrollViewRef}
				contentContainerStyle={styles.container}>
				{loading ? (
					<ActivityIndicator size='large' />
				) : (
					<>
						<Text variant='titleLarge' style={styles.title}>
							{t('nutritionalPlan.currentDay')}
						</Text>
						{currentDayDishes.map((product, index) => (
							<DishCard
								key={'product' + index}
								title={product.name}
								weekday={product.week_day}
								category={product.category}
								calories={product.calories}
								protein={product.protein}
								carbs={product.carbs}
								fats={product.fats}
							/>
						))}
						<Text variant='titleLarge' style={styles.title}>
							{t('nutritionalPlan.futureDishes')}
						</Text>
						{futureDishes.map((product, index) => (
							<DishCard
								key={'product' + index}
								title={product.name}
								weekday={product.week_day}
								category={product.category}
								calories={product.calories}
								protein={product.protein}
								carbs={product.carbs}
								fats={product.fats}
							/>
						))}
					</>
				)}
			</ScrollView>
			<Fab
				testID='fabScrollUp'
				icon='arrow-up'
				onPress={() =>
					scrollViewRef.current?.scrollTo({ y: 0, animated: true })
				}
				style={styles.fab}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
		gap: 20,
		paddingTop: 110,
		paddingBottom: 50
	},
	modal: {
		backgroundColor: 'white',
		padding: 20,
		marginHorizontal: 20
	},
	search: {
		width: '100%'
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0
	},
	title: {
		fontWeight: 'bold'
	},
	imageDetail: {
		width: '100%',
		height: 200
	},
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	markdown: { maxHeight: '50%' }
})

export default NutritionalPlan
