import RegisterDefaultContainer from 'containers/Register/Default'
import RegisterFullContainer from 'containers/Register/Full'
import { Props } from 'containers/Register/interfaces'

export default function RegisterContainer({
	step,
	onHandleFirstSubmit,
	onHandleSecondSubmit,
	firstDefaultValues,
	secondDefaultValues,
	isDisabled
}: Props) {
	if (step === 0) {
		return (
			<RegisterDefaultContainer
				isDisabled={isDisabled}
				defaultValues={firstDefaultValues}
				onHandleSubmit={onHandleFirstSubmit}
			/>
		)
	} else if (step === 1) {
		return (
			<RegisterFullContainer
				isDisabled={isDisabled}
				defaultValues={secondDefaultValues}
				onHandleSubmit={onHandleSecondSubmit}
			/>
		)
	}
	return null
}
