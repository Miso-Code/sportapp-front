import { EventWrapperCustomProps } from '../interfaces'

export const components = {
	eventWrapper: (props: EventWrapperCustomProps) => {
		const { event } = props
		return (
			<div
				className={`event-wrapper event-custom-type-${event.type} ${event.custom_class ?? ''}`}>
				{props.children}
			</div>
		)
	}
}
