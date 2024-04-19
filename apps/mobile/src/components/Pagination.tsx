import React, { useState, useEffect } from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { Button, IconButton } from 'react-native-paper'

const PAGE_SELECTOR_WIDTH = 60

interface PaginationProps {
	pages: number
	onPageChange?: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	pages,
	onPageChange = () => {}
}) => {
	const [maxPagesToShow, setMaxPagesToShow] = useState(0)
	const [page, setPage] = useState(0)
	const [totalPages, setTotalPages] = useState([])

	const updatePage = (val: number) => {
		if (val < 0 || val >= pages) return
		setPage(val)
	}

	const updateMaxPagesToShow = (event: LayoutChangeEvent) => {
		setMaxPagesToShow(
			Math.floor(event.nativeEvent.layout.width / PAGE_SELECTOR_WIDTH)
		)
	}

	const formatPage = (index: number) => {
		return index + 1 + Math.floor(page / maxPagesToShow) * maxPagesToShow
	}

	useEffect(() => {
		let pagesToShow = pages > maxPagesToShow ? maxPagesToShow : pages

		if (
			Math.floor(page / maxPagesToShow) ===
			Math.floor(pages / maxPagesToShow)
		) {
			pagesToShow = pages % maxPagesToShow
		}

		setTotalPages([...Array(pagesToShow).keys()])
		onPageChange(page)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, pages, maxPagesToShow])

	return (
		<View
			style={styles.pagintation}
			onLayout={updateMaxPagesToShow}
			data-testid='paginationContainer'>
			{page >= maxPagesToShow && (
				<IconButton
					testID='prevPageFast'
					icon='chevron-double-left'
					mode='contained'
					onPress={() => updatePage(page - maxPagesToShow)}
				/>
			)}
			<IconButton
				testID='prevPage'
				icon='chevron-left'
				mode='contained'
				onPress={() => updatePage(page - 1)}
			/>
			{totalPages.map((_, index) => (
				<Button
					testID='page'
					key={'b' + index}
					onPress={() => updatePage(formatPage(index) - 1)}
					mode={page + 1 === formatPage(index) ? 'contained' : 'text'}
					compact>
					{formatPage(index)}
				</Button>
			))}
			<IconButton
				testID='nextPage'
				icon='chevron-right'
				mode='contained'
				onPress={() => updatePage(page + 1)}
			/>
			{maxPagesToShow < pages &&
				page < pages - (pages % maxPagesToShow || maxPagesToShow) && (
					<IconButton
						testID='nextPageFast'
						icon='chevron-double-right'
						mode='contained'
						onPress={() => updatePage(page + maxPagesToShow)}
					/>
				)}
		</View>
	)
}

const styles = StyleSheet.create({
	pagintation: {
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%'
	}
})

export default Pagination
