import { components } from '..'
import { EventWrapperCustomProps } from '../../interfaces'

describe('components', () => {
	it('should return the correct value', () => {
		const expected = {
			eventWrapper: expect.any(Function)
		}
		const result = components
		expect(result).toEqual(expected)
	})

	describe('eventWrapper', () => {
		it('should return the correct value', () => {
			const props: EventWrapperCustomProps = {
				event: {
					type: 'event',
					custom_class: 'custom_class'
				},
				children: 'children',
				accessors: {
					start: jest.fn(),
					end: jest.fn()
				},
				getters: {
					eventProp: jest.fn(),
					slotProp: jest.fn(),
					dayProp: jest.fn()
				},
				className: '',
				isRtl: false,
				onClick: jest.fn(),
				onDoubleClick: jest.fn(),
				selected: false,
				label: '',
				continuesEarlier: false,
				continuesLater: false
			}
			const expected = (
				<div className='event-wrapper event-custom-type-event custom_class'>
					children
				</div>
			)
			const result = components.eventWrapper(props)
			expect(result).toEqual(expected)
		})

		it('should return the component without custom_class', () => {
			const props: EventWrapperCustomProps = {
				event: {
					type: 'event',
					custom_class: ''
				},
				children: 'children',
				accessors: {
					start: jest.fn(),
					end: jest.fn()
				},
				getters: {
					eventProp: jest.fn(),
					slotProp: jest.fn(),
					dayProp: jest.fn()
				},
				className: '',
				isRtl: false,
				onClick: jest.fn(),
				onDoubleClick: jest.fn(),
				selected: false,
				label: '',
				continuesEarlier: false,
				continuesLater: false
			}
			const expected = (
				<div className='event-wrapper event-custom-type-event '>
					children
				</div>
			)
			const result = components.eventWrapper(props)
			expect(result).toEqual(expected)
		})
	})
})
