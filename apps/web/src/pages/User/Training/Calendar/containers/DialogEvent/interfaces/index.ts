import { CustomEvent } from '../../../containers/CustomCalendar/interfaces'

export interface Props {
	open: boolean
	selectedValue: CustomEvent
	onClose: () => void
}
