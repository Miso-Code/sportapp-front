import { FormData } from '../utils/schema'

export interface Props {
	onHandleSubmit: (data: FormData) => void
	isDisabled?: boolean
}
