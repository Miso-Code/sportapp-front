import { FormData } from 'containers/Login/utils/schema'

export interface Props {
	onHandleSubmit: (data: FormData) => void
	isDisabled?: boolean
}
