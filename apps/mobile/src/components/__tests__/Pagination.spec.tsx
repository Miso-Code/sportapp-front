import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import Pagination from '../Pagination'

jest.mock('expo-router')
jest.mock('react-native-safe-area-context')

describe('Pagination', () => {
	let component: ReactTestRenderer
	const onPageChange = jest.fn()

	beforeEach(() => {
		component = renderer.create(
			<Pagination pages={100} onPageChange={onPageChange} />
		)
		const container = component.root.findByProps({
			'data-testid': 'paginationContainer'
		})
		act(() => {
			container.props.onLayout({
				nativeEvent: {
					layout: {
						width: 300
					}
				}
			})
		})
	})

	afterEach(() => {
		jest.clearAllMocks()
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render without onPageChange', () => {
		component.update(<Pagination pages={100} />)
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render the first page as active', () => {
		const pages = component.root.findAllByProps({ testID: 'page' })
		const activePage = pages.find((page) => page.props.mode === 'contained')
		expect(activePage.props.children).toBe(1)
	})

	it('should set the page on page press', () => {
		const pages = component.root.findAllByProps({ testID: 'page' })
		const page = pages.find((p) => p.props.children === 3)
		act(() => {
			page.props.onPress()
		})
		expect(onPageChange).toHaveBeenCalledWith(2)
		const activePage = pages.find((p) => p.props.mode === 'contained')
		expect(activePage.props.children).toBe(3)
	})

	it('should navigate to the next page', () => {
		const pages = component.root.findAllByProps({ testID: 'page' })
		const [next] = component.root.findAllByProps({ testID: 'nextPage' })
		act(() => {
			next.props.onPress()
		})
		expect(onPageChange).toHaveBeenCalledWith(1)
		const activePage = pages.find((p) => p.props.mode === 'contained')
		expect(activePage.props.children).toBe(2)
	})

	it('should navigate to the previous page', () => {
		const pages = component.root.findAllByProps({ testID: 'page' })
		const page = pages.find((p) => p.props.children === 3)
		act(() => {
			page.props.onPress()
		})

		const [prev] = component.root.findAllByProps({ testID: 'prevPage' })
		act(() => {
			prev.props.onPress()
		})
		expect(onPageChange).toHaveBeenCalledWith(1)
		const activePage = pages.find((p) => p.props.mode === 'contained')
		expect(activePage.props.children).toBe(2)
	})

	it('should navigate to the next page fast and update pages to show', () => {
		const pages = component.root.findAllByProps({ testID: 'page' })
		const [next] = component.root.findAllByProps({ testID: 'nextPageFast' })
		act(() => {
			next.props.onPress()
		})
		expect(onPageChange).toHaveBeenCalledWith(5)
		const activePage = pages.find((p) => p.props.mode === 'contained')
		expect(activePage.props.children).toBe(6)

		const realPages = pages.filter(
			(page) => typeof page.props.children === 'number'
		)
		expect(realPages.length).toBe(5)
		expect(realPages[0].props.children).toBe(6)
		expect(realPages[1].props.children).toBe(7)
		expect(realPages[2].props.children).toBe(8)
		expect(realPages[3].props.children).toBe(9)
		expect(realPages[4].props.children).toBe(10)
	})

	it('should navigate to the previous page fast and update pages to show', () => {
		const pages = component.root.findAllByProps({ testID: 'page' })
		const realPages = pages.filter(
			(page) => typeof page.props.children === 'number'
		)
		const [next] = component.root.findAllByProps({ testID: 'nextPageFast' })
		act(() => {
			next.props.onPress() // go to page 6
		})
		act(() => {
			next.props.onPress() // go to page 11
		})
		act(() => {
			next.props.onPress() // go to page 16
		})

		const [prev] = component.root.findAllByProps({ testID: 'prevPageFast' })
		act(() => {
			prev.props.onPress()
		})
		expect(onPageChange).toHaveBeenCalledWith(10)
		const activePage = pages.find((p) => p.props.mode === 'contained')
		expect(activePage.props.children).toBe(11)

		expect(realPages.length).toBe(5)
		expect(realPages[0].props.children).toBe(11)
		expect(realPages[1].props.children).toBe(12)
		expect(realPages[2].props.children).toBe(13)
		expect(realPages[3].props.children).toBe(14)
		expect(realPages[4].props.children).toBe(15)
	})

	it('should update maximum pages to render based on screen width', () => {
		const container = component.root.findByProps({
			'data-testid': 'paginationContainer'
		})
		act(() => {
			container.props.onLayout({
				nativeEvent: {
					layout: {
						width: 200
					}
				}
			})
		})

		const pages = component.root.findAllByProps({ testID: 'page' })
		const realPages = pages.filter(
			(page) => typeof page.props.children === 'number'
		)
		expect(realPages.length).toBe(3)
		expect(realPages[0].props.children).toBe(1)
		expect(realPages[1].props.children).toBe(2)
		expect(realPages[2].props.children).toBe(3)
	})

	it('should render remaining elements in last page if not enough to fill the page', () => {
		component.update(<Pagination pages={12} onPageChange={onPageChange} />)
		const [next] = component.root.findAllByProps({ testID: 'nextPageFast' })
		act(() => {
			next.props.onPress() // go to page 6
		})
		act(() => {
			next.props.onPress() // go to page 11
		})
		const pages = component.root.findAllByProps({ testID: 'page' })

		const realPages = pages.filter(
			(page) => typeof page.props.children === 'number'
		)
		expect(realPages.length).toBe(2)
		expect(realPages[0].props.children).toBe(11)
		expect(realPages[1].props.children).toBe(12)
	})

	it('should not navigate to a page that is out of bounds', () => {
		const pages = component.root.findAllByProps({ testID: 'page' })
		const [next] = component.root.findAllByProps({ testID: 'nextPage' })
		act(() => {
			next.props.onPress()
		})
		expect(onPageChange).toHaveBeenCalledWith(1)
		const activePage = pages.find((p) => p.props.mode === 'contained')
		expect(activePage.props.children).toBe(2)

		const [prev] = component.root.findAllByProps({ testID: 'prevPage' })
		act(() => {
			prev.props.onPress()
		})
		expect(onPageChange).toHaveBeenCalledWith(0)
		const activePageAfterPrev = pages.find(
			(p) => p.props.mode === 'contained'
		)
		expect(activePageAfterPrev.props.children).toBe(1)

		act(() => {
			prev.props.onPress()
		})
		expect(onPageChange).toHaveBeenCalledWith(0)
		const activePageAfterPrevOutOfBounds = pages.find(
			(p) => p.props.mode === 'contained'
		)
		expect(activePageAfterPrevOutOfBounds.props.children).toBe(1)

		for (let i = 0; i < 100 + 1; i++) {
			act(() => {
				next.props.onPress()
			})
		}

		const activePageAfterNextOutOfBounds = pages.find(
			(p) => p.props.mode === 'contained'
		)
		expect(activePageAfterNextOutOfBounds.props.children).toBe(100)
	})

	it('should not render fast previous page button if on first page', () => {
		const fastPagesPrev = component.root.findAllByProps({
			testID: 'prevPageFast'
		})
		expect(fastPagesPrev.length).toBe(0)
	})

	it('should not render fast next page button if on last page', () => {
		const [next] = component.root.findAllByProps({ testID: 'nextPage' })
		for (let i = 0; i < 100 - 5; i++) {
			act(() => {
				next.props.onPress()
			})
		}
		const fastPagesNext = component.root.findAllByProps({
			testID: 'nextPageFast'
		})
		expect(fastPagesNext.length).toBe(0)
	})

	it('should not render the fast page buttons if there are not enough pages', () => {
		component.update(<Pagination pages={5} onPageChange={onPageChange} />)
		const fastPagesNext = component.root.findAllByProps({
			testID: 'nextPageFast'
		})
		const fastPagesPrev = component.root.findAllByProps({
			testID: 'prevPageFast'
		})
		expect(fastPagesNext.length).toBe(0)
		expect(fastPagesPrev.length).toBe(0)
	})
})
