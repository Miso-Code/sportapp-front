import React, { useState, useEffect, useCallback, useRef } from 'react'

import {
	NativeScrollEvent,
	ScrollView,
	StyleSheet,
	View,
	Image
} from 'react-native'

import {
	ActivityIndicator,
	Text,
	Portal,
	Searchbar,
	FAB as Fab,
	useTheme,
	TextInput,
	Button
} from 'react-native-paper'

import Markdown from 'react-native-markdown-display'

import { router } from 'expo-router'

import { useBusinessPartnerStore } from '@sportapp/stores'

import ProductServiceCard from '@/components/ProductServiceCard'
import KeyboardAvoidingDialog from '@/components/KeyboardAvoidingDialog'

import { useDebounce } from '@/hooks/useDebounce'

const ServiceAndProducts: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')
	const [page, setPage] = useState<number>(0)
	const [selectedProduct, setSelectedProduct] =
		useState<Awaited<ReturnType<typeof getAvailableProducts>>[number]>(null)
	const [products, setProducts] = useState<
		Awaited<ReturnType<typeof getAvailableProducts>>
	>([])

	const [quantity, setQuantity] = useState<string | undefined>()

	const scrollViewRef = useRef<ScrollView>(null)

	const theme = useTheme()

	const debouncedValue = useDebounce(searchQuery)

	const { getAvailableProducts, setProductToCheckout } =
		useBusinessPartnerStore()

	const search = useCallback(async () => {
		const availableProducts = await getAvailableProducts({
			limit: 10,
			offset: page * 10,
			search: debouncedValue
		})
		setIsLoading(false)
		if (!availableProducts) return
		setProducts((prevProducts) => [...prevProducts, ...availableProducts])
	}, [debouncedValue, page]) // eslint-disable-line react-hooks/exhaustive-deps

	const isCloseToBottom = ({
		layoutMeasurement,
		contentOffset,
		contentSize
	}: NativeScrollEvent) => {
		const paddingToBottom = 20
		return (
			layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom
		)
	}

	useEffect(() => {
		setIsLoading(true)
		search()
	}, [debouncedValue, search, page])

	useEffect(() => {
		setProducts([])
		setPage(0)
	}, [debouncedValue])

	useEffect(() => {
		setQuantity(undefined)
	}, [selectedProduct])

	return (
		<>
			<Portal>
				<KeyboardAvoidingDialog
					testID='productModal'
					visible={!!selectedProduct}
					onDismiss={() => setSelectedProduct(null)}>
					<View>
						<Text variant='titleLarge' style={styles.title}>
							{selectedProduct?.name}
						</Text>
						<Image
							source={{
								uri: selectedProduct?.image_url
							}}
							style={styles.imageDetail}
						/>
						<ScrollView
							contentInsetAdjustmentBehavior='automatic'
							style={styles.markdown}>
							<Markdown>
								{selectedProduct?.description || ''}
							</Markdown>
						</ScrollView>

						<TextInput
							testID='quantity'
							label='Cantidad'
							mode='outlined'
							keyboardType='numeric'
							value={quantity}
							onChangeText={setQuantity}
						/>
						<View style={styles.actionsContainer}>
							<Button
								testID='cancelButton'
								textColor={theme.colors.error}
								onPress={() => setSelectedProduct(null)}>
								Cerrar
							</Button>
							<Button
								disabled={!quantity}
								testID='adquireButton'
								onPress={() => {
									setProductToCheckout(selectedProduct)
									router.push({
										pathname:
											'training/servicesAndProductsCheckout',
										params: {
											quantity
										}
									})
									setSelectedProduct(null)
								}}>
								Adquirir
							</Button>
						</View>
					</View>
				</KeyboardAvoidingDialog>
			</Portal>

			<ScrollView
				testID='scrollView'
				ref={scrollViewRef}
				contentContainerStyle={styles.container}
				onScroll={({ nativeEvent }) => {
					if (isCloseToBottom(nativeEvent)) {
						setPage((prevPage) => prevPage + 1)
					}
				}}
				scrollEventThrottle={400}>
				<Searchbar
					testID='search'
					placeholder='Search'
					onChangeText={setSearchQuery}
					value={searchQuery}
					style={styles.search}
				/>
				{products.map((product, index) => (
					<ProductServiceCard
						key={'productCard' + index}
						onPress={() => setSelectedProduct(product)}
						title={product.name}
						price={product.price}
						priceFrequency={product.payment_frequency}
						description={product.sumary}
						category={product.category}
						image={product.image_url}
					/>
				))}
				{isLoading && <ActivityIndicator testID='progressBar' />}
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
		marginHorizontal: 15,
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

export default ServiceAndProducts
