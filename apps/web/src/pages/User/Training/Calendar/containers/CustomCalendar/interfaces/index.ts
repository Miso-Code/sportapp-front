import { ReactNode } from 'react'
import { Event, EventWrapperProps } from 'react-big-calendar'

export interface Props {
	events: CustomEvent[]
	onSelectEvent?: (event: CustomEvent) => void
}

export enum EventTypes {
	EVENT = 'event',
	TRAINING = 'training',
	SESSION = 'session'
}

export interface CustomEvent extends Event {
	id?: string
	custom_class?: string
	description?: string
	type?: `${EventTypes}`
	warm_up?: number
	cardio?: number
	strength?: number
	cool_down?: number
	location_latitude?: number
	location_longitude?: number
	capacity?: number
}

export interface EventWrapperCustomProps
	extends EventWrapperProps<CustomEvent> {
	children?: ReactNode
}
