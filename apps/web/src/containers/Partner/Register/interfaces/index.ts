import { FormData } from '../utils/schema'

export interface Props {
	onHandleSubmit: (data: FormData) => void
	defaultValues?: FormData
	isDisabled?: boolean
}
