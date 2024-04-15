import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import TimerRing, { hexToRgb, formatTime } from '../TimerRing'

describe('hexToRgb', () => {
	it('should convert a hex color to an rgb color object', () => {
		expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
		expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 })
		expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
		expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 })
		expect(hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 })
	})

	it('should convert an rgb color to an rgb color object', () => {
		expect(hexToRgb('rgb(0,0,0)')).toEqual({ r: 0, g: 0, b: 0 })
		expect(hexToRgb('rgb(255,255,255)')).toEqual({ r: 255, g: 255, b: 255 })
		expect(hexToRgb('rgb(255,0,0)')).toEqual({ r: 255, g: 0, b: 0 })
		expect(hexToRgb('rgb(0,255,0)')).toEqual({ r: 0, g: 255, b: 0 })
		expect(hexToRgb('rgb(0,0,255)')).toEqual({ r: 0, g: 0, b: 255 })
	})

	it('should convert an rgba color to an rgb color object', () => {
		expect(hexToRgb('rgba(0,0,0,1)')).toEqual({ r: 0, g: 0, b: 0 })
		expect(hexToRgb('rgba(255,255,255,1)')).toEqual({
			r: 255,
			g: 255,
			b: 255
		})
		expect(hexToRgb('rgba(255,0,0,1)')).toEqual({ r: 255, g: 0, b: 0 })
		expect(hexToRgb('rgba(0,255,0,1)')).toEqual({ r: 0, g: 255, b: 0 })
		expect(hexToRgb('rgba(0,0,255,1)')).toEqual({ r: 0, g: 0, b: 255 })
	})

	it('should return null if the color is invalid', () => {
		expect(hexToRgb('')).toBeNull()
		expect(hexToRgb('invalid')).toBeNull()
	})
})

describe('TimerRing', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<TimerRing currentTime={1} maxTime={10} />)
	})

	afterEach(() => {
		jest.resetAllMocks()
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should format the time correctly', () => {
		expect(formatTime(0)).toBe('0:00')
		expect(formatTime(1)).toBe('0:01')
		expect(formatTime(59)).toBe('0:59')
		expect(formatTime(60)).toBe('1:00')
		expect(formatTime(61)).toBe('1:01')
		expect(formatTime(119)).toBe('1:59')
		expect(formatTime(120)).toBe('2:00')
		expect(formatTime(121)).toBe('2:01')
		expect(formatTime(3599)).toBe('59:59')
		expect(formatTime(3600)).toBe('60:00')
		expect(formatTime(3601)).toBe('60:01')
	})
})
